## Curates.io ##

[![Stories in Ready](https://badge.waffle.io/Next-Mars/curates.png?label=ready&title=Waffle.io Task Board)](https://waffle.io/Next-Mars/curates) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![wercker status](https://app.wercker.com/status/d2f59a61e7aadf3e207733c9f7b0dc9a/s "wercker status")](https://app.wercker.com/project/bykey/d2f59a61e7aadf3e207733c9f7b0dc9a)

Revolutionary way to share collections of web content.

Team
  - Product Owner: Jack Lu (JackTanRoo)
  - Scrum Master: Andrew Brassington (jabbrass)
  - Bo Liu (liubolightning)
  - Daniel Streit (danielstreit)

Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
> Setup the local database and run locally or deploy to an Azure instance and deployment script will run initialization tasks.

## Requirements

- Mysql 2.4.3
- Angular 1.2.23
- Express 4.8.6
- Node 0.10.x

## Development

Run the following command to start the local development environment:
```sh
grunt dev
```
Run the following command to run JsHint and Mocha-test suite:
```sh
grunt test
```

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

####Steps to setup a local MySql database:
1. Install MySQL; do not install with a password
2. Go to MySQL commandline using - 'mysql -u root'
3. From MySQL commandline create database called 'curates'
4. Check connection details in server/dbconfig.js is correct for your particular environment.
   ie. use environmental url, not localhost when deploying.
4. Run 'node server/dbconfig.js';
5. Now your db, table schema are set up!
Refer to [wiki for more detailed information](https://github.com/Next-Mars/curates/wiki/Database-Schema-Summary-%28Work-In-Progress%29).

### Roadmap

View the project roadmap [here](http://github.com/Next-Mars/curates/milestones)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
