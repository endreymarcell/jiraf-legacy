#!/usr/bin/env bash
echo 127.0.0.1  jiraf-testing.atlassian.net >> /etc/hosts
echo 127.0.0.2  github.com >> /etc/hosts
npm run mock:jira
npm run mock:github

exec "$@"
