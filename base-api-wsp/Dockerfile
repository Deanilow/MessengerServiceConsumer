FROM node:18

WORKDIR /myapp
COPY package.json .
RUN npm install

EXPOSE 3301

COPY . .
CMD npm start