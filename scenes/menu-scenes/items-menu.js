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
    openKeyborder = this.add.rectangle(600, 20, 406, 36, 0xb39c0e).setOrigin(.5,.5);
    openKey_background = this.add.rectangle(600, 20, 400, 30, 0x000).setOrigin(.5,.5);
    openkeyText = this.add.text(600, 20, 'Press Z to open/close', {
      fontSize: '25px',
      fill: '#fff'
    }).setOrigin(.5,.5);
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
    this.pausemenu_button_white2 = this.add.rectangle(180, 70, 16, 16, 0x000);
    this.pausemenu_button2.setInteractive()
    this.pausemenu_button2.on('pointerup', function() {
      scene_number = 7
    }, this);

    //switch to menu 3
    this.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
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

    this.macText = this.add.text(macsFaceX + 7, textY, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    this.alText = this.add.text(alsFaceX + 7, textY, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    this.jimmyText = this.add.text(trevorsFaceX + 7, textY, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    this.bennettText = this.add.text(bennettsFaceX + 7, textY + 200, '', {
      fontSize: '15px',
      fill: '#fff'
    });
    this.macText.setText(`HP: ${party["Mac"]['hp']}/${party["Mac"]['maxHP']} \nSP: ${party["Mac"]['sp']}/${party["Mac"]['maxSP']}`)
    if (al.following) {
      this.alText.setText(`HP: ${party["Al"]['hp']}/${party["Al"]['maxHP']} \nSP: ${party["Al"]['sp']}/${party["Al"]['maxSP']}`)
    }
    if (trevor.following) {
      this.jimmyText.setText(`HP: ${party["Jimmy"]['hp']}/${party["Jimmy"]['maxHP']} \nSP: ${party["Jimmy"]['sp']}/${party["Jimmy"]['maxSP']}`)
    }
    if (bennett.following) {
      this.bennettText.setText(`HP: ${party["Bennett"]['hp']}/${party["Bennett"]['maxHP']} \nSP: ${party["Bennett"]['sp']}/${party["Bennett"]['maxSP']}`)
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
    this.newItem = {}
    let xcoord2 = 175;
    let ycoord2 = 140;
    let itemCount = 0;
    for (a_item of Object.keys(inventory)) {
      if (inventory[a_item]['numberOwned'] > 0) {
        itemCount += 1;
        this.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive()
        this.newItem[a_item].name = `${a_item}`
        this.input.setDraggable(this.newItem[a_item]);
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
    }, this);

    var borderWidth = 2
    this.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    this.tempBackground.visible = false;
    this.tempBackground.setDepth(2);
    this.tempBackground2 = this.add.rectangle(0, 0, 400 + 2*borderWidth, 200 + 2*borderWidth, 0xb39c0e).setOrigin(0, 0);
    this.tempBackground2.visible = false;
    this.tempBackground2.setDepth(1);

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
    this.tempText = this.add.text(0, 0, ``, style);
    this.tempText.visible = false;
    this.tempText.setDepth(3);

    this.input.on('pointerover', function(pointer, justOver) {
      if (justOver[0].name && justOver[0].name !== "Mac" && justOver[0].name !== "Al" && justOver[0].name !== "Jimmy" && justOver[0].name !== "Bennett") {
        this.tempBackground.x = pointer.x + 50;
        this.tempBackground.y = pointer.y - 15;
        this.tempBackground.visible = true;
        this.tempBackground2.x = pointer.x + 50 - borderWidth;
        this.tempBackground2.y = pointer.y - 15 - borderWidth;
        this.tempBackground2.visible = true;
        this.tempText.visible = true;
        this.tempText.setText(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']} \nValue: $${inventory[justOver[0].name]['value']}`);
        this.tempText.x = this.tempBackground.x;
        this.tempText.y = this.tempBackground.y;
        this.tempBackground.width = this.tempText.width;
        this.tempBackground.height = this.tempText.height;
        this.tempBackground2.width = this.tempText.width + 2*borderWidth;
        this.tempBackground2.height = this.tempText.height + 2*borderWidth;
      }
    }, this);

    this.input.on('pointerout', function(pointer, justOut) {
      this.tempText.visible = false;
      this.tempBackground.visible = false;
      this.tempBackground2.visible = false;
    }, this);

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
    }, this);


    this.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    this.keyObjZ.on('down', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
  },
  update: function() {
    //redisplay items
    if (redisplay) {
      this.macText.setText(`HP: ${party["Mac"]['hp']}/${party["Mac"]['maxHP']} \nSP: ${party["Mac"]['sp']}/${party["Mac"]['maxSP']}`)
      if (al.following) {
        this.alText.setText(`HP: ${party["Al"]['hp']}/${party["Al"]['maxHP']} \nSP: ${party["Al"]['sp']}/${party["Al"]['maxSP']}`)
      }
      if (trevor.following) {
        this.jimmyText.setText(`HP: ${party["Jimmy"]['hp']}/${party["Jimmy"]['maxHP']} \nSP: ${party["Jimmy"]['sp']}/${party["Jimmy"]['maxSP']}`)
      }
      if (bennett.following) {
        this.bennettText.setText(`HP: ${party["Bennett"]['hp']}/${party["Bennett"]['maxHP']} \nSP: ${party["Bennett"]['sp']}/${party["Bennett"]['maxSP']}`)
      }
      for (a_item of Object.keys(inventory)) {
        if (this.newItem[a_item]) {
          this.newItem[a_item].destroy()
        }
      }
      this.newItem = {}
      let xcoord2 = 175;
      let ycoord2 = 140;
      let itemCount = 0;
      for (a_item of Object.keys(inventory)) {
        if (inventory[a_item]['numberOwned'] > 0) {
          itemCount += 1;
          this.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive()
          this.newItem[a_item].name = `${a_item}`
          this.input.setDraggable(this.newItem[a_item]);
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
