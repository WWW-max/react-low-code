FROM node:18-alpine

WORKDIR /app

# 设置npm镜像源为淘宝源
RUN npm config set registry https://registry.npmmirror.com/

COPY package*.json ./

# 只安装生产环境依赖
RUN npm install --production

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]

