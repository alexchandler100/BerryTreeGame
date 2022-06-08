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
  displayContainer: function() {
    //console.log(this.colorIndex)
    this.background = {}
    //this.backgroundColor = {}
    let xcoord44 = this.displayEquipmentTopLeft.x;
    let ycoord44 = this.displayEquipmentTopLeft.y;
    //for (let i = 0; i < this.numberOfSlots; i++) {
      //if (this.backgroundColor[i]) {
        //this.backgroundColor[i].visible = false
      //}
    //}
    for (let i = 0; i < this.numberOfSlots; i++) {
      //if (Object.keys(this.colorIndex).includes(String(i))) {
        //this.backgroundColor[i] = this.add.rectangle(xcoord44, ycoord44, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, this.colorIndex[i]).setDepth(1);
      //}
      this.background[i] = this.add.image(xcoord44, ycoord44, 'background').setDepth(1);
      this.background[i].displayHeight = this.cellSize
      this.background[i].displayWidth = this.cellSize
      if (xcoord44 >= this.displayEquipmentRight) {
        xcoord44 = this.displayEquipmentTopLeft.x
        ycoord44 += this.cellSize + this.gapSize
      } else {
        xcoord44 += this.cellSize + this.gapSize
      }
    }
    this.colorIndex = {}
  },
  displayEquipment: function() {
    for (ii of Object.keys(this.backgroundColor)){
      this.backgroundColor[ii].destroy()
    }
    console.log(this.newText)
    for (jjj of Object.keys(this.newText)){
      this.newText[jjj].destroy()
    }
    this.newText = {}
    this.background = {}
    let xcoord44 = this.displayEquipmentTopLeft.x;
    let ycoord44 = this.displayEquipmentTopLeft.y;
    let jj = 0;
    for (a_item of Object.keys(equipment)) {
      let unequipped = equipment[a_item]['numberOwned'] - equipment[a_item]['equipped']
      if (unequipped > 0) {
        for (let i = 0; i < unequipped; i++) {
          if (i < this.numberOfSlots) {
            let name_decoded = equipment[a_item]['base'].replace(new RegExp(' ', 'g'), '');
            if (checkFileExist("assets/images/equipmentIcons/" + name_decoded + ".png")) {
              //console.log(name_decoded + ' exists in file system')
              this.newText[a_item] = this.add.image(xcoord44, ycoord44, name_decoded).setDepth(5);
            } else if (equipment[a_item]['type'].slice(-5) === 'upper') {
              this.newText[a_item] = this.add.image(xcoord44, ycoord44, 'armor').setDepth(5);
            } else if (equipment[a_item]['type'].slice(-5) === 'lower') {
              this.newText[a_item] = this.add.image(xcoord44, ycoord44, 'armor_pants').setDepth(5);
            } else if (equipment[a_item]['type'] === 'accessory') {
              if (equipment[a_item]['base'] === 'Belt') {
                this.newText[a_item] = this.add.image(xcoord44, ycoord44, 'Belt').setDepth(5);
              } else if (equipment[a_item]['base'] === 'Ring') {
                this.newText[a_item] = this.add.image(xcoord44, ycoord44, 'Ring').setDepth(5);
              } else {
                this.newText[a_item] = this.add.image(xcoord44, ycoord44, 'accessoryIcon').setDepth(5);
              }
            } else {
              this.newText[a_item] = this.add.image(xcoord44, ycoord44, 'armor').setDepth(5);
            }
            this.newText[a_item].inventoryName = 'my_equipment'
            this.newText[a_item].displayHeight = this.cellSize
            this.newText[a_item].displayWidth = this.cellSize
            this.newText[a_item]._text = a_item
            this.newText[a_item].setInteractive();
            this.input.setDraggable(this.newText[a_item]);
            //set background color
            this.backgroundColor[jj] = this.add.rectangle(xcoord44, ycoord44, this.cellSize + this.gapSize / 2, this.cellSize + this.gapSize / 2, playerColors[equipment[a_item]['character']]).setDepth(1);
            jj += 1
            if (xcoord44 >= this.displayEquipmentRight) {
              xcoord44 = this.displayEquipmentTopLeft.x
              ycoord44 += this.cellSize + this.gapSize
            } else {
              xcoord44 += this.cellSize + this.gapSize
            }
          }
        }
      }
    }
  },
  displayPage: function() {
    //creating menu content
    this.displayEquipment()
    this.displayContainer()
  },
  preload: function() {
    this.load.audio('chaching', ['assets/audio/chaching.mp3']);
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
  },
  create: function() {
    this.backgroundColor={}
    this.colorIndex = {}
    this.newText = {}
    this.background = {}
    this.numberOfSlots = 35;
    this.storeCellSize = 70;
    this.cellSize = 50;
    this.gapSize = 5;
    this.displayEquipmentTopLeft = {
      x: 195,
      y: 230
    }
    this.displayEquipmentRight = 480
    drewStoreMarkup = 3;
    //chaching sound effect
    this.chaching = this.sound.add('chaching');
    //background
    this.narrative_background = this.add.rectangle(100, 50, 1000, 500, 0x000).setOrigin(0);
    this.narrative_background.setStrokeStyle(4, 0xb39c0e);
    this.narrative_background.setFillStyle(0x000, 0.8);
    this.narrative_background2 = this.add.rectangle(150, 160, 420, 330, 0xffffff).setOrigin(0);
    this.narrative_background2.setStrokeStyle(4, 0xb39c0e);
    this.narrative_background2.setFillStyle(0xffffff, 0.5);

    this.buy_background2 = this.add.rectangle(850, 225, 400, 225, 0xffffff).setOrigin(0.5);
    this.buy_background2.setStrokeStyle(4, 0xb39c0e);
    this.buy_background2.setFillStyle(0xffffff, 0.5);

    //exit button
    this.exit_button = this.add.rectangle(1080, 75, 20, 20, 0xfff);
    this.exit_button.setInteractive()
    this.exit_button.on('pointerup', function() {
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
    this.exit_button._text = 'x'

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
    yourInventoryText = this.add.text(250 - 70, 170, '', style.mid);
    yourInventoryText.setText(`Inventory (Drag to Sell)`)

    let buy = {x: 860, y: 120};
    let inc = 80;
    //text for store inventory
    storeInventoryText = this.add.text(buy.x - inc - 30, buy.y, 'Click to Buy', style.large);

    //button to buy hat
    this.backgroundFBH = this.add.image(buy.x - inc, buy.y + inc, 'background');
    this.backgroundFBH.displayHeight = this.storeCellSize
    this.backgroundFBH.displayWidth = this.storeCellSize
    flatBillHatText = this.add.image(buy.x - inc, buy.y + inc, 'FlatBillHat');
    flatBillHatText._text = 'Flat Bill Hat'
    flatBillHatText.displayWidth = this.storeCellSize
    flatBillHatText.displayHeight = this.storeCellSize
    flatBillHatText.setInteractive().on('pointerup', function() {
      if (money >= equipment['Flat Bill Hat']['value'] * drewStoreMarkup) {
        this.chaching.play()
        money -= equipment['Flat Bill Hat']['value']* drewStoreMarkup;
        equipment["Flat Bill Hat"]['numberOwned'] += 1
        redisplay = true
      }
    }, this);
    flatBillHatText.inventoryName = "Flat Bill Hat"

    //button to buy boots
    this.backgroundAB = this.add.image(buy.x  +inc-10, buy.y +  inc, 'background');
    this.backgroundAB.displayHeight = this.storeCellSize
    this.backgroundAB.displayWidth = this.storeCellSize
    alligatorBootsText = this.add.image(buy.x  +inc-10, buy.y +  inc, 'AlligatorBoots', style.small);
    alligatorBootsText._text = 'Alligator Boots'
    alligatorBootsText.displayWidth = this.storeCellSize
    alligatorBootsText.displayHeight = this.storeCellSize
    alligatorBootsText.setInteractive().on('pointerup', function() {
      if (money >= equipment['Alligator Boots']['value'] * drewStoreMarkup) {
        this.chaching.play()
        money -= equipment['Alligator Boots']['value'] * drewStoreMarkup;
        equipment["Alligator Boots"]['numberOwned'] += 1
        redisplay = true
      }
    }, this);
    alligatorBootsText.inventoryName = "Alligator Boots"

    //button to buy rnd1
    rnd1equip = generateRandomEquipment()
    let rnd1equip_name_decoded = rnd1equip['base'].replace(new RegExp(' ', 'g'), '');
    this.backgroundR1 = this.add.image(buy.x  - inc, buy.y + 2 * inc, 'background');
    this.backgroundR1.displayHeight = this.storeCellSize
    this.backgroundR1.displayWidth = this.storeCellSize
    rnd1Text = this.add.image(buy.x  - inc, buy.y + 2 * inc, rnd1equip_name_decoded);
    rnd1Text.displayWidth = this.storeCellSize
    rnd1Text.displayHeight = this.storeCellSize
    rnd1Text.setInteractive().on('pointerup', function() {
      if (money >= rnd1equip['value']* drewStoreMarkup) {
        this.chaching.play()
        money -= rnd1equip['value'] * drewStoreMarkup;
        if (equipment[rnd1equip['name']]){
          rnd1equip['name'] = rnd1equip['name'] + ' '
          equipment[rnd1equip['name']] = rnd1equip
        } else {
          equipment[rnd1equip['name']] = rnd1equip
        }
        redisplay = true
      }
    }, this);
    rnd1Text.inventoryName = rnd1equip['name']

    //button to buy rnd2
    rnd2equip = generateRandomEquipment()
    let rnd2equip_name_decoded = rnd2equip['base'].replace(new RegExp(' ', 'g'), '');
    this.backgroundR2 = this.add.image(buy.x + inc-10, buy.y + 2 * inc,  'background');
    this.backgroundR2.displayHeight = this.storeCellSize
    this.backgroundR2.displayWidth = this.storeCellSize
    rnd2Text = this.add.image(buy.x + inc-10, buy.y + 2 * inc,  rnd2equip_name_decoded);
    rnd2Text.displayWidth = this.storeCellSize
    rnd2Text.displayHeight = this.storeCellSize
    rnd2Text.setInteractive().on('pointerup', function() {
      if (money >= rnd2equip['value'] * drewStoreMarkup) {
        this.chaching.play()
        money -= rnd2equip['value'] * drewStoreMarkup;
        if (equipment[rnd2equip['name']]){
          rnd2equip['name'] = rnd2equip['name'] + ' '
          equipment[rnd2equip['name']] = rnd2equip
        } else {
          equipment[rnd2equip['name']] = rnd2equip
        }
        redisplay = true
      }
    }, this);
    rnd2Text.inventoryName = rnd2equip['name']

    //text for store inventory
    sellText = this.add.text(buy.x - 60, buy.y + 242, 'Sell', style.large);

    sellText = this.add.text(buy.x  - 135, buy.y + 282, 'Drag and drop \nfrom inventory', style.large);

    //  A drop zone
    var zone = this.add.zone(850, buy.y + 300, 400, 140).setRectangleDropZone(400, 140);
    zone._text = 'dropZone'
    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(4, 0xb39c0e);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);


    this.input.on('dragenter', function(pointer, gameObject, dropZone) {
      graphics.clear();
      graphics.lineStyle(2, 0x00ffff);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    }, this);
    this.input.on('dragleave', function(pointer, gameObject, dropZone) {
      graphics.clear();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    }, this);

    this.input.on('dragend', function(pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      graphics.clear();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    }, this);
    this.input.on('drop', function(pointer, gameObject, dropZone) {
      console.log(gameObject)
      equipment[gameObject._text]['numberOwned'] -= 1;
      money += equipment[gameObject._text]['value']
      this.chaching.play()
      gameObject.destroy()
      redisplay = true
    }, this);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }, this);

    var borderWidth = 2
    this.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    this.tempBackground.visible = false;
    this.tempBackground.setDepth(12);
    this.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
    this.tempBackground2.visible = false;
    this.tempBackground2.setDepth(11);

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
    this.tempText = this.add.text(0, 0, ``, styled);
    this.tempText.visible = false;
    this.tempText.setDepth(13);

    this.input.on('pointerover', function(pointer, justOver) {
      console.log(justOver[0])
      if (justOver[0]._text!=='dropZone' && justOver[0]._text!=='x'){
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
        if (justOver[0].inventoryName === rnd1equip['name']){
          this.tempText.setText(`Name: ${rnd1equip['name']} \nType: ${rnd1equip['type']} \nDef: ${rnd1equip['def']} \nEffect: ${rnd1equip['effect']} \nvalue: $${rnd1equip['value'] * drewStoreMarkup}`);
          } else if (justOver[0].inventoryName === rnd2equip['name']){
          this.tempText.setText(`Name: ${rnd2equip['name']} \nType: ${rnd2equip['type']} \nDef: ${rnd2equip['def']} \nEffect: ${rnd2equip['effect']} \nvalue: $${rnd2equip['value'] * drewStoreMarkup}`);
        } else if (justOver[0]._text && justOver[0].inventoryName === 'my_equipment') {
          this.tempText.setText(`Name: ${equipment[justOver[0]._text]['name']} \nType: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value']}`);
        } else if (justOver[0]._text) {
          this.tempText.setText(`Name: ${equipment[justOver[0]._text]['name']} \nType: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value'] * drewStoreMarkup}`);
        }
        this.tempText.x = this.tempBackground.x;
        this.tempText.y = this.tempBackground.y;
        this.tempBackground.width = this.tempText.width;
        this.tempBackground.height = this.tempText.height;
        this.tempBackground2.width = this.tempText.width + 2 * borderWidth;
        this.tempBackground2.height = this.tempText.height + 2 * borderWidth;
      }
    }, this);

    this.input.on('pointerout', function(pointer, justOut) {
      this.tempText.visible = false;
      this.tempBackground.visible = false;
      this.tempBackground2.visible = false;
    }, this);


    this.displayPage()
  },
  update: function() {
    if (redisplay) {
      creditText.setText(`Your Cash: ${Math.round(money*100)/100}`)
      this.displayPage()
      redisplay = false
    }
  }
});
