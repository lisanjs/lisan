FROM node:8.11.4

# Documentation website

WORKDIR /app/website

EXPOSE 8080
COPY ./docs /app/docs
COPY ./website /app/website
RUN yarn install
RUN yarn run build

CMD ["yarn", "serve"]
