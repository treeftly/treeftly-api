FROM node:14.17.5 as build

WORKDIR /app

RUN npm i -g pnpm 

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile -P

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