const {Client} = require("ssh2");
const os = require("os");
const exec = require('child_process').exec;

async function command(cmd, useSudo = true) {
    // TODO: rewrite this mess

    const conn = new Client;
        if (await checkStatus() === true) {
            return new Promise(async (resolve, reject) => {
                let res;
                conn.on('ready', () => {
                    conn.exec((useSudo) ? 'sudo ' + cmd : cmd, {pty: true}, (err, stream) => {
                        if (err) throw err;
                        stream.on('close', (code, signal) => {
                            resolve(res.replace('undefined', ''));
                            conn.end();
                        }).on('data', (data) => {
                            if (data.indexOf(':') >= data.length - 2) stream.write(process.env.PASSWORD + '\n');
                            else {
                                res += data;
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
        } else {
            return {data: {status: "OFFLINE"}};
        }
}

async function checkStatus() {
    return new Promise((resolve, reject) => {
        exec('ping -c 1 ' + ((process.env.IPV6 === undefined) ? process.env.HOST : process.env.IPV6), (error, stdout) => {
            if (error) {
                resolve(false);
                return;
            }
            resolve(true)
        })
    })

}

module.exports = { command }