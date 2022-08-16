FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY .env ./
COPY prisma ./prisma/
RUN yarn

COPY . .

RUN yarn build
RUN chmod 777 prisma
RUN chmod 777 prisma/
RUN chmod 777 node_modules/.prisma/client/package.json
RUN chmod 777 node_modules/.prisma/client
RUN chmod 777 node_modules/.prisma/client/index.d.ts
RUN npx prisma generate

EXPOSE 3335

RUN apk add --no-cache bash

CMD yarn start