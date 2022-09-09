FROM node:alpine

WORKDIR /app/server/user

COPY package.json ./

RUN yarn

COPY ./ ./

EXPOSE 8001

CMD ["yarn", "dev"]