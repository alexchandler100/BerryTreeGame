const gameState4 = {};
let redisplay = true;
gameState4.colorIndex = {}

var EquipmentMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "EquipmentMenu"
    });
  },
  displayPlayerEquipment: function(x, y, player) {
    if (gameState4.equipped[player]['upper']) {
      gameState4.equipped[player]['upper'].visible = false
    }
    if (gameState4.equipped[player]['lower']) {
      gameState4.equipped[player]['lower'].visible = false
    }
    if (gameState4.equipped[player]['accessory']) {
      gameState4.equipped[player]['accessory'].visible = false
    }
    if (gameState4.equipped[player]['accessory2']) {
      gameState4.equipped[player]['accessory2'].visible = false
    }
    gameState4.equipped[player]['face'] = this.add.image(x, y - this.cellSize + this.gapSize, player.toLowerCase() + 'Face').setDepth(1).setScale(.5);
    gameState4.equipped[player]['upperBackgroundColor'] = this.add.rectangle(x, y, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, playerColors[player]).setDepth(1);
    gameState4.equipped[player]['upperBackground'] = this.add.rectangle(x, y, this.cellSize, this.cellSize, 0x333333).setDepth(1);
    gameState4.equipped[player]['lowerBackgroundColor'] = this.add.rectangle(x, y + this.cellSize + this.gapSize, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, playerColors[player]).setDepth(1);
    gameState4.equipped[player]['lowerBackground'] = this.add.rectangle(x, y + this.cellSize + this.gapSize, this.cellSize, this.cellSize, 0x333333).setDepth(1);
    gameState4.equipped[player]['accessoryBackgroundColor'] = this.add.rectangle(x - this.cellSize - this.gapSize, y + this.cellSize / 2, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, 0xffffff).setDepth(1);
    gameState4.equipped[player]['accessoryBackground'] = this.add.rectangle(x - this.cellSize - this.gapSize, y + this.cellSize / 2, this.cellSize, this.cellSize, 0x333333).setDepth(1);
    gameState4.equipped[player]['accessory2BackgroundColor'] = this.add.rectangle(x + this.cellSize + this.gapSize, y + this.cellSize / 2, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, 0xffffff).setDepth(1);
    gameState4.equipped[player]['accessory2Background'] = this.add.rectangle(x + this.cellSize + this.gapSize, y + this.cellSize / 2, this.cellSize, this.cellSize, 0x333333).setDepth(1);
    if (equipped[player]['upper'] !== '') {
      gameState4.equipped[player]['upper'] = this.add.image(x, y, equipment[equipped[player]['upper']]['base']).setDepth(2).setInteractive();
    } else {
      gameState4.equipped[player]['upper'] = this.add.image(x, y, 'armor').setDepth(2).setInteractive();
    }
    gameState4.equipped[player]['upper'].displayHeight = this.cellSize;
    gameState4.equipped[player]['upper'].displayWidth = this.cellSize;
    gameState4.equipped[player]['upper'].input.dropZone = true;
    gameState4.equipped[player]['upper']._character = player
    gameState4.equipped[player]['upper']._type = 'upper'
    gameState4.equipped[player]['upper']._text = equipped[player]['upper']
    gameState4.equipped[player]['upper'].on('pointerdown', function() {
      if (equipped[player]['upper'] !== '') {
        unequip(equipped[player].upper, player)
        equipped[player].upper = ''
        redisplay = true
      }
    })
    if (equipped[player]['lower']) {
      gameState4.equipped[player]['lower'] = this.add.image(x, y + this.cellSize + this.gapSize, equipment[equipped[player]['lower']]['base']).setDepth(2).setInteractive();
    } else {
      gameState4.equipped[player]['lower'] = this.add.image(x, y + this.cellSize + this.gapSize, 'armor_pants').setDepth(2).setInteractive();
    }
    gameState4.equipped[player]['lower'].displayHeight = this.cellSize;
    gameState4.equipped[player]['lower'].displayWidth = this.cellSize;
    gameState4.equipped[player]['lower'].input.dropZone = true;
    gameState4.equipped[player]['lower']._character = player
    gameState4.equipped[player]['lower']._type = 'lower'
    gameState4.equipped[player]['lower']._text = equipped[player]['lower']
    gameState4.equipped[player]['lower'].on('pointerdown', function() {
      if (equipped[player]['lower'] !== '') {
        unequip(equipped[player].lower, player)
        equipped[player].lower = ''
        redisplay = true
      }
    })
    if (equipped[player]['accessory']) {
      gameState4.equipped[player]['accessory'] = this.add.image(x - this.cellSize - this.gapSize, y + this.cellSize / 2, equipment[equipped[player]['accessory']]['base']).setDepth(2).setInteractive();
    } else {
      gameState4.equipped[player]['accessory'] = this.add.image(x - this.cellSize - this.gapSize, y + this.cellSize / 2, 'accessoryIcon').setDepth(2).setInteractive();
    }
    gameState4.equipped[player]['accessory'].displayHeight = this.cellSize;
    gameState4.equipped[player]['accessory'].displayWidth = this.cellSize;
    gameState4.equipped[player]['accessory'].input.dropZone = true;
    gameState4.equipped[player]['accessory']._character = player
    gameState4.equipped[player]['accessory']._type = 'accessory'
    gameState4.equipped[player]['accessory']._text = equipped[player]['accessory']
    gameState4.equipped[player]['accessory'].on('pointerdown', function() {
      if (equipped[player]['accessory'] !== '') {
        unequip(equipped[player].accessory, player)
        equipped[player].accessory = ''
        redisplay = true
      }
    })
    if (equipped[player]['accessory2']) {
      gameState4.equipped[player]['accessory2'] = this.add.image(x + this.cellSize + this.gapSize, y + this.cellSize / 2, equipment[equipped[player]['accessory2']]['base']).setDepth(2).setInteractive();
    } else {
      gameState4.equipped[player]['accessory2'] = this.add.image(x + this.cellSize + this.gapSize, y + this.cellSize / 2, 'accessoryIcon').setDepth(2).setInteractive();
    }
    gameState4.equipped[player]['accessory2'].displayHeight = this.cellSize;
    gameState4.equipped[player]['accessory2'].displayWidth = this.cellSize;
    gameState4.equipped[player]['accessory2'].input.dropZone = true;
    gameState4.equipped[player]['accessory2']._character = player
    gameState4.equipped[player]['accessory2']._type = 'accessory2'
    gameState4.equipped[player]['accessory2']._text = equipped[player]['accessory2']
    gameState4.equipped[player]['accessory2'].on('pointerdown', function() {
      if (equipped[player]['accessory2'] !== '') {
        unequip(equipped[player].accessory2, player)
        equipped[player].accessory2 = ''
        redisplay = true
      }
    })
  },
  displayContainer: function() {
    //console.log(gameState4.colorIndex)
    gameState4.background = {}
    gameState4.backgroundColor = {}
    let xcoord4 = this.displayEquipmentTopLeft.x;
    let ycoord4 = this.displayEquipmentTopLeft.y;
    for (let i = 0; i < this.numberOfSlots; i++) {
      //console.log(a_item)
      //console.log(Object.keys(gameState4.colorIndex))
      if (Object.keys(gameState4.backgroundColor).includes(String(i))) {
        //console.log(`yeahhh`)
        gameState4.backgroundColor[i].visible = false
            }
          }
    for (let i = 0; i < this.numberOfSlots; i++) {
      //console.log(a_item)
      //console.log(Object.keys(gameState4.colorIndex))
      if (Object.keys(gameState4.colorIndex).includes(String(i))) {
        //console.log(`yeahhh`)
        gameState4.backgroundColor[i] = this.add.rectangle(xcoord4, ycoord4, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, gameState4.colorIndex[i]).setDepth(1);
      }
      gameState4.background[i] = this.add.image(xcoord4, ycoord4, 'background').setDepth(1);
      gameState4.background[i].displayHeight = this.cellSize
      gameState4.background[i].displayWidth = this.cellSize
      if (xcoord4 >= this.displayEquipmentRight) {
        xcoord4 = this.displayEquipmentTopLeft.x
        ycoord4 += this.cellSize + this.gapSize
      } else {
        xcoord4 += this.cellSize + this.gapSize
      }
    }
  },
  displayEquipment: function() {
    gameState4.newText = {}
    gameState4.background = {}
    gameState4.backgroundColor = {}
    let xcoord4 = this.displayEquipmentTopLeft.x;
    let ycoord4 = this.displayEquipmentTopLeft.y;
    let jj = 0;
    for (a_item of Object.keys(equipment)) {
      let unequipped = equipment[a_item]['numberOwned'] - equipment[a_item]['equipped']
      if (unequipped > 0) {
        for (let i = 0; i < unequipped; i++) {
          if (i < this.numberOfSlots) {
            let name_decoded = equipment[a_item]['base'].replace(new RegExp(' ', 'g'), '');
            if (checkFileExist("assets/images/equipmentIcons/" + name_decoded + ".png")) {
              //console.log(name_decoded + ' exists in file system')
              gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, name_decoded).setDepth(5);
            } else if (equipment[a_item]['type'].slice(-5) === 'upper') {
              gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, 'armor').setDepth(5);
            } else if (equipment[a_item]['type'].slice(-5) === 'lower') {
              gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, 'armor_pants').setDepth(5);
            } else if (equipment[a_item]['type'] === 'accessory') {
              if (equipment[a_item]['base'] === 'Belt') {
                gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, 'Belt').setDepth(5);
              } else if (equipment[a_item]['base'] === 'Ring') {
                gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, 'Ring').setDepth(5);
              } else {
                gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, 'accessoryIcon').setDepth(5);
              }
            } else {
              gameState4.newText[a_item] = this.add.image(xcoord4, ycoord4, 'armor').setDepth(5);
            }
            gameState4.newText[a_item].displayHeight = this.cellSize
            gameState4.newText[a_item].displayWidth = this.cellSize
            gameState4.newText[a_item]._text = a_item
            gameState4.newText[a_item].setInteractive();
            this.input.setDraggable(gameState4.newText[a_item]);
            if (xcoord4 >= this.displayEquipmentRight) {
              xcoord4 = this.displayEquipmentTopLeft.x
              ycoord4 += this.cellSize + this.gapSize
            } else {
              xcoord4 += this.cellSize + this.gapSize
            }
          }
          gameState4.colorIndex[jj] = playerColors[equipment[a_item]['character']]
          jj += 1
        }
      }
    }
  },
  displayPage: function() {
    //creating menu content
    this.displayEquipment()
    this.displayPlayerEquipment(370 - 35 / 2, 140, 'Mac')
    if (al.following) {
      this.displayPlayerEquipment(370 - 35 / 2, 440, 'Al')
    }
    if (trevor.following) {
      this.displayPlayerEquipment(250 - 35, 290, 'Jimmy')
    }
    if (bennett.following) {
      this.displayPlayerEquipment(490, 290, 'Bennett')
    }
    this.displayContainer()
  },
  wake: function() {
    redisplay = true
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    //face icons
    this.load.image('macFace', "assets/images/MacFace.png");
    this.load.image('alFace', "assets/images/AlFace.png");
    this.load.image('jimmyFace', "assets/images/JimmyFace.png");
    this.load.image('bennettFace', "assets/images/BennettFace.png");
    //equipment icons
    for (const [key, value] of Object.entries(equipment)) {
      let base = equipment[key]['base'];
      this.load.image(base, "assets/images/equipmentIcons/" + base + ".png");
    }
    this.load.image('armor', "assets/images/equipmentIcons/armor.png");
    this.load.image('armor_pants', "assets/images/equipmentIcons/armor_pants.png");
    this.load.image('Belt', "assets/images/equipmentIcons/Belt.png");
    this.load.image('Ring', "assets/images/equipmentIcons/Ring.png");
    this.load.image('background', "assets/images/equipmentIcons/background.png");
    this.load.image('accessoryIcon', "assets/images/equipmentIcons/accessoryIcon.png");
  },
  create: function() {
    this.numberOfSlots = 42;
    this.cellSize = 60;
    this.gapSize = 5;
    this.displayEquipmentTopLeft = {
      x: 660,
      y: 180
    }
    this.displayEquipmentRight = 990
    gameState4.equipped = {
      'Mac': {},
      'Al': {},
      'Jimmy': {},
      'Bennett': {}
    }
    //background and border
    openKeyborder = this.add.rectangle(600, 20, 406, 36, 0xb39c0e).setOrigin(.5, .5);
    openKey_background = this.add.rectangle(600, 20, 400, 30, 0x000).setOrigin(.5, .5);
    openkeyText = this.add.text(600, 20, 'Press Z to open/close', {
      fontSize: '25px',
      fill: '#fff'
    }).setOrigin(.5, .5);
    //background and border
    gameState4.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState4.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);
    //switch to menu 1
    gameState4.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState4.pausemenu_button1.setInteractive()
    gameState4.pausemenu_button1.on('pointerup', function() {
      scene_number = 1
    }, this);
    //switch to menu 2
    gameState4.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState4.pausemenu_button2.setInteractive()
    gameState4.pausemenu_button2.on('pointerup', function() {
      scene_number = 7
    }, this);
    //switch to menu 3
    gameState4.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    gameState2.pausemenu_button_white3 = this.add.rectangle(210, 70, 16, 16, 0x000);
    gameState4.pausemenu_button3.setInteractive()
    gameState4.pausemenu_button3.on('pointerup', function() {
      scene_number = 8
    }, this);
    //switch to menu 4
    gameState4.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    gameState4.pausemenu_button4.setInteractive()
    gameState4.pausemenu_button4.on('pointerup', function() {
      scene_number = 9
    }, this);
    //exit button
    gameState4.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState4.exit_button.setInteractive()
    gameState4.exit_button.on('pointerup', function() {
      launchParameter = false;
      this.scene.stop();
      scene_number = 2;
      pause = false;
    }, this);
    exitText = this.add.text(1080 - 7, 70 - 14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });
    menuText = this.add.text(500, 60, "Equipment", {
      fontSize: '30px',
      fill: '#fff'
    });
    inventoryText = this.add.text(780, 100, `Inventory: `, {
      fontSize: '25px',
      fill: '#fff'
    });

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    var style = {
      fontSize: '15pt',
      //font: '20pt Arial',
      fill: 'white',
      align: 'left',
      wordWrap: {
        width: 450,
        callback: null,
        callbackScope: null,
        useAdvancedWrap: false
      },
    };
    var borderWidth = 2
    gameState4.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    gameState4.tempBackground.visible = false;
    gameState4.tempBackground.setDepth(8);
    gameState4.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
    gameState4.tempBackground2.visible = false;
    gameState4.tempBackground2.setDepth(7);
    gameState4.tempText = this.add.text(0, 0, ``, style);
    gameState4.tempText.visible = false;
    gameState4.tempText.setDepth(9);

    this.input.on('pointerover', function(pointer, justOver) {
      //console.log(justOver[0])
      if (equipment[justOver[0]._text]) {
        gameState4.tempBackground.x = pointer.x + 50;
        gameState4.tempBackground.y = pointer.y - 15;
        gameState4.tempBackground.visible = true;
        gameState4.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState4.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState4.tempBackground2.visible = true;
        gameState4.tempText.visible = true;
        gameState4.tempText.setText(`Name: ${equipment[justOver[0]._text]['name']} \nType: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value']}`);
        gameState4.tempText.x = gameState4.tempBackground.x;
        gameState4.tempText.y = gameState4.tempBackground.y;
        gameState4.tempBackground.width = gameState4.tempText.width;
        gameState4.tempBackground.height = gameState4.tempText.height;
        gameState4.tempBackground2.width = gameState4.tempText.width + 2 * borderWidth;
        gameState4.tempBackground2.height = gameState4.tempText.height + 2 * borderWidth;
      }
    });

    this.input.on('pointerout', function(pointer, justOut) {
      if (equipment[justOut[0]._text]) {
        gameState4.tempText.visible = false
        gameState4.tempBackground.visible = false
        gameState4.tempBackground2.visible = false
      }
    });


    this.input.on('drop', function(pointer, gameObject, dropZone) {
      //console.log(gameObject, dropZone)
      let piece = equipment[gameObject._text]
      let equipCharacter = equipment[gameObject._text]['character']
      let equipType = equipment[gameObject._text]['type']
      let dropCharacter = dropZone._character; //for some reason it gets set as an array...
      let dropType = dropZone._type;
      //console.log(equipType)
      //console.log(dropType)
      if (equipType === dropCharacter + '_' + dropType || equipType === dropType || equipType + '2' === dropType) {
        //console.log(`dropped it in the right spot`)
        if (equipped[dropCharacter][dropType]) {
          //console.log('unequipping ' + equipped[dropCharacter][dropType])
          unequip(equipped[dropCharacter][dropType], dropCharacter) //apply function to take status effects off from equipment
        }
        equip(gameObject._text, dropCharacter)
        equipped[dropCharacter][dropType] = gameObject._text;
        gameState4.equipped[dropCharacter][dropType].setTexture(piece['base']);
        gameState4.equipped[dropCharacter][dropType].displayWidth = this.cellSize;
        gameState4.equipped[dropCharacter][dropType].displayHeight = this.cellSize;
      } else {
        gameObject.destroy()
      }
      redisplay = true;
    });

    gameState4.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    gameState4.keyObjZ.on('down', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
    this.displayPage()
  },
  update: function() {
    if (scene_number === 1) {
      redisplay = true
      this.scene.switch('PauseMenu');
    } else if (scene_number === 7) {
      redisplay = true
      this.scene.switch('ItemsMenu');
    } else if (scene_number === 9) {
      redisplay = true
      this.scene.switch('OverworldMenu');
    } else if (redisplay) {
      for (a_item of Object.keys(equipment)) {
        if (gameState4.newText[a_item]) {
          gameState4.newText[a_item].destroy()
        }
      }
      this.displayPage()
      redisplay = false
    }
  }
});
