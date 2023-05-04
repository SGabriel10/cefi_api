const express= require('express');
const {dbConnection}= require('./database/config');
const cors = require('cors');
require('dotenv').config();
//crear el servidor de express
const app = express();
dbConnection();

//cors
app.use(cors());
//lectura y parseo del body
app.use(express.json());
//
//Directorio publico
app.use(express.static('public'))

//rutas
app.use('/cefi_api/users',require('./routes/user'));
//CRUD categories
app.use('/cefi_api/categories',require('./routes/category'));
//CRUD clients
app.use('/cefi_api/clients',require('./routes/client'));

//CRUD products
app.use('/cefi_api/products',require('./routes/product'));
//CRUD sales
app.use('/cefi_api/sales',require('./routes/sale'));
app.use('/cefi_api/sale_details',require('./routes/saleDetails'));
//Auth
app.use('/cefi_api/auth',require('./routes/auth'));








//escuchar peticiones
app.listen(process.env.PORT,()=> console.log(`servidor corriendo en puerto ${process.env.PORT}`));