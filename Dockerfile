FROM node:12

# set a directory for the app
WORKDIR /app

# copy all the files to the container
# COPY . .

# install dependencies
# RUN npm install

# define the port number the container should expose
# EXPOSE 5000

# run the command
CMD ["node", "./index.js"]