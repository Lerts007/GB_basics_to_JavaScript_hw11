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
      </div>
      `;

      feturedItemsMain.insertAdjacentHTML('beforeend', product);
    });
  } catch (error) {
    console.log(error);
  }
}
fetchData();
