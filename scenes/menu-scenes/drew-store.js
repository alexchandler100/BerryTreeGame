const gameState44 = {};

var DrewStore = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "DrewStore"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.audio('chaching', ['assets/audio/chaching.mp3']);

  },
  create: function() {
    drewStoreMarkup = 3;
    //chaching sound effect
    gameState44.chaching = this.sound.add('chaching');
    //background
    gameState44.narrative_background = this.add.rectangle(100, 50, 1000, 500, 0x000).setOrigin(0);
    gameState44.narrative_background.setFillStyle(0x000, 0.8);
    gameState44.narrative_background2 = this.add.rectangle(150, 160, 450, 330, 0xffffff).setOrigin(0);
    gameState44.narrative_background2.setFillStyle(0xffffff, 0.5);

    let style={}

    style.huge = {
      fontSize: '35px',
      fill: '#fff'
    }
    style.large = {
      fontSize: '30px',
      fill: '#fff'
    }
    style.mid = {
      fontSize: '25px',
      fill: '#fff'
    }
    style.small = {
      fontSize: '20px',
      fill: '#fff'
    }
    //text for name of store
    storeText = this.add.text(425, 60, '', style.huge);
    storeText.setText(`Drew's Store`)

    //text for your money
    creditText = this.add.text(250, 120, '', style.mid);
    creditText.setText(`Your Cash: ${Math.round(money*100)/100}`)

    //text for your inventory
    yourInventoryText = this.add.text(250 - 40, 170, '', style.mid);
    yourInventoryText.setText(`Inventory (Drag to Sell)`)

    let buy = {x: 790, y: 90};
    let inc = 40;
    let space = 3;
    //text for store inventory
    storeInventoryText = this.add.text(buy.x - 30, buy.y, 'Click to Buy', style.large);

    //button to buy hat
    flatBillHatText = this.add.text(buy.x - space*inc, buy.y + inc, 'Flat Bill Hat', style.small);
    flatBillHatText.setInteractive().on('pointerup', function() {
      if (money >= equipment['Flat Bill Hat']['value'] * drewStoreMarkup) {
        gameState44.chaching.play()
        money -= equipment['Flat Bill Hat']['value']* drewStoreMarkup;
        equipment["Flat Bill Hat"]['numberOwned'] += 1
        redisplay = true
      }
    }, this);
    flatBillHatText.inventoryName = "Flat Bill Hat"

    //button to buy hat
    alligatorBootsText = this.add.text(buy.x  - space*inc, buy.y + 2 * inc, 'Alligator Boots', style.small);
    alligatorBootsText.setInteractive().on('pointerup', function() {
      if (money >= equipment['Alligator Boots']['value'] * drewStoreMarkup) {
        gameState44.chaching.play()
        money -= equipment['Alligator Boots']['value'] * drewStoreMarkup;
        equipment["Alligator Boots"]['numberOwned'] += 1
        redisplay = true
      }
    }, this);
    alligatorBootsText.inventoryName = "Alligator Boots"

/*
    //button to buy kanyeSunglasses
    kanyeSunglassesText = this.add.text(buy.x  - space*inc, buy.y + 3 * inc, 'Kanye Sunglasses', style.mid);
    kanyeSunglassesText.setInteractive().on('pointerup', function() {
      if (money >= equipment['Kanye Sunglasses']['value']) {
        gameState44.chaching.play()
        money -= equipment['Kanye Sunglasses']['value'];
        equipment["Kanye Sunglasses"]['numberOwned'] += 1
        redisplay = true
      }
    }, this);
    kanyeSunglassesText.inventoryName = "Kanye Sunglasses"

    //button to buy goldChain
    goldChainText = this.add.text(buy.x  - space*inc, buy.y + 4 * inc, 'Gold Chain', style.mid);
    goldChainText.setInteractive().on('pointerup', function() {
      if (money >= equipment['Gold Chain']['value']) {
        gameState44.chaching.play()
        money -= equipment['Gold Chain']['value'];
        equipment["Gold Chain"]['numberOwned'] += 1
        redisplay = true
      }
    }, this);
    goldChainText.inventoryName = "Gold Chain"
    */



    //button to buy rnd1
    rnd1equip = generateRandomEquipment()
    rnd1Text = this.add.text(buy.x  - space*inc, buy.y + 3 * inc, rnd1equip['name'], {
      fontSize: '20px',
      fill: playerColorsEquip[rnd1equip['character']]
    });
    rnd1Text.setInteractive().on('pointerup', function() {
      if (money >= rnd1equip['value']* drewStoreMarkup) {
        gameState44.chaching.play()
        money -= rnd1equip['value'] * drewStoreMarkup;
        if (equipment[rnd1equip['name']]){
          rnd1equip['name'] = rnd1equip['name'] + ' '
          equipment[rnd1equip['name']] = rnd1equip
          //equipment[rnd1equip['name']]['value'] = Math.floor(equipment[rnd1equip['name']]['value']/2)
        } else {
          equipment[rnd1equip['name']] = rnd1equip
          //equipment[rnd1equip['name']]['value'] = Math.floor(equipment[rnd1equip['name']]['value']/2)
        }
        redisplay = true
      }
    }, this);
    rnd1Text.inventoryName = rnd1equip['name']

    //button to buy rnd2
    rnd2equip = generateRandomEquipment()
    rnd2Text = this.add.text(buy.x  - space*inc, buy.y + 4 * inc, rnd2equip['name'], {
      fontSize: '20px',
      fill: playerColorsEquip[rnd2equip['character']]
    });
    rnd2Text.setInteractive().on('pointerup', function() {
      if (money >= rnd2equip['value'] * drewStoreMarkup) {
        gameState44.chaching.play()
        money -= rnd2equip['value'] * drewStoreMarkup;
        if (equipment[rnd2equip['name']]){
          rnd2equip['name'] = rnd2equip['name'] + ' '
          equipment[rnd2equip['name']] = rnd2equip
          //equipment[rnd2equip['name']]['value'] = Math.floor(equipment[rnd2equip['name']]['value']/2)
        } else {
          equipment[rnd2equip['name']] = rnd2equip
          //equipment[rnd2equip['name']]['value'] = Math.floor(equipment[rnd2equip['name']]['value']/2)
        }
        redisplay = true
      }
    }, this);
    rnd2Text.inventoryName = rnd2equip['name']

    //text for store inventory
    sellText = this.add.text(buy.x, buy.y + 5.5 * inc, 'Sell', style.large);

    sellText = this.add.text(buy.x  - (space-1.2)*inc, buy.y + 7.6 * inc, 'Drag and drop \nfrom inventory', style.large);

    //  A drop zone
    var zone = this.add.zone(850, buy.y + 8.5 * inc, 400, 140).setRectangleDropZone(400, 140);

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
      equipment[gameObject._text]['numberOwned'] -= 1;
      money += equipment[gameObject._text]['value']
      redisplay = true
    });


    gameState44.newText = {}
    let xcoord44 = 175;
    let ycoord44 = 230;
    for (a_item of Object.keys(equipment)) {
      let unequipped = equipment[a_item]['numberOwned'] - equipment[a_item]['equipped']
      if (unequipped > 0) {
        for (let i = 0; i < unequipped; i++) {
          //console.log(a_item)
          gameState44.newText[a_item] = this.add.text(xcoord44, ycoord44, `${a_item}`, {
            fontSize: '20px',
            fill: playerColorsEquip[equipment[a_item]['character']]
          }).setDepth(1);
          gameState44.newText[a_item].inventoryName = 'my_equipment'
          gameState44.newText[a_item].setInteractive();
          this.input.setDraggable(gameState44.newText[a_item]);
          if (ycoord44 >= 400) {
            xcoord44 = 375
            ycoord44 = 230
          } else {
            ycoord44 += 20
          }
        }
      }
    }

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    var borderWidth = 2
    gameState44.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    gameState44.tempBackground.visible = false;
    gameState44.tempBackground.setDepth(2);
    gameState44.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
    gameState44.tempBackground2.visible = false;
    gameState44.tempBackground2.setDepth(1);

    var styled = {
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
    gameState44.tempText = this.add.text(0, 0, ``, styled);
    gameState44.tempText.visible = false;
    gameState44.tempText.setDepth(3);

    this.input.on('pointerover', function(pointer, justOver) {
      console.log(justOver[0])
      if (justOver[0].inventoryName === rnd1equip['name']){
        gameState44.tempBackground.x = pointer.x + 50;
        gameState44.tempBackground.y = pointer.y - 15;
        gameState44.tempBackground.visible = true;
        gameState44.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState44.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState44.tempBackground2.visible = true;
        gameState44.tempText.visible = true;
        gameState44.tempText.setText(`Type: ${rnd1equip['type']} \nDef: ${rnd1equip['def']} \nEffect: ${rnd1equip['effect']} \nvalue: $${rnd1equip['value'] * drewStoreMarkup}`);
        gameState44.tempText.x = gameState44.tempBackground.x;
        gameState44.tempText.y = gameState44.tempBackground.y;
        gameState44.tempBackground.width = gameState44.tempText.width;
        gameState44.tempBackground.height = gameState44.tempText.height;
        gameState44.tempBackground2.width = gameState44.tempText.width + 2 * borderWidth;
        gameState44.tempBackground2.height = gameState44.tempText.height + 2 * borderWidth;
      } else if (justOver[0].inventoryName === rnd2equip['name']){
        gameState44.tempBackground.x = pointer.x + 50;
        gameState44.tempBackground.y = pointer.y - 15;
        gameState44.tempBackground.visible = true;
        gameState44.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState44.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState44.tempBackground2.visible = true;
        gameState44.tempText.visible = true;
        gameState44.tempText.setText(`Type: ${rnd2equip['type']} \nDef: ${rnd2equip['def']} \nEffect: ${rnd2equip['effect']} \nvalue: $${rnd2equip['value'] * drewStoreMarkup}`);
        gameState44.tempText.x = gameState44.tempBackground.x;
        gameState44.tempText.y = gameState44.tempBackground.y;
        gameState44.tempBackground.width = gameState44.tempText.width;
        gameState44.tempBackground.height = gameState44.tempText.height;
        gameState44.tempBackground2.width = gameState44.tempText.width + 2 * borderWidth;
        gameState44.tempBackground2.height = gameState44.tempText.height + 2 * borderWidth;
      } else if (justOver[0]._text && justOver[0].inventoryName === 'my_equipment') {
        //console.log(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']} \nValue: $${inventory[justOver[0].name]['value']}`)
        gameState44.tempBackground.x = pointer.x + 50;
        gameState44.tempBackground.y = pointer.y - 15;
        gameState44.tempBackground.visible = true;
        gameState44.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState44.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState44.tempBackground2.visible = true;
        gameState44.tempText.visible = true;
        gameState44.tempText.setText(`Type: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value']}`);
        gameState44.tempText.x = gameState44.tempBackground.x;
        gameState44.tempText.y = gameState44.tempBackground.y;
        gameState44.tempBackground.width = gameState44.tempText.width;
        gameState44.tempBackground.height = gameState44.tempText.height;
        gameState44.tempBackground2.width = gameState44.tempText.width + 2 * borderWidth;
        gameState44.tempBackground2.height = gameState44.tempText.height + 2 * borderWidth;
      } else if (justOver[0]._text) {
        //console.log(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']} \nValue: $${inventory[justOver[0].name]['value']}`)
        gameState44.tempBackground.x = pointer.x + 50;
        gameState44.tempBackground.y = pointer.y - 15;
        gameState44.tempBackground.visible = true;
        gameState44.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState44.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState44.tempBackground2.visible = true;
        gameState44.tempText.visible = true;
        gameState44.tempText.setText(`Type: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value'] * drewStoreMarkup}`);
        gameState44.tempText.x = gameState44.tempBackground.x;
        gameState44.tempText.y = gameState44.tempBackground.y;
        gameState44.tempBackground.width = gameState44.tempText.width;
        gameState44.tempBackground.height = gameState44.tempText.height;
        gameState44.tempBackground2.width = gameState44.tempText.width + 2 * borderWidth;
        gameState44.tempBackground2.height = gameState44.tempText.height + 2 * borderWidth;
      }
    });

    this.input.on('pointerout', function(pointer, justOut) {
      gameState44.tempText.visible = false;
      gameState44.tempBackground.visible = false;
      gameState44.tempBackground2.visible = false;
    });

    //exit button
    gameState44.exit_button = this.add.rectangle(1080, 75, 20, 20, 0xfff);
    gameState44.exit_button.setInteractive()
    gameState44.exit_button.on('pointerup', function() {
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
      for (a_item of Object.keys(equipment)) {
        if (gameState44.newText[a_item]) {
          gameState44.newText[a_item].destroy()
        }
      }
      gameState44.newText = {}
      let xcoord44 = 175;
      let ycoord44 = 230;
      for (a_item of Object.keys(equipment)) {
        let unequipped = equipment[a_item]['numberOwned'] - equipment[a_item]['equipped']
        if (unequipped > 0) {
          for (let i = 0; i < unequipped; i++) {
            //console.log(a_item)
            gameState44.newText[a_item] = this.add.text(xcoord44, ycoord44, `${a_item}`, {
              fontSize: '20px',
              fill: playerColorsEquip[equipment[a_item]['character']]
            }).setDepth(1);
            gameState44.newText[a_item].setInteractive();
            this.input.setDraggable(gameState44.newText[a_item]);
            if (ycoord44 >= 400) {
              xcoord44 = 375
              ycoord44 = 230
            } else {
              ycoord44 += 20
            }
          }
        }
      }
      redisplay = false
    }
  }
});
