import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.model';
import { Product } from '../product/product.model';

@Injectable()
export class OrderService {
  createOrder(params: Product[]) {
    const result = this.createPackages(params);

    return result;
  }

  createPackages(items: any[]) {
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

    // Distribute weights if multiple packages and total cost is above $250
    if (packages.length > 1 && totalCost > 250) {
      const avgWeight = totalWeight / packages.length;
      packages.forEach((pkg) => {
        pkg.weight = avgWeight;
      });
    }

    return packages;
  }
}
