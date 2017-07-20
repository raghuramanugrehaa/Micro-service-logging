FROM node:boron

# Create app directory
RUN mkdir -p /usr1/src/app
WORKDIR /usr1/src/app

# Install app dependencies
COPY package.json /usr1/src/app/
RUN npm install

# Bundle app source
COPY . /usr1/src/app

EXPOSE 3000
CMD node index.js


