FROM node:alpine

WORKDIR /app/client

COPY package.json ./

RUN yarn

COPY ./ ./

EXPOSE 3000

CMD ["yarn", "dev"]