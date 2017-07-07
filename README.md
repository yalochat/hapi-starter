# Hapi Starter

Hapi Starte is a Hapi.js project template with inclues standard api projects such build automation, routes, unit testing and configuration.

## Prerequisites

- Install [NVM](https://github.com/creationix/nvm#installation)

## Installation

Clone via SSH

```bash
git clone git@github.com:yalochat/hapi-starter.git <my-awesome-project-name>
git remote set-url origin <my-own-repository>
```

## Getting Started

- Install Node.js with NVM

  ```bash
  nvm install
  ```
 
- Install all dependencies with NPM

	```bash
	npm install
	```

- Copy example file environment and set with your own configuration

	```bash
	cp .env.example .env
	```

- Run project:

	**for development**
	```bash
	npm run gulp:serve
	```

	**for production**
	```bash
	npm start
	```

## Unit tests

The project template uses [Jest] from Facebook. Check the test folder

Run the tests with the following command:

```bash
npm test
```

## Configuration Files

- **.env**

Contains configuration variables that change across enviroments such, resource handles, services, databases. Variables will be attached to process.env as normally happens with enviroment variables.

Copy example configuration from `.env.example` with `cp .env.example .env`

- **manifests.js**

Contains configuration for hapi server such plugins and connections.

- **config.js**

Contains the applications general configuration using [Confidence](https://github.com/hapijs/confidence)

- **server.js**

Starts configured servers using [Glue](https://github.com/hapijs/glue).

## Build automation

The project template uses [Gulp](http://gulpjs.com/) for build automation. You can define tasks under the build/tasks folder, then you can run them from the command line e.g

```bash
gulp serve
```

---

Created with :heart: by [Yalo](http://yalochat.com)
