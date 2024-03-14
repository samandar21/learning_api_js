const express=require("express")
const { Server } = require("http")
const path=require("path")

const logger=require("./middleweares/logger")

const app =express()
//Middlewares 
//Loger middleware
// app.use(logger)

// body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/books/",require("./routes/books"))

//papkani static qilish
app.use(express.static(path.join(__dirname,'public')))

const PORT=process.env.PORT ||3000

app.listen(PORT,()=>console.log(`Server running port:${PORT}`))