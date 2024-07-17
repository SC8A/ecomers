puerto = 8080

Post
/api/carts

Crear un carrito con la sgte estructura
id: Number | string, --> Unique for the cart and autogenerative
products: Array<products>

/:cid/product/:pid
Add product to the carts

Get
/api/carts/:cid
Add the specific product in the array of product inside the cart object
Just save the id of the producto and NOT ANYTHING ELSE

products = [
id: id of the product,
quantity: How many products are taken ,
]

Note: If the product already exist in the cart quantity has to increase ¿
