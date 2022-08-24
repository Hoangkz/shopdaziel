

class MeController{

    show(req,res,next){
        res.render('home')
    }
}

module.exports = new MeController();