const BuyItem = require('../modals/buyItem');
const User = require('../modals/user');
const Item = require('../modals/Item');

const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');
const { restore } = require('./ItemController');
class buyItemController{

    // [get] /home
    AddCart(req, res, next){
        if(req.body.id_buy){
            BuyItem.updateOne({_id: req.body.id_buy}, {buy:true,status:"Chờ giao hàng"})
            .then((data)=>{
                return res.json({text:"Mua vật phẩm thành công!",bg:"linear-gradient(to right, blue, blue)"})
            })
            .catch((error)=>{
                return res.json({text:"Mua vật phẩm không công!",bg:"linear-gradient(to right, red, red)"})
            })
        }
        else{
            if(req.body.id_user && req.body.id_item && req.body.soluong){
                const newAddCart = new BuyItem(req.body);
                newAddCart.save()
                .then(()=>{
    
                    if(req.body.buy){
                        res.json({text:"Mua vật phẩm thành công!",bg:"linear-gradient(to right, blue, blue)"})
                    }
                    else{
                        res.json({text:"Thêm vật phẩm vào giỏ hàng thành công!",bg:"linear-gradient(to right, green, green)"})
                    }
                
                })
            }
            else{
                res.json({text:"Hãy đăng nhập để thực hiện chức năng này!",bg:"linear-gradient(to right, red, red)"});
            }
        }
    }
    delete(req,res,next){
        BuyItem.deleteOne({_id: req.params.id})
            // redirect chuyển sang trang ....
            .then(()=> res.redirect('back'))
            .catch(next)
    }
    formAction(req,res, next){
        switch(req.body.action){
            //chuyển vào thùng rác
            case "delete":
                BuyItem.deleteMany({_id: {$in: req.body["itemIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            case "huy":
                if(req.body.itemIds){
                    BuyItem.updateOne({_id: {$in: req.body.itemIds}},{status:'Đã huỷ'})
                        .then(()=> res.json({text:'Đơn hàng đã được huỷ',bg:""}))
                        .catch(next)
                    break;
                }
                else{
                    BuyItem.updateOne({_id: {$in: req.body["itemIds[]"]}},{status:'Đã huỷ'})
                        .then(()=> res.json({text:'Đơn hàng đã được huỷ',bg:""}))
                        .catch(next)
                    break;
                }
            case "giaohang":
                if(res.data.role==3){
                    if(req.body.itemIds){
                        BuyItem.updateOne({_id: {$in: req.body.itemIds}},{status:'Giao hàng thành công'})
                            .then(()=> res.json({text:'Giao hàng thành công',bg:""}))
                            .catch(next)
                        break;
                    }
                    else{
                        BuyItem.updateOne({_id: {$in: req.body["itemIds[]"]}},{status:'Giao hàng thành công'})
                            .then(()=> res.json({text:'Giao hàng thành công',bg:""}))
                            .catch(next)
                        break;
                    }
                }
            default:
                res.json(req.body);
        }
    }
    ShopCart(req, res, next){
        //promise
        BuyItem.find({$and:[{id_user:res.data.id} ,{buy:false}]})
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

    OrdersCart(req, res, next){
        //promise
        if (res.data.role==3){
            BuyItem.find({buy:true})
            .then(async(List_buyItems)=>{
                let list_cart =[]
                for(let i=0; i<List_buyItems.length;i++){
                    let cart = await Item.findById(List_buyItems[i].id_item)
                    let user = await User.findById(List_buyItems[i].id_user)
                    list_cart.push({
                        name: cart.name,
                        img:cart.img,
                        soluong: List_buyItems[i].soluong,
                        gia:cart.gia,
                        total:(List_buyItems[i].soluong*cart.gia),
                        id:List_buyItems[i].id,
                        status:List_buyItems[i].status,
                        fullname:user.fullname,
                        tell:user.tell,
                        address:user.address,
                        id_user:user._id,
                    })
                }
                // let list_cart = List_buyItems.map(async function(buyItem){
                    
                // })
                await res.render('items/cart-orders',{
                    data: res.data,
                    list_cart:list_cart
                })
            })
        }
        else{
            BuyItem.find({$and:[{id_user:res.data.id} ,{buy:true}]})
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
                        id:List_buyItems[i].id,
                        status:List_buyItems[i].status
                    })
                }
                // let list_cart = List_buyItems.map(async function(buyItem){
                    
                // })
                await res.render('items/cart-orders',{
                    data: res.data,
                    list_cart:list_cart
                })
            })
        }
    }

    
}

module.exports = new buyItemController();