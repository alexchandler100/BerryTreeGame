This repository contains source code for the video game Berry Tree. The game is written in JavaScript using the Phaser 3 framework.

# To play:

Download the [itch.io app](https://itch.io/app) and search for "Berry Tree". Always make sure to upgrade to the most current version before playing.

Note: You must set your monitor refresh rate to 60hz. If it is faster than this, the update function will run twice the normal speed and the game will be almost unplayable (this seems to be an issue with phaser 3).

# To run from source:

clone the repository and run a local host from within the directory:
Open a terminal in the directory and using python2 run the code

```console
python -m SimpleHTTPServer 8910
```

or with python3 you may use

```console
python -m http.server 8910
```

Then go to a web browser and type in: [localhost:8910](http://localhost:8910/).

Change the host number as needed (sometimes source code updates will not show until you change host number). Any 4-digit number will work.

# For the Developer:

To push the build to itch.io, we use the Butler framework. Install [Butler](https://itch.io/docs/butler/installing.html) and add it to your path as described in the link. Once a new build is finalized, to push to itch.io via Butler, call the following from a terminal in the directory containing BerryTreeGame

```console
butler push BerryTreeGame piman01/berry-tree:win-linux-mac-stable
```

from a terminal in the directory which contains the BerryTreeGame_Butler folder.

To add a new item named "new item" to the possible item inventory, open inventory_items.csv in a csv file editor and create a new row with "new item" in the name column and "newitemIcon" in the "all_usable_items_icons" column. Go to globalParamsAndFunctions.js and add a new case to the function useItem for this new item if needed (only in the case that it uses new parameters unused by any existing items). Add a new 100x100 png image item.png to assets/images and load it in lightworld.js by adding this.load.image('newitemIcon', "assets/images/item.png") under the comment //menu items icons. Add any battle animations needed and add new functions to battlescene.js to handle the item use.

To add a new piece of equipment, just enter a new row into equipment.csv, and run the python script convert_csvs_to_jsons.py as described below to convert to json. The item will now show up as a possible battle reward according to the reward probability you assign.

To add a new playable character... (description coming after updating player data management system).

To update json files from csvs run the following from a terminal from the BerryTreeGame directory:

```console
cd python_scripts
```

followed by

```console
python3 convert_csvs_to_jsons.py
```
