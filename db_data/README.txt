This directory contains a dump of the data the original team used.
You'll need to upload it into your local mongo db.

With your mongodb running, type the following:

cd db_data

mongorestore --db curatedb curatedb

This creates a database called 'curatedb' in your mongod server and
uploads the data from the curatedb/ dir into it.  You'll also need
a different environment variable to connect to it:

export CURATES_DB_URI=mongodb://localhost/curatedb

