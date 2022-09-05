FROM node:14

WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm","run","start"]