FROM node:14-alpine

ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "yarn", "start" ]
WORKDIR /app/src

COPY src/package.json src/yarn.lock /app/src/
RUN yarn

ADD ./ /app/
RUN cd /app/src && \
    yarn build
