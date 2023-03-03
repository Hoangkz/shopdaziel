
const Item = require('../modals/Item');
const User = require('../modals/user');
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
    searchClient(req, res,next) {
        let search =""
        if(req.query.q){
            search = req.query.q.toLowerCase()
        }
        let search2 = (search.charAt(0).toUpperCase() +search.slice(1))
        Item.find({$or:[{name:{$regex: search}},{name:{$regex: search2}}]})
        .then(items => {
            return res.json({
                items: mutipleMongooseToObject(items),
                search:search,
                length:items.length,
                message:'success'
            })  
        })
        .catch(()=> res.json({message:'error'})) 
    }

    List_Items(req,res,next){
        
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 6
        Promise.all([Item.find({}),User.findById(req.body.id)])
            .then(([items,admin]) =>{
                if(admin){
                    let newtotal = items.length
                    const search = req.body.search||""
                    if(search){
                        items = items.filter((data,index) => data.name.toLowerCase().includes(search.toLowerCase()))
                        newtotal = items.length
                    }
                    items = items.filter((data,index) =>index>=page*pageSize&&index<page*pageSize+pageSize)
                    res.status(200).json({
                        items: mutipleMongooseToObject(items),
                        pageLength: (Math.ceil((newtotal)/pageSize)),
                        currentPage:(page+1),
                        message: "Lấy ra danh sách item page" +page+1
                    })
                }
                else{
                    res.status(403).json({message: "Bạn không có quyền truy cập"})
                }
            })
            .catch((error)=>{res.status(500).json({message: "Lỗi server"})});
        
    }
    Create_Items(req,res,next){
        const item = new Item(req.body);
        item.save()
            .then(()=>res.status(200).json({ message:"Thêm sản phẩm thành công!"}))
            .catch(()=>{res.status(500).json({ message:"Lỗi server!"})})
    }

    Update_Items(req,res,next){
        const {id,...rest} =  req.body
        Item.updateOne({_id:id}, rest)
        .then(()=>res.status(200).json({ message:"Update sản phẩm thành công!"}))
        .catch(()=>{res.status(500).json({ message:"Lỗi server!"})})
    }

    async Delete_Items(req, res, next) {
        const list_id = req.body?.listId?.split(",")
        const admin = await User.findById(req.body.id)
        if(admin?.role===3){
            Item.delete({ _id: { $in: list_id } })
                .then((data) => res.status(200).json({ message:"Xoá vật phẩm thành công!"}))
                .catch(error=>{res.status(500).json({ message:"Lỗi server"})})
        }
        else{
            res.status(403).json({ message:"Bạn không có quyền xoá!"})
        }
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