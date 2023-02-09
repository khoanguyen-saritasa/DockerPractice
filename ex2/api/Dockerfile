# FROM node:19-alpine AS backend

# LABEL maintainer="khoanguyen khoanguyen@saritasa.com" \
#     version="Beta" \
#     description="Docker image practice."

# ENV APP_HOME=/app/api/

# WORKDIR ${APP_HOME}

# COPY . ${APP_HOME}

# RUN npm i

# EXPOSE 8000

# CMD npm start

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