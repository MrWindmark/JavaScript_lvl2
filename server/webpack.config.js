module.exports = {
    mode: 'production',
    entry: ['../public/vue-main.js', '../public/search.js', '../public/list-app.js', '../public/basket.js'],
    output: {
        filename: "../prod/build.js"
    },
    watch: true,
}