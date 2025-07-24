# Stage 1 - build
FROM node:22 AS build
WORKDIR /app
RUN ls -l
COPY Frontend/my-project/package.json .
RUN npm ci
COPY Frontend/my-project .
RUN npm run build

# Stage 2 - serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
