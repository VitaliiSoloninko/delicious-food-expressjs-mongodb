import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import { dbConnect } from './configs/database.config'
import foodRouter from './routers/food.router'
import orderRouter from './routers/order.router'
import userRouter from './routers/user.router'
dbConnect()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/foods', foodRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
	res.send('Foodmine server started successfully!')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log('Website served on http://localhost: ' + port)
})
