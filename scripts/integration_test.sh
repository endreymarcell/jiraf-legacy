#!/usr/bin/env bash
if [ -f /.dockerenv ]; then
    npm run integration:docker
else
    docker run -t \
    -v "$(pwd)/src:/jiraf/src" \
    -v "$(pwd)/test:/jiraf/test" \
    -v "$(pwd)/package.json:/jiraf/package.json" \
    -e "TERM=xterm-256color" \
    -e GITHUB_USERNAME \
    -e GITHUB_API_TOKEN \
    endreymarca/jiraf-testing \
    npm run integration:docker
fi
