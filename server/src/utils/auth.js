import jwt from 'jsonwebtoken'
import config from '../config'

export const signup = (model) => async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Please type email and password' })
  }

  const user = new model(req.body)

  console.log(user)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const signin = (model) => async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Please type email and password' })
  }

  try {
    const user = await model.findByCredentials(
      req.body.email,
      req.body.password
    )
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const protect = (model) => async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).end()
  }

  try {
    const token = req.headers.authorization.split('Bearer ')[1]
    if (!token) {
      res.status(401).end()
    }

    const decoded = jwt.verify(token, config.secrets.jwt)
    const user = await model.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })

    if (!user) {
      res.status(401).end()
    }

    req.token = token
    req.user = user

    next()
  } catch (error) {
    res.status(401).send(error)
  }
}

export const signout = (model) => async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    )
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

export const signoutAll = (model) => async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

export const authControllers = (model) => ({
  signup: signup(model),
  signin: signin(model),
  signout: signout(model),
  signoutAll: signoutAll(model),
  protect: protect(model),
})
