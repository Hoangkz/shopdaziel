const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT ||3000
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')

// const favicon = require('favicon');
// 
const methodOverride = require('method-Override')
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser') 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

//HTTP logger
app.use(morgan('combined'))

// lấy file tĩnh
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname ,'public/favicon.ico')));

//template engine
app.engine('hbs',handlebars.engine({
    extname : '.hbs',
    helpers : {
        // các function sử dụng
        // hàm sum dùng tính tổng 2 số 
        sum: (a,b) => (a+b),
    }
  }));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources','views'));



// post cần có
app.use(express.urlencoded({
  extended: true
})); 
app.use(express.json()); 


// thư viện update database
app.use(methodOverride('_method'))


    // khởi tạo tuyến đường
const route = require('./routes');
// const { homedir } = require('os');
route(app);
// home, search, contact các file chung để vào file site



// app.get('/', (req, res) => {
//   res.render('home');
// })
// GET lấy dữ liệu đính lên url
// app.get('/search', (req, res) => {
//   // console.log(req.query.q);
//   res.render('search');
// })

// POST lấy dữ liệu nhưng không đính lên url
// app.post('/search', (req, res) => {
//   console.log(req.body.gender);
//   res.send('');
// })

// app.get('/news', (req, res) => {
//   // console.log(req.query.q);
//   res.render('news');
// })
// app.set((req,res,next)=>{
//   try {
//       let token = req.cookies.token
//       let idUser = jwt.verify(token,"mk")
//       user.findOne({_id: idUser})
//       .then(data => {
//           if(data){
//               console.log(data);
//               data={
//                         username: data.username,
//                         role: data.role,
//                         avatar: data.avatar,
//                         tell: data.tell,
//                         extname: data.email,
//                     }
//               res.data = data
//               // res.render("home",{
//               //     data:{
//               //         username: data.username,
//               //         role: data.role,
//               //         avatar: data.avatar,
//               //         tell: data.tell,
//               //         extname: data.email,
//               //     }
//               // })            
//           }
//           else{
//               res.render("home")
//           }
//       })
//       .catch(error=>{
//           res.json("sai")
//       })  
//   } catch (error) {
//       res.render("home")
//   }   
// })

const db = require('./config/db')
db.connect();
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})