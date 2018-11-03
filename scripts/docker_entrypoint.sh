#!/usr/bin/env bash
npm run mock:jira
npm run mock:github

exec "$@"
