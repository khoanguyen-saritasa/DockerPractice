FROM node:19-alpine AS dependencies
ENV APP_HOME=/app/ui/
WORKDIR ${APP_HOME}
COPY package.json package-lock.json ./
RUN npm i

FROM node:19-alpine AS builder
ENV APP_HOME=/app/ui/
WORKDIR ${APP_HOME}
COPY . .
COPY --from=dependencies ${APP_HOME}node_modules ./node_modules
EXPOSE 3000
CMD npm start