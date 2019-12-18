const express = require('express');
const cors = require('cors');
const app = express();
const { Browser } = require('../GetUserData');
const port = 3001;

app.use(cors());


const start = () => {
    app.get('/skillevent/create', (req, res) => {
        console.log('working');
        
        let data = req.query.userlist ? res.send(req.query.userlist): res.status(200).send('bad request');
        const userlist = JSON.parse(req.query.userlist);
        console.log(userlist.data);
        
        const scraper = new Browser();

        scraper.start();

        return data;
    });
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

module.exports = { start };