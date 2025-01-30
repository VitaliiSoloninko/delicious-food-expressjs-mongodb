import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

import cors from 'cors'
import express from 'express'
import { dbConnect } from './configs/database.config'
import foodRouter from './routers/food.router'
import orderRouter from './routers/order.router'
import userRouter from './routers/user.router'
dbConnect()

// cors for redirect localhost server
// localhost: 4200 - Angular
// localhost: 5000 - Express

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/foods', foodRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.use(express.static(path.join('public', 'browser')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'browser', 'index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log('Website served on http://localhost: ' + port)
})
