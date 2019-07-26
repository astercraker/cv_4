var express = require("express");

var exphbs = require("express-handlebars");

var fs = require("fs");
const _ = require("lodash");
const path = require("path");

var users = [];

var app = express();

app.set('views', __dirname+ "/views")
app.engine('.hbs', exphbs({
    layoutsDir: path.join( app.get('views'), 'layouts'),
    partialsDir: path.join( app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


fs.readFile('src/user.json', {encoding: 'utf8'}, function(err,data){
    if(err) throw err

    JSON.parse(data).forEach(user => {
        user.name.full = _.startCase(user.name.first+ ' ' + user.name.last);
        users.push(user);
        //console.log(user);
    });
})


app.get('/', function(req, res){
    res.render('pages/home',{'users': users});
});

app.get(/big.*/, function(req, res, next){
    console.log('SUPER User');
    next();
});

app.get(/.*dog*./, function(req, res, next){
    console.log('Dog User');
    next();
});
/*
app.get('/:user', function(req, res){
    var user = req.params.user;
    res.send(user);
});
*/

app.get("/test", function(req, res){
    res.render('pages/home', {'name': "Sherlyn"})
})

var server = app.listen(5500, function(){
    console.log("Server running at http://localhost:"+ server.address().port);
});