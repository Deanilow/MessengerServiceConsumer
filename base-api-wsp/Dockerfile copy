FROM node:18-bullseye as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run start  

FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

COPY src/storage/ssl/certificate.crt /etc/nginx/ssl/certificate.crt
COPY src/storage/ssl/ca_bundle.crt /etc/nginx/ssl/ca_bundle.crt
COPY src/storage/ssl/private.key /etc/nginx/ssl/private.key

COPY src/storage/ssl/default-ssl.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
