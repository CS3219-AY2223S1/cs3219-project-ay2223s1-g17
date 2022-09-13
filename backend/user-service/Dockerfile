FROM node:alpine

WORKDIR /app/server/user

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 8001

CMD ["yarn", "dev"]