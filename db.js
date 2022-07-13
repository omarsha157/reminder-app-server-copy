const mongoose = require('mongoose')

// mongoose.connect('mongodb link', {useNewUrlParser:true})
mongoose.connect('mongodb://localhost:27017/reminder', {useNewUrlParser:true})

const User = mongoose.model('User', {
    uniqueid: String,
    username: String,
    password: String,
    event:[]
})

module.exports = {
    User
}