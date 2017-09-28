var c = require('colors');

module.exports.setup = (morgan) => {
    morgan.token('body', (req) => {
        let body = req.body
        if (req.get('content-type') === 'application/json') {
            body = JSON.stringify(req.body);
        }
        return c.green(body);
    });
    morgan.token('status', (req, res) => {
        let status = res.statusCode
        return status >= 500 ? c.red(status)
            : status >= 400 ? c.yellow(status)
            : status >= 300 ? c.cyan(status)
            : status >= 200 ? c.green(status)
            : c.grey(status)
    });
};

module.exports.log = ":method :url :status :body"