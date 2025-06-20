const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require("./routes/users"));
app.use('/api/employees', require("./routes/employees"));

app.use('/api/admin', require("./routes/admin"));
app.use('/api/stuff', require("./routes/stuff"));
app.use('/api/storage', require("./routes/storage"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});