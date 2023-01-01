# Create image from unbuntu base.
FROM ubuntu:20.04

# Some information of the app.
LABEL maintainer="khoanguyen khoanguyen@saritasa.com" \
        version="Beta" \
        description="Docker image practice."

# Install necessary packages.
RUN apt update && \
    DEBIAN_FRONTEND=noninteractive apt-get -y install nodejs && \
    DEBIAN_FRONTEND=noninteractive apt-get -y install npm

# Using ENV instead ARG for better run-time application run time
# More information: https://stackoverflow.com/questions/41916386/arg-or-env-which-one-to-use-in-this-case#:~:text=From%20Dockerfile%20reference%3A,to%20the%20value%20.
ENV APP_HOME=/app/

# Create folder called `app`.
RUN mkdir -p $APP_HOME

# Using folder `app` to be workspace.
WORKDIR $APP_HOME

# The first dot represent for all files in the folder.
# Copy all files to `app` folder. 
COPY . $APP_HOME

# Expose to port 8000
EXPOSE 8000

# Start server
CMD npm start