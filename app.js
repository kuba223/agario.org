var express = require('express'),
    exphbs = require('express-handlebars'),
    expurl = require('express-url');

var app = module.exports = express();

app.use(expurl.temp);
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

require('./routes');
