FROM node:20-alpine AS build

WORKDIR /build

COPY yarn.lock package.json tsconfig.json ./

RUN yarn install

COPY src ./src

RUN yarn run build

FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json .
# COPY --from=build /build/yarn.lock .
COPY --from=build /build/tsconfig.json .

EXPOSE 4000

CMD [ "yarn","start" ]
