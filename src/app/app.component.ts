import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  cartItems: any[] = [];

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    document.documentElement.style.setProperty('--cart-width', `120px`);
  }


  cartUpdateHandler(cartItems: any) {
    this.cartItems = cartItems;
    if (this.cartItems.length === 0) {
      document.documentElement.style.setProperty('--cart-width', `0px`);
    }
  }
}