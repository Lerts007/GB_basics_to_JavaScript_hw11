async function fetchData() {
  try {
    const responce = await fetch('data.json');
    if (!responce.ok) {
      throw new Error('Не удалось получить данныес data JSON');
    }

    const data = await responce.json();
    console.log(data);
    const feturedItemsMain = document.querySelector('.feturedItems-main');
    data.forEach(({ name, img, description, price }) => {
      const product = `
        <div class="product">
          <div class="product-img">
            <img class="product__img" src="${img}" alt="Картинка">
          </div>
          <div class="product-info">
            <h4 class="product-info__name">${name}</h4>
            <p class="product-info__description">${description}</p>
            <p class="product-info__price">$${price}</p>
          </div>
        </div>
      `;
      feturedItemsMain.insertAdjacentHTML('beforeend', product);
    });
  } catch (error) {
    console.log(error);
  }
}
fetchData();
