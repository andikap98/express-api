require('dotenv').config()
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Selamat Datang di API ')
})


app.get('/products', async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products)
})

app.post('/products', async (req, res) => {
    const newProductData = req.body

    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            price: newProductData.price,
            image: newProductData.image

        }
    });
    res.send({
        data: product,
        messsage: "Data berhasil ditambahkan!!"
    })
})

app.delete('/products/:id', async(req, res)=>{
    const productId = req.params.id

    await prisma.product.delete({
        where: {
            id : Number(productId),
        }
    })
    res.send("product deleted")
})


app.put('/products/:id', async(req, res) =>{
    const productId = req.params.id
  
    const productData = req.body
    const existingProduct = await prisma.product.findUnique({
        where:{
            id:Number(productId)
        }
    })
    if(!existingProduct){
        res.status(404).send("Data ditak ditemukan!!")
    }else{
         const product = await prisma.product.update({
        where : {
            id: Number(productId)
        },
        data: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                image: productData.image
            }
        })

        res.send({
            data: product,
            messsage : "Edit Product Success"
        })
    }
   
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))