FROM node:22 as build

WORKDIR /convozen

COPY package.json yarn.lock /convozen/

RUN yarn

COPY . /convozen/

RUN yarn build

FROM nginx:alpine

COPY --from=build /convozen/build /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
