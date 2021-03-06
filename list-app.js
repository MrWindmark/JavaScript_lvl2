Vue.component('list-app', {
    name: 'list-app',
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