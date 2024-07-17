Puerto=8080
endpoints=

Get
/api/products --> Load all products
/api/products/:pid --> Load product by id

Post
/api/products --> Add product
product = {
default
id: number | string,
title: string,
description: string,
code: string,
price: number,
status: Boolen --> True by default,
stock: Number,
category: Number,
thumbnails: links of the product images,
}

Todos los campos son obligatorios, a excepción de thumbnails

put
/api/products/:pid --> modify specific product

Delete
/api/products/:pid --> Delete de product
