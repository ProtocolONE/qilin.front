FROM node:10.12-alpine AS node

RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool
RUN npm i webpack webpack-cli -g

WORKDIR /application
COPY package.json yarn.lock /application/
COPY . /application/
COPY ./public/*.* ./build/

RUN yarn

ENV NODE_ENV=production
RUN webpack

EXPOSE 8080

CMD ["node", "./index.js"]

