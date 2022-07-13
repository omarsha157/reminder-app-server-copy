const jwt = require('jsonwebtoken')
const db = require('./db')


const register = (username,uniqueid,password) => {

    return db.User.findOne({ uniqueid })
        .then(user => {
            if(user) {
                return {
                    status:false,
                    message:"already registered with this id",
                    statusCode:401
                }
            } else {
                const newUser = new db.User({
                    uniqueid,
                    username,
                    password,
                    event:[]
                })
                newUser.save()
                return {
                    status:true,
                    message:"successfully registered",
                    statusCode:200
                }
            }
        })

}

const login = (uniqueid,password) => {

    return db.User.findOne({ uniqueid,password })
        .then(user => {
            if(user) {
                currentUser = user.username
                currentId = uniqueid
                token = jwt.sign({ currentId:uniqueid }, 'code123')
                return {
                    status:true,
                    message:"login ok",
                    statusCode:200,
                    currentUser,
                    currentId,
                    token
                }
            } else {
                return {
                    status:false,
                    message:"invalid credentials",
                    statusCode:401
                }
            }
        })
}

const addEvent = (uniqueid,eventHead,eventBody) => {

    return db.User.findOne({ uniqueid })
        .then(user => {
            user.event.push({
                heading:eventHead,
                content:eventBody
            })
            user.save()
            return {
                status: true,
                message: eventHead + " added",
                statusCode: 200
            }
        })
}

const viewEvent = (uniqueid) => {

    return db.User.findOne({ uniqueid })
        .then( user => {
            if(Array.isArray(user.event) && user.event.length) {
                return {
                    status: true,
                    statusCode: 200,
                    event: user.event
                }
            } else {
                return {
                    status: false,
                    message: "event empty",
                    statusCode: 401
                }
            }
        })

}

const editEvent = (uniqueid, index) => {
    return db.User.findOne({ uniqueid })
        .then(user => {
            if(Array.isArray(user.event) && user.event.length) {
                return {
                    status: true,
                    statusCode: 200,
                    event: user.event[index]
                }
            } else {
                return {
                    status: false,
                    message: "event empty",
                    statusCode: 401
                }
            }
        })
}

const submitEdit = (uniqueid,index,eventHead,eventBody) => {
    const data = {
        heading:eventHead,
        content:eventBody
    }
    return db.User.findOne({ uniqueid })
        .then(user => {
                user.event.splice(index, 1, data)
                user.save()
                return {
                    status:true,
                    message: "event saved",
                    statusCode: 200,
                }
        })
}

const deleteEvent = (uniqueid, index) => {
    return db.User.findOne({ uniqueid })
        .then( user => {
                user.event.splice(index, 1)
                user.save()
                return {
                    status:true,
                    message: "event deleted",
                    statusCode: 200,
                }
        })
}

const deleteAcc = (uniqueid) => {
    return db.User.deleteOne({ uniqueid })
        .then( user => {
            if(!user) {
                return {
                    status: false,
                    message: "Operation failed",
                    statusCode: 401
                }
            } else {
                return {
                    status: true,
                    message: "Successfully deleted",
                    statusCode: 200,
                }
            }
        })
}

module.exports = {
    register,
    login,
    addEvent,
    viewEvent,
    editEvent,
    submitEdit,
    deleteEvent,
    deleteAcc
}