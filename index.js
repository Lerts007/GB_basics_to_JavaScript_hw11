let cartArr = [];

fetchData();

// Функция добавления товара в корзину
function addCart(data) {
  const addCarts = document.querySelectorAll('.product-info__btn');

  addCarts.forEach((el) => {
    el.addEventListener('click', () => {
      // localStorage.Lerts = JSON.stringify();
    });
  });
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
              <button class="product-info__btn" id="img0${index}" type="button">В корзину</button>
            </div>
          </div>
        </div>
      `;
      feturedItemsMain.insertAdjacentHTML('beforeend', product);
    });

    addCart(data);
  } catch (error) {
    console.log(error);
  }
}
