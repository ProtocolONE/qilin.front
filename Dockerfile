FROM node:10.12-alpine AS node

RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool
RUN npm i webpack webpack-cli -g

WORKDIR /app
COPY package.json  /app/
COPY . /app/

RUN npm i -D
ENV NODE_ENV=production
ENV QILIN_API=https://qilinapi.tst.protocol.one
RUN webpack

FROM nginx:1.15.4

WORKDIR /var/www
COPY --from=node /app/build /app/public /var/www/
#COPY --from=node /app/public /var/www
COPY ./etc/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80