var express = require('express');
var app = express();
var port = 46000;

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

app.use('/ip', require('./routes/ip'));
app.use('/file', require('./routes/file'));

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;