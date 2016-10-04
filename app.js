var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('appPath', path.join(__dirname, 'dist'));
app.set('staticPath', path.join(__dirname, 'views'));
//   app.use(express.static(app.get('appPath')));
//   app.use(morgan('dev'));
// All other routes should redirect to the index.html
app.use('/', express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'dist')));

app.route('/subscription_details')
    .get(function(req, res) {
        //console.log(req);
        debugger;
        res.status(200).json({
            id: 2,
            plan_name: "basic",
            stripe_plan: "stripe_basic",
            subscription_name: "main",
            num_projects: "2",
            num_spaces: "4",
            num_members: "3",
            price_usd: "29",
            created_at: "2016-09-29 12:21:03",
            updated_at: "2016-09-29 12:21:03",
            active: { status: 0, reason: "payment Cancel", last_date: "5th september" }
        });
    });

app.route('/invoices')
    .get(function(req, res) {
        //console.log(req);
        debugger;
        res.status(200).json({
            message: "Invoice details fetched successfully",
            invoices: [
                { "inv_id": "in_18z4iDJIBlydCa1Ue6yNk7j8", "inv_date": "Sep 29, 2016", "inv_total": "$48.25" },
                { "inv_id": "in_18z3vaJIBlydCa1Uj0ceMV7b", "inv_date": "Sep 29, 2016", "inv_total": "$29.00" }
            ]
        });
    });
app.route('/plans')
    .get(function(req, res) {
        //console.log(req);
        debugger;
        res.status(200).json([{
            id: 3,
            plan_name: "PLan A",
            stripe_plan: "stripe_basic",
            subscription_name: "main",
            num_projects: "2",
            num_spaces: "4",
            num_members: "3",
            price_usd: "29",
            created_at: "2016-09-29 12:21:03",
            updated_at: "2016-09-29 12:21:03",
            active: { status: 0, reason: "payment Cancel", last_date: "5th september" }
        }, {
            id: 3,
            plan_name: "Plan b",
            stripe_plan: "stripe_basic",
            subscription_name: "main",
            num_projects: "2",
            num_spaces: "4",
            num_members: "3",
            price_usd: "29",
            created_at: "2016-09-29 12:21:03",
            updated_at: "2016-09-29 12:21:03",
            active: { status: 0, reason: "payment Cancel", last_date: "5th september" }
        }, {
            id: 3,
            plan_name: "PLan C",
            stripe_plan: "stripe_basic",
            subscription_name: "main",
            num_projects: "2",
            num_spaces: "4",
            num_members: "3",
            price_usd: "29",
        }]);
    });
// app.use('/users', users);

// catch 404 and forward to error handler
app.route('/*')
    .get(function(req, res) {
        console.log('dault');
        res.sendFile(path.resolve(app.get('appPath') + '/index.html'));

    });
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
