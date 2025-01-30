import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { sample_foods } from '../data'
import { FoodModel } from '../models/food.model'

const router = Router()

// connect with MongoDB
router.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		const foodsCount = await FoodModel.countDocuments()
		if (foodsCount > 0) {
			res.send('Seed food is update')
			return
		}
		await FoodModel.create(sample_foods)
		res.send('Seed food is done!')
	})
)

// router.get(
// 	'/',
// 	expressAsyncHandler(async (req, res) => {
// 		const foods = await FoodModel.find()
// 		res.send(foods)
// 	})
// )

router.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const foods = await FoodModel.find()
		res.send(foods)
	})
)

router.get(
	'/search/:searchTerm',
	expressAsyncHandler(async (req, res) => {
		const searchRegex = new RegExp(req.params.searchTerm, 'i')
		const foods = await FoodModel.find({ name: { $regex: searchRegex } })
		res.send(foods)
	})
)

router.get(
	'/tags',
	expressAsyncHandler(async (req, res) => {
		const tags = await FoodModel.aggregate([
			{
				$unwind: '$tags',
			},
			{
				$group: {
					_id: '$tags',
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					name: '$_id',
					count: '$count',
				},
			},
		]).sort({ count: -1 })
		const all = {
			name: 'All',
			count: await FoodModel.countDocuments(),
		}
		tags.unshift(all)
		res.send(tags)
	})
	// unwind - 2 foods 3 tags => 6 foods tags 1
)

router.get(
	'/tag/:tagName',
	expressAsyncHandler(async (req, res) => {
		const foods = await FoodModel.find({ tags: req.params.tagName })
		res.send(foods)
	})
)

router.get(
	'/:foodId',
	expressAsyncHandler(async (req, res) => {
		const food = await FoodModel.findById(req.params.foodId)
		res.send(food)
	})
)

export default router
