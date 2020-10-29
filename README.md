# Mirror Graph

## Prerequisites
* Node.js v12
* TypeScript v3.8
* GraphQL v15
* yarn (https://yarnpkg.com/)
* PostgreSQL v12 (https://www.postgresql.org/download/)
* ormconfig.json on project root
* .envrc on project root
* address.json, assets.json, codeIds.json, contracts.json, description.json on project root/data

## Install dependencies
```
$ yarn
```

## Setup process.env (.envrc sample)
```
export SENTRY='<sentry url for graphql server>'
export SENTRY_BOT='<sentry url for bot>'
export SENTRY_COLLECTOR='<sentry url for collector>'
export SERVER_PORT=3858
export ORM='default'
export TERRA_LCD='http://localhost:1317/'
export TERRA_CHAIN_ID='localterra'

export CONTRACT_ID=-1

export POLYGON_API_KEY='<api key>'
export IEX_CLOUD_API_KEY='<api key>'

export KEYSTORE_PATH='./keystore-graph.json'
export KEYSTORE_OWNER_PASSWORD='<password>'
export KEYSTORE_BOT_PASSWORD='<password>'

export START_BLOCK_HEIGHT=0
```

## cli
```
$ yarn cli
Usage: yarn cli [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  create [options]   create gov from json
  update-owner-key   update owner key
  update-bot-key     update bot key
  help [command]     display help for command
```

## Setup wallet keys using cli
```
$ yarn cli update-owner-key
$ yarn cli update-bot-key
```

## Run Collector
```
$ yarn collect
```

## Run Bot
```
$ yarn bot
```

## Run Graph Server
```
$ yarn start
```
