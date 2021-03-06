const Express = require('express');
const cluster = require('cluster');
const os = require('os');
const bodyParser = require('body-parser');
const googleTraceAgent = require('@google-cloud/trace-agent');
const googleDebugAgent = require('@google-cloud/debug-agent');
const passport = require('passport');
const compression = require('compression');
const log = require('./config/log.config');
const dbConfig = require('./config/db.config');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const departmentRoute = require('./routes/department.route');
const categoryRoute = require('./routes/category.route');
const attributeRoute = require('./routes/attribute.route');
const cartRoute = require('./routes/cart.route');
require('./config/passport.config')(passport);

if (cluster.isMaster && process.env.NODE_ENV !== 'test') {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  const app = new Express();

  // Login to database and establish connection
  dbConfig.login();

  // Initialize passport
  app.use(passport.initialize());

  // Setup body parser
  const jsonParser = bodyParser.json();
  app.use(jsonParser);

  // Setup request logger. Using winston logger because gcloud supports this
  app.use(log.requestLogger);

  // Setup response payload compression
  app.use(compression());

  // Setup routes
  app.use('/user', userRoute);
  app.use('/product', passport.authenticate('jwt', { session: false }), productRoute);
  app.use('/department', passport.authenticate('jwt', { session: false }), departmentRoute);
  app.use('/category', passport.authenticate('jwt', { session: false }), categoryRoute);
  app.use('/attribute', passport.authenticate('jwt', { session: false }), attributeRoute);
  app.use('/cart', passport.authenticate('jwt', { session: false }), cartRoute);

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
}

cluster.on('exit', (worker) => {
  log.error('Worker is going down!!', worker.id, ' is no more!');
  cluster.fork();
});
