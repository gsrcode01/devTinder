const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.resolveSrv('_mongodb._tcp.cluster0.vjkhroq.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('Error resolving SRV:', err);
    } else {
        console.log('Successfully resolved SRV:', addresses);
    }
});
