FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# set your env before the build process
ENV VUE_APP_BASE_URL=https://portal.ris.beuth-hochschule.de

# build app for production with minification
RUN npm run build

EXPOSE 8086
CMD [ "http-server", "dist", "-a", "0.0.0.0", "-p", "8086" ]


