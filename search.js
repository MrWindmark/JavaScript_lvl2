Vue.component('search-app', {
    name: 'search-app',
    data() {
        return {
            searchKey: '',
            filteredGoods: [],
        }
    },
    template: ` <div class="search-app">
                    <input type="text" v-model="searchKey" placeholder="search">
                    <button @click="filterGoods()">Go Search!</button>
                </div>`,
    props: { goods: Array },
    methods: {
        filterGoods() {
            console.log(this.goods.filter(i => i.productName.toLowerCase().includes(this.searchKey.toLowerCase())));
            this.filteredGoods = this.goods.filter(i => i.productName.toLowerCase().includes(this.searchKey.toLowerCase()));
        },
    }
});