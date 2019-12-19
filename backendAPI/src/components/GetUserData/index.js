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
                Magic: {
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
    
        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
            userDataDir: './tmp'
        };

        const browser = await puppeteer.launch({options});

        const page = await browser.newPage();

        await page.goto(this.scrapeurl, { waitUntil: 'networkidle2'});  
       
        const pageBody =  await page.evaluate(()=> document.body.innerHTML);

        const $ = cheerio.load(pageBody);
        const tableSelection = $('#contentHiscores > table > tbody > tr');
        $(tableSelection).each(function(index, element) {
            let string = $(element).find('td:nth-child(2) > a').text().trim().toLowerCase();
            switch(string) {
                case 'overall':
                    console.log('we found overall');
                  break;
                case 'attack':
                    userData[this.userName].rank = parseInt($(element).find('td:nth-child(3) > a').text());
                    userData[this.userName].level = 1337;
                    userData[this.userName].xp = 1337;
                break;
                case 'defence':
                    console.log('we found defence');
                break;
                case 'strength':
                    console.log('we found strength');
                break;
                case 'hitpoints':
                    console.log('we found hitpoints');
                break;
                case 'ranged':
                    console.log('we found ranged');
                break;
                case 'prayer':
                    console.log('we found prayer');
                break;
                case 'magic':
                    console.log('we found magic');
                break;
                case 'cooking':
                    console.log('we found cooking');
                break;
                case 'woodcutting':
                    console.log('we found woodcutting');
                break;
                case 'fletching':
                    console.log('we found fletching');
                break;
                case 'fishing':
                    console.log('we found fishing');
                break;
                case 'firemaking':
                    console.log('we found firemaking');
                break;
                case 'crafting':
                    console.log('we found crafting');
                break;
                case 'smithing':
                    console.log('we found smithing');
                break;
                case 'mining':
                    console.log('we found mining');
                break;
                case 'herblore':
                    console.log('we found herblore');
                break;
                case 'agility':
                    console.log('we found agility');
                break;
                case 'thieving':
                    console.log('we found thieving');
                break;    
                case 'slayer':
                    console.log('we found slayer');
                break;
                case 'farming':
                    console.log('we found farming');
                break;
                case 'runecraft':
                    console.log('we found runecraft');
                break;
                case 'hunter':
                    console.log('we found hunter');
                break;
                case 'construction':
                    console.log('we found construction');
                break;

                default:
                  return;
              }

        });
        

        
        console.log(userData);
        await browser.close();
        return userData;
        
    }

}

module.exports = { Browser }