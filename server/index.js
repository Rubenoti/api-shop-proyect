const express = require('express');
const cors = require('cors');
const UserRoutes = require("./src/api/user/user.routes");
const ProductRoutes = require("./src/api/products/product.routes");
const { setError } = require('./src/utils/errors');
const { connect } = require('./src/utils/db');
const { configCloudinary } = require('./src/utils/cloudinary');
const documentation = require('./src/utils/documentacion/api.json');
// Port
const PORT = process.env.PORT || 8080;

// Initialize the app
connect();
const app = express();
configCloudinary();
// Api documentation 
app.use('/api', (req, res, next) => {
    return res.json(documentation);
});

// Headers configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// Proxies configuration 
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}));

// Data limit
app.use(express.json({ limit: '5mb' }))

// Uri configuration
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

//Routes
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);

// Error handling
app.use('*', (req, res, next) => {
    return next(setError(404, "Route not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// Api !show
app.disable('x-powered-by');

// Listen
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}, http://localhost:${PORT}`);
});