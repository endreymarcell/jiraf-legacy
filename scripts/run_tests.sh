#!/usr/bin/env bash
if [ -f /.dockerenv ]; then
    npm run test:docker "$1"
else
    docker run -t \
    -v "$(pwd)/src:/jiraf/src" \
    -v "$(pwd)/test:/jiraf/test" \
    -v "$(pwd)/package.json:/jiraf/package.json" \
    -e "TERM=xterm-256color" \
    endreymarca/jiraf-testing \
    npm run test:docker "$1"
fi
