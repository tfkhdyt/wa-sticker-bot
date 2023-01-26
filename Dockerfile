FROM node:alpine

WORKDIR /app
RUN chmod 777 /app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN yarn add puppeteer@13.5.0

COPY . .

RUN npm install
RUN npm run build



CMD npm start