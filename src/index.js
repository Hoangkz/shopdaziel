const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000;

const handlebars = require('express-handlebars');
const path = require('path');




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

    }
  }));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources','views'));


    // khởi tạo tuyến đường
const route = require('./routes');
// const { homedir } = require('os');
route(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})