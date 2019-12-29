const express = require('express');
const cors = require('cors');
const app = express();
const { Browser } = require('../GetUserData');
const port = 3001;

app.use(cors());

const start = () => {
    app.get('/skillevent/create', (req, res) => {
        console.log('Request Recieved starting Scrape');
    
        const username = req.query.username;
        console.log(username);
        
        const scraper = new Browser(username);
        let dataUser = scraper.grabSingleUser();
        

        dataUser.then(response => {
            if (response === false) {
                res.status(404).send('Error grabbing user data');
                return;
            }
           res.send(response) 
        })
    });
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}; 

module.exports = { start };