const express = require('express');
const {faker} = require('@faker-js/faker');
const router = express.Router();


//http://localhost:3001/users
//http://localhost:3001/users?limit=10&offset=200
router.get('/users', (req,res)=>{
  const {limit, offset} = req.query;

  if(limit && offset){
    res.json(
      {
        limit,
        offset
      }
    );
  }else{
    res.send('No hay parametros');
  }

});

module.exports = router;
