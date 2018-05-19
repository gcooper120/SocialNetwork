# SocialNetwork

Run with nodemon start.

Should see a few nodemon lines, some SQL queries and finally a line saying:
"Nice! Database looks fine"

If not, a common issue is not connecting the application with the mysql database. In the file app/config/config.json there is a JSON object for the development environment. Inside of this, ensure that the username, password and database name are correct for your environment.
