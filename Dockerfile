FROM node:10

WORKDIR /jiraf
COPY package*.json ./
RUN npm ci

COPY test/assets/config.json /root/.jiraf/config.json
COPY scripts/docker_entrypoint.sh /docker_entrypoint.sh

ENV ATLASSIAN_USERNAME=mock_atlassian_username \
    ATLASSIAN_API_TOKEN=mock_atlassian_api_token \
    GITHUB_USERNAME=mock_github_username \
    GITHUB_API_TOKEN=mock_github_api_token

RUN echo -e '#!/bin/bash\nnode /jiraf/src/index.js "$@"' > /usr/bin/jiraf && \
    chmod +x /usr/bin/jiraf

ENTRYPOINT ["/docker_entrypoint.sh"]
