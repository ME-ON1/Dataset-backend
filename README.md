# Dataset-backend

Backend for dataset from kaggle to show in the 

### Requirements 

    node >= 12 
    npm >= 6 
    redis
    npx 

    sudo apt install redis // ubuntu distros
    // for arch user we can do this ( for my peeps :D )
    sudo pacman -S redis 


### How to setup local env ? 

    git clone git@github.com:ME-ON1/Dataset-backend.git # SSH 
    or 
    git clone https://github.com/ME-ON1/Dataset-backend.git # HTTPS
    cd Dataset-backend 
    
#### run `redis-server` in other terminal and change port in [caching.js](https://github.com/ME-ON1/Dataset-backend/blob/45586f73fb68b2cdce205a2ad14fa57662894cf7/controller/caching.js#L10) if it't not deafult `6379` in your local env 

### Time to install npm dependencies
     
     npm install --save 
     
### Before starting the server we have to make sure that migration and seeding are done beforehand

    npx sequelize db:migrate:undo:all # making sure you haven't done anything earlier
    npx sequelize db:migrate # migration taking place
    npx sequelize dd:seed:all --debug # for verbose output 
    
### Everything is set let's run the server

    npm run dev 
    
Everything is in its place let's see the served things on - > http://localhost:3000/
