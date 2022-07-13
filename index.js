const express = require('express')
const dataService = require('./data.service')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

app.use(cors({ origin:['https://moonlit-fairy-2e73fe.netlify.app','https://omarsha157.github.io/reminder-app/'] })) 

const jwtMiddleware = (req,res,next) => {
    try {
        token = req.headers["access-token"]
        const data = jwt.verify(token, 'code123')
        console.log(data);
        next()
    } catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "please login"
        })
    }
}

app.use(express.json())



app.post('/register', (req,res) => {
    dataService.register(req.body.username,req.body.uniqueid,req.body.password)
        .then( result => { res.status(result.statusCode).json(result) } )
})

app.post('/login', (req,res) => {
    dataService.login(req.body.uniqueid, req.body.password)
        .then( result => { res.status(result.statusCode).json(result) } )
})

app.post('/add', jwtMiddleware, (req,res) => {
    dataService.addEvent(req.body.uniqueid,req.body.eventHead, req.body.eventBody)
        .then( result => { res.status(result.statusCode).json(result) } )
})

app.post('/view', jwtMiddleware, (req,res) => {
    dataService.viewEvent(req.body.uniqueid)
        .then( result => { res.status(result.statusCode).json(result) } )
})

app.post('/editEvent', jwtMiddleware, (req,res) => {
    dataService.editEvent(req.body.uniqueid,req.body.index)
        .then( result => { res.status(result.statusCode).json(result) })
})

app.post('/submitEdit', jwtMiddleware, (req,res) => {
    dataService.submitEdit(req.body.uniqueid,req.body.index,req.body.eventHead,req.body.eventBody)
        .then(result => { res.status(result.statusCode).json(result)})
})

app.post('/deleteEvent', jwtMiddleware, (req,res) => {
    dataService.deleteEvent(req.body.uniqueid,req.body.index)
        .then( result => { res.status(result.statusCode).json(result)})
})

app.delete('/deleteAcc/:uniqueid',jwtMiddleware, (req,res) => {
    dataService.deleteAcc(req.params.uniqueid)
        .then( result => { res.status(result.statusCode).json(result) })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started at ${port}`);
})
// app.listen(3000, () => {
//     console.log("server started at 3000");
// })