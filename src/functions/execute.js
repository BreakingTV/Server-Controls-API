const {Client} = require("ssh2");

async function command(cmd, res) {
    const conn = new Client;
    conn.on('ready', () => {
        conn.exec('sudo ' + cmd, { pty: true }, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('STREAM END');
                conn.end();
            }).on('data', (data) => {
                if (data.indexOf(':') >= data.length - 2) stream.write(process.env.PASSWORD + '\n');
                else console.log('OUTPUT: ' + data)
            });
        })
    }).on('error', err => {
        console.log('CONNECTION ERROR: ' + err);
    }).connect({
        host: process.env.HOST,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    });

}

module.exports = { command }