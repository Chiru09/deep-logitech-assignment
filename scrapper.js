const https = require('https');

const url = 'https://time.com/';


function getDataFromTime() {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {

            // get html content
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                if (response.statusCode === 200) {

                    const articles = extractArticleTitles(data);
                    resolve(articles);
                } else {
                    console.log('Failed to retrieve web page.');
                    reject(new Error('Failed to retrieve web page.'));
                }
            });
        }).on('error', (error) => {
            console.error('Error:', error);
            reject(error);
        });
    });
}

// extract data from html using regex
function extractArticleTitles(html) {
    const regex = /<a\s+href="([^"]+)">\s*<h3[^>]*>([^<]+)<\/h3>/g;
    let match;
    const results = [];

    while ((match = regex.exec(html)) !== null) {
        const link = "https://time.com" + match[1];
        const title = match[2];
        results.push({ title, link });
    }

    return results;
}

module.exports = {
    getDataFromTime,
};
