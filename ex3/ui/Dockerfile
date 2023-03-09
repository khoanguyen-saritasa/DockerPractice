
FROM node:19-alpine AS dependencies
ENV APP_HOME=/app/ui/
WORKDIR ${APP_HOME}
COPY package.json package-lock.json ./
RUN npm i

FROM node:19-alpine AS builder
ENV APP_HOME=/app/ui/
ARG VITE_API_URL
WORKDIR ${APP_HOME}
COPY . .
COPY --from=dependencies ${APP_HOME}node_modules ./node_modules
# CMD npm start
RUN VITE_API_URL=$VITE_API_URL npm run build

FROM nginx:1.17-alpine as production-stage
ENV APP_HOME=/app/ui/
WORKDIR ${APP_HOME}
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder ${APP_HOME}build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
