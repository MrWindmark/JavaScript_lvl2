const goodsItem = [
    {
        id: '1',
        price: '10',
        name: 'Ban',
        img: '#1'
    },
    {
        id: '2',
        price: '20',
        name: 'Kaba',
        img: '#2'
    },
    {
        id: '3',
        price: '30',
        name: 'Chooh',
        img: '#3'
    },
    {
        id: '4',
        price: '45',
        name: 'Loom',
        img: '#4'
    },
    {
        id: '5',
        price: '53',
        name: 'Bam',
        img: '#5'
    },
    {
        id: '6',
        price: '62',
        name: 'Mendel',
        img: '#6'
    },
    {
        id: '7',
        price: '70',
        name: 'PanBan',
        img: '#7'
    },
    {
        id: '8',
        price: '80',
        name: 'Kaa',
        img: '#8'
    },
    {
        id: '9',
        price: '90',
        name: 'ChihPih',
        img: '#9'
    },
    {
        id: '10',
        price: '95',
        name: 'Boom',
        img: '#10'
    },
    {
        id: '11',
        price: '124',
        name: 'Bambook',
        img: '#11'
    },
    {
        id: '12',
        price: '162',
        name: 'End',
        img: '#12'
    },
]

const app = new Vue({
    el: '#app',
    data: {
        goodsList: goodsItem,
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
    },
    methods: {
        getItems(url) {
            return fetch(url)
            .then(result => result.json())
            .then(result =>{
                this.shopList = result;
            });
        },
        serachClick(value) {
            console.log("search", value);
        },
        clickLMB(id) {
            console.log("We're on", id);
        },
        FilterGoods(value) {
            // pass
        },
    },
});

const footer = new Vue({
    el: '#footer',
    data: {
        year: new Date().getFullYear(),
        time: new Date().toLocaleTimeString(),
    }
});