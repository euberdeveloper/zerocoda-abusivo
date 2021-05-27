FROM node:lts-alpine
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run transpile
CMD ["npm", "start"]