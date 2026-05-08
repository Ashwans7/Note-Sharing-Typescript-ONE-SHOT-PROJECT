import app from "./src/app.js"
import envConfig from "./src/Config/config.js"
import connectToDatabase from "./src/Config/database.js"

const startServer = async () => {
    await connectToDatabase()
    const port = envConfig.port || 3000

    app.listen(port, () => {
        console.log(`server has started at port ${port}`)
    })
}

startServer()
