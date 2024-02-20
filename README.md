Here are some instructions to run my NFL odds website:
1. First make sure you have the latest version of node installed. Version 20.11.0 is what I used so anything after that should work too.
2. Change to "react" directory and run npm install to install all needed dependencies (React, Bootstrap, etc.)
3. Now in "rest-api", make sure you have Python and Flask installed. I'm using version 3.10.6 for Python and 2.3.2 of Flask so newer versions should work too.
4. Run "python3 rest-api.py" or "python rest-api.py" to start up the REST API to return data to render on webpage
5. Back in "react", type "npm run dev". This will start up the React page and you should now be able to access it by typing "localhost:5173"
6. The home page of the website should look like this (it starts in light mode by default): ![alt text](https://github.com/ajc-617/NFL-odds-app/blob/main/sample-website-home.png?raw=true)
