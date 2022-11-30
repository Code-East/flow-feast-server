const express = require('express');
const {
    getOrderList,
    deleteOrder,
    refundOrder,
    getRefundMessage,
    allowRefund,
    rejectRefund,
    completeOrder
} = require('../router_handler/order_handler');

const router = express.Router();

router.post('/get_order_list', getOrderList);
router.delete('/delete_order', deleteOrder);
router.post('/order_refund', refundOrder);
router.get('/get_refund_message', getRefundMessage);
router.get('/allow_refund', allowRefund);
router.get('/reject_refund', rejectRefund);
router.get('/complete_order', completeOrder);

module.exports = router;