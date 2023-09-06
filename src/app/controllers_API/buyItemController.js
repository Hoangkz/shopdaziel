const CartItems = require('../modals/cartItems');
const User = require('../modals/user');
const Item = require('../modals/Item');
const qrcode = require('qrcode');
const axios = require('axios');

const { MongooseToObject, mutipleMongooseToObject, mongooseToGetLish } = require('../../util/mongoose');
class buyItemController {
    AddCartItems(req, res, next) {
        const newCart = new CartItems(req.body)
        const message = req.body.buy ? "Mua vật phẩm thành công" : "Vật phẩm đã được thêm vào giỏ hàng!"
        newCart.save()
            .then(() => res.status(200).json({ message: message }))
            .catch(() => { res.status(500).json({ message: "Lỗi server!" }) })
    }

    CartItems(req, res, next) {
        const id_user = res?.data?.data?._id
        let page = (parseInt(req.query.page) - 1) || 0;
        let pageSize = 6
        Promise.all([CartItems.find({ user_id: id_user, buy: false })
            .populate({ path: 'user_id', select: '-password' })
            .populate("item_id")
            .skip(pageSize * page)
            .limit(pageSize)
            .sort({ updatedAt: -1 }),
        CartItems.find({ user_id: id_user, buy: false }).countDocuments()])
            .then(([data, total]) => {
                res.status(200).json({
                    cartItem: mutipleMongooseToObject(data),
                    message: "Danh sách vật phẩm trong giỏ hàng!",
                    pageLength: (Math.ceil((total) / pageSize)),
                    currentPage: (page + 1)
                })
            })
            .catch(() => { res.status(500).json({ message: "Lỗi server!" }) })
    }

    CartOrder(req, res, next) {
        const id_user = res?.data?.data?._id
        let page = (parseInt(req.query.page) - 1) || 0;
        let pageSize = 6
        Promise.all([CartItems.find({ user_id: id_user, buy: true }).populate({ path: 'user_id', select: '-password' }).populate("item_id").skip(pageSize * page).limit(pageSize).sort({ updatedAt: -1 }),
        CartItems.find({ user_id: id_user, buy: true }).countDocuments()])
            .then(([data, total]) => {
                res.status(200).json({
                    cartItem: mutipleMongooseToObject(data),
                    message: "Danh sách vật phẩm trong giỏ hàng!",
                    pageLength: (Math.ceil((total) / pageSize)),
                    currentPage: (page + 1)
                })
            })
            .catch(() => { res.status(500).json({ message: "Lỗi server!" }) })
    }
    AdminCartOrder(req, res, next) {

        let page = (parseInt(req.query.page) - 1) || 0;
        let pageSize = 6
        CartItems.find({ buy: true }).populate({ path: 'user_id', select: '-password' }).populate("item_id").sort({ updatedAt: -1 })
        .then((dataCart) => {
            let total = dataCart.length
            const search = req.body.search || ""
            if (search) {
                dataCart = dataCart.filter((data, index) => data.user_id.fullname.toLowerCase().includes(search.toLowerCase()))
                total = dataCart.length
            }
            dataCart = dataCart.filter((data,index) =>index>=page*pageSize&&index<page*pageSize+pageSize)
            res.status(200).json({
                cartItem: mutipleMongooseToObject(dataCart),
                message: "Danh sách vật phẩm trong giỏ hàng!",
                pageLength: (Math.ceil((total) / pageSize)),
                currentPage: (page + 1)
            })
        })
        .catch(() => { res.status(500).json({ message: "Lỗi server!" }) })
    }

    BuysCartItems(req, res, next) {
        const list_id = req.body?.listId?.split(",")
        CartItems.updateMany({ _id: { $in: list_id } }, { buy: true, status: "2" })
            .then((data) => res.status(200).json({ message: "Mua vật phẩm thành công!" }))
            .catch(error => { res.status(500).json({ message: "Lỗi server" }) })
    }

    CancelCartOrder(req, res, next) {
        const list_id = req.body?.listId?.split(",")
        const status = req.body?.status || "3"
        CartItems.updateMany({ _id: { $in: list_id }, buy: true }, { status: status })
            .then((data) => res.status(200).json({ message: "Huỷ mua vật phẩm thành công!" }))
            .catch(error => { res.status(500).json({ message: "Lỗi server" }) })
    }

    ShipCarts(req, res, next) {
        const list_id = req.body?.listId?.split(",")
        CartItems.updateMany({ _id: { $in: list_id }, buy: true }, { status: 4 })
            .then((data) => res.status(200).json({ message: "Đơn hàng đã được giao thành công!" }))
            .catch(error => { res.status(500).json({ message: "Lỗi server" }) })
    }

    DeleteCart(req, res, next) {
        const list_id = req.body?.listId?.split(",")
        CartItems.delete({ _id: { $in: list_id } })
            .then((data) => res.status(200).json({ message: "Xoá khỏi giỏ hàng thành công!" }))
            .catch(error => { res.status(500).json({ message: "Lỗi server" }) })
    }

    async getQRCodeMoMo(req, res, next) {
        // Lấy thông tin giá trị đơn hàng từ yêu cầu
        // const { amount, orderId } = req.query;
        let amount = 12000
        let orderId = "112uwyeusghwew"
        const requestId = Math.random().toString(36).substring(2) + Date.now();

        try {
            // Gọi API MoMo để tạo mã thanh toán
            const response = await axios.post('https://payment.momo.vn/gw_payment/transactionProcessor', {
                partnerCode: 'YOUR_PARTNER_CODE',
                accessKey: 'YOUR_ACCESS_KEY',
                requestId: requestId,
                amount,
                orderId,
                returnUrl: 'YOUR_RETURN_URL',
                notifyUrl: 'YOUR_NOTIFY_URL',
                // extraData: 'YOUR_EXTRA_DATA',
            });

            // Lấy URL thanh toán từ phản hồi API MoMo
            const { payUrl } = response.data;

            // Tạo mã QR code từ URL thanh toán
            console.log("vao day")
            const qrCode = await qrcode.toDataURL(payUrl);

            // Trả về mã QR code cho khách hàng
            res.send(`<img src="${qrCode}" alt="MoMo QR Code" />`);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    async getQRCodeBIDV(req, res, next) {
        let amount = 12000
        let orderId = "112uwyeusghwew"

        try {
            // Gọi API BIDV để tạo mã thanh toán
            // Thực hiện các bước cần thiết theo tài liệu hướng dẫn của BIDV
        
            // Tạo mã QR code từ thông tin thanh toán
            const qrCode = await qrcode.toDataURL(paymentInfo);
        
            // Trả về mã QR code cho khách hàng
            res.send(`<img src="${qrCode}" alt="BIDV QR Code" />`);
          } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
          }
    }
}

module.exports = new buyItemController();