#!/usr/bin/env bash
cd /tmp/github-integration-test
jiraf set GITHUB-1
jiraf branch "github-integration-test-${1}"
git commit --allow-empty -m "automated github integration test"
jiraf pr
