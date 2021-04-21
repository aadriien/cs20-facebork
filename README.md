# Facebork

Editor notes:

- When testing locally, use a .env file modeled after the template to have all necessary variables
- Anything that interacts with mongoDB should go in routes/mongo.js (req.client provides the dbclient)
- If not necessary, don't use the imgur api (don't want to get shut down)
- ### start with npm start
- On mac, use `$> brew services start mongodb` to start local instance of mongoDB (if npm start complains)
- HTML files go in public/html
