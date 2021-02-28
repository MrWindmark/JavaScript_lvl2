const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';

Vue.component('basket-app', {
    template: `<div class="basket">
                    <button @click='switchState()'>{{cartName}}</button>
                    <div class="cart-block" v-if="isVisibleCart">Hello</div>
                </div>`,
    props: ['filteredGoods'],
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
    }
});

Vue.component('search-app', {
    template: ` <div class="search-app">
                    <input type="text" v-model="searchKey" placeholder="search">
                    <button @click="filterGoods()">Go Search!</button>
                </div>`,
    props: { goods: Array },
    data() {
        return {
            searchKey: '',
        }
    },
    methods: {
        filterGoods() {
            console.log(this.goods.filter(i => i.productName.toLowerCase().includes(this.searchKey.toLowerCase())));
            return this.goods.filter(i => i.productName.toLowerCase().includes(this.searchKey.toLowerCase()));
        },
    }
});

Vue.component('list-app', {
    props: ['goods'],
    template: ` <div class="shop-item">
                    <item-draw-app v-for="item in goods" :item="item" :key="item.id"></item-draw-app>
                </div>`,
});

Vue.component('item-draw-app', {
    props: ['item'],
    template: ` <div class="item-element">
                    <!-- <img :src="item.img" alt=""> -->
                    <h2>{{item.productName}}</h2>
                    <span>{{item.price}}</span>
                    <button @click='clickLMB(item.id)'>Buy</button>
                    <hr/>
                </div>`,
    methods: {
        clickLMB(id) {
            console.log("We're on", id);
        },
    },
});

const app = new Vue({
    el: '#app',
    data: {
        goodsList: [],
        filteredGoods: [],
    },
    methods: {
        async getItems() {
            try {
                const result = await fetch(`${BASE_URL}/602c166a89c4a60009ef7046`);
                const result_1 = await result.json();
                this.goodsList = result_1;
                this.filteredGoods = this.goodsList;
                console.log(result_1);
            } catch (e) {
                console.log('Error', e);
            }
        },
    },
    mounted(){
        this.getItems();
    }
});

const footer = new Vue({
    el: '#footer',
    data: {
        year: new Date().getFullYear(),
        time: new Date().toLocaleTimeString(),
    }
});