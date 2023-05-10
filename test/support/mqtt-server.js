import {createServer} from 'net';
import Aedes from 'aedes';

const port = 61883;

const aedes = new Aedes();
const server = createServer(aedes.handle);

server.listen(port, function () {
  console.log('server started and listening on port ', port);
});
