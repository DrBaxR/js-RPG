# Description
This is (or rather will be) an RPG made using TypeScript without using any game engine, only libraries such as [Three JS](https://github.com/mrdoob/three.js/) (for rendering stuff) and [Cannon JS](http://www.cannonjs.org) (for physics and stuff like that).

This project will focus more on creating the systems required for an RPG rather than actually making an RPG with said systems. Of course, there will also be a game in the end (but don't expect it to actually be fun to play).

# Getting the Project
Just create a directory somewhere on your disk where you want to put this project, navigate there via terminal and run ```git clone https://github.com/DrBaxR/js-game-engine.git```

# Starting the Project
[Webpack](https://webpack.js.org) is used to run a development server locally on port 8080. You will need Node installed on your PC before doing anything. In case you don't already have it, you can get it [here](](https://nodejs.org/en/)).

First, you'll need to run ```npm install``` to get all the dependencies. After, that you can execute ```npm run start``` to start the development server on ```http://localhost:8080```.

If you only want to get the static files, run ```npm run build``` and after that you'll find them in the ```./dist``` folder.
