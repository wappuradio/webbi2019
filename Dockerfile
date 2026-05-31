# temporary mirror from varesa to circumvent dockerhub ratelimit
FROM registry.acl.fi/mirror/node:22 AS build

WORKDIR /app
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# temporary mirror from varesa to circumvent dockerhub ratelimit
FROM registry.acl.fi/mirror/nginx:1.25

COPY --from=build /app/build/ /usr/share/nginx/html
COPY public/manifest.json /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
