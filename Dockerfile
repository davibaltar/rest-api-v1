FROM node:10
WORKDIR /app/rest-api-v1

# copy csproj and restore as distinct layers
RUN apt-get update
RUN apt-get install -y nano
COPY package*.json ./
RUN npm install

#COPY . .
#COPY ./others/file.any ./node_modules/any/lib/

EXPOSE 8088
EXPOSE 8089


CMD ["node", "index.js"]
