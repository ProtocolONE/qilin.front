FROM node:10.12-alpine AS node

RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool
RUN npm i webpack webpack-cli -g

WORKDIR /application
COPY package.json yarn.lock /application/
COPY . /application/

RUN yarn
ENV NODE_ENV=production \
    QILIN_ADMIN_API=https://qilinapi.tst.protocol.one/admin/api/v1 \
    QILIN_API=https://qilinapi.tst.protocol.one/api/v1 \
    IMAGINARY_API=https://imaginary.tst.protocol.one

RUN webpack

COPY ./public/*.* ./build/

EXPOSE 8080

CMD ["node", "./index.js"]

