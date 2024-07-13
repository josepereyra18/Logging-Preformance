import productsModel from '../../dao/models/products.model.js'
import cartModel from '../../dao/models/cart.model.js'
import productsService from '../service/productsService.js';
import cartService from '../service/cartsService.js';


export const getProducts = async (req, res) =>{
    try{
        let productos = await productsService.getProducts();
        res.send({result: "success", payload: productos});
    } catch (error){
        console.log(error);
    }
}

export const getProductById = async (req, res) =>{
    const { id } = req.params;
    try{
        let producto = await productsService.getProductById(id);
        res.send({result: "success", payload: producto});
    } catch (error){
        console.log(error);
    }
}

export const createProduct = async (req, res) =>{
    let { title, description, price, code, stock, status, category } = req.body;
    if (!title || !description || !price || !code || !stock || !status || !category){
        res.send({status: error, message: "Faltan datos"});
    }
    let result = await productsService.createProduct({title, description, price, code, stock, status, category});
    res.send ({result: "success", payload: result});
}

export const updateProduct = async (req, res) =>{
    let { id } = req.params;
    let prductModified = req.body;
    if (!prductModified.title || !prductModified.description || !prductModified.price || !prductModified.code || !prductModified.stock || !prductModified.status || !prductModified.category){
        res.send({status: error, message: "Faltan datos"});
    }

    let result = await productsService.updateProduct(id, prductModified);
    res.send({result: "success", payload: result});
}

export const deleteProduct = async (req, res) =>{
    let { id } = req.params;
    // await cartModel.updateMany({ products: {_id : id}}, { $pull: { products: {_id : id} } });
    await cartService.updateMany(id);
    let result = await productsService.deleteProduct(id);
    res.send({result: "success", payload: result});
}