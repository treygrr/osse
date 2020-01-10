const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class Browser {
    constructor(username) {
        this.userName = username;
        this.scrapeurl = `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${username}&submit=Search`
    }

    async grabSingleUser() {
        let userData = {
            dataPoints: {
                overall: {
                    rank: 0,
                    level: 0,
                    xp: 0
                }, 
                attack: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                defence: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                strength: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                hitpoints: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                ranged: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                prayer: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                magic: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                cooking: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                woodcutting: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                fletching: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                fishing: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                firemaking: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                crafting: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                smithing: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                mining: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                herblore: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                agility: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                thieving: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                slayer: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                farming: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                runecraft: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                hunter: {
                    rank: 0,
                    level: 0,
                    xp: 0
                },
                construction: {
                    rank: 0,
                    level: 0,
                    xp: 0
                }
            }
        }
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];

        const browser = await puppeteer.launch({headless: true, args: args});

        const page = await browser.newPage();

        await page.goto(this.scrapeurl, { waitUntil: 'load', timeout: 5000 }).catch((error) => {
            console.log(error);
            return false;
        });  
       
        const pageBody =  await page.evaluate(()=> document.body.innerHTML).catch((error)=>{
            console.log('Fetch error');
            console.log(error);
            return false;
        }
        );

        const $ = cheerio.load(pageBody);
        let userExist = $('#contentHiscores > div > b').text();
        if (userExist !== '') {
            await browser.close().then(()=>{
                return userData;
            });
            console.log('Empty userdata');
            return false;
        }

        const addData = (type, element) => {
            userData.dataPoints[type].rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
            userData.dataPoints[type].level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
            userData.dataPoints[type].xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
        }

        const tableSelection = $('#contentHiscores > table > tbody > tr');
        $(tableSelection).each((index, element) => {
            let string = $(element).find('td:nth-child(2) > a').text().trim().toLowerCase();
            switch(string) {
                case 'overall':
                    addData(string, element);
                  break;
                case 'attack':
                    addData(string, element);
                break;
                case 'defence':
                    addData(string, element);
                break;
                case 'strength':
                    addData(string, element);
                break;
                case 'hitpoints':
                    addData(string, element);
                break;
                case 'ranged':
                    addData(string, element);
                break;
                case 'prayer':
                    addData(string, element);
                break;
                case 'magic':
                    addData(string, element);
                break;
                case 'cooking':
                    addData(string, element);
                break;
                case 'woodcutting':
                    addData(string, element);
                break;
                case 'fletching':
                    addData(string, element);
                break;
                case 'fishing':
                    addData(string, element);
                break;
                case 'firemaking':
                    addData(string, element);
                break;
                case 'crafting':
                    addData(string, element);
                break;
                case 'smithing':
                    addData(string, element);
                break;
                case 'mining':
                    addData(string, element);
                break;
                case 'herblore':
                    addData(string, element);
                break;
                case 'agility':
                    addData(string, element);
                break;
                case 'thieving':
                    addData(string, element);
                break;    
                case 'slayer':
                    addData(string, element);
                break;
                case 'farming':
                    addData(string, element);
                break;
                case 'runecraft':
                    addData(string, element);
                break;
                case 'hunter':
                    addData(string, element);
                break;
                case 'construction':
                    addData(string, element);
                break;

                default:
                  
              }

        });
        console.log(userData);
        await browser.close();
        return userData;        
    }

}

module.exports = { Browser } 