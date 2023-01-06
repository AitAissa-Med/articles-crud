const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const articleRouter = require("./routes/articleRoute");
const viewsRouter = require("./routes/viewsRoute");

//connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:admin@myblogapp.pmfbwyx.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Make sure the connection is successful
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established successfully');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});


app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/views', express.static('views'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening in PORT ${PORT}`);
})

app.use('/api/articles', articleRouter);
app.use('/api/', viewsRouter);