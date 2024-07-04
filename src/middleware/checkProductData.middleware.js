export const checkProductData = async (req, res, next ) =>{
    try {
    const {title, description, code, price, stock, category, thumbnails} = req.body;
    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails 
    }  
    //Verify the product has all the properties
    if(Object.values(newProduct).includes(undefined)){
        return  res.status(400).json({status: "error", msg:"Todos los campos son obligatorios"});
    }
    next();
} catch (error) {
    console.log(error)
    res.status(500).json({status: "error", msg:"Error iterno del servidor"});
}
}
// module.exports = {checkProductData}
