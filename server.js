const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// add route files
const apiRoutes = require('./routes/apiRoute');
const htmlRoutes = require('./routes/htmlRoute');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// make front end files available 
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// PORT listener 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});