FROM node:lts-alpine3.17  

#COPY [host] [container]
COPY package.json package-lock.json     ./

#instaleaza toate dependentele din cele doua fisiere json copiate, ca sa nu copiem si fisierul node_modules
RUN npm install

COPY . .

#build
RUN npm run build


#docker build .
#docker build -t frontend-notestodo .    -pt a-i da un nume

#winpty docker run -it -p 3000:3000 frontend-notestodo sh
