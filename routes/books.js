const {Router}=require('express')
const router=Router()
const books=require("../books")
const { randomUUID } = require('crypto')
const uuid=require("uuid")

router.get('/',(req,res)=>{
    res.json(books)
})

//Get one book by id
router.get('/:id',(req,res)=>{
    const isExist=books.some(book=>book.id===parseInt(req.params.id))
    if (isExist){
        res.json(books.filter(book=>book.id===parseInt(req.params.id)))
    }else{
        res.status(404).json({mg:`Siz so'ragan ${req.params.id}  idlik kitob topilmadi`})
    }
    
})

router.post('/',(req,res)=>{
    const newBook={
        id:uuid.v4(),
        name:req.body.name,
        author:req.body.author,
        pages:req.body.pages
    }
    if(!req.body.name ||!req.body.pages ||!req.body.author ){
        res.status(400).json({message:`Iltimios hamma ma'lumotlarni to'g'ri kiriting`})
    }
    books.push(newBook)
    res.json(books)
})

router.put('/:id',(req,res)=>{
    const isExist=books.some(book=>book.id===parseInt(req.params.id))
    if (isExist){
        const updateBook=req.body
        books.forEach(book=>{
            if(book.id===parseInt(req.params.id)){
                book.name=updateBook.name ?updateBook.name:book.name
                book.author=updateBook.author?updateBook.author:book.author
                book.pages=updateBook.pages?updateBook.pages:book.pages
            }
            res.json({message:"Kitob ma'lumotlari yangilandi"},book)
        })
    }else{
        res.status(404).json({mg:`Siz so'ragan ${req.params.id}  idlik kitob topilmadi`})
    }
    
})


router.delete('/:id',(req,res)=>{
    const isExist=books.some(book=>book.id===parseInt(req.params.id))
    if (isExist){
        res.json({
            message:"Kitob o'chirib yuborildi",
            books:books.filter(book=>book.id!==parseInt(req.params.id))
        })
    }else{
        res.status(404).json({mg:`Siz so'ragan ${req.params.id}  idlik kitob topilmadi`})
    }
    
})


module.exports=router