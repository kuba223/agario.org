var app = require('./app'),
    posts = require('./content/posts.js');

var postsPreviews = JSON.parse(JSON.stringify(posts));
for (key in postsPreviews) {
    postsPreviews[key].body = postsPreviews[key].body.split(/\<\/p\>/)[0] + '</p>';
}

app.locals = {
    title: 'Agario Extended',
    description: 'Community website of game where you must increase the size of your own circular cell by engulfing other player’s cells'
}

app.get('/', function(req, res) {
    res.render('home', {
        home: true
    });
});

app.get('/articles/', function(req, res) {
    res.render('article-list', {
        title: 'Articles – ' + app.locals.title,
        description: 'Articles. ' + app.locals.decription,
        posts: postsPreviews
    });
});

app.get('/articles/:postURL/', function(req, res) {
    if (posts[req.params.postURL] !== undefined) {
        res.render('article-single', {
            title: posts[req.params.postURL].title + " - " + app.locals.title,
            description: postsPreviews[req.params.postURL].body.replace(/(<([^>]+)>)/ig, ""),
            posts: posts[req.params.postURL]
        });
    } else {
        res.status(404).send('This page does not exist. Please, go to the <a href="/">main page</a>.');
    }
});

app.get('/privacy/', function(req, res) {
    res.render('privacy', {
        title: 'Privacy Policy – ' + app.locals.title,
        description: 'Privacy Policy. ' + app.locals.decription
    });
});

app.get('/game/', function(req, res) {
    res.render('game', {
        title: 'Game – ' + app.locals.title,
        description: 'Game. ' + app.locals.decription
    });
});
app.get('/extension/', function(req, res) {
    res.redirect(301, '/game/');
});

app.get('/*', function(req, res) {
    res.status(404).send('This page does not exist. Please, go to the <a href="/">main page</a>.');
});
