const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

const errorMiddleware = require('./middleware/error');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// Route Imports

const user = require('./routes/userRoute');
const transaction = require('./routes/transactionRoute');
const deposit = require('./routes/depositRoute');
const email = require('./routes/emailRoute');
const notice = require('./routes/noticeRoute');
const withdraw = require('./routes/withdrawRoute');
const tickets = require('./routes/ticketRoute');
const company = require('./routes/companyRoute');
const verify = require('./routes/verifyRoute');
const draw = require('./routes/drawRoute');
const convert = require('./routes/convertRoute');
const shareCard = require('./routes/shareCardRoute');
const table = require('./routes/tableRoute');
const family = require('./routes/familyRoute');

app.use('/api/v1', user);
app.use('/api/v1', transaction);
app.use('/api/v1', deposit);
app.use('/api/v1', email);
app.use('/api/v1', notice);
app.use('/api/v1', withdraw);
app.use('/api/v1', tickets);
app.use('/api/v1', company);
app.use('/api/v1', verify);
app.use('/api/v1', draw);
app.use('/api/v1', convert);
app.use('/api/v1', shareCard);
app.use('/api/v1', table);
app.use('/api/v1', family);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

// Middleware for Errors

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });
app.use(errorMiddleware);

module.exports = app;
