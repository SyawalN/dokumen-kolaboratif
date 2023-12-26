const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  _id: {
    type: String
  },
  owner: {
    type: String,
    required: true
  },
  data: {
    type: Object
  }
})

module.exports = mongoose.models.documents || mongoose.model('documents', Schema)