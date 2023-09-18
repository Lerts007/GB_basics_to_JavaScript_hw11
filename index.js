let cartArr = [];

fetchData();

// Функция добавления товара в корзину
function addCartArr(data) {
  const addCarts = document.querySelectorAll('.product-info__btn');

  addCarts.forEach((elBtn) => {
    elBtn.addEventListener('click', () => {
      changingClassOfButton(elBtn, 'Добавлено');
      setTimeout(() => {
        changingClassOfButton(elBtn, 'В корзину');
      }, 1500);
      console.log(elBtn.id);

      // добавление товара в массив
      console.log(
        cartArr.find((elFind) => {
          if (elFind.img === data[elBtn.id].img) {
            console.log('рапва');
          } else {
            console.log('dsad');
          }
        })
      );

      cartArr.find((el) => {
        if (el.img !== data[elBtn.id].img) {
          cartArr.push(data[elBtn.id]);
          addCart(data[elBtn.id]);
          console.log('gjdnjh');
          addLocalStorage();
        }
      });

      if (cartArr.length === 0) {
        cartArr.push(data[elBtn.id]);
        addLocalStorage();
        addCart(data[elBtn.id]);
      }
    });
  });
}

// изменение класса у копки когда добавили в корзину
function changingClassOfButton(btn, textBtn) {
  btn.classList.toggle('activ__btn');
  btn.textContent = textBtn;
}

// добавление товаров в корзине в localstorage
function addLocalStorage() {
  localStorage.Lerts = JSON.stringify(cartArr);
}

function addCart(obj) {
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
        <p class="itemsInCart-info__quantity">Quantity: <input type="number" max="10" /></p>
      </div>
    </div>
      `;
  cartItemsMain.insertAdjacentHTML('beforeend', product);
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
