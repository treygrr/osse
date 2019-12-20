const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class Browser {
    constructor(username) {
        this.userName = username;
        this.scrapeurl = `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${username}&submit=Search`
        // takes a single user as input and should be set here
    }

    async grabSingleUser() {
        let userData = {
            [this.userName]: {
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
                defense: {
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

        await page.goto(this.scrapeurl, { waitUntil: 'networkidle2'}).catch((error) => {
            console.log(error);
        });  
       
        const pageBody =  await page.evaluate(()=> document.body.innerHTML);

        const $ = cheerio.load(pageBody);
        let userExist = $('#contentHiscores > div > b').text();
        if (userExist !== '') {
            await browser.close().then(()=>{
                return userData;
            });
            console.log('empty user data found woops returning 500 lol')
            return false;
        }
        const tableSelection = $('#contentHiscores > table > tbody > tr');
        $(tableSelection).each((index, element) => {
            let string = $(element).find('td:nth-child(2) > a').text().trim().toLowerCase();
            switch(string) {
                case 'overall':
                    userData[this.userName].overall.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].overall.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].overall.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                  break;
                case 'attack':
                    userData[this.userName].attack.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].attack.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].attack.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'defence':
                    userData[this.userName].defense.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].defense.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].defense.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'strength':
                    userData[this.userName].strength.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].strength.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].strength.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'hitpoints':
                    userData[this.userName].hitpoints.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].hitpoints.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].hitpoints.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'ranged':
                    userData[this.userName].ranged.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].ranged.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].ranged.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'prayer':
                    userData[this.userName].prayer.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].prayer.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].prayer.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'magic':
                    userData[this.userName].magic.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].magic.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].magic.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'cooking':
                    userData[this.userName].cooking.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].cooking.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].cooking.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'woodcutting':
                    userData[this.userName].woodcutting.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].woodcutting.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].woodcutting.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'fletching':
                    userData[this.userName].fletching.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].fletching.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].fletching.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'fishing':
                    userData[this.userName].fishing.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].fishing.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].fishing.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'firemaking':
                    userData[this.userName].firemaking.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].firemaking.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].firemaking.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'crafting':
                    userData[this.userName].crafting.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].crafting.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].crafting.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'smithing':
                    userData[this.userName].smithing.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].smithing.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].smithing.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'mining':
                    userData[this.userName].mining.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].mining.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].mining.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'herblore':
                    userData[this.userName].herblore.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].herblore.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].herblore.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'agility':
                    userData[this.userName].agility.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].agility.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].agility.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'thieving':
                    userData[this.userName].thieving.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].thieving.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].thieving.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;    
                case 'slayer':
                    userData[this.userName].slayer.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].slayer.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].slayer.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'farming':
                    userData[this.userName].farming.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].farming.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].farming.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'runecraft':
                    userData[this.userName].runecraft.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].runecraft.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].runecraft.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'hunter':
                    userData[this.userName].hunter.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].hunter.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].hunter.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
                break;
                case 'construction':
                    userData[this.userName].construction.rank = parseInt($(element).find('td:nth-child(3)').text().replace(/,/g, ''));
                    userData[this.userName].construction.level = parseInt($(element).find('td:nth-child(4)').text().replace(/,/g, ''));
                    userData[this.userName].construction.xp = parseInt($(element).find('td:nth-child(5)').text().replace(/,/g, ''));
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