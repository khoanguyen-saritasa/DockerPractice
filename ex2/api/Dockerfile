FROM node:16-alpine AS backend

LABEL maintainer="khoanguyen khoanguyen@saritasa.com" \
    version="Beta" \
    description="Docker image practice."

ENV APP_HOME=/app/api/

WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN npm i

EXPOSE 8000

CMD npm start