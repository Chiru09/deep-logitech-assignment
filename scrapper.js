const https = require('https');

const url = 'https://time.com/';


function getDataFromTimeWebsite() {
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
    let item;
    const data = [];

    while ((item = regex.exec(html)) !== null) {
        const link = "https://time.com" + item[1];
        const title = item[2];
        data.push({ title, link });
    }

    return data;
}

module.exports = {
    getDataFromTime: getDataFromTimeWebsite,
};
