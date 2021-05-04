FROM node:14.16.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY *.js ./
COPY default-config.json default-config.json

CMD [ "node", "index.js" ]
