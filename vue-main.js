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

const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';

const app = new Vue({
    el: '#app',
    data: {
        goodsList: [],
        filteredGoods: [],
        searchKey: '',
        isVisibleCart: false,
        cartName: 'Корзина',
    },
    methods: {
        getItems() {
            return fetch(`${BASE_URL}/602c166a89c4a60009ef7046`)
            .then(result => result.json())
            .then(result =>{
                this.goodsList = result;
                this.filteredGoods = this.goodsList;
                console.log(result);
            })
            .catch((e) => {
                console.log('Error', e)
            });
        },
        serachClick() {
            let result = this.filteredGoods.filter(i => i.productName.toLowerCase().includes(this.searchKey.toLowerCase()));
            console.log(result);
            return result;
        },
        clickLMB(id) {
            console.log("We're on", id);
        },
        FilterGoods(value) {
            // pass
        },
        switchState() {
            this.isVisibleCart = !this.isVisibleCart;
            console.log('Now', this.isVisibleCart);
            if(!this.isVisibleCart) {
                this.cartName = 'Корзина';
            }
            if(this.isVisibleCart) {
                this.cartName = 'Свернуть';
            }
        }
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