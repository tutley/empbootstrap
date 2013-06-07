#EMP Bootstrap#
###(NodeJS)/Express/MongoDB/Passport Bootstrap###

This is a bootstrap project that I use whenever I want to spin up a node app with authentication and a database in a very short amount of time. If you like it or have feedback, feel free to [tweet me @tomdotjs](https://twitter.com/tomdotjs)  
It is build with the following stack:

* NodeJS - Hotness
* MongoDB - NoSQL Database
* ExpressJS - Node-based Framework
* Mongoose - MongoDB specific Data Modeling
* Passport - Authentication Middleware (can handle many social logins, configured for local)
* Jade - Server Side Templating
* JQuery - Client Side Javascript Library
* Twitter Bootstrap - Some cool Jquery plugins and styling
* Readable Theme - A particular free theme for Bootstrap, easy to change

I've used other things as well, which you can see in the package.json file.

###Conventions:###
I have a few conventions that I use that I've found helpful - and of course any suggestions are welcomed.

- auth.js - This file contains the passport strategy and any methods needed
- navigation.js - This contains an array of Top-Level links that auto-highlight using a Bootstrap navbar
- database.js - This provides methods for connecting/disconnecting the database
- config.js - This provides application variables such as secrets, api Keys, site name, etc. In a "real" project I add this to .gitignore
- views/template.jade - Once I setup my jade index, I create a template file that explains the blocks available