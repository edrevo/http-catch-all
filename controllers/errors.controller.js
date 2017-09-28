
module.exports.coded = (req, res, next) => {
    let code = req.params.code;
    res.status(code).send();
}