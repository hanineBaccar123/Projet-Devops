var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


const {connectToMongoDb} = require('./config/db')




const http = require("http")
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRouter')

var coursRouter = require('./routes/CoursRouter')

var CommentaireRouter = require('./routes/CommentaireRouter')
var paiementRouter = require('./routes/PaiementRouter')





var app = express();


app.use(cors({
  origin : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: 'GET , POST , PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials',
  credentials:true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/cours',coursRouter)
app.use('/commentaire',CommentaireRouter)
app.use('/p',paiementRouter)







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
   res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });  // <-- Now you'll see the actual error!
});

const server = http.createServer(app)


server.listen(process.env.Port,()=>{
  connectToMongoDb();
  console.log("app is running on port",process.env.Port);
});


