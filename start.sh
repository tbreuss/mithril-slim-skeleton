#!/bin/bash

# start backend in background and store process id
composer start --working-dir=$(pwd)/backend & pids=$!

# start frontend in background and store process id
npm run dev --prefix $(pwd)/frontend & pids+=" $!"

# set up trap and kill processes in case CTRL-C is hit
trap "kill $pids" SIGTERM SIGINT

# block until both processes have finished
wait $pids
