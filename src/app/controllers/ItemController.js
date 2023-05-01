
const Item = require('../modals/Item');
const { MongooseToObject, mutipleMongooseToObject, mongooseToGetLish } = require('../../util/mongoose');
const upload = require('../multerController/index');

class ItemController {

    // [get] /items /: slug

    show(req, res, next) {
        // req.query.name
        // req.body.name
        // req.params.slug
        // res.send("Item: "+req.params.id+" "+ Item.findById(req.params.id));
        Item.findOne({ name: req.params.id })
            // res.json(req.params.id)
            .then(item => {
                return res.render('items/show', {
                    item: MongooseToObject(item),
                    data: res.data
                });
            })
            .catch(next)
    }

    showList(req, res, next) {

        let a = req.params.loai;
        let page = (parseInt(req.query.page) - 1) || 0;
        let pageSize = 6
        // res.json(a)
        Item.find({ loai: a }).skip(pageSize * page).limit(pageSize)
            .then(items => {
                Item.countDocuments({ loai: a })
                    .then((total) => {
                        res.render("items/showListItems", {
                            item: mutipleMongooseToObject(items),
                            data: res.data,
                            pageLength: (Math.ceil((total) / pageSize)),
                            currentPage: (page + 1)
                        })
                    })
            })
            .catch(next)

    }

    //GET /items/store (edit)
    edit(req, res, next) {
        Item.findById(req.params.id)
            .then(item => {

                res.render('items/edit', {
                    item: MongooseToObject(item),
                    data: res.data,
                })

            })
            .catch(next)

    }
    //GET /items/store (create)
    create(req, res, next) {

        return res.render('items/create', {
            data: res.data
        });

    }


    //PUT /items/:id (update)
    update(req, res, next) {
        Item.updateOne({ _id: req.params.id }, req.body)
            // redirect chuyển sang trang ....
            .then(() => res.redirect('/me/stored/items'))
            .catch(next)
    }

    //PATCH /items/:id (restore)
    restore(req, res, next) {
        Item.restore({ _id: req.params.id })
            // redirect chuyển sang trang ....
            .then(() => res.redirect('back'))
            .catch(next)

    }
    //DELETE /items/:id (delete)
    // delete({_id: req.params.id} thêm delete = true vào database của Item cần xoás
    delete(req, res, next) {
        Item.delete({ _id: req.params.id })
            // redirect chuyển sang trang ....
            .then(() => res.redirect('back'))
            .catch(next)
    }

    permanentlyDelete(req, res, next) {
        Item.deleteOne({ _id: req.params.id })
            // redirect chuyển sang trang ....
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //POST /items/create, tạo database    
    store(req, res, next) {
        let {img,...data} = req.body
        const imagePath = req.file ? req.file.path : '';
        data = {img:imagePath,...data}

        const item = new Item(data);
        item.save()
            .then(() => res.redirect('/me/stored/items'))
            .catch(next);
    }


    //POST /items/formAction danh sách lưa chọn thực hiện    
    formAction(req, res, next) {
        switch (req.body.action) {
            //chuyển vào thùng rác
            case "delete":
                Item.delete({ _id: { $in: req.body["itemIds[]"] } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            // Khôi phục
            case "fix":
                Item.restore({ _id: { $in: req.body["itemIds[]"] } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            // xoá vĩnh viễn
            case "permanentlyDelete":
                Item.deleteMany({ _id: { $in: req.body["itemIds[]"] } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json(req.body);
        }
    }

    search(req, res, next) {

        let search = req.query.q.toLowerCase()
        let search2 = search.charAt(0).toUpperCase() + search.slice(1)
        let page = (parseInt(req.query.page) - 1) || 0;
        let pageSize = 6
        Item.find({ $or: [{ name: { $regex: search } }, { name: { $regex: search2 } }] }).skip(pageSize * page).limit(pageSize)
            .then(items => {
                if (search != "") {
                    // return res.json({item: mutipleMongooseToObject(item)});
                    Item.countDocuments({ $or: [{ name: { $regex: search } }, { name: { $regex: search2 } }] })
                        .then((total) => {
                            return res.render("items/search", {
                                item: mutipleMongooseToObject(items),
                                data: res.data,
                                pageLength: (Math.ceil((total) / pageSize)),
                                currentPage: (page + 1),
                                search: search
                            })
                        })
                }
                else {
                    return res.redirect('back')
                }
            })
            .catch(() => res.redirect('back'))
    }

    listItems(req, res, next) {
        Item.find()
            .then(item => {
                return res.json(mongooseToGetLish(item));
                // return res.send(item);
            })
            .catch(() => res.redirect('back'))
    }
}
module.exports = new ItemController();