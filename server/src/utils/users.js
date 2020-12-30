const users = []

export const addUser = ({ id, username, idUser, room }) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()
  idUser = idUser.trim().toLowerCase()

  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    }
  }

  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  )

  if (existingUser) {
    return {
      error: 'Username is in use!',
    }
  }

  const user = { id, username, idUser, room }
  users.push(user)
  return { user }
}

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

export const getUser = (id) => {
  return users.find((user) => user.id === id)
}

export const getUserAll = () => {
  return users
}

export const getUserInRoom = (room) => {
  room = room.trim()
  return users.filter((user) => user.room === room)
}
