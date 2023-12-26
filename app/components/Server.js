require('dotenv').config()

const connectDB = require('../(database)/db.js')
const Documents = require('../(database)/(schema)/Documents.js')

connectDB()
console.log(process.env.CLIENT_URL)
const io = require('socket.io')(3001, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

const defaultValue = ""

io.on('connection', socket => {
  socket.on("get-document", async (documentId, username) => {
    const document = await findOrCreateDocument(documentId, username)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on('send-changes', (delta, user) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
      console.log("Username: ( " + user + " ), has done changes: ", delta)
    })

    socket.on("save-document", async data => {
      await Documents.findByIdAndUpdate(documentId, { data })
    })
  })

  console.log('connected')
})

async function findOrCreateDocument(id, username) {
  if (id == null || username == null) return

  const document = await Documents.findById(id)
  if (document) return document
  
  const newDocument = new Documents({ _id: id, owner: username, data: defaultValue })
  await newDocument.save()
  return newDocument
}