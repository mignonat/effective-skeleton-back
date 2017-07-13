# effective-project-skeleton

This project is the backend of an application skeleton, designed to be reusable.
Technical stack is : node js, express, mongodb.

This project run fine with now : https://zeit.co/now.
For testing purpose you can use a free mongodb there : https://mlab.com/welcome/.

Init the project :

    git clone https://github.com/mignonat/effective-skeleton-back

Install global dependencies for production env :

    sudo npm install --global forever //https://www.npmjs.com/package/forever
    sudo npm install --global forever-monitor //https://www.npmjs.com/package/forever-monitor

Download and install app dependencies :

    npm install

Build app :

    npm run build     //prod build. webpack + creation of translation files from .properties to js
    npm run build-dev //same that build but for dev environment

Start app :

    npm run start
    npm run start-dev  //run front app in dev env using nodemon instead of forever

Environment :

    Set your differents environments in the properties files in env/ directories

Update node version :

    sudo npm cache clean -f //(force) clear you npm cache
    sudo npm install -g n //install "n" this might take a while
    sudo n stable //upgrade to lastest version
