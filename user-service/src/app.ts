import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { Express } from 'express'
import router from './routes'

const app: Express = express()
const port = process.env.PORT || '8001'

// middleware
const allowedOrigins = ['http://localhost:3000']
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  })
)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// routes
app.use('/', router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
