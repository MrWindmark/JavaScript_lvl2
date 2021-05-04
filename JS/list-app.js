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
                    <h2 class="elem-title">{{item.productName}}</h2>
                    <span>{{item.price}}</span>
                    <button @click='clickLMB(item.id)'>Buy</button>
                    <hr/>
                </div>`,
    methods: {
        clickLMB(id) {
            console.log("We're on", id);
            console.log(this.item);

            let itemToBasket = this.item;
            let tmpBasket = fetch('lesson7/basket.json');

            if (tmpBasket.result === 1) {
                let find = this.tmpBasket.find(el => el.id === itemToBasket.id);
                if (find) {
                    find.quantity++;
                } else {
                    const prod = Object.assign({ quantity: 1 }, itemToBasket);
                    this.cartItems.push(prod)
                }
            }
            fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.item)
            });
        },
    },
});