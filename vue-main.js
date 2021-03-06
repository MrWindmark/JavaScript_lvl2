const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';

const app = new Vue({
    el: '#app',
    data: {
        goodsList: [],
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