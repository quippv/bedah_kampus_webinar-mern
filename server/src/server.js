import express from 'express'
import { Server } from 'http'
import socketIo from 'socket.io'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import {
  addUser,
  removeUser,
  getUserInRoom,
  getUser,
  getUserAll,
} from './utils/users'
import { generateMessage } from './utils/messages'
import Filter from 'bad-words'
import controllerUser from './resources/user/user.controller'
import controllerAdmin from './resources/admin/admin.controller'
import controllerWebinar from './resources/webinar/webinar.controller'
import userRouter from './resources/user/user.router'
import adminRouter from './resources/admin/admin.router'
import webinarRouter from './resources/webinar/webinar.router'
import cartRouter from './resources/cart/cart.router'
import bookmarkRouter from './resources/bookmark/bookmark.router'
import orderRouter from './resources/order/order.router'

export const app = express()
const server = Server(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
})

app.disable('x-powered-by')

app.use(cors())
app.use(json({ extended: true, limit: '30mb' }))
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.post('/signup', controllerUser.signup)
app.post('/signin', controllerUser.signin)
app.get('/webinar', controllerWebinar.getAll)
app.get('/webinar/:id', controllerWebinar.getOne)

app.post('/bd1243/signup', controllerAdmin.signup)
app.post('/bd1243/signin', controllerAdmin.signin)

app.use('/api', controllerUser.protect)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/bookmark', bookmarkRouter)
app.use('/api/order', orderRouter)

app.use('/bd1243/api', controllerAdmin.protect)
app.use('/bd1243/api/admin', adminRouter)
app.use('/bd1243/api/webinar', webinarRouter)

app.get('/webinar/live/:room', (req, res) => {
  res.send({ roomId: req.params.room })
})

io.on('connection', (socket) => {
  console.log('New Websocket Connection')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('attendee', getUserAll())

    socket.emit(
      'message',
      generateMessage('Bedah Kampus', 'admin1233', socket.id, 'Welcome!')
    )
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage(
          'Bedah Kampus',
          'admin1233',
          socket.id,
          `${user.username} has joined`
        )
      )

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profane is not allowed!')
    }

    io.to(user.room).emit(
      'message',
      generateMessage(user.username, user.idUser, socket.id, message)
    )

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage('Bedah Kampus', `${user.username} has left`)
      )
      io.to(user.room).emit({
        room: user.room,
        users: getUserInRoom(user.room),
      })
    }
  })
})

export const start = async () => {
  try {
    await connect()
    server.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (error) {
    console.log(error)
  }
}
