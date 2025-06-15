FROM node:22-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/main.js"]
