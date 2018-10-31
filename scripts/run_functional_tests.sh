#!/usr/bin/env bash
docker run -t \
    -v "$(pwd)/src:/jiraf/src" \
    -v "$(pwd)/test:/jiraf/test" \
    -e "TERM=xterm-256color" \
    endreymarca/jiraf-testing \
    npm run functional-test
