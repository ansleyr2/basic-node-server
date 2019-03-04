const fs = require('fs');

const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write(`<html>
            <head>
                <title>Enter message</title>
            </head>
            <body>
                <form action="/message" method="POST">
                    <label for="message">Enter a message:</label><br/>
                    <input id="message" type="text" name="message"> 
                    <button type="submit">Send</button>
                </form>
                
            </body>
        </html>`);
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        // Reading data from request
        const body = [];
        req.on('data', (chunk)=>{
            //console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            //fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err)=>{
                // redirect to '/'
                res.setHeader('Location','/');

                // create a new file and store the message in the file
                //fs.writeFileSync('message.txt', 'DUMMY');

                res.statusCode = 302;
                return res.end();
            });

            
        });
    }
};

module.exports = requestHandler;