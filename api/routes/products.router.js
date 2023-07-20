const express = require('express');
const ProductService = require('./../services/product.service');
const router = express.Router();
const {validatorHandler} = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const service = new ProductService();

//http://localhost:3001/api/v1/products
//http://localhost:3001/api/v1/products?size=50
router.get('/', async(req, res) => {
  const products = await service.find();
  res.json(products);

});

router.get('/filter', async (req,res)=>{
  res.send('Yo soy un filter');
});

//http://localhost:3001/api/v1/products/25
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req,res, next)=>{
    try{
      const  {id} = req.params;

      const product = await service.findOne(id);
      res.json(product);
    }catch(e){
      next(e) //Ejecutar middleware de error
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async(req, res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    }catch(e){
      /*res.status(404).json({
        message: e.message
      });*/
      next(e);
    }
  }
);

router.delete('/:id', async(req, res)=>{
  const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});



module.exports = router;
