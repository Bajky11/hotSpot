# Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Předáme proměnnou prostředí REACT_APP_API_URL jako build argument
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
 # custom configuration required for React router to work
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
# docker build --no-cache -t friends-fe .
# docker run -p 80:80 --name friends-fe friends-fe
