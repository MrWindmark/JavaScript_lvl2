Vue.component('search-app', {
    name: 'search-app',
    data() {
        return {
            searchKey: '',
        }
    },
    template: ` <div class="search-app">
                    <input type="text" v-model="searchKey" placeholder="search">
                    <button @click="func(searchKey)">Go Search!</button>
                </div>`,
    props: { func: Function },
});