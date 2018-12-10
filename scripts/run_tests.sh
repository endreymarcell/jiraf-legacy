#!/usr/bin/env bash
if [ -f /.dockerenv ]; then
    npm run test:docker "$1"
else
    docker run --rm -t \
    -v "$(pwd)/src:/jiraf/src" \
    -v "$(pwd)/test:/jiraf/test" \
    -v "$(pwd)/package.json:/jiraf/package.json" \
    -v "$(pwd)/.eslintrc.json:/jiraf/.eslintrc.json" \
    -e "TERM=xterm-256color" \
    -e GITHUB_USERNAME \
    -e GITHUB_API_TOKEN \
    endreymarca/jiraf-testing \
    npm run test:docker "$1"
fi
