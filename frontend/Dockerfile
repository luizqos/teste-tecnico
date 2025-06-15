FROM node:22-alpine as build

WORKDIR /app
COPY . .
ENV VITE_REACT_APP_API_URL=http://localhost:3000
RUN npm install
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
