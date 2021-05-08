Vue.component('list-app', {
    name: 'list-app',
    props: ['goods'],
    template: ` <div class="shop-item">
                    <item-draw-app v-for="item in goods" :item="item" :key="item.id"></item-draw-app>
                </div>`,
});

Vue.component('item-draw-app', {
    props: ['item'],
    data: {
        basket: [],
        basketItem: {},
    },
    // в используемом мной API не имеется возможности загрузки изображений
    // обычно изображения хранятся на сервере и их передают ссылкой, откуда уже производится загрузка файла
    // иначе говоря, API должно передать ссылку, а Vue просто передаст её в компонент изображения.
    // Не ожидал такого неприятного ограничения со стороны моего API
    template: ` <div class="item-element">
                    <!-- <img :src="item.img" alt=""> -->
                    <h2 class="elem-title">{{item.productName}}</h2>
                    <span>{{item.price}}</span>
                    <button @click='clickLMB(item.id)'>Buy</button>
                    <hr/>
                </div>`,
    methods: {
        async clickLMB(id) {
            // console.log("We're on", id);
            // console.info('item', this.item);

            let tmpBasket = await fetch('http://localhost:3000/basket');
            const basket = await tmpBasket.json();
            let basketItem = this.item;
            // console.info('basket', basket);
            // console.info('Basket item 1', basketItem);
            // console.info('tmpBasket', JSON.stringify(basket));

            if (basket) {
                let find = basket.find(el => el.id === basketItem.id);
                if (find) {
                    // в полученную корзину записать новые данные и вернуть обновлённую корзину на сервер
                    basketItem.quantity = basketItem.quantity + 1;
                    // console.info('Basket item 2.0', basketItem);
                } else {
                    // если в корзине товара не имелось - установить количество 1 и отправить на сервер
                    basketItem.quantity = 1;
                    // console.info('Basket item 2.1', basketItem);
                }
            }

            fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(basketItem)
            });
        },
    },
});