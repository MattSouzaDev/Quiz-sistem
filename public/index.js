async function loadScore() {
  const dataList = document.querySelector('.data-list');
  const tempLi = document.createElement('li')

  tempLi.innerText = 'Carreganndo...'



  // Fetch funcao para buscar dados//
  try {
    dataList.appendChild(tempLi) //mostrar menssagem carregando

    const response = await fetch('/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // fomatando dados para json formato

    // loop para acessar os dados
    data.forEach((item) => {
      const listItem = document.createElement('li');
      const divContent = document.createElement('div');

      //criando div com nome e valor para a lista
      divContent.innerHTML = `<div class="list-container">
                                      <div class="item-container name">${item.name}</div>
                                      <div class="item-container score">${item.value}</div>
                                </div>`

      listItem.appendChild(divContent);
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching data:', error);

    // Mostrar menssagem de erro
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = `<li>Erro carregando dados, tente mais tarde!</li>`;
  }
  dataList.removeChild(tempLi)
}
window.onload = () => { loadScore() }