const cheerio = require('cheerio');
const fs = require('fs');

let errors = 0, successes = 0;

fs.readFile('page.html', {encoding: 'utf8'}, (err, content) => {
    if (err) return console.log('Could not read file page.html', err);

    const start = new Date().getTime();

    for (let i = 1; i <= 1000; i++) {
        try {
            const $ = cheerio.load(content);
            const value = $('h1.text-tertiary').text();
            successes++;
        }
        catch(err) { 
            console.log('Try caught error:', err);
            errors++;
        }
    }

    const processed = (new Date().getTime() - start) / 1000;

    console.log(`Cheerio processed within ${processed} seconds. Errors: ${errors}. Successes: ${successes}`);
});

