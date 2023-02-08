FROM node:19-alpine AS frontend

LABEL maintainer="khoanguyen khoanguyen@saritasa.com" \
    version="Beta" \
    description="Docker image practice."

ENV APP_HOME=/app/ui/

WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN npm i

EXPOSE 3000

CMD npm start