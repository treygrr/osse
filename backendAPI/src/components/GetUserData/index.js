const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


class Browser {
    constructor(username) {
        this.userName = username;
        this.scrapeurl = `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${username}&submit=Search`
        // takes a single user as input and should be set here
    }

    async grabSingleUser() {
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];
    
        const options = {
            args,
            headless: false,
            ignoreHTTPSErrors: true,
            userDataDir: './tmp'
        };

        const browser = await puppeteer.launch({options});

        const page = await browser.newPage();

        await page.goto(this.scrapeurl, { waitUntil: 'networkidle2'});  
       
        const pageBody =  await page.evaluate(()=> document.body.innerHTML);

        const $ = cheerio.load(pageBody);

        const userData = {
            [this.userName]: {
                overall: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(4) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(4) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(4) > td:nth-child(5)').text()
                }, 
                attack: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(5) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(5) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(5) > td:nth-child(5)').text()
                },
                defense: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(6) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(6) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(6) > td:nth-child(5)').text()
                },
                strength: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(7) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(7) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(7) > td:nth-child(5)').text()
                },
                hitpoints: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(8) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(8) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(8) > td:nth-child(5)').text()
                },
                ranged: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(9) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(9) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(9) > td:nth-child(5)').text()
                },
                prayer: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(10) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(10) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(10) > td:nth-child(5)').text()
                },
                Magic: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(11) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(11) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(11) > td:nth-child(5)').text()
                },
                cooking: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(12) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(12) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(12) > td:nth-child(5)').text()
                },
                woodcutting: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(13) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(13) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(13) > td:nth-child(5)').text()
                },
                fletching: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(14) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(14) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(14) > td:nth-child(5)').text()
                },
                fishing: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(15) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(15) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(15) > td:nth-child(5)').text()
                },
                firemaking: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(16) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(16) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(16) > td:nth-child(5)').text()
                },
                crafting: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(17) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(17) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(17) > td:nth-child(5)').text()
                },
                smithing: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(18) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(18) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(18) > td:nth-child(5)').text()
                },
                mining: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(19) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(19) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(19) > td:nth-child(5)').text()
                },
                herblore: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(20) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(20) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(20) > td:nth-child(5)').text()
                },
                agility: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(21) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(21) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(21) > td:nth-child(5)').text()
                },
                thieving: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(22) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(22) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(22) > td:nth-child(5)').text()
                },
                slayer: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(23) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(23) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(23) > td:nth-child(5)').text()
                },
                farming: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(24) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(24) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(24) > td:nth-child(5)').text()
                },
                runecraft: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(25) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(25) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(25) > td:nth-child(5)').text()
                },
                hunter: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(26) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(26) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(26) > td:nth-child(5)').text()
                },
                construction: {
                    rank: $('#contentHiscores > table > tbody > tr:nth-child(27) > td:nth-child(3)').text(),
                    level: $('#contentHiscores > table > tbody > tr:nth-child(27) > td:nth-child(4)').text(),
                    xp: $('#contentHiscores > table > tbody > tr:nth-child(27) > td:nth-child(5)').text()
                }
            }
        }
        console.log(userData);
        await browser.close();
        return userData;
        
    }

}

module.exports = { Browser }