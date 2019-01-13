#!/usr/bin/env bash
urlbase="https://api.github.com/repos/endreymarcell-testing/jiraf-integration-test"
credentials="$GITHUB_USERNAME:$GITHUB_API_TOKEN"

close_pull_requests() {
    curl -s -u "$credentials" "$urlbase/pulls" \
        | jq '.[] | .url' \
        | xargs curl -s -u "$credentials" --request PATCH --data '{"state": "closed"}' >/dev/null
}

delete_test_branches() {
    for branch in $(curl -s -u "$credentials" "$urlbase/branches" \
        | jq '.[] | .name' \
        | grep github-integration-test \
        | tr -d '"'); do \
        curl -s -u "$credentials" -X DELETE "$urlbase/git/refs/heads/$branch"; \
        done
}

close_pull_requests
delete_test_branches
