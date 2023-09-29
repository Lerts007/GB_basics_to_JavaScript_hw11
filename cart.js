export class ShopingCart {
  constructor(customerName, initialTotalCost) {
    this.customerName = customerName;
    this.totalCost = initialTotalCost;
    this.items = [];
  }

  // добавление товара в корзину
  addCart(product, idProduct, quantity = 1) {
    this.totalCost += quantity * product.price;
    let count = quantity;

    const objProduct = {
      product,
      quantity: quantity,
    };

    if (this.items.find((prod) => prod.product === product)) {
      count = this.items.find((prod) => prod.product === product).quantity += quantity;
      this.increaseCountProduct(count, idProduct);
    } else {
      this.items.push(objProduct);
      this.addCartInPage(product, count, idProduct);
    }

    this.checkout();
  }

  // добавление товара в html
  addCartInPage(obj, count, idProduct) {
    const cartItems = document.querySelector('.cartItems');
    const cartItemsMain = document.querySelector('.cartItems-main');

    const product = `
      <div class="itemsInCart">
        <i class="fa-solid fa-xmark"></i>
        <div class="itemsInCart-img">
          <img class="itemsInCart__img" src="${obj.img}" alt="Картинка" />
        </div>
        <div class="itemsInCart-info">
          <h4 class="itemsInCart-info__name">${obj.name}</h4>
          <p class="itemsInCart-info__price">Price: $${obj.price}</p>
          <p class="itemsInCart-info__color">Color: ${obj.color}</p>
          <p class="itemsInCart-info__size">Size: ${obj.size}</p>
          <p class="itemsInCart-info__quantity">Quantity: <span id='${idProduct}'>${count}<span/></p>
        </div>
      </div>
        `;
    cartItemsMain.insertAdjacentHTML('beforeend', product);

    // отлавливаю каждый раз новую иконку после добавления
    const iEl = document.querySelectorAll('.fa-solid');
    iEl[iEl.length - 1].addEventListener('click', function () {
      this.parentElement.remove();
      cartArr.splice(cartArr.indexOf(obj), 1);

      //проверка массива. если пустой то скарыть блок с классом cartItems
      if (cartArr.length === 0) {
        cartItems.classList.add('cartItemsDisable');
      }
    });
  }

  //находим товар в корзине и добавляем количество
  increaseCountProduct(count, idProduct) {
    const itemsInCart = document.querySelectorAll('.itemsInCart-info');
    itemsInCart.forEach((el) => {
      if (el.children[4].children[0].id === idProduct) {
        el.children[4].children[0].textContent = count;
      }
    });
    console.log(itemsInCart[0].children[4].children[0].id);
  }

  // текущая стоимость заказа
  getCurrentTotalCost() {
    return this.totalCost;
  }
  // оформление заказа
  checkout() {
    console.log(
      `Заказ оформлен для ${this.customerName}. Общая стоимость заказа: ${this.totalCost} рублей. Спасибо за покупку!`
    );
  }
}
