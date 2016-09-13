## firebase_tutorial

### firebase_tutorial  is a tutorial project for EDUONIX Cloud Projects

####  credentials
-- create the file init.js in scripts directory

 `` src="scripts/init.js" ``

-- the add the following code with your api key and attributes form the firebase console  

`` document.addEventListener('DOMContentLoaded', function() { ``   
 ``    console.log("Initialize Firebase");  ``  
  ``   // Initialize Firebase  ``  
  ``   var config = {  ``  
  ``       apiKey: "....  ",  ``  
  ``       authDomain: "---",  ``  
  ``       databaseURL: "https://---,  ``  
  ``       storageBucket: "---",  ``  
  ``   };  ``  
  ``   firebase.initializeApp(config);  ``  
  ``      }, false); ``  


# WARNING

do not commit keys  keep the  `` src="scripts/init.js" `` in the git ignore use the command to check the files that are ignored

 `` git check-ignore **/*  ``

