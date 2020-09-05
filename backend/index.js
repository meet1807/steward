const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
//User route
const users = require('./routes/users');
//Hotel routes
const hotels = require('./routes/hotels');
//UserType routes
const userTypes = require('./routes/usersTypes');
// Category routes
const category = require('./routes/categories');
// Menu Item routes
const menuItems = require('./routes/menuItems');

const log = require('./logger');

//setting up server using express
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

//Configuration
console.log('Application Name:'+ config.get('name'));
console.log('Mail Server'+ config.get('mail.host'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny')); 
    console.log("Morgan enabled...")   
}
app.use(log);
// Users route
app.use('/api/users',users); 
app.use('/api/hotels',hotels); 
app.use('/api/usertypes',userTypes);
app.use('/api/categories',category);
app.use('/api/menuitems',menuItems);


// PORT on which server is running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running.. on Port ${PORT}`);
});


