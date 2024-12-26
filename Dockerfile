
# Base image
FROM node:20

COPY . .

WORKDIR /app

COPY . /app
COPY package*.json ./

# To Fix Permissions for Packages
#RUN npm config set unsafe-perm true

# Install app dependencies
RUN npm install

RUN chown -R node /app/node_modules

COPY . .

EXPOSE 2400

USER node
