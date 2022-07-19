FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]