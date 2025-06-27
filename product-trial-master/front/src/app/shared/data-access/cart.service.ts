import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);

  // signals
  private _count = signal(0);
  count = this._count.asReadonly();

  private _cart = signal<{ id: number; [key: string]: any }[]>([]); // o ajusta el tipo
  cart = this._cart.asReadonly();

  addToCart(productId: number, email: string) {
    return this.http.post<{ success: boolean }>(
      `${environment.apiUrl}/api/user/cart`,
      { productId, email }
    );
  }

  

  updateCartCount(count: number) {
    this._count.set(count);
  }

  removeFromCart(productId: number): void {
    const current = this._cart(); // usar _cart, no cart porque queremos modificarlo
    const updated = current.filter(item => item.id !== productId);
    this._cart.set(updated);
    this._count.set(updated.length); // actualizar el contador también
  }
}
