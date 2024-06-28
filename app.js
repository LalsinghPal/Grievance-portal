const express =require("express")
const app = express()
const port = 4000
const web =require("./routes/web")
const connectDb = require("./db/connectDb")
const  cookieParser = require('cookie-parser')
const bodyparser = require("body-parser")

//token get
app.use(cookieParser())


//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(bodyparser.json())

//image upload
const fileUpload = require('express-fileupload')
//temptiles uploaders
app.use(fileUpload({useTempFiles:true}))

//connect flash and sessions

const session = require('express-session')
const flash = require('connect-flash')

//message
app.use(session({
    secret:'secret',
    cookie:{maxAge:6000},
    resave: false,
    saveUninitialized:false
}))

app.use(flash())




//connect db
connectDb()




//ejs set html css
app.set('view engine', 'ejs')

//image css link
app.use(express.static('public'))



app.use('/',web)

//server create
app.listen(port, ()=>{
    console.log(`server start localhost:${port}`)
})