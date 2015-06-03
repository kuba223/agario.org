var app = require('./app');

var posts = require('./content/posts.js'),
    decription = 'Game where you must increase the size of your own circular cell by engulfing other player’s cells. Notable for simple addictive gameplay';

// create posts array with first paragraph only
var postsPreview = JSON.parse(JSON.stringify(posts));
for (key in postsPreview) {
    postsPreview[key].body = postsPreview[key].body.split(/\<\/p\>/)[0] + '</p>';
}

app.get('/', function(req, res) {
    res.render('home', {
        home_page: true,
        title: 'Agario Extended',
        description: decription
    });
});

app.get('/articles/', function(req, res) {
    res.render('article-list', {
        title: 'About Agario Extended',
        description: 'About Agario Extended Game. ' + decription,
        posts: postsPreview
    });
});

app.get('/articles/:postURL/', function(req, res) {
    if (posts[req.params.postURL] !== undefined) {
        res.render('article', {
            title: 'Agario Extended Articles ' + posts[req.params.postURL].title,
            description: postsPreview[req.params.postURL].body.replace(/(<([^>]+)>)/ig, ""),
            posts: posts[req.params.postURL]
        })
    } else {
        res.status(404).send('This page does not exist. Please, go to the <a href="/">main page</a>.');
    }
});

app.get('/privacy/', function(req, res) {
    res.render('privacy', {
        title: 'Agario Extended Policy',
        description: 'Agario Extended Policy. ' + decription
    });
});

app.get('/game/', function(req, res) {
    res.render('game', {
        title: 'Agario Extended About',
        description: 'Agario Extended About. ' + decription
    });
});

app.get('/extension/', function(req, res) {
    res.render('extension', {
        title: 'Agario Extended Chrome Extension',
        description: 'Agario Extended Chrome Extension' + decription
    });
});

app.get('/*', function(req, res) {
    res.status(404).send('This page does not exist. Please, go to the <a href="/">main page</a>.');
});
