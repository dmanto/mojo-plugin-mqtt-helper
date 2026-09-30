import {createServer} from 'net';
import {Aedes} from 'aedes';

const port = 61883;

const aedes = await Aedes.createBroker();
const server = createServer(aedes.handle);

server.listen(port, function () {
  console.log('server started and listening on port ', port);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close();
    aedes.close(() => process.exit(0));
  });
}
