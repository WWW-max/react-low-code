FROM node:18-alpine

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

# 全局安装 pnpm
RUN npm install -g pnpm

# 设置 pnpm 镜像源为淘宝源
RUN pnpm config set registry https://registry.npmmirror.com

COPY package*.json ./
COPY pnpm-lock.yaml ./

# 只安装生产环境依赖
RUN pnpm install --prod

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]

