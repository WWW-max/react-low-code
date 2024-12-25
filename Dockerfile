FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# dev
# CMD ["npm", "start"]

# prod
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# nginx config
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]