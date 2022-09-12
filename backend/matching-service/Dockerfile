FROM node:alpine

WORKDIR /app/server/matching

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 8002

CMD ["yarn", "dev"]