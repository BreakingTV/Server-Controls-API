const {Client} = require("ssh2");

async function command(cmd) {
    const conn = new Client;
    return new Promise((resolve, reject) => {
        let res;
        conn.on('ready', () => {
            conn.exec('sudo ' + cmd, {pty: true}, (err, stream) => {
                if (err) throw err;
                stream.on('close', (code, signal) => {
                    console.log('STREAM END');
                    resolve(res);
                    conn.end();
                }).on('data', (data) => {
                    if (data.indexOf(':') >= data.length - 2) stream.write(process.env.PASSWORD + '\n');
                    else {
                        res += data;
                        console.log('OUTPUT: ' + data)
                    }

                });
            })
        }).on('error', err => {
            console.log('CONNECTION ERROR: ' + err);
        }).connect({
            host: process.env.HOST,
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        });
    });
}

module.exports = { command }