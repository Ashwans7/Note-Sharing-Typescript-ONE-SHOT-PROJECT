import express from 'express'
import globalerrorhandler from '../middlewares/globalErrorHandlers.js'
import noteRoute from '../note/noteRouter.js'
import cors from 'cors'
import envConfig from './Config/config.js'


const app = express()
//cors configuration\
app.use(cors({
    origin : envConfig.frontendurl
}
))


//parse incoming json to handle undefined error
app.use(express.json())
//image public
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./src/uploads'))
app.use('/api/notes',noteRoute)
//error handler
app.use(globalerrorhandler)

export default app