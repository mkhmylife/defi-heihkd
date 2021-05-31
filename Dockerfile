FROM node:14-alpine

ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "yarn", "nuxt:start" ]
WORKDIR /app/client

COPY client/package.json src/yarn.lock /app/client/
RUN yarn

ADD ./ /app/
RUN cd /app/client && \
    yarn nuxt:build
