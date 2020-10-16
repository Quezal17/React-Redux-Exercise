import http from "http";
import app from "../app";

const PORT: number = 5000;
const server = http.createServer(app);
server.listen(PORT);

server.on("error", (error: NodeJS.ErrnoException) => {
    if(error.syscall !== 'listen') {
        throw error;
    }

    switch(error.code) {
        case 'EACCES':
            console.error('Port ' + PORT + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port ' + PORT + ' already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

});

server.on("listening", () => {
  console.log("Server listening on " + PORT);
});

export default server;
