FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install -g http-server concurrently

RUN yarn

RUN yarn build

COPY . .

EXPOSE 3000
EXPOSE 4000

CMD ["concurrently","npm:server", "npm:client"]