FROM node:20-alpine
WORKDIR /entregas
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm i
COPY . .
CMD ["pnpm", "run", "dev"]
