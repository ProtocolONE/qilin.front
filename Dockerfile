FROM node:10.12-alpine AS node

RUN apk update && apk add --no-cache --update git bash

WORKDIR /application
COPY package.json yarn.lock /application/
COPY . /application/

RUN yarn

ENV NODE_ENV=production \
    QILIN_ADMIN_API=https://qilinapi.tst.protocol.one/admin/api/v1 \
    QILIN_API=https://qilinapi.tst.protocol.one/api/v1 \
    IMAGINARY_API=https://imaginary.tst.protocol.one

EXPOSE 8080

CMD ["node", "./index.js"]
