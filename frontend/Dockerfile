FROM node:22-alpine as build

WORKDIR /app
COPY . .
ENV VITE_REACT_APP_API_URL=http://localhost:3000
ENV VITE_TIMEZONE=America/Sao_Paulo
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]