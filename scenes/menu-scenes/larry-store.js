const gameState33 = {};

var LarryStore = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "LarryStore"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.audio('chaching', ['assets/audio/chaching.mp3']);
  },
  create: function() {
    //chaching sound effect
    gameState33.chaching = this.sound.add('chaching');
    //background
    gameState33.narrative_background = this.add.rectangle(100, 50, 1000, 500, 0x000).setOrigin(0);
    gameState33.narrative_background.setFillStyle(0x000, 0.8);
    gameState33.narrative_background2 = this.add.rectangle(150, 160, 450, 330, 0xffffff).setOrigin(0);
    gameState33.narrative_background2.setFillStyle(0xffffff, 0.5);

    //text for name of store
    storeText = this.add.text(425, 60, '', {
      fontSize: '35px',
      fill: '#fff'
    });
    storeText.setText(`Larry's Store`)

    //text for your money
    creditText = this.add.text(250, 120, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    creditText.setText(`Your Cash: ${Math.round(money*100)/100}`)

    //text for your inventory
    yourInventoryText = this.add.text(250, 170, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    yourInventoryText.setText(`Your Inventory`)

    //text for store inventory
    storeInventoryText = this.add.text(790, 120, 'Buy', {
      fontSize: '30px',
      fill: '#fff'
    });

    //button to buy hamms
    larrySpecialText = this.add.text(670, 180, 'Larry Special (2): $20', {
      fontSize: '25px',
      fill: '#ffffff'
    });
    larrySpecialText.setInteractive().on('pointerup', function() {
      if (money >= 20) {
        gameState33.chaching.play()
        money -= 20;
        inventory["Larry Special"]['numberOwned'] += 2
        redisplay = true
      }
    }, this);
    larrySpecialText.inventoryName = "Larry Special"

    //text for store inventory
    sellText = this.add.text(790, 250, 'Sell', {
      fontSize: '30px',
      fill: '#fff'
    });

    sellText = this.add.text(730, 360, 'Drag and drop \nfrom inventory', {
      fontSize: '30px',
      fill: '#fff'
    });

    //  A drop zone
    var zone = this.add.zone(850, 400, 400, 180).setRectangleDropZone(400, 180);

    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.input.on('dragenter', function(pointer, gameObject, dropZone) {
      graphics.clear();
      graphics.lineStyle(2, 0x00ffff);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    });
    this.input.on('dragleave', function(pointer, gameObject, dropZone) {
      graphics.clear();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    });

    this.input.on('dragend', function(pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      graphics.clear();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    });
    this.input.on('drop', function(pointer, gameObject, dropZone) {
      console.log(gameObject.name)
      console.log(dropZone.name)
      console.log(inventory[gameObject.name])
      inventory[gameObject.name]['numberOwned'] -= 1;
      money += inventory[gameObject.name]['value']
      redisplay = true
    });


    gameState33.newItem = {}
    let xcoord2 = 175;
    let ycoord2 = 230;
    let itemCount = 0;
    for (a_item of Object.keys(inventory)) {
      if (inventory[a_item]['numberOwned'] > 0) {
        itemCount += 1;
        gameState33.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive();
        gameState33.newItem[a_item].name = `${a_item}`;
        gameState33.newItem[a_item].setScale(.5)
        this.input.setDraggable(gameState33.newItem[a_item]);
        if (itemCount % 6 === 0) {
          xcoord2 = 175;
          ycoord2 += 65
        } else {
          xcoord2 += 65
        }
      }
    }

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    var borderWidth = 2
    gameState33.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    gameState33.tempBackground.visible = false;
    gameState33.tempBackground.setDepth(2);
    gameState33.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
    gameState33.tempBackground2.visible = false;
    gameState33.tempBackground2.setDepth(1);

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
    gameState33.tempText = this.add.text(0, 0, ``, style);
    gameState33.tempText.visible = false;
    gameState33.tempText.setDepth(3);

    this.input.on('pointerover', function(pointer, justOver) {
      if (justOver[0].name && justOver[0].name !== "Mac" && justOver[0].name !== "Al" && justOver[0].name !== "Jimmy") {
        //console.log(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']} \nValue: $${inventory[justOver[0].name]['value']}`)
        gameState33.tempBackground.x = pointer.x + 50;
        gameState33.tempBackground.y = pointer.y - 15;
        gameState33.tempBackground.visible = true;
        gameState33.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState33.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState33.tempBackground2.visible = true;
        gameState33.tempText.visible = true;
        gameState33.tempText.setText(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']} \nValue: $${inventory[justOver[0].name]['value']}`);
        gameState33.tempText.x = gameState33.tempBackground.x;
        gameState33.tempText.y = gameState33.tempBackground.y;
        gameState33.tempBackground.width = gameState33.tempText.width;
        gameState33.tempBackground.height = gameState33.tempText.height;
        gameState33.tempBackground2.width = gameState33.tempText.width + 2 * borderWidth;
        gameState33.tempBackground2.height = gameState33.tempText.height + 2 * borderWidth;
      } else if (justOver[0].inventoryName) {
        gameState33.tempBackground.x = pointer.x + 50;
        gameState33.tempBackground.y = pointer.y - 15;
        gameState33.tempBackground.visible = true;
        gameState33.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState33.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState33.tempBackground2.visible = true;
        gameState33.tempText.visible = true;
        gameState33.tempText.setText(`Effect: ${inventory[justOver[0].inventoryName]['itemEffects']}`);
        gameState33.tempText.x = gameState33.tempBackground.x;
        gameState33.tempText.y = gameState33.tempBackground.y;
        gameState33.tempBackground.width = gameState33.tempText.width;
        gameState33.tempBackground.height = gameState33.tempText.height;
        gameState33.tempBackground2.width = gameState33.tempText.width + 2 * borderWidth;
        gameState33.tempBackground2.height = gameState33.tempText.height + 2 * borderWidth;
      }
    });

    this.input.on('pointerout', function(pointer, justOut) {
      gameState33.tempText.visible = false;
      gameState33.tempBackground.visible = false;
      gameState33.tempBackground2.visible = false;
    });

    //exit button
    gameState33.exit_button = this.add.rectangle(1080, 75, 20, 20, 0xfff);
    gameState33.exit_button.setInteractive()
    gameState33.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      launchParameter = false
      gasStation = 0
      pause = false
    }, this);
    exitText = this.add.text(1072, 61, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

  },
  update: function() {
    if (redisplay) {
      creditText.setText(`Your Cash: ${Math.round(money*100)/100}`)
      for (a_item of Object.keys(inventory)) {
        if (gameState33.newItem[a_item]) {
          gameState33.newItem[a_item].destroy()
        }
      }
      gameState33.newItem = {}
      let xcoord2 = 175;
      let ycoord2 = 230;
      let itemCount = 0;
      for (a_item of Object.keys(inventory)) {
        if (inventory[a_item]['numberOwned'] > 0) {
          itemCount += 1;
          gameState33.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive();
          gameState33.newItem[a_item].name = `${a_item}`;
          gameState33.newItem[a_item].setScale(.5)
          this.input.setDraggable(gameState33.newItem[a_item]);
          if (itemCount % 6 === 0) {
            xcoord2 = 175;
            ycoord2 += 65
          } else {
            xcoord2 += 65
          }
        }
      }
      redisplay = false
    }
  }
});
