FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i -g http-server concurrently

RUN npm i

COPY . ./

RUN npm run build

EXPOSE 3000
EXPOSE 4000

CMD ["concurrently","yarn start:server", "yarn start:client"]