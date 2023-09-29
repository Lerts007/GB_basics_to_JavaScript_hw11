import { ShopingCart } from './cart.js';

// создание корзины класса
const cart = new ShopingCart('Иван', 0);
fetchData();

// Функция отлавливания события по кнопке
function addCartArr(data) {
  const addCarts = document.querySelectorAll('.product-info__btn');
  const cartItems = document.querySelector('.cartItems');

  addCarts.forEach((elBtn) => {
    elBtn.addEventListener('click', () => {
      // при добавлении товара в корзину показать блок cartItems
      if (cartItems.classList.contains('cartItemsDisable')) {
        cartItems.classList.remove('cartItemsDisable');
      }

      //изменяю стиль кнопки и её content
      changingClassOfButton(elBtn, 'Добавлено');
      setTimeout(() => {
        changingClassOfButton(elBtn, 'В корзину');
      }, 1500);

      // добавление товара в корзину
      cart.addCart(data[elBtn.id], elBtn.id);
      console.log(cart.items);
    });
  });
}

// изменение класса у кнопки когда добавили в корзину
function changingClassOfButton(btn, textBtn) {
  btn.classList.toggle('activ__btn');
  btn.textContent = textBtn;
}

async function fetchData() {
  try {
    const responce = await fetch('data.json');
    if (!responce.ok) {
      throw new Error('Не удалось получить данныес data JSON');
    }

    const data = await responce.json();
    console.log(data);
    const feturedItemsMain = document.querySelector('.feturedItems-main');
    data.forEach(({ name, img, description, price }, index) => {
      const product = `
        <div class="product">
          <div class="product-img">
            <img class="product__img" src="${img}" alt="Картинка">
          </div>
          <div class="product-info">
            <h4 class="product-info__name">${name}</h4>
            <p class="product-info__description">${description}</p>
            <div>
              <p class="product-info__price">$${price}</p>
              <button class="product-info__btn" id="${index}" type="button">В корзину</button>
            </div>
          </div>
        </div>
      `;
      feturedItemsMain.insertAdjacentHTML('beforeend', product);
    });

    addCartArr(data);
  } catch (error) {
    console.log(error);
  }
}
