var app = require('./app');

app.listen(app.get('port'), function () {
    console.log('server listening on: '+ app.get('port'));
});