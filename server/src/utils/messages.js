export const generateMessage = (username, idUser, id, text) => {
  return {
    idUser,
    username,
    text,
    id,
    createdAt: new Date().getTime(),
  }
}
