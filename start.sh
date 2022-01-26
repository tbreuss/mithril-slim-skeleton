#!/bin/bash

# start backend in background and store process id
ENVIRONMENT=development php -d variables_order=EGPCS -S localhost:7000 -t backend/public & pids=$!

# start frontend in background and store process id
npm run dev --prefix frontend & pids+=" $!"

# set up trap and kill processes in case CTRL-C is hit
trap "kill $pids" SIGTERM SIGINT

# block until both processes have finished
wait $pids
