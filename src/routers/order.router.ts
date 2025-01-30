import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from '../constants/http_status'
import { OrderStatus } from '../constants/order_status'
import auth from '../middlewares/auth.middleware'
import { OrderModel } from '../models/order.model'

const router = Router()
router.use(auth)

router.post(
	'/create',
	expressAsyncHandler(async (req: any, res: any) => {
		const requestOrder = req.body

		if (requestOrder.items.length <= 0) {
			res.status(HTTP_BAD_REQUEST).send('Cart is empty!')
			return
		}

		await OrderModel.deleteOne({
			user: req.user.id,
			status: OrderStatus.NEW,
		})

		const newOrder = new OrderModel({ ...requestOrder, user: req.user.id })
		await newOrder.save()
		res.send(newOrder)
	})
)

router.get(
	'/newOrderForCurrentUser',
	expressAsyncHandler(async (req: any, res) => {
		const order = await getNewOrderOfCurrentUser(req)
		if (order) res.send(order)
		else res.status(HTTP_BAD_REQUEST).send()
	})
)

router.post(
	'/pay',
	expressAsyncHandler(async (req: any, res) => {
		const { paymentId } = req.body
		const order = await getNewOrderOfCurrentUser(req)
		if (!order) {
			res.status(HTTP_BAD_REQUEST).send('Order not found!')
			return
		}
		order.paymentId = paymentId
		order.status = OrderStatus.PAYED
		await order.save()

		res.send(order._id)
	})
)

router.get(
	'/track/:id',
	expressAsyncHandler(async (req: any, res) => {
		const order = await OrderModel.findById(req.params.id)
		res.send(order)
	})
)

export default router

async function getNewOrderOfCurrentUser(req: any) {
	return await OrderModel.findOne({
		user: req.user.id,
		status: OrderStatus.NEW,
	})
}
