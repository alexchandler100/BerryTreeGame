let redisplay = true;

var EquipmentMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "EquipmentMenu"
    });
  },
  displayPlayerEquipment: function(x, y, player) {
    if (this.equipped[player]['upper']) {
      this.equipped[player]['upper'].visible = false
    }
    if (this.equipped[player]['lower']) {
      this.equipped[player]['lower'].visible = false
    }
    if (this.equipped[player]['accessory']) {
      this.equipped[player]['accessory'].visible = false
    }
    if (this.equipped[player]['accessory2']) {
      this.equipped[player]['accessory2'].visible = false
    }
    this.equipped[player]['face'] = this.add.image(x, y - this.cellSize + this.gapSize, player.toLowerCase() + 'Face').setDepth(1).setScale(.5);
    this.equipped[player]['upperBackgroundColor'] = this.add.rectangle(x, y, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, playerColors[player]).setDepth(1);
    this.equipped[player]['upperBackground'] = this.add.image(x, y, 'background').setDepth(1);
    this.equipped[player]['lowerBackgroundColor'] = this.add.rectangle(x, y + this.cellSize + this.gapSize, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, playerColors[player]).setDepth(1);
    this.equipped[player]['lowerBackground'] = this.add.image(x, y + this.cellSize + this.gapSize, 'background').setDepth(1);
    this.equipped[player]['accessoryBackgroundColor'] = this.add.rectangle(x - this.cellSize - this.gapSize, y + this.cellSize / 2, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, 0xffffff).setDepth(1);
    this.equipped[player]['accessoryBackground'] = this.add.image(x - this.cellSize - this.gapSize, y + this.cellSize / 2, 'background').setDepth(1);
    this.equipped[player]['accessory2BackgroundColor'] = this.add.rectangle(x + this.cellSize + this.gapSize, y + this.cellSize / 2, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, 0xffffff).setDepth(1);
    this.equipped[player]['accessory2Background'] = this.add.image(x + this.cellSize + this.gapSize, y + this.cellSize / 2, 'background').setDepth(1);
    if (equipped[player]['upper'] !== '') {
      this.equipped[player]['upper'] = this.add.image(x, y, equipment[equipped[player]['upper']]['base']).setDepth(2).setInteractive();
    } else {
      this.equipped[player]['upper'] = this.add.image(x, y, 'armor').setDepth(2).setInteractive();
    }
    this.equipped[player]['upper'].displayHeight = this.cellSize;
    this.equipped[player]['upper'].displayWidth = this.cellSize;
    this.equipped[player]['upper'].input.dropZone = true;
    this.equipped[player]['upper']._character = player
    this.equipped[player]['upper']._type = 'upper'
    this.equipped[player]['upper']._text = equipped[player]['upper']
    this.equipped[player]['upper'].on('pointerdown', function() {
      if (equipped[player]['upper'] !== '') {
        gameState.itemEquip.play()
        unequip(equipped[player].upper, player)
        equipped[player].upper = ''
        redisplay = true
      }
    })
    if (equipped[player]['lower']) {
      this.equipped[player]['lower'] = this.add.image(x, y + this.cellSize + this.gapSize, equipment[equipped[player]['lower']]['base']).setDepth(2).setInteractive();
    } else {
      this.equipped[player]['lower'] = this.add.image(x, y + this.cellSize + this.gapSize, 'armor_pants').setDepth(2).setInteractive();
    }
    this.equipped[player]['lower'].displayHeight = this.cellSize;
    this.equipped[player]['lower'].displayWidth = this.cellSize;
    this.equipped[player]['lower'].input.dropZone = true;
    this.equipped[player]['lower']._character = player
    this.equipped[player]['lower']._type = 'lower'
    this.equipped[player]['lower']._text = equipped[player]['lower']
    this.equipped[player]['lower'].on('pointerdown', function() {
      if (equipped[player]['lower'] !== '') {
        gameState.itemEquip.play()
        unequip(equipped[player].lower, player)
        equipped[player].lower = ''
        redisplay = true
      }
    })
    if (equipped[player]['accessory']) {
      this.equipped[player]['accessory'] = this.add.image(x - this.cellSize - this.gapSize, y + this.cellSize / 2, equipment[equipped[player]['accessory']]['base']).setDepth(2).setInteractive();
    } else {
      this.equipped[player]['accessory'] = this.add.image(x - this.cellSize - this.gapSize, y + this.cellSize / 2, 'accessoryIcon').setDepth(2).setInteractive();
    }
    this.equipped[player]['accessory'].displayHeight = this.cellSize;
    this.equipped[player]['accessory'].displayWidth = this.cellSize;
    this.equipped[player]['accessory'].input.dropZone = true;
    this.equipped[player]['accessory']._character = player
    this.equipped[player]['accessory']._type = 'accessory'
    this.equipped[player]['accessory']._text = equipped[player]['accessory']
    this.equipped[player]['accessory'].on('pointerdown', function() {
      if (equipped[player]['accessory'] !== '') {
        unequip(equipped[player].accessory, player)
        gameState.itemEquip.play()
        equipped[player].accessory = ''
        redisplay = true
      }
    })
    if (equipped[player]['accessory2']) {
      this.equipped[player]['accessory2'] = this.add.image(x + this.cellSize + this.gapSize, y + this.cellSize / 2, equipment[equipped[player]['accessory2']]['base']).setDepth(2).setInteractive();
    } else {
      this.equipped[player]['accessory2'] = this.add.image(x + this.cellSize + this.gapSize, y + this.cellSize / 2, 'accessoryIcon').setDepth(2).setInteractive();
    }
    this.equipped[player]['accessory2'].displayHeight = this.cellSize;
    this.equipped[player]['accessory2'].displayWidth = this.cellSize;
    this.equipped[player]['accessory2'].input.dropZone = true;
    this.equipped[player]['accessory2']._character = player
    this.equipped[player]['accessory2']._type = 'accessory2'
    this.equipped[player]['accessory2']._text = equipped[player]['accessory2']
    this.equipped[player]['accessory2'].on('pointerdown', function() {
      if (equipped[player]['accessory2'] !== '') {
        unequip(equipped[player].accessory2, player)
        gameState.itemEquip.play()
        equipped[player].accessory2 = ''
        redisplay = true
      }
    })
  },
  displayContainer: function() {
    //console.log(this.colorIndex)
    this.background = {}
    //this.backgroundColor = {}
    let xcoord4 = this.displayEquipmentTopLeft.x;
    let ycoord4 = this.displayEquipmentTopLeft.y;
    //for (let i = 0; i < this.numberOfSlots; i++) {
      //if (this.backgroundColor[i]) {
        //this.backgroundColor[i].visible = false
      //}
    //}
    for (let i = 0; i < this.numberOfSlots; i++) {
      //if (Object.keys(this.colorIndex).includes(String(i))) {
        //this.backgroundColor[i] = this.add.rectangle(xcoord4, ycoord4, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, this.colorIndex[i]).setDepth(1);
      //}
      this.background[i] = this.add.image(xcoord4, ycoord4, 'background').setDepth(1);
      this.background[i].displayHeight = this.cellSize
      this.background[i].displayWidth = this.cellSize
      if (xcoord4 >= this.displayEquipmentRight) {
        xcoord4 = this.displayEquipmentTopLeft.x
        ycoord4 += this.cellSize + this.gapSize
      } else {
        xcoord4 += this.cellSize + this.gapSize
      }
    }
    this.colorIndex = {}
  },
  displayEquipment: function() {
    for (ii of Object.keys(this.backgroundColor)){
      this.backgroundColor[ii].destroy()
    }
    this.newText = {}
    this.background = {}
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
              this.newText[a_item] = this.add.image(xcoord4, ycoord4, name_decoded).setDepth(5);
            } else if (equipment[a_item]['type'].slice(-5) === 'upper') {
              this.newText[a_item] = this.add.image(xcoord4, ycoord4, 'armor').setDepth(5);
            } else if (equipment[a_item]['type'].slice(-5) === 'lower') {
              this.newText[a_item] = this.add.image(xcoord4, ycoord4, 'armor_pants').setDepth(5);
            } else if (equipment[a_item]['type'] === 'accessory') {
              if (equipment[a_item]['base'] === 'Belt') {
                this.newText[a_item] = this.add.image(xcoord4, ycoord4, 'Belt').setDepth(5);
              } else if (equipment[a_item]['base'] === 'Ring') {
                this.newText[a_item] = this.add.image(xcoord4, ycoord4, 'Ring').setDepth(5);
              } else {
                this.newText[a_item] = this.add.image(xcoord4, ycoord4, 'accessoryIcon').setDepth(5);
              }
            } else {
              this.newText[a_item] = this.add.image(xcoord4, ycoord4, 'armor').setDepth(5);
            }
            this.newText[a_item].displayHeight = this.cellSize
            this.newText[a_item].displayWidth = this.cellSize
            this.newText[a_item]._text = a_item
            this.newText[a_item].setInteractive();
            this.input.setDraggable(this.newText[a_item]);
            //set background color
            this.backgroundColor[jj] = this.add.rectangle(xcoord4, ycoord4, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, playerColors[equipment[a_item]['character']]).setDepth(1);
            jj += 1
            if (xcoord4 >= this.displayEquipmentRight) {
              xcoord4 = this.displayEquipmentTopLeft.x
              ycoord4 += this.cellSize + this.gapSize
            } else {
              xcoord4 += this.cellSize + this.gapSize
            }
          }
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
    this.load.image('Chain', "assets/images/equipmentIcons/Chain.png");
    this.load.image('Hat', "assets/images/equipmentIcons/Hat.png");
    this.load.image('Shoes', "assets/images/equipmentIcons/Shoes.png");
    this.load.image('background', "assets/images/equipmentIcons/background.png");
    this.load.image('accessoryIcon', "assets/images/equipmentIcons/accessoryIcon.png");

    this.load.image('AnglersPants', "assets/images/equipmentIcons/AnglersPants.png");
    this.load.image('BearShirt', "assets/images/equipmentIcons/BearShirt.png");
    this.load.image('CamoHoody', "assets/images/equipmentIcons/CamoHoody.png");
    this.load.image('CamoPants', "assets/images/equipmentIcons/CamoPants.png");
    this.load.image('Chinos', "assets/images/equipmentIcons/Chinos.png");
    this.load.image('Cool-ActiveShirt', "assets/images/equipmentIcons/Cool-ActiveShirt.png");

    this.load.image('Cool-ActiveShorts', "assets/images/equipmentIcons/Cool-ActiveShorts.png");
    this.load.image('DeerShirt', "assets/images/equipmentIcons/DeerShirt.png");
    this.load.image('Dry-FitShirt', "assets/images/equipmentIcons/Dry-FitShirt.png");
    this.load.image('Dry-FitShorts', "assets/images/equipmentIcons/Dry-FitShorts.png");
    this.load.image('FubuPants', "assets/images/equipmentIcons/FubuPants.png");
    this.load.image('FubuShirt', "assets/images/equipmentIcons/FubuShirt.png");
    this.load.image('GucciPants', "assets/images/equipmentIcons/GucciPants.png");
    this.load.image('GucciShirt', "assets/images/equipmentIcons/GucciShirt.png");
    this.load.image('GymShorts', "assets/images/equipmentIcons/GymShorts.png");
    this.load.image('PhatFarmPants', "assets/images/equipmentIcons/PhatFarmPants.png");
    this.load.image('PhatFarmShirt', "assets/images/equipmentIcons/PhatFarmShirt.png");
    this.load.image('SpandexShirt', "assets/images/equipmentIcons/SpandexShirt.png");
    this.load.image('SpandexSwimsuit', "assets/images/equipmentIcons/SpandexSwimsuit.png");
    this.load.image('SportCoat', "assets/images/equipmentIcons/SportCoat.png");
    this.load.image('TrackPants', "assets/images/equipmentIcons/TrackPants.png");
    this.load.image('Waders', "assets/images/equipmentIcons/Waders.png");
    this.load.image('WrestlingShirt', "assets/images/equipmentIcons/WrestlingShirt.png");
    this.load.image('WifeBeater', "assets/images/equipmentIcons/WifeBeater.png");
    //audio
    this.load.audio('itemEquip', ['assets/audio/itemEquip.mp3']);
  },
  create: function() {
    gameState.itemEquip = this.sound.add('itemEquip', {
      volume: 3
    });
    this.colorIndex = {}
    this.backgroundColor={}
    this.numberOfSlots = 42;
    this.cellSize = 60;
    this.gapSize = 5;
    this.displayEquipmentTopLeft = {
      x: 660,
      y: 170
    }
    this.displayEquipmentRight = 990
    this.equipped = {
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

    var bGgraphics = this.add.graphics()
    let points = [
      {x:293, y:107},
      {x:413, y:107},
      {x:586, y:245},
      {x:586, y:395},
      {x:413, y:540},
      {x:293, y:540},
      {x:120, y:395},
      {x:120, y:245}]
      let points2 = [
        {x:293, y:107-3},
        {x:413, y:107-3},
        {x:586+2, y:245-2},
        {x:586+2, y:395+2},
        {x:413, y:540+2},
        {x:293, y:540+2},
        {x:120-2, y:395+2},
        {x:120-2, y:245-2}]

      let points3 = [
        {x:620, y:97},
        {x:1090, y:97},
        {x:1090, y:540},
        {x:620, y:540}]
        let points4 = [
          {x:620-2, y:97-2},
          {x:1090+2, y:97-2},
          {x:1090+2, y:540+2},
          {x:620-2, y:540+2}]
    var leftBGgraphics = new Phaser.Geom.Polygon(points);
    var leftBGgraphics2 = new Phaser.Geom.Polygon(points2);
    var rightBGgraphics3 = new Phaser.Geom.Polygon(points3);
    var rightBGgraphics4 = new Phaser.Geom.Polygon(points4);
    bGgraphics.fillStyle(0xb39c0e);   // color: 0xRRGGBB
    bGgraphics.fillPoints(leftBGgraphics2.points, true);
    bGgraphics.setDepth(1)
    bGgraphics.fillStyle(0x777777);   // color: 0xRRGGBB
    bGgraphics.fillPoints(leftBGgraphics.points, true);
    bGgraphics.setDepth(1)
    bGgraphics.fillStyle(0xb39c0e);   // color: 0xRRGGBB
    bGgraphics.fillPoints(rightBGgraphics4.points, true);
    bGgraphics.setDepth(1)
    bGgraphics.fillStyle(0x777777);   // color: 0xRRGGBB
    bGgraphics.fillPoints(rightBGgraphics3.points, true);
    bGgraphics.setDepth(1)
    //background and border
    this.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    this.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);
    //switch to menu 1
    this.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    this.pausemenu_button1.setInteractive()
    this.pausemenu_button1.on('pointerup', function() {
      scene_number = 1
    }, this);
    //switch to menu 2
    this.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    this.pausemenu_button2.setInteractive()
    this.pausemenu_button2.on('pointerup', function() {
      scene_number = 7
    }, this);
    //switch to menu 3
    this.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    this.pausemenu_button_white3 = this.add.rectangle(210, 70, 16, 16, 0x000);
    this.pausemenu_button3.setInteractive()
    this.pausemenu_button3.on('pointerup', function() {
      scene_number = 8
    }, this);
    //switch to menu 4
    this.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    this.pausemenu_button4.setInteractive()
    this.pausemenu_button4.on('pointerup', function() {
      scene_number = 9
    }, this);
    //exit button
    this.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    this.exit_button.setInteractive()
    this.exit_button.on('pointerup', function() {
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
    inventoryText = this.add.text(780, 100, `Inventory`, {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(5);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }, this);

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
    this.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    this.tempBackground.visible = false;
    this.tempBackground.setDepth(8);
    this.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
    this.tempBackground2.visible = false;
    this.tempBackground2.setDepth(7);
    this.tempText = this.add.text(0, 0, ``, style);
    this.tempText.visible = false;
    this.tempText.setDepth(9);

    this.input.on('pointerover', function(pointer, justOver) {
      //console.log(justOver[0])
      if (equipment[justOver[0]._text]) {
        if (pointer.x>600){
          this.tempBackground.x = pointer.x - 250;
        } else {
          this.tempBackground.x = pointer.x + 50;
        }
        if (pointer.y>300){
          this.tempBackground.y = pointer.y - 150;
        } else {
          this.tempBackground.y = pointer.y - 15;
        }
        this.tempBackground2.x = this.tempBackground.x - borderWidth;
        this.tempBackground2.y = this.tempBackground.y - borderWidth;
        this.tempBackground.visible = true;
        this.tempBackground2.visible = true;
        this.tempText.visible = true;
        this.tempText.setText(`Name: ${equipment[justOver[0]._text]['name']} \nType: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value']}`);
        this.tempText.x = this.tempBackground.x;
        this.tempText.y = this.tempBackground.y;
        this.tempBackground.width = this.tempText.width;
        this.tempBackground.height = this.tempText.height;
        this.tempBackground2.width = this.tempText.width + 2 * borderWidth;
        this.tempBackground2.height = this.tempText.height + 2 * borderWidth;
      }
    }, this);

    this.input.on('pointerout', function(pointer, justOut) {
      if (equipment[justOut[0]._text]) {
        this.tempText.visible = false
        this.tempBackground.visible = false
        this.tempBackground2.visible = false
      }
    }, this);


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
        gameState.itemEquip.play()
        equip(gameObject._text, dropCharacter)
        equipped[dropCharacter][dropType] = gameObject._text;
        this.equipped[dropCharacter][dropType].setTexture(piece['base']);
        this.equipped[dropCharacter][dropType].displayWidth = this.cellSize;
        this.equipped[dropCharacter][dropType].displayHeight = this.cellSize;
      } else {
        gameObject.destroy()
      }
      redisplay = true;
    }, this);

    this.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    this.keyObjZ.on('down', function() {
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
        if (this.newText[a_item]) {
          this.newText[a_item].destroy()
        }
      }
      this.displayPage()
      redisplay = false
    }
  }
});
