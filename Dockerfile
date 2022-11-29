FROM node:lts-alpine3.16

WORKDIR /app

COPY . .

RUN npm i && npm run build

CMD npm run start