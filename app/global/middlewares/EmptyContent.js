

const ResponseTemplate =  require('../../global/templates/response');

let EmptyContent = (req, res, next) => {

    if (req.method === 'POST' && Object.keys(req.body).length === 0) {
        res.json(ResponseTemplate.emptyContent());
    } else {
        next();
    }

}


module.exports =  EmptyContent;