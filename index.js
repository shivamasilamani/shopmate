const Express = require('express');
const bodyParser = require('body-parser');
const googleTraceAgent = require('@google-cloud/trace-agent');
const googleDebugAgent = require('@google-cloud/debug-agent');
const passport = require('passport');
const session = require('express-session');
const compression = require('compression');
const log = require('./config/log.config');
const config = require('./config.json');
const dbConfig = require('./config/db.config');
const userController = require('./controllers/user.controller');
require('./config/passport.config')(passport);

const app = new Express();

// Login to database and establish connection
dbConfig.login();

// Add and configure session middleware
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Setup body parser
const jsonParser = bodyParser.json();
app.use(jsonParser);

// Setup request logger. Using winston logger because gcloud supports this
app.use(log.requestLogger);

// Setup response payload compression
app.use(compression());

// Setup routes
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const departmentRoute = require('./routes/department.route');
const categoryRoute = require('./routes/category.route');
const attributeRoute = require('./routes/attribute.route');
const cartRoute = require('./routes/cart.route');

app.use('/user', userRoute);
app.use('/product', userController.isLoggedIn, productRoute);
app.use('/department', userController.isLoggedIn, departmentRoute);
app.use('/category', userController.isLoggedIn, categoryRoute);
app.use('/attribute', userController.isLoggedIn, attributeRoute);
app.use('/cart', userController.isLoggedIn, cartRoute);

app.get('/', (req, res) => {
  res.send('App is running...');
});

app.get('/profile', (req, res) => {
  res.status(200);
  res.send(req.session);
});

if (process.env.NODE_ENV === 'production') {
  googleTraceAgent.start();
  googleDebugAgent.start();
}

// Setup error logger. Using winston logger because gcloud supports this
app.use(log.errorLogger);

// Generic 404 Error
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Generic Error Handler
app.use((err, req, res) => {
  res.status(500).send(err.response || 'Something broke!');
});

// Start the app
const port = process.env.PORT || 8000;
app.listen(port, () => {
  log.info('App is running...');
});

// Export app for testing
module.exports = app;
