Vue.component('basket-app', {
    name: 'basket-app',
    props: {filteredGoods: Array, func: Function},
    data() {
        return {
            isVisibleCart: false,
            cartName: 'Корзина',
        }
    },
    methods: {
        switchState() {
            this.isVisibleCart = !this.isVisibleCart;
            console.log('Now', this.isVisibleCart);
            if(!this.isVisibleCart) {
                this.cartName = 'Корзина';
            }
            if(this.isVisibleCart) {
                this.cartName = 'Свернуть';
            }
        },
    },
    template: `<div class="basket">
                    <button @click='switchState()'>{{cartName}}</button>
                    <div class="cart-block" v-if="isVisibleCart">Hello</div>
                </div>`,
});
