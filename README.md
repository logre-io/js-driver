# Logre.IO JS Driver
JS driver to send logs to [Logre.IO](https://logre.io).

[![Twitter Follow](https://img.shields.io/twitter/follow/logreio.svg?style=social)](https://twitter.com/logreio)

## Installation
```bash
$ npm install logreio
# or
$ yarn add logreio
```

## Quick start
```javascript
import LogreIOClient from 'logreio'
// or
const LogreIOClient = require('logreio').default
const logger = new LogreIOClient({
  id: '266544239593512423',
  key: '******'
})
```

## Usage
```javascript
logger.info('Info message!')
logger.info({
  message: 'Info message!',
  host: 'myapp.com',
  ...otherInfos
})
```

### Available severities
You can you some severities to add urgency meaning to your logs. The available severities are:
- Debug `logger.debug()`
- Info `logger.info()`
- Warning `logger.warning()`
- Error `logger.error()`
- Fatal `logger.fatal()`
