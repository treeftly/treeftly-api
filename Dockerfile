FROM node:14.17.5 as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile --production

##################################

FROM node:14.17.5-alpine3.14

WORKDIR /app

COPY --from=build /app/node_modules/ ./node_modules

COPY .sequelizerc ./
COPY config/ ./config
COPY migrations/ ./migrations
COPY public/ ./public
COPY src/ ./src
COPY scripts/run.sh ./

CMD [ "./run.sh" ]