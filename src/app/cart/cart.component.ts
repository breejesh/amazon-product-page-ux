import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() cartItems: any[] = [];
  @Output() cartUpdate = new EventEmitter();

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.cartUpdate.emit(this.cartItems);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    }
    this.cartUpdate.emit(this.cartItems);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}