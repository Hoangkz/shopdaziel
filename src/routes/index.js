const newsRouter =require("./news")
const itemsRouter =require("./items")
const authRouter =require("./auth")

const siteRouter =require("./siteRouter")
const checkUser = require("../app/controllers/checkuser")
const meRouter =require("./me")

function route(app){
    app.use('/', checkUser.getuser,siteRouter);
    app.use('/news', newsRouter);
    app.use('/auth', authRouter);
    app.use('/me', meRouter);
    app.use('/listItems', itemsRouter);
    app.use('/search', itemsRouter);
    app.use('/danhsachItem', itemsRouter);
    app.use('/items', itemsRouter);

}
module.exports = route;


// function route(app){
    
    // app.get('/news', (req, res) => {
    //     // console.log(req.query.q);
    //     res.render('news');
    // })
    // =>
    // app.get('/search', (req, res) => {
    //     res.render('search');
    // })

    // app.get('/', (req, res) => {
    //     // console.log(req.query.q);
    //     res.render('home');
    // })
    // app.get('/search', (req, res) => {
    //     // console.log(req.query.q);
    //     res.render('search');
    // })

    // app.post('/search', (req, res) => {
    //     console.log(req.body.gender);
    //     res.send('');
    // })
// }
// module.exports = route;

