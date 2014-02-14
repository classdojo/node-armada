Armada is a library to help orchestrate node processes. It's the perfect companion to [awsm](/crcn/node-awsm).

### Server Usage

```bash
armada server --config=~/.armada/config.json
```

config:

```javascript
{
  "server": {
    "port": 1337,
    "secret": "secret"
  }
}
```

### Client Usage

```bash
armada client --config=~/.armada/config.json
```

config:

```javascript
{
  "client": {
    "port": 1338,
    "host": "serverhost:8083",
    "packages": "/path/to/client/packages"
  }
}
```


### CLI Usage

```
armada cli
> clients.hello()
client1: hello
client2: hello
```

config:

```javascript
{
  "controller": {
    "host": "serverhost:8083"
  }
}
```




