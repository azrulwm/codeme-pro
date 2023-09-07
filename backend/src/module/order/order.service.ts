import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.model';
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

    // Balance weights if multiple packages
    if (packages.length > 1) {
      let avgWeight = totalWeight / packages.length;

      console.log('Balancing packages weight');

      let maxIterations = 200;
      let changesMade = true;

      // To prevent infinite while loop
      while (changesMade && maxIterations > 0) {
        console.log('Sorting....');

        changesMade = false;
        maxIterations--;

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

      if (maxIterations <= 0) {
        console.warn('Weight balancing reached max iterations!');
      }
    }

    return packages;
  }
}
