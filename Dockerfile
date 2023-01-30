FROM node:16.17.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . /app

RUN yarn build