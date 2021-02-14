class ShopItem {
    constructor(name, price, imgLink, id) {
        this.name = name;
        this.price = price;
        this.imgLink = imgLink;
        this.id = id;
    }

    printItem () {
        // pass
    }
}

class GoodsBasket{
    constructor () {
        this.gBasket = [];
    }

    addItem(item){
        this.gBasket.push(item);
    }

    dropItem(item) {
        // pass
    }

    totalPrice() {
        let tPrice = 0;
        console.log(this.gBasket.length);
        for(let i = 0; i < this.gBasket.length; i++){
            tPrice += this.gBasket[i].price;
        }
        return tPrice;
    }

    createBasket (limit) {
        for (let i = 0; i < limit; i++) {
            let tmp = new ShopItem(`Item_${1}`, 10*i, `url_${i}`, 10000+i*10);
            console.log(tmp);
            basket.addItem(tmp);
        }
    }
}

let basket = new GoodsBasket;
basket.createBasket(100);
let total = basket.totalPrice();
console.log('total: ', total);
 

const goodsL = [
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

renderGoodsList(goodsL);