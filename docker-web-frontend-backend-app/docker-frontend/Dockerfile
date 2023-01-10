FROM node:16
WORKDIR /src
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY /src/index.js /src/index.js
COPY /src/public/pages/index.html /src/public/pages/index.html
COPY /src/public/js/delete.js /src/public/js/delete.js
COPY /src/public/js/search.js /src/public/js/search.js
COPY /src/public/js/send.js /src/public/js/send.js
COPY /src/public/js/services.js /src/public/js/services.js
COPY /src/public/js/snackbar.js /src/public/js/snackbar.js
COPY /src/public/js/update.js /src/public/js/update.js
COPY /src/public/css/dialog.css /src/public/css/dialog.css
COPY /src/public/css/pagination.css /src/public/css/pagination.css
COPY /src/public/css/index.css /src/public/css/index.css
COPY /src/public/css/snackbar.css /src/public/css/snackbar.css
EXPOSE 3000
CMD ["node", "index.js"]
