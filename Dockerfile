FROM node:10

WORKDIR /jiraf
COPY package*.json ./
RUN npm ci

COPY test/assets/config.json /root/.jiraf/config.json
COPY test/assets/hosts /etc/hosts
