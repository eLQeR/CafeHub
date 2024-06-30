FROM node:alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
