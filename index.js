const http = require('http');
const scrapper = require('./scrapper')


const server = http.createServer(async (req, res) => {
  if (req.url === '/getTimeStories' && req.method === 'GET') {

    const data = await scrapper.getDataFromTime();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data.slice(-6)));
  } else {

    // Handle other requests with a 404 Not Found response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
