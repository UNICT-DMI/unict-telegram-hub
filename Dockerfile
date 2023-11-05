FROM node:lts-alpine
WORKDIR /unict-telegram-hub
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
RUN ["yarn"]
COPY . .
RUN ["yarn", "build"]
ENTRYPOINT ["yarn", "start"]