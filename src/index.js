require('dotenv').config()
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))