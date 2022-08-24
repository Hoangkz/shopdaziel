

class MeController2{

    show(req,res,next){
        res.render('home')
    }
}

module.exports = new MeController2();