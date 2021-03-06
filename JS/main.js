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

    getItem(url) {
        return fetch(url)
        .then(result => result.json())
        .then(result =>{
            this.shopList = result;
        });
    }

    addItem(limit) {
        for (let i = 0; i < limit; i++) {
            let tmp = new ShopItem(`Item_${1}`, 10 * (i + 1), `url_${i}`, 10000 + i * 10, 2);
            console.log(tmp);
            this.shopList.push(tmp);
        }
    }

    selectItem(targetID) {
        for (let item = 0; item < this.shopList.length; item++) {
            const elem = this.shopList[item];
            if(elem.id === targetID) {
                return elem;
            } else {
                return 0;
            }            
        }
    }

    getLength() {
        return this.shopList.length;
    }

    render(targetItemName) {
        const body = document.getElementsByClassName(`${targetItemName}`)[0];

        for(let item = 0; item < this.shopList.length; item++) {
            console.log(this.shopList.length);
            let newShopItem = document.createElement('div');
            newShopItem.classList('list-item');
            newShopItem.innerHTML = `
            <div>
                <h5>${this.shopList[item][productName]} - ${this.shopList[item][price]}</h5>
                <button data-goods-id="${this.shopList[item][id]}">Remove from cart</button>
                <hr/>
            </div>`;
            console.log(newShopItem);
            body.appendChild(newShopItem);
        }
    }
}

class NewBasketItem {
    /**
     * 
     * @param {ShopItem} item: ShopList elem
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
        delete this.gBasket[item.id];
    }

    totalPrice() {
        let tPrice = 0;
        console.log(this.gBasket.length);
        for (let i = 0; i < this.gBasket.length; i++) {
            tPrice += this.gBasket[i].price * this.gBasket[i].quantity;
        }
        return tPrice;
    }

    getBasketItems() {
        return this.gBasket;
    }
}

const goodsL = new ShopList();

// const targetURL = 'https://mock-api-builder.vercel.app/api/schema/get/602c166a89c4a60009ef7046';
// const targetURL = 'https://mock-api-builder.vercel.app/api/template/todos';

// goodsL.getItem(targetURL);
goodsL.addItem(100);
console.log(goodsL);
// goodsL.render('goods-list')
// console.log(goodsL.getLength());