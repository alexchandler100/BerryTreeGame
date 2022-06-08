var GasStation = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "GasStation"
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
    this.chaching = this.sound.add('chaching');
    //background
    this.narrative_background = this.add.rectangle(100, 50, 1000, 500, 0x000).setOrigin(0);
    this.narrative_background.setStrokeStyle(4, 0xb39c0e);
    this.narrative_background.setFillStyle(0x000, 0.8);
    this.narrative_background2 = this.add.rectangle(150, 160, 450, 330, 0xffffff).setOrigin(0);
    this.narrative_background2.setStrokeStyle(4, 0xb39c0e);
    this.narrative_background2.setFillStyle(0xffffff, 0.5);

    //text for name of store
    storeText = this.add.text(425, 60, '', {
      fontSize: '35px',
      fill: '#fff'
    });
    storeText.setText(`MARATHON STATION`)

    //text for your money
    creditText = this.add.text(200, 120, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    creditText.setText(`Your Cash: ${Math.round(money*100)/100}     Gallons of Gas: ${Math.round(gas*100)/100} `)

    //text for your inventory
    yourInventoryText = this.add.text(200, 170, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    yourInventoryText.setText(`Your Inventory:`)

    //text for store inventory
    storeInventoryText = this.add.text(650, 120, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    yourInventoryText.setText(`Your Inventory:`)


    //button to buy hamms
    hammsText = this.add.text(670, 200, 'Hamms: 2 for 3.50$', {
      fontSize: '25px',
      fill: '#009bfe'
    });
    hammsText.setInteractive().on('pointerup', function() {
      if (money >= 3.5) {
        this.chaching.play()
        money -= 3.5;
        inventory["Hamms"]['numberOwned']+=2
        redisplay=true
      }
    }, this);
    hammsText.inventoryName="Hamms"

    monsterText = this.add.text(670, 250, 'monster: 2 for 3$', {
      fontSize: '25px',
      fill: '#24ff00',
    });
    monsterText.setInteractive().on('pointerup', function() {
      if (money >= 3) {
        this.chaching.play()
        money -= 3;
        inventory["Monster"]['numberOwned']+=2
        redisplay=true
      }
    }, this);
    monsterText.inventoryName="Monster"

    gatoradeText = this.add.text(670, 300, 'gatorade: 2 for 3.50$', {
      fontSize: '25px',
      fill: '#f39c12'
    });
    gatoradeText.setInteractive().on('pointerup', function() {
      if (money >= 3.5) {
        this.chaching.play()
        money -= 3.5;
        inventory["Gatorade"]['numberOwned']+=2
        redisplay=true
      }
    }, this);
    gatoradeText.inventoryName="Gatorade"

    andycappsText = this.add.text(670, 350, "Andy Capp's Hot Fries: 1.50$", {
      fontSize: '25px',
      fill: '#c91e1e'
    });
    andycappsText.setInteractive().on('pointerup', function() {
      if (money >= 1.5) {
        this.chaching.play()
        money -= 1.5;
        inventory["Andy Capp's Hot Fries"]['numberOwned'] += 1
        redisplay=true;
      }
    }, this);
    andycappsText.inventoryName="Andy Capp's Hot Fries"

    gasText = this.add.text(670, 400, 'gas: 1 gallon for 2.59$', {
      fontSize: '25px',
      fill: '#005f6a'
    });
    gasText.setInteractive().on('pointerup', function() {
      if (money >= 2.59) {
        this.chaching.play()
        money -= 2.59;
        gas += 1
        redisplay=true
      }
    }, this);
    gasText.inventoryName="Gas"

    jerkyText = this.add.text(670, 450, 'Jerky: 7.99$', {
      fontSize: '25px',
      fill: '#4d392c'
    });
    jerkyText.setInteractive().on('pointerup', function() {
      if (money >= 7.99) {
        this.chaching.play()
        money -= 7.99;
        items.push("Jerky");
        jerkyText.destroy();
        this.tempText.visible=false;
        this.tempBackground.visible=false;
        redisplay=true;
      }
    }, this);
    jerkyText.inventoryName="Jerky"

    this.newItem = {}
    let xcoord2 = 175;
    let ycoord2 = 230;
    let itemCount = 0;
    for (a_item of Object.keys(inventory)) {
      if (inventory[a_item]['numberOwned'] > 0) {
        itemCount += 1;
        this.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive();
        this.newItem[a_item].name = `${a_item}`;
        this.newItem[a_item].setScale(.5)
        this.input.setDraggable(this.newItem[a_item]);
        if (itemCount % 6 === 0) {
          xcoord2 = 175;
          ycoord2 += 65
        } else {
          xcoord2 += 65
        }
      }
    }

    var borderWidth = 2
    this.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    this.tempBackground.visible = false;
    this.tempBackground.setDepth(2);
    this.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
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

    this.input.on('pointerover', function (pointer, justOver) {
      if (justOver[0].name && justOver[0].name!=="Mac" && justOver[0].name!=="Al" && justOver[0].name!=="Jimmy"){
        console.log(justOver[0].name)
        this.tempBackground.x=pointer.x+50;
        this.tempBackground.y=pointer.y-15;
        this.tempBackground.visible=true;
        this.tempBackground2.x = pointer.x + 50 - borderWidth;
        this.tempBackground2.y = pointer.y - 15 - borderWidth;
        this.tempBackground2.visible = true;
        this.tempText.visible=true;
        this.tempText.setText(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']}  \nValue: $${inventory[justOver[0].name]['value']}`);
        this.tempText.x=this.tempBackground.x;
        this.tempText.y=this.tempBackground.y;
        this.tempBackground.width=this.tempText.width;
        this.tempBackground.height=this.tempText.height;
        this.tempBackground2.width = this.tempText.width + 2 * borderWidth;
        this.tempBackground2.height = this.tempText.height + 2 * borderWidth;
      } else if (justOver[0].inventoryName){
        console.log(justOver[0].inventoryName)
        this.tempBackground.x=pointer.x+50;
        this.tempBackground.y=pointer.y-15;
        this.tempBackground.visible=true;
        this.tempBackground2.x = pointer.x + 50 - borderWidth;
        this.tempBackground2.y = pointer.y - 15 - borderWidth;
        this.tempBackground2.visible = true;
        this.tempText.visible=true;
        if (justOver[0].inventoryName!=='Gas' && justOver[0].inventoryName!=='Jerky'){
          this.tempText.setText(`Effect: ${inventory[justOver[0].inventoryName]['itemEffects']}`);
        } else if (justOver[0].inventoryName==='Gas'){
          this.tempText.setText(`Effect: for use in combustion \nengine or possibly to huff`);
        } else if (justOver[0].inventoryName==='Jerky'){
          this.tempText.setText(`Effect: the jerky here sucks \nbut dogs like it at least ...`);
        }

        this.tempText.x=this.tempBackground.x;
        this.tempText.y=this.tempBackground.y;
        this.tempBackground.width=this.tempText.width;
        this.tempBackground.height=this.tempText.height;
        this.tempBackground2.width = this.tempText.width + 2 * borderWidth;
        this.tempBackground2.height = this.tempText.height + 2 * borderWidth;
      }
  }, this);

  this.input.on('pointerout', function (pointer, justOut) {
      this.tempText.visible=false;
      this.tempBackground.visible=false;
      this.tempBackground2.visible=false;
  }, this);

    //exit button
    this.exit_button = this.add.rectangle(1080, 75, 20, 20, 0xfff);
    this.exit_button.setInteractive()
    this.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      launchParameter=false
      gasStation=0
      pause = false
    }, this);
    exitText = this.add.text(1072, 61, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

  },
  update: function() {
    if (redisplay){
      creditText.setText(`Your Cash: ${Math.round(money*100)/100}     Gallons of Gas: ${Math.round(gas*100)/100} `)
      for (a_item of Object.keys(inventory)) {
        if (this.newItem[a_item])
        {this.newItem[a_item].destroy()}
      }
      this.newItem = {}
      let xcoord2 = 175;
      let ycoord2 = 230;
      let itemCount = 0;
      for (a_item of Object.keys(inventory)) {
        if (inventory[a_item]['numberOwned'] > 0) {
          itemCount += 1;
          this.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive();
          this.newItem[a_item].name = `${a_item}`;
          this.newItem[a_item].setScale(.5)
          this.input.setDraggable(this.newItem[a_item]);
          if (itemCount % 6 === 0) {
            xcoord2 = 175;
            ycoord2 += 65
          } else {
            xcoord2 += 65
          }
        }
      }
      redisplay=false
    }
  }
});
