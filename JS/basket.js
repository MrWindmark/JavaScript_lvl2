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
                const result = await fetch('lesson7/basket.json');
                const result_1 = await result.json();
                this.basket = result_1;
                console.log('Log:', result_1);
            } catch (e) {
                console.log('Error', e);
            }
        },
    },
    template: `<div class="basket">
                    <button @click='switchState()'>{{cartName}}</button>
                    <div class="cart-block" v-if="isVisibleCart">
                        <basket-draw-app v-for="item in basket" :item="item" :key="item.id"></basket-draw-app>
                    </div>
                </div>`,
});

Vue.component('basket-draw-app', {
    props: ['item'],
    template: ` <div class="">
                    <!-- <img :src="item.img" alt=""> -->
                    <h5 class="">{{item.productName}}</h5>
                    <span>{{item.price}}</span>
                    <hr/>
                </div>`,
});