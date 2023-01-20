import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import cors from 'cors'

import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as groupRouter } from './routes/groups.js'

import('./config/database.js')

const app = express()

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'build')
  )
)
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/groups', groupRouter)

app.get('/*', function (req, res) {
  res.sendFile(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'build', 'index.html')
  )
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Express is listening!`)
})
