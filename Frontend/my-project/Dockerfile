# Stage 1 - build
FROM node:22 AS build
# WORKDIR /app
RUN ls -l
RUN pwd
COPY package.json .
RUN npm install
COPY Frontend/my-project .
RUN npm run build

# Stage 2 - serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
