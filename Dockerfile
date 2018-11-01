FROM node:10

WORKDIR /jiraf
COPY package*.json ./
RUN npm ci

COPY test/assets/config.json /root/.jiraf/config.json

ENV ATLASSIAN_USERNAME=mock_atlassian_username \
    ATLASSIAN_API_TOKEN=mock_atlassian_api_token \
    GITHUB_USERNAME=mock_github_username \
    GITHUB_API_TOKEN=mock_github_api_token

RUN echo -e '#!/bin/bash\nnode /jiraf/src/index.js "$@"' > /usr/bin/jiraf && \
    chmod +x /usr/bin/jiraf

ENTRYPOINT ["/bin/sh", "-c" , "echo 127.0.0.1  jiraf-testing.atlassian.net >> /etc/hosts && echo 127.0.0.2  github.com >> /etc/hosts && npm run mock:jira && npm run mock:github && exec bash"]
