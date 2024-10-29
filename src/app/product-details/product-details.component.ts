import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  navOffset = 42;
  productOffset = 72;
  @Output() addToCart = new EventEmitter();
  showStickyHeader = 0;
  sections = ['summary', 'brand', 'details', 'reviews', 'recommendations'];

  activeSection: string = 'summary';
  thumbIndex = 0;
  product = {
    id: 1,
    images: [
      'assets/product/product1.png',
      'assets/product/product2.png',
      'assets/product/product3.png',
      'assets/product/product4.png',
    ],
    features: [
      '4K Ultra HD (3840 x 2160)',
      'Google Assistant support',
      'Multiple connectivity options',
    ],
    inWishlist: false,
    inCart: false,
    name: 'Jony 139 cm (55 inches) BRAVIA 2 4K Ultra HD Smart LED Google TV K-55S25B (Black)',
    shortName: 'Jony BRAVIA 55 inches LED TV',
    ratings: 4.5,
    reviews: 120,
    originalPrice: 94999,
    price: 54999,
    quantity: 1
  };

  @Input()
  cartItems: any[] = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let currentSection = 'summary';

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element && window.scrollY >= element.offsetTop - this.navOffset - this.productOffset*this.showStickyHeader - 10) {
        currentSection = section;
      }
    }
    this.activeSection = currentSection;
    this.setStickyHeader();
  }

  setActiveSection(section: string) {
    let startOffset = 0;
    if(this.activeSection === 'summary') { 
      startOffset = -100;
    }
    this.activeSection = section;
    this.setStickyHeader();
    const element = document.getElementById(section);
    if (element) {
      let y;
      if(section === 'summary') {
        y = 0;
      } else {
        y = element.getBoundingClientRect().top + window.pageYOffset - this.navOffset - this.productOffset*this.showStickyHeader - startOffset;
      }
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  setStickyHeader() {
    if(this.activeSection !== 'summary') {
      this.showStickyHeader = 1;
    } else {
      this.showStickyHeader = 0;
    }
  }

  addToCartHandler() {
    this.product.inCart = true;
    this.addToCart.emit(this.product);
  }

  toggleWishlist() {
    this.product.inWishlist = !this.product.inWishlist;
  }

  setThumbIndex(index: number) {
    this.thumbIndex = index;
  }
  
  currentProductCount() {
    return this.cartItems.filter((item) => item.id === this.product.id).reduce((acc, item) => acc + item.quantity, 0);
  }

}