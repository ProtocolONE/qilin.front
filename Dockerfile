FROM node:10.12-alpine AS node

RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool
RUN npm i webpack webpack-cli -g

WORKDIR /app
COPY package.json yarn.lock /app/
COPY . /app/

RUN yarn
ENV NODE_ENV=production
ENV QILIN_API=https://qilinapi.tst.protocol.one
ENV IMAGINARY_API=https://imaginary.tst.protocol.one
RUN webpack

EXPOSE 80

CMD ["node", "./index.js"]

