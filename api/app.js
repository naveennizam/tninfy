var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const multer = require('multer')

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const tinify = require("tinify")
tinify.key = 'DsPhJJ8SrjPSZkZ7vZfdcY77XLTc7pNx'


const downloaded = path.join(__dirname + '/../download/');
const upload = multer({ dest: 'uploads/' })

app.post('/profile', upload.fields([{ name: 'file', maxCount: [] }]), function (req, res, next) {


  try {

    for (let index = 0; index < req.files.file.length; index++) {

      let originalname = (req.files.file[index].originalname);

      let file_path = (req.files.file[index].path);

      var source = tinify.fromFile(file_path);
      source.toFile(downloaded + originalname);

    return  res.status(200).send({ response: 'successfully saved in download folder' });


    }

  }

  catch (e) {

   return res.status(500).send({ response: "Error please try again." });

  }

}
);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;