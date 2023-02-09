FROM node:19-alpine AS dependencies
ENV APP_HOME=/app/api/
WORKDIR ${APP_HOME}
COPY package.json package-lock.json ./
RUN npm i

FROM node:19-alpine AS builder
ENV APP_HOME=/app/api/
WORKDIR ${APP_HOME}
COPY . .
COPY --from=dependencies ${APP_HOME}node_modules ./node_modules
EXPOSE 8000
CMD npm start