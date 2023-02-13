const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 8000;

const handlebars = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const bodyParser  = require('body-parser')
const cookieParser = require('cookie-parser') 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(cookieParser())

//HTTP logger
app.use(morgan('combined'))

// lấy file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.engine('hbs',handlebars.engine({
    extname : '.hbs',
    helpers : {
        // các function sử dụng
        // hàm sum dùng tính tổng 2 số 
        sum: (a,b) => (a+b),
        date: (d) => {
          return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +d.getFullYear()
        },
        date1: (d) => {
          let date = new Date(d)
          return ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +date.getFullYear()
        },
        checkAdmin:(role)=>{
          if (role==3){
            return true
          }
          return false
        }
    }
  }));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources','views'));

app.use(express.urlencoded({
  extended: true
})); 
app.use(express.json()); 

    // khởi tạo tuyến đường
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
const route = require('./routes');
// const { homedir } = require('os');

route(app);

const db = require('./config/db')
require('dotenv').config()
db.connect();

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})