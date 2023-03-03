FROM node:18
WORKDIR /usr/src/app/node
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 443