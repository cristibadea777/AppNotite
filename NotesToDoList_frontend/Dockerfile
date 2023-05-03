FROM node:lts-alpine3.17  
#Creare folder pt aplicatie in container si setare ca director curent
#Echivalentul mkdir app && cd app
WORKDIR /app
#COPY [host] [container]
COPY package.json package-lock.json     ./
#instaleaza toate dependentele din cele doua fisiere json copiate, ca sa nu copiem si fisierul node_modules
RUN npm install
COPY . .
#build
RUN npm run build
#comanda de start aplicatie
ENTRYPOINT npm start

#docker build -t frontend-notestodo .   
#docker run -it -p 3000:3000 frontend-notestodo sh
#sau in git bash
#winpty docker run -it -p 3000:3000 frontend-notestodo sh
#apoi npm start