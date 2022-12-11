const BuyItem = require('../modals/buyItem');
const User = require('../modals/user');
const Item = require('../modals/Item');

const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');
class buyItemController{

    // [get] /home
    AddCart(req, res, next){
        const newAddCart = new BuyItem(req.body);
        newAddCart.save()
        .then(()=>res.json(req.body))
    }
    delete(req,res,next){
        BuyItem.deleteOne({_id: req.params.id})
            // redirect chuyển sang trang ....
            .then(()=> res.redirect('back'))
            .catch(next)
    }
    formAction(req,res, next){
        console.log(req.body);
        switch(req.body.action){
            //chuyển vào thùng rác
            case "delete":
                BuyItem.deleteMany({_id: {$in: req.body["itemIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json(req.body);
        }
    }
    ShopCart(req, res, next){
        //promise
        BuyItem.find({id_user:res.data.id})
        .then(async(List_buyItems)=>{
            let list_cart =[]
            for(let i=0; i<List_buyItems.length;i++){
                let cart = await Item.findById(List_buyItems[i].id_item)
                list_cart.push({
                    name: cart.name,
                    img:cart.img,
                    soluong: List_buyItems[i].soluong,
                    gia:cart.gia,
                    total:(List_buyItems[i].soluong*cart.gia),
                    id:List_buyItems[i].id
                })
            }
            // let list_cart = List_buyItems.map(async function(buyItem){
                
            // })
            await res.render('items/me_cart',{
                data: res.data,
                list_cart:list_cart
            })
        })
    }

    
}

module.exports = new buyItemController();