
const Item = require('../modals/Item');
const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');

class ItemController{

    show(req,res, next){
        Item.findOne({name:req.params.id})
            .then(item => {
                return res.json({
                    item: MongooseToObject(item),
                });
            })
            .catch(next) 
    }
    //danh sách items theo loại
    showList(req,res,next){

        let a = req.params.loai;
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 6
        Item.find({loai:a}).skip(pageSize*page).limit(pageSize)
            .then(items => {
                Item.countDocuments({loai:a})
                .then((total)=>{
                    res.json({
                        items: mutipleMongooseToObject(items),
                        pageLength: (Math.ceil((total)/pageSize)),
                        currentPage:(page+1)
                    })
                })
            })
            .catch(next) 
        
    }
    search(req, res,next) {
        let search =""
        if(req.query.q){
            search = req.query.q.toLowerCase()
        }
        let search2 = (search.charAt(0).toUpperCase() +search.slice(1))
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 6
        Item.find({$or:[{name:{$regex: search}},{name:{$regex: search2}}]}).skip(pageSize*page).limit(pageSize)
        .then(items => {
            if (search != ""){
                Item.countDocuments({$or:[{name:{$regex: search}},{name:{$regex: search2}}]})
                .then((total)=>{
                    return res.json({
                        items: mutipleMongooseToObject(items),
                        pageLength: (Math.ceil((total)/pageSize)),
                        currentPage:(page+1),
                        search:search,
                        message:'success'
                    })
                })
            }
            else{
                return res.json({message:'không tìm thấy sản phẩm'})
            }
        })
        .catch(()=> res.json({message:'error'})) 
    }
    //GET /items/store (edit)
    edit(req,res, next){
        Item.findById(req.params.id)
            .then(item => {

                res.render('items/edit',{
                    item: MongooseToObject(item),
                    data: res.data,
                })
                
            })
            .catch(next)
        
    }
    create(req,res, next){
        
        return res.render('items/create',{
            data: res.data
        });
        
    }
    update(req,res,next){
        Item.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('/me/stored/items'))
            .catch(next)
    }
    
    restore(req,res,next){
        Item.restore({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)

    }
    delete(req,res,next){
        Item.delete({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    permanentlyDelete(req,res,next){
        Item.deleteOne({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
    }
    
    store(req,res, next){
        
        // res.json(req.body);
        // body nhận form từ sever gửi về database
        const item = new Item(req.body);
        item.save()
            .then(()=>res.redirect('/me/stored/items'))
            .catch(next)
        // res.send(req.body.img)

    }

    //POST /items/formAction danh sách lưa chọn thực hiện    
    formAction(req,res, next){
        switch(req.body.action){
            //chuyển vào thùng rác
            case "delete":
                Item.delete({_id: {$in: req.body["itemIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            // Khôi phục
            case "fix":
                Item.restore({_id: {$in: req.body["itemIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            // xoá vĩnh viễn
            case "permanentlyDelete":
                Item.deleteMany({_id: {$in: req.body["itemIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;  
            default:
                res.json(req.body);
        }
    }
    listItems(req, res, next) {
        Item.find()
            .then(item => {
                return res.json(mongooseToGetLish(item));
                // return res.send(item);
            })
            .catch(()=> res.redirect('back'))
    }
}
module.exports = new ItemController();