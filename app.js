var createError = require('http-errors');
const express = require('express');
const loginRouter = require('./routes/login')
const app = express();
const database = require('./config/database')
const dashboardRouter = require('./routes/dashboard')
const addDataRouter = require('./routes/add')
const deleteDataRouter = require('./routes/delete')
const editDataRouter = require('./routes/edit')

//set view engine
app.set('view engine', 'ejs')
//body parser
app.use(express.urlencoded({ extended: true }))
//css js images
app.use(express.static('public'))

app.use('/admin', deleteDataRouter);

app.use('/admin', loginRouter);
app.use('/admin', dashboardRouter);
app.use('/admin', addDataRouter);
app.use('/admin', editDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
