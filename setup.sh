#!/bin/bash

# Exit if any subcommand fails
set -e

# install PHP dependencies for backend
composer install --working-dir=$(pwd)/backend

# install PHP dependencies for database
composer install --working-dir=$(pwd)/database

# install NPM dependencies for frontend
npm install --prefix frontend

# setup database
composer db:setup --working-dir=$(pwd)/database
