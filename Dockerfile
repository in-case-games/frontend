FROM node:lts as build
WORKDIR /app
COPY package*.json /app
RUN npm i
COPY . /app
RUN npm run build

FROM nginx:1.25.3
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]