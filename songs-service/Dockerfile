FROM node:12-alpine
WORKDIR /urs/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["node", "index.js"]