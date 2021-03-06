FROM node:10.15.1

LABEL MAINTAINER="Yalo <eng@yalochat.com>"

ENV APP_PATH=/code

# Use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json package-lock.json /tmp/
RUN cd /tmp && npm install --production

ADD . ${APP_PATH}

# Add node_modules to public folder
RUN cp -a /tmp/node_modules ${APP_PATH}

WORKDIR ${APP_PATH}

CMD node server.js
