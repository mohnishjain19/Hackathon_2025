# Stage 1 - build
FROM node:22 AS build
WORKDIR /app
RUN ls -l
RUN pwd
COPY ./my-project/package.json ./
COPY ./my-project/vite.config.ts ./
COPY ./my-project/index.html ./
COPY ./my-project/src ./src
COPY ./tsconfig*.json ./
COPY ./nginx.conf ./                # include source files
RUN npm install
# COPY Frontend/my-project .
RUN npm run build
RUN pwd
RUN ls -l

# Stage 2 - serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
