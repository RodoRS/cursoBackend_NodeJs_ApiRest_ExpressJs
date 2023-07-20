const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {logErrors,errorHandler, boomErrorHandler} = require('./middlewares/error.handler');
const app =  express();
const port = process.env.PORT || 3001;

//middleware para usar json
app.use(express.json());
//middleware para cors
const whitelist = ["http://127.0.0.1:5500","http://localhost:8080","https://myapp.co"];
const options = {
  origin: (origin, callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('No permitido'));
    }
  }
};
app.use(cors(options));

//http://localhost:3001/
app.get('/api', (req, res) => {
  res.json("Hola server express");
});

//http://localhost:3001/nueva-ruta
app.get('/api/nueva-ruta', (req, res) => {
  res.json("Hola nueva ruta");
});

routerApi(app);

//*****middleware de tipo error, se definen despues del routing*****
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=>{
  console.log("corriendo en puerto " + port);
});
