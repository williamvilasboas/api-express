require('dotenv-flow').config({
    path: "env"
});

const app = require('./src/app');


app({})
    .then((message) => {
        console.log(message);
    }).catch(err => {
        console.error(err);
    })