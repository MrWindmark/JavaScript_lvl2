  const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  const renderGoodsItem = (title = 'Name', price = "1000", imgURL = '#') => {
    return `<div class="goods-item"><img src="${imgURL}"><h3>${title}</h3><p>${price}</p></div>`;
  };
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    for (let i = 0; i < goodsList.length; i++){
        // выводился не каждый отдельный элемент списка,
        // а сам список, элементы которого разделены запятыми.
        document.querySelector('.goods-list').innerHTML += goodsList[i];
    }
  }
  
  renderGoodsList(goods);