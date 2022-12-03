# Facebork

Editor notes:

- ### start with npm start
- ### use npm i to get all dependencies when you clone the repo
- When testing locally, use a .env file modeled after the template to have all necessary variables
- Anything that interacts with mongoDB should go in routes/mongo.js (req.client provides the dbclient)
- If not necessary, don't use the imgur api (don't want to get shut down)
- On mac, use `$> brew services start mongodb` to start local instance of mongoDB (if npm start complains)
- HTML files go in public/html
