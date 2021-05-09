Vue.component('basket-app', {
    name: 'basket-app',
    props: { filteredGoods: Array, func: Function },
    data() {
        return {
            isVisibleCart: false,
            cartName: 'Корзина',
            basket: [],
        }
    },
    template: `<div class="basket">
                    <button @click='switchState()'>{{cartName}}</button>
                    <div class="cart-block" v-if="isVisibleCart">
                        <basket-draw-app v-for="item in basket" :itemToDraw="item" :key="item.id"></basket-draw-app>
                    </div>
                </div>`,
    methods: {
        switchState() {
            this.isVisibleCart = !this.isVisibleCart;
            console.log('Now', this.isVisibleCart);
            if (!this.isVisibleCart) {
                this.cartName = 'Корзина';
            }
            if (this.isVisibleCart) {
                this.cartName = 'Свернуть';
                this.getBasket();
            }
        },
        async getBasket() {
            try {
                const result = await fetch('http://localhost:3000/basket');
                const result_1 = await result.json();
                this.basket = result_1;
                console.log('Log:', result_1);
            } catch (e) {
                console.log('Error', e);
            }
        },
        deleteFromBasket(item) {
            let indexForDelete = this.basket.indexOf(item);
            this.basket.splice(indexForDelete, 1);

            fetch('http://localhost:3000/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(item)
            });
        },
        addInBasket(item) {
            item.quantity++;
            fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(item)
            });
        },
        decreaseInBasket(item) {
            item.quantity--;
            fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(item)
            });

        },
    },
});

Vue.component('basket-draw-app', {
    name: 'basket-draw-app',
    props: { itemToDraw: Object },
    methods: {
        deleteFromBasket(item) {
            this.$parent.deleteFromBasket(item);
        },
        addInBasket(item) {
            this.$parent.addInBasket(item);
        },
        decreaseInBasket(item) {
            this.$parent.decreaseInBasket(item);
        },
    },
    template: ` <div class="">
                    <!-- <img :src="itemToDraw.img" alt=""> -->
                    <h5 class="">{{itemToDraw.productName}} - {{itemToDraw.quantity}} шт.</h5>
                    <span>Цена {{itemToDraw.price}} за шт.</span>
                    <button @click='addInBasket(itemToDraw)'>+</button>
                    <button v-if='itemToDraw.quantity>1' @click='decreaseInBasket(itemToDraw)'>-</button>
                    <button @click='deleteFromBasket(itemToDraw)'>Удалить</button>
                    <hr/>
                </div>`,
});