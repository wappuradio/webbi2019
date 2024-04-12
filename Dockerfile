FROM node:20 AS build

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

FROM nginx:1.25

COPY --from=build /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
