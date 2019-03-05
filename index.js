const Express = require('express');
const bodyParser = require('body-parser');
const googleTraceAgent = require('@google-cloud/trace-agent');
const googleDebugAgent = require('@google-cloud/debug-agent');
const log = require('./config/log.config');
const dbConfig = require('./config/db.config');

const app = new Express();
const jsonParser = bodyParser.json();
app.use(log.requestLogger);

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const departmentRoute = require('./routes/department.route');

app.use('/user', userRoute);
app.use('/product', jsonParser, productRoute);
app.use('/cart', jsonParser, cartRoute);
app.use('/department', jsonParser, departmentRoute);

app.get('/', (req, res) => {
  res.send('Hey');
});

if (process.env.NODE_ENV === 'production') {
  googleTraceAgent.start();
  googleDebugAgent.start();
}

app.use(log.errorLogger);

// Generic 404 Error
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Generic Error Handler
app.use((err, req, res) => {
  res.status(500).send(err.response || 'Something broke!');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  log.info('App is running');
  if (dbConfig) {
    log.info('DB Connected!!');
  }
});