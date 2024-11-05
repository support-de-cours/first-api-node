require('dotenv').config();
const http = require('http');
const path = require('path');
const url = require('url');

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
const headers = {'content-type': "application/json"};
const books = require(path.join(__dirname, 'data/books.json'));

const server = http.createServer((request, response) => {

    if (request.method === 'GET') {
        const parsedUrl = url.parse(request.url, true);
        const query = parsedUrl.query;

        // Get book ID
        if (query.id) {
            const results = books.filter( book => book.id == query.id );
            
            if (results.length) {
                response.writeHead(200, headers);
                response.end(JSON.stringify(results[0]));
            } else {
                response.writeHead(404, {'content-type': "text/plain"});
                response.end('{"message":"Oooops, not found"}');
            }
        }

        // No book ID
        else if (request.url === '/') {
            response.writeHead(200, headers);
            response.end(JSON.stringify(books));
        }

        // 404/Not Found
        else {
            response.writeHead(404, {'content-type': "text/plain"});
            response.end('{"message":"Oooops, not found"}');
        }
    }

});

server.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`))