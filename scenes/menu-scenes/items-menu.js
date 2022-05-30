const gameState2 = {};

var ItemsMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "ItemsMenu"
    });
  },

  init: function(data) {
    //sumn
  },
  preload: function() {
    //images
    this.load.image('macFace', "assets/images/MacFace.png");
    this.load.image('alFace', "assets/images/AlFace.png");
    this.load.image('jimmyFace', "assets/images/JimmyFace.png");
    this.load.image('bennettFace', "assets/images/BennettFace.png");
  },
  create: function() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    gameState2.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState2.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState2.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState2.pausemenu_button1.setInteractive()
    gameState2.pausemenu_button1.on('pointerup', function() {
      scene_number = 1
    }, this);

    //switch to menu 2
    gameState2.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState2.pausemenu_button_white2 = this.add.rectangle(180, 70, 16, 16, 0x000);
    gameState2.pausemenu_button2.setInteractive()
    gameState2.pausemenu_button2.on('pointerup', function() {
      scene_number = 7
    }, this);

    //switch to menu 3
    gameState2.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    gameState2.pausemenu_button3.setInteractive()
    gameState2.pausemenu_button3.on('pointerup', function() {
      scene_number = 8
    }, this);

    //switch to menu 4
    gameState2.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    gameState2.pausemenu_button4.setInteractive()
    gameState2.pausemenu_button4.on('pointerup', function() {
      scene_number = 9
    }, this);

    //exit button
    gameState2.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState2.exit_button.setInteractive()
    gameState2.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false;
      launchParameter = false;
    }, this);
    exitText = this.add.text(1080 - 7, 70 - 14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    let faceSeparation = 175;
    let faceY = 190;
    let textY = 300;
    let macsFaceX = 580;
    let alsFaceX = macsFaceX + faceSeparation;
    let trevorsFaceX = alsFaceX + faceSeparation;
    let bennettsFaceX = macsFaceX;


    var macsFace = this.add.image(macsFaceX, faceY, 'macFace').setOrigin(0, 0).setDepth(1);
    this.macBackground = this.add.rectangle(macsFaceX - 25, faceY - 25, macsFace.width + 50, macsFace.height + 25, 0x000, 0).setOrigin(0, 0);
    this.macBackground.strokeColor = 0xffffff;
    this.macBackground.fillColor = 0x068c1b;
    this.macBackground.fillAlpha = .4;
    this.macBackground.strokeWeight = 2;
    this.macBackground.strokeAlpha = 1;
    this.macBackground.isStroked = true;
    this.macBackground.isFilled = true;
    if (al.following) {
      var alsFace = this.add.image(alsFaceX, faceY, 'alFace').setOrigin(0, 0).setDepth(1);
      this.alBackground = this.add.rectangle(alsFaceX - 25, faceY - 25, alsFace.width + 50, alsFace.height + 25, 0x000, 0).setOrigin(0, 0);
      this.alBackground.strokeColor = 0xffffff;
      this.alBackground.fillColor = 0xcb0000;
      this.alBackground.fillAlpha = .4;
      this.alBackground.strokeWeight = 2;
      this.alBackground.strokeAlpha = 1;
      this.alBackground.isStroked = true;
      this.alBackground.isFilled = true;
    }
    if (trevor.following) {
      var jimmysFace = this.add.image(trevorsFaceX, faceY, 'jimmyFace').setOrigin(0, 0).setDepth(1);
      this.trevorBackground = this.add.rectangle(trevorsFaceX - 25, faceY - 25, jimmysFace.width + 50, jimmysFace.height + 25, 0x000, 0).setOrigin(0, 0);
      this.trevorBackground.strokeColor = 0xffffff;
      this.trevorBackground.fillColor = 0x0f15a1;
      this.trevorBackground.fillAlpha = .4;
      this.trevorBackground.strokeWeight = 2;
      this.trevorBackground.strokeAlpha = 1;
      this.trevorBackground.isStroked = true;
      this.trevorBackground.isFilled = true;
    }
    if (bennett.following) {
      var bennettsFace = this.add.image(bennettsFaceX, faceY + 200, 'bennettFace').setOrigin(0, 0).setDepth(1);
      this.bennettBackground = this.add.rectangle(bennettsFaceX - 25, faceY + 200 - 25, bennettsFace.width + 50, bennettsFace.height + 25, 0x000, 0).setOrigin(0, 0);
      this.bennettBackground.strokeColor = 0xffffff;
      this.bennettBackground.fillColor = 0xfa7800;
      this.bennettBackground.fillAlpha = .4;
      this.bennettBackground.strokeWeight = 2;
      this.bennettBackground.strokeAlpha = 1;
      this.bennettBackground.isStroked = true;
      this.bennettBackground.isFilled = true;
    }

    gameState2.macText = this.add.text(macsFaceX + 7, textY, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    gameState2.alText = this.add.text(alsFaceX + 7, textY, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    gameState2.jimmyText = this.add.text(trevorsFaceX + 7, textY, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    gameState2.bennettText = this.add.text(bennettsFaceX + 7, textY + 200, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    gameState2.macText.setText(`HP: ${party["Mac"]['hp']}/${party["Mac"]['maxHP']} \nSP: ${party["Mac"]['sp']}/${party["Mac"]['maxSP']}`)
    if (al.following) {
      gameState2.alText.setText(`HP: ${party["Al"]['hp']}/${party["Al"]['maxHP']} \nSP: ${party["Al"]['sp']}/${party["Al"]['maxSP']}`)
    }
    if (trevor.following) {
      gameState2.jimmyText.setText(`HP: ${party["Jimmy"]['hp']}/${party["Jimmy"]['maxHP']} \nSP: ${party["Jimmy"]['sp']}/${party["Jimmy"]['maxSP']}`)
    }
    if (bennett.following) {
      gameState2.bennettText.setText(`HP: ${party["Bennett"]['hp']}/${party["Bennett"]['maxHP']} \nSP: ${party["Bennett"]['sp']}/${party["Bennett"]['maxSP']}`)
    }

    //  A drop zone for mac face
    var zoneMac = this.add.zone(550 + 75, 150 + 75, 150, 150).setRectangleDropZone(150, 150);
    var zoneAl = this.add.zone(725 + 75, 150 + 75, 150, 150).setRectangleDropZone(150, 150);
    var zoneJimmy = this.add.zone(900 + 75, 150 + 75, 150, 150).setRectangleDropZone(150, 150);
    var zoneBennett = this.add.zone(550 + 75, 150 + 200 + 75, 150, 150).setRectangleDropZone(150, 150);
    zoneMac.name = "Mac"
    zoneAl.name = "Al"
    zoneJimmy.name = "Jimmy"
    zoneBennett.name = "Bennett"

    menuText = this.add.text(500, 60, "Items", {
      fontSize: '30px',
      fill: '#fff'
    });

    //generates graphics for all items in inventory
    gameState2.newItem = {}
    let xcoord2 = 175;
    let ycoord2 = 140;
    let itemCount = 0;
    for (a_item of Object.keys(inventory)) {
      if (inventory[a_item]['numberOwned'] > 0) {
        itemCount += 1;
        gameState2.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive()
        gameState2.newItem[a_item].name = `${a_item}`
        this.input.setDraggable(gameState2.newItem[a_item]);
        if (itemCount % 3 === 0) {
          xcoord2 = 175;
          ycoord2 += 125
        } else {
          xcoord2 += 125
        }
      }
    }

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    var borderWidth = 2
    gameState2.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    gameState2.tempBackground.visible = false;
    gameState2.tempBackground.setDepth(2);
    gameState2.tempBackground2 = this.add.rectangle(0, 0, 400 + 2*borderWidth, 200 + 2*borderWidth, 0xb39c0e).setOrigin(0, 0);
    gameState2.tempBackground2.visible = false;
    gameState2.tempBackground2.setDepth(1);

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
    gameState2.tempText = this.add.text(0, 0, ``, style);
    gameState2.tempText.visible = false;
    gameState2.tempText.setDepth(3);

    this.input.on('pointerover', function(pointer, justOver) {
      if (justOver[0].name && justOver[0].name !== "Mac" && justOver[0].name !== "Al" && justOver[0].name !== "Jimmy" && justOver[0].name !== "Bennett") {
        gameState2.tempBackground.x = pointer.x + 50;
        gameState2.tempBackground.y = pointer.y - 15;
        gameState2.tempBackground.visible = true;
        gameState2.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState2.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState2.tempBackground2.visible = true;
        gameState2.tempText.visible = true;
        gameState2.tempText.setText(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']} \nValue: $${inventory[justOver[0].name]['value']}`);
        gameState2.tempText.x = gameState2.tempBackground.x;
        gameState2.tempText.y = gameState2.tempBackground.y;
        gameState2.tempBackground.width = gameState2.tempText.width;
        gameState2.tempBackground.height = gameState2.tempText.height;
        gameState2.tempBackground2.width = gameState2.tempText.width + 2*borderWidth;
        gameState2.tempBackground2.height = gameState2.tempText.height + 2*borderWidth;
      }
    });

    this.input.on('pointerout', function(pointer, justOut) {
      gameState2.tempText.visible = false;
      gameState2.tempBackground.visible = false;
      gameState2.tempBackground2.visible = false;
    });

    this.input.on('drop', function(pointer, gameObject, dropZone) {
      console.log(gameObject.name)
      console.log(dropZone.name)
      useItem(gameObject.name, dropZone.name);
      if (gameObject.name === "Monster" || gameObject.name === "Hamms" || gameObject.name === "Labatt Max Ice") {
        gameState.drinkCan.play()
      } else if (gameObject.name === "Gatorade") {
        gameState.drinkGatorade.play()
      }
      redisplay = true;
    });


    gameState2.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    gameState2.keyObjZ.on('down', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
  },
  update: function() {
    //redisplay items
    if (redisplay) {
      gameState2.macText.setText(`HP: ${party["Mac"]['hp']}/${party["Mac"]['maxHP']} \nSP: ${party["Mac"]['sp']}/${party["Mac"]['maxSP']}`)
      if (al.following) {
        gameState2.alText.setText(`HP: ${party["Al"]['hp']}/${party["Al"]['maxHP']} \nSP: ${party["Al"]['sp']}/${party["Al"]['maxSP']}`)
      }
      if (trevor.following) {
        gameState2.jimmyText.setText(`HP: ${party["Jimmy"]['hp']}/${party["Jimmy"]['maxHP']} \nSP: ${party["Jimmy"]['sp']}/${party["Jimmy"]['maxSP']}`)
      }
      if (bennett.following) {
        gameState2.bennettText.setText(`HP: ${party["Bennett"]['hp']}/${party["Bennett"]['maxHP']} \nSP: ${party["Bennett"]['sp']}/${party["Bennett"]['maxSP']}`)
      }
      for (a_item of Object.keys(inventory)) {
        if (gameState2.newItem[a_item]) {
          gameState2.newItem[a_item].destroy()
        }
      }
      gameState2.newItem = {}
      let xcoord2 = 175;
      let ycoord2 = 140;
      let itemCount = 0;
      for (a_item of Object.keys(inventory)) {
        if (inventory[a_item]['numberOwned'] > 0) {
          itemCount += 1;
          gameState2.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive()
          gameState2.newItem[a_item].name = `${a_item}`
          this.input.setDraggable(gameState2.newItem[a_item]);
          if (itemCount % 3 === 0) {
            xcoord2 = 175;
            ycoord2 += 125
          } else {
            xcoord2 += 125
          }
        }
      }
      redisplay = false
    }
    //change menus
    if (scene_number === 1) {
      redisplay = true
      this.scene.switch('PauseMenu');
    } else if (scene_number === 8) {
      redisplay = true
      this.scene.switch('EquipmentMenu');
    } else if (scene_number === 9) {
      redisplay = true
      this.scene.switch('OverworldMenu');
    }
  }
});
