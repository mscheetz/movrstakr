"use strict";
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const addressApi = require('./server/routes/address.api');
const movrApi = require('./server/routes/movr.api');
const config = require('./config');

const port = process.env.PORT || 3000;
const dist_dir = 'dist/movrstakr';

const whitelistOrigins = [
    'http://localhost:4200',
    'http://produrl.com'];

const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
}
  
if(typeof config.ENV !== 'undefined' && config.ENV !== 'DEV'){
    app.use(forceSSL());
}

app.use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy-Report-Only',
      "default-src 'self'"
    );
    next();
});
  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.get('*.*', express.static(dist_dir, {maxAge: '1y'}));

const unlimitedCookie = 'tch-cookie-unlimited';
const inviteCode = config.INVITE_CODE;

const redirectHome = async(req, res) => {
    let baseUrl = req.protocol + "://" + req.get('host');

    res.redirect(baseUrl);
};

app.all('/api/v1/address*', addressApi);
app.all('/api/v1/info*', movrApi);

app.get('/', function (req, res) {
    res.status(200).sendFile(`/`, {root: dist_dir});
});

app.all('*', function(req, res) {
    res.status(200).sendFile(`/`, {root: dist_dir});
})

app.set('port', port);

app.listen(port, () => {
    console.log('Server started on port: '+ port +'!')
});
  