const express = require('express');
const {faker} = require('@faker-js/faker');
const router = express.Router();

//http://localhost:3001/categories/1/products/25
router.get('/categories/:categoryId/products/:productId', (req,res)=>{
  const  {categoryId, productId} = req.params;
  res.json(
    {
      categoryId,
      productId
    }
  );
});


module.exports = router;
