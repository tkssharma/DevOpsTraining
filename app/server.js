const path =  require('path');

console.log(` using ${process.env.NODE_ENV} to run application`);
global.configuration = require(`../config/environments/${process.env.NODE_ENV}`);

const MongoConnect =  require('./mongoose');
const AppRoutes =  require('./routes');
const AppMiddleware =  require('./middleware');
const express =  require('express');
const winston =  require('winston')
const swagger =  require('./swagger');

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
//---------------------------------------------//
// invoke routes, MIddleware, Mongo connect here
new MongoConnect();
new AppMiddleware(app);
new AppRoutes(app, express);
new swagger(app);

//---------------------------------------------//
let server = app.listen(process.env.PORT  || 3001,
    () => {
        const port = process.env.PORT || 3001;
        winston.log('info', `GenNext API running at http://localhost:${port}`)
        console.log('runing...')
    }
);
