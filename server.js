const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();
const Route = require('./app/routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./app/models');


dotenv.config();
require('dotenv/config');
const port = process.env.APP_PORT;


app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));



db.sequelize.sync();

app.use(Route);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));