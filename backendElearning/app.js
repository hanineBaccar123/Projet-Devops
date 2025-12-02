var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

const { connectToMongoDb } = require('./config/db');
const http = require("http");
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRouter');
var coursRouter = require('./routes/CoursRouter');
var CommentaireRouter = require('./routes/CommentaireRouter');
var paiementRouter = require('./routes/PaiementRouter');

var app = express();

/* ===========================
   CORS CONFIGURATION
=========================== */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5371'  // frontend Docker port
  ],
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials',
  credentials: true
}));

// Preflight
app.options('*', cors());

/* ===========================
   EXPRESS MIDDLEWARE
=========================== */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ===========================
   ROUTES
=========================== */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cours', coursRouter);
app.use('/commentaire', CommentaireRouter);
app.use('/p', paiementRouter);

/* ===========================
   ERROR HANDLING
=========================== */
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: res.locals.error
  });
});

/* ===========================
   SERVER START
=========================== */

const PORT = process.env.PORT || 5001;  // FIX: default port
const server = http.createServer(app);

// Listen on 0.0.0.0 → REQUIRED FOR DOCKER
server.listen(PORT, "0.0.0.0", () => {
  connectToMongoDb();
  console.log("🚀 Backend running on port:", PORT);
});
