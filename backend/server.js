const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();

const url = process.env.db_url;
const port = process.env.port || 4000;

mongoose.connect(url,{ useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true},(err)=>{
    if(err) console.log('Error connecting to the data base', err);
    else{
        app.listen(port,()=>{
            console.log(`Api started on localhost:${port}`);
        });
        console.log('Succesfully connected to data base');
    }
});