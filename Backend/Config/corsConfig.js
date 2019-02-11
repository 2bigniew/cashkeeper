const corsConfig = {
    "origin": "http://127.0.0.1:8080",
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST', 'DELETE'],
    "Access-Control-Allow-Credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "Access-Control-Allow-Headers ": [
        'Accept: text/html, application/xhtml+xml, text/plain, application/json',
        'Accept-Charset: utf-8, iso-8859-13',
        'Accept-Encoding: gzip;q=1.0, identity; q=0.5,',
        'Accept-Language: pl, en-us',
        'Content-Type: application/json, text/plain',
        'Content-Language: en, pl'

    ]
}

module.exports = corsConfig;