require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app  = express();

const { router } = require('./routes/api');

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5050;

async function startApp() {
    try {
        await mongoose.connect(process.env.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        app.listen(PORT, () => {
            console.log('App Started on port:', 5050);
        });
    } catch (e) {
        console.log('Произошла ошибка при запуске приложения:', e.message);
        process.exit(1);
    }
}

startApp();