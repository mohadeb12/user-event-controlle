const express = require('express');
const connectdb = require('./src/config/connection');
const allroutes = require('./app');
const { PORT } = require('./src/config/envConfig');





const app = express();
app.use(express.json());
connectdb();



app.use('/api',allroutes);

app.listen(PORT, ()=> {
    console.log(`server is running in ${PORT}`)
});