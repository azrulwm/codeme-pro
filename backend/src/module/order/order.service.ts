import { Injectable } from '@nestjs/common';
import { Product } from '../product/product.model';

@Injectable()
export class OrderService {
  createOrder(params: Product[]) {
    const result = this.createPackages(params);

    return result;
  }

  createPackages(items: Product[]) {
    let totalCost = 0;
    let totalWeight = 0;
    const packages = [];
    let currentPackage = { items: [], cost: 0, weight: 0 };

    for (const item of items) {
      if (currentPackage.cost + item.price < 250) {
        currentPackage.items.push(item);
        currentPackage.cost += item.price;
        currentPackage.weight += item.weight;
      } else {
        packages.push(currentPackage);
        currentPackage = {
          items: [item],
          cost: item.price,
          weight: item.weight,
        };
      }
      totalCost += item.price;
      totalWeight += item.weight;
    }
    if (currentPackage.items.length) packages.push(currentPackage);

    // Ensure no package exceeds 5000g limit
    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i];
      while (pkg.weight > 5000) {
        // Create a new package with the heaviest item
        const heaviestItemIndex = pkg.items.findIndex(
          (a: Product, b: Product) => b.weight - a.weight,
        );
        const heaviestItem = pkg.items.splice(heaviestItemIndex, 1)[0];

        packages.push({
          items: [heaviestItem],
          cost: heaviestItem.price,
          weight: heaviestItem.weight,
        });

        pkg.weight -= heaviestItem.weight;
        pkg.cost -= heaviestItem.price;
      }
    }

    // Balancing weights
    if (packages.length > 1) {
      const avgWeight = totalWeight / packages.length;
      let maxIterations = 200;
      let changesMade = true;

      console.log('Balancing weight');

      while (changesMade && maxIterations > 0) {
        changesMade = false;
        maxIterations--;

        console.log(`Still sorting....`);

        const sortedPackages = [...packages].sort(
          (a, b) => a.weight - b.weight,
        );
        const lightest = sortedPackages[0];
        const heaviest = sortedPackages[sortedPackages.length - 1];

        if (lightest.weight < avgWeight && heaviest.weight > avgWeight) {
          for (const item of heaviest.items) {
            if (lightest.cost + item.price < 250) {
              lightest.items.push(item);
              lightest.weight += item.weight;
              lightest.cost += item.price;

              const index = heaviest.items.indexOf(item);
              if (index > -1) {
                heaviest.items.splice(index, 1);
                heaviest.weight -= item.weight;
                heaviest.cost -= item.price;
              }

              changesMade = true;
              break;
            }
          }
        }
      }
    }
    return packages;
  }
}
