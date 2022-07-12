FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY .env ./
COPY prisma ./prisma/
RUN yarn

COPY . .

RUN yarn build
RUN npx prisma generate

EXPOSE 3334

RUN apk add --no-cache bash

CMD yarn start