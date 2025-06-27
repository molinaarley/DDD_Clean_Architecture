import { Injectable, signal } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<Product[]>([]);
  public readonly items = this._items.asReadonly();

  public add(product: Product): void {
    this._items.update(items => [...items, product]);
  }

  public remove(productId: number): void {
    this._items.update(items => items.filter(p => p.id !== productId));
  }

  public clear(): void {
    this._items.set([]);
  }
}
