const { JSDOM } = require("jsdom");
const fs = require('fs');

let errors = 0, successes = 0;

fs.readFile('page.html', {encoding: 'utf8'}, (err, content) => {
    if (err) return console.log('Could not read file page.html', err);

    const start = new Date().getTime();

    for (let i = 1; i <= 1000; i++) {
        let dom;
        try {
            dom = (new JSDOM(content));
            const value = dom.window.document.querySelector('h1').textContent;
            successes++;
            dom.window.close();
        }
        catch(err) { 
            console.log('Try caught error:', err);
            errors++;
            if ((dom || {}).window) dom.window.close();
        }
    }

    const processed = (new Date().getTime() - start) / 1000;

    console.log(`JSDOM processed within ${processed} seconds. Errors: ${errors}. Successes: ${successes}`);
});