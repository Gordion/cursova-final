const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  grammar: {
    type: String
  },
  listening: {
    type: String
  },
  reading: {
    type: String
  },
  useOfEnglish: {
    type: String
  },
  vocabulary: {
    type: String
  },
  result: {
    type: String
  },
}, {
    collection: 'users'
  })

module.exports = mongoose.model('User', studentSchema)
