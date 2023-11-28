import express from "express"
import accountRoutes from './src/Routes/account.js'

const app = express()
const port = 3000

app.use(express.json());
app.use(accountRoutes)

app.listen(port, () => {
    console.log("Application running")
})

export default app