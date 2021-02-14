class ShopItem {
    constructor(name, price, imgLink, id) {
        this.name = name;
        this.price = price;
        this.imgLink = imgLink;
        this.id = id;
    }

    printItem() {
        // pass
    }
}

class ShopList {
    constructor() {
        this.shopList = [];
    }

    addItem(limit) {
        for (let i = 0; i < limit; i++) {
            let tmp = new ShopItem(`Item_${1}`, 10 * (i + 1), `url_${i}`, 10000 + i * 10, 2);
            console.log(tmp);
            this.shopList.push(tmp);
        }
    }

    pickItem(id) {
        return this.shopList[id];
    }
    checkLength() {
        return this.shopList.length;
    }
}

class NewBasketItem {
    /**
     * 
     * @param {ShopItem} item: ShopItem
     * @param {Number} quantity: Number
     */
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
}

class GoodsBasket {
    constructor() {
        this.gBasket = {};
    }

    addGood(item) {
        let tmpItem = new NewBasketItem(item, 1);
        if (!this.gBasket[item.id]) {
            this.gBasket[item.id] = tmpItem;
        } else {
            this.gBasket[item.id].quantity += 1;
        }
    }

    dropItem(item) {
        // pass
    }

    totalPrice() {
        let tPrice = 0;
        console.log(this.gBasket.length);
        for (let i = 0; i < this.gBasket.length; i++) {
            tPrice += this.gBasket[i].price * this.gBasket[i].quantity;
        }
        return tPrice;
    }
}

let list1 = new ShopList;
list1.addItem(100);

console.log('list: ', list1.checkLength());

let basket = new GoodsBasket;
basket.addGood(list1.pickItem(0));
console.log('el1: ', list1.pickItem(0));
basket.addGood(list1.pickItem(1));
console.log('el2: ', list1.pickItem(1));
basket.addGood(list1.pickItem(2));
console.log('el3: ', list1.pickItem(2));

console.log('basket:', basket);
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
    for (let i = 0; i < goodsList.length; i++) {
        // выводился не каждый отдельный элемент списка,
        // а сам список, элементы которого разделены запятыми.
        document.querySelector('.goods-list').innerHTML += goodsList[i];
    }
}

renderGoodsList(goodsL);