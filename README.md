# Server-Controls-API
Control your Server via a 2nd Server or raspberry PI <br>
(To send commands to the server you need sudo privileges)

## .env Configuration
`HOST` - the IP from the server you want to control <br>
`USER` - the user account for the server login <br>
`PASSWORD` - the password for the server login <br>
`MAC` - the Mac address from the Server, you want to startup

### Example
```dotenv
HOST="192.168.xxx.xxx"
USERNAME="xxx"
PASSWORD="xxx"
MAC="xx:xx:xx:xx:xx:xx"
```

## API
### Ready
#### Admin
`/startup` [POST] <br>
`/shutdown` [POST] <br>

#### General
`/status/uptime` [GET] <br>
`/docker/list` [GET] <br>

### Work in progress

#### Admin
`/docker/stop/$containerID$` [POST] <br>
`/docker/start/$containerID$` [POST] <br>

## TODO
- [ ] Admin Keys
- [ ] SSH keys authentication
