FROM node:14-alpine as base

ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["yarn", "nuxt:dev"]
WORKDIR /app
RUN apk update && \
    apk add git

COPY ./package.json ./yarn.lock /app/
RUN yarn

ADD ./ /app/
RUN yarn nuxt:build
