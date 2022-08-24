// const newsRouter =require("./news")
// const getUser = require("../app/controllers/checkuser")
// const itemsRouter =require("./items")
// const authRouter =require("./auth")

// const siteRouter =require("./site")

// const meRouter =require("./me")

// function route(app){

//     // app.get('/news', (req, res) => {
//     //     // console.log(req.query.q);
//     //     res.render('news');
//     // })
//     // =>
//     // app.get('/search', (req, res) => {
//     //     res.render('search');
//     // })
//     app.use('/news', newsRouter);

//     app.use('/me', meRouter);
//     app.use('/auth', authRouter);

//     app.use('/listItems', itemsRouter);
//     app.use('/search', itemsRouter);
//     app.use('/danhsachItem', itemsRouter);
//     app.use('/items', itemsRouter);
//     app.use('/',getUser.getuser, siteRouter);

//     // app.get('/', (req, res) => {
//     //     // console.log(req.query.q);
//     //     res.render('home');
//     // })
//     // app.get('/search', (req, res) => {
//     //     // console.log(req.query.q);
//     //     res.render('search');
//     // })

//     // app.post('/search', (req, res) => {
//     //     console.log(req.body.gender);
//     //     res.send('');
//     // })
// }
// module.exports = route;



const meRouter =require("./me")

function route(app){
    app.use('/', meRouter);
}
module.exports = route;