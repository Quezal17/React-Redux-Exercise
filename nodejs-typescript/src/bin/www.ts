import http from "http";
import app from "../app";
import mongoose from 'mongoose';

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
  console.log("Server listening on port " + PORT);
  const mongoUrl = 'mongodb://localhost/provats';
  mongoose.connect(mongoUrl, {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.connection.on('open', () => {
      console.log('MongoDB is ready');
  });
  mongoose.connection.on('error', (err: mongoose.Error) => {
      console.error('MongoDB error connection: ' + err);
  });
});

export default server;
