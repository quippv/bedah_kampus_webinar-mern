export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOne({ _id: req.params.id }).lean().exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getOneByUser = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getAll = (model) => async (req, res) => {
  let count = 0

  try {
    const doc = await model
      .find({}, (err, result) => {
        count = result.length
      })
      .lean()

    res.json({ length: count, data: doc })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find({ createdBy: req.user._id }).lean().exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id

  try {
    const doc = await model.create({ ...req.body, createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).send({ error: e })
  }
}

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).send({ error: e })
  }
}

// export const updateOne = (model) => async (req, res) => {
//   try {
//     const updatedDoc = await model
//       .findOneAndUpdate(
//         {
//           createdBy: req.user._id,
//           _id: req.params.id,
//         },
//         req.body,
//         { new: true }
//       )
//       .lean()
//       .exec()

//     if (!updatedDoc) {
//       return res.status(400).end()
//     }

//     res.status(200).json({ data: updatedDoc })
//   } catch (e) {
//     console.error(e)
//     res.status(400).send({ error: e })
//   }
// }

export const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const me = (model) => (req, res) => {
  res.status(200).json({ data: req.user })
}

export const updateMe = (model) => async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates' })
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getAll: getAll(model),
  getOne: getOne(model),
  getOneByUser: getOneByUser(model),
  createOne: createOne(model),
  me: me(model),
  updateMe: updateMe(model),
})
