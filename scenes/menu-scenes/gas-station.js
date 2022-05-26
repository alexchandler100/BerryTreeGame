const gameState3 = {};

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
    gameState3.chaching = this.sound.add('chaching');
    //background
    gameState3.narrative_background = this.add.rectangle(100, 50, 1000, 500, 0x000).setOrigin(0);
    gameState3.narrative_background.setFillStyle(0x000, 0.8);
    gameState3.narrative_background2 = this.add.rectangle(150, 160, 450, 330, 0xffffff).setOrigin(0);
    gameState3.narrative_background2.setFillStyle(0xffffff, 0.5);

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
        gameState3.chaching.play()
        money -= 3.5;
        inventory["Hamms"]['numberOwned']+=2
        redisplayItems=true
      }
    }, this);
    hammsText.inventoryName="Hamms"

    monsterText = this.add.text(670, 250, 'monster: 2 for 3$', {
      fontSize: '25px',
      fill: '#24ff00',
    });
    monsterText.setInteractive().on('pointerup', function() {
      if (money >= 3) {
        gameState3.chaching.play()
        money -= 3;
        inventory["Monster"]['numberOwned']+=2
        redisplayItems=true
      }
    }, this);
    monsterText.inventoryName="Monster"

    gatoradeText = this.add.text(670, 300, 'gatorade: 2 for 3.50$', {
      fontSize: '25px',
      fill: '#f39c12'
    });
    gatoradeText.setInteractive().on('pointerup', function() {
      if (money >= 3.5) {
        gameState3.chaching.play()
        money -= 3.5;
        inventory["Gatorade"]['numberOwned']+=2
        redisplayItems=true
      }
    }, this);
    gatoradeText.inventoryName="Gatorade"

    andycappsText = this.add.text(670, 350, "Andy Capp's Hot Fries: 1.50$", {
      fontSize: '25px',
      fill: '#c91e1e'
    });
    andycappsText.setInteractive().on('pointerup', function() {
      if (money >= 1.5) {
        gameState3.chaching.play()
        money -= 1.5;
        inventory["Andy Capp's Hot Fries"]['numberOwned'] += 1
        redisplayItems=true;
      }
    }, this);
    andycappsText.inventoryName="Andy Capp's Hot Fries"

    gasText = this.add.text(670, 400, 'gas: 1 gallon for 2.59$', {
      fontSize: '25px',
      fill: '#005f6a'
    });
    gasText.setInteractive().on('pointerup', function() {
      if (money >= 2.59) {
        gameState3.chaching.play()
        money -= 2.59;
        gas += 1
        redisplayItems=true
      }
    }, this);
    gasText.inventoryName="Gas"

    jerkyText = this.add.text(670, 450, 'Jerky: 7.99$', {
      fontSize: '25px',
      fill: '#4d392c'
    });
    jerkyText.setInteractive().on('pointerup', function() {
      if (money >= 7.99) {
        gameState3.chaching.play()
        money -= 7.99;
        items.push("Jerky");
        jerkyText.destroy();
        gameState3.tempText.visible=false;
        gameState3.tempBackground.visible=false;
        redisplayItems=true;
      }
    }, this);
    jerkyText.inventoryName="Jerky"

    gameState3.newItem = {}
    let xcoord2 = 175;
    let ycoord2 = 230;
    let itemCount = 0;
    for (a_item of Object.keys(inventory)) {
      if (inventory[a_item]['numberOwned'] > 0) {
        itemCount += 1;
        gameState3.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive();
        gameState3.newItem[a_item].name = `${a_item}`;
        gameState3.newItem[a_item].setScale(.5)
        this.input.setDraggable(gameState3.newItem[a_item]);
        if (itemCount % 6 === 0) {
          xcoord2 = 175;
          ycoord2 += 65
        } else {
          xcoord2 += 65
        }
      }
    }

    var borderWidth = 2
    gameState3.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
    gameState3.tempBackground.visible = false;
    gameState3.tempBackground.setDepth(2);
    gameState3.tempBackground2 = this.add.rectangle(0, 0, 400 + 2 * borderWidth, 200 + 2 * borderWidth, 0xb39c0e).setOrigin(0, 0);
    gameState3.tempBackground2.visible = false;
    gameState3.tempBackground2.setDepth(1);

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
    gameState3.tempText = this.add.text(0, 0, ``, style);
    gameState3.tempText.visible = false;
    gameState3.tempText.setDepth(3);

    this.input.on('pointerover', function (pointer, justOver) {
      if (justOver[0].name && justOver[0].name!=="Mac" && justOver[0].name!=="Al" && justOver[0].name!=="Jimmy"){
        console.log(justOver[0].name)
        gameState3.tempBackground.x=pointer.x+50;
        gameState3.tempBackground.y=pointer.y-15;
        gameState3.tempBackground.visible=true;
        gameState3.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState3.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState3.tempBackground2.visible = true;
        gameState3.tempText.visible=true;
        gameState3.tempText.setText(`Name: ${justOver[0].name} \nQuantity: ${inventory[justOver[0].name]['numberOwned']} \nEffect: ${inventory[justOver[0].name]['itemEffects']}  \nValue: $${inventory[justOver[0].name]['value']}`);
        gameState3.tempText.x=gameState3.tempBackground.x;
        gameState3.tempText.y=gameState3.tempBackground.y;
        gameState3.tempBackground.width=gameState3.tempText.width;
        gameState3.tempBackground.height=gameState3.tempText.height;
        gameState3.tempBackground2.width = gameState3.tempText.width + 2 * borderWidth;
        gameState3.tempBackground2.height = gameState3.tempText.height + 2 * borderWidth;
      } else if (justOver[0].inventoryName){
        console.log(justOver[0].inventoryName)
        gameState3.tempBackground.x=pointer.x+50;
        gameState3.tempBackground.y=pointer.y-15;
        gameState3.tempBackground.visible=true;
        gameState3.tempBackground2.x = pointer.x + 50 - borderWidth;
        gameState3.tempBackground2.y = pointer.y - 15 - borderWidth;
        gameState3.tempBackground2.visible = true;
        gameState3.tempText.visible=true;
        if (justOver[0].inventoryName!=='Gas' && justOver[0].inventoryName!=='Jerky'){
          gameState3.tempText.setText(`Effect: ${inventory[justOver[0].inventoryName]['itemEffects']}`);
        } else if (justOver[0].inventoryName==='Gas'){
          gameState3.tempText.setText(`Effect: for use in combustion \nengine or possibly to huff`);
        } else if (justOver[0].inventoryName==='Jerky'){
          gameState3.tempText.setText(`Effect: the jerky here sucks \nbut dogs like it at least ...`);
        }

        gameState3.tempText.x=gameState3.tempBackground.x;
        gameState3.tempText.y=gameState3.tempBackground.y;
        gameState3.tempBackground.width=gameState3.tempText.width;
        gameState3.tempBackground.height=gameState3.tempText.height;
        gameState3.tempBackground2.width = gameState3.tempText.width + 2 * borderWidth;
        gameState3.tempBackground2.height = gameState3.tempText.height + 2 * borderWidth;
      }
  });

  this.input.on('pointerout', function (pointer, justOut) {
      gameState3.tempText.visible=false;
      gameState3.tempBackground.visible=false;
      gameState3.tempBackground2.visible=false;
  });

    //exit button
    gameState3.exit_button = this.add.rectangle(1080, 75, 20, 20, 0xfff);
    gameState3.exit_button.setInteractive()
    gameState3.exit_button.on('pointerup', function() {
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
    if (redisplayItems){
      creditText.setText(`Your Cash: ${Math.round(money*100)/100}     Gallons of Gas: ${Math.round(gas*100)/100} `)
      for (a_item of Object.keys(inventory)) {
        if (gameState3.newItem[a_item])
        {gameState3.newItem[a_item].destroy()}
      }
      gameState3.newItem = {}
      let xcoord2 = 175;
      let ycoord2 = 230;
      let itemCount = 0;
      for (a_item of Object.keys(inventory)) {
        if (inventory[a_item]['numberOwned'] > 0) {
          itemCount += 1;
          gameState3.newItem[a_item] = this.add.image(xcoord2, ycoord2, inventory[a_item]['all_usable_items_icons']).setOrigin(0, 0).setInteractive();
          gameState3.newItem[a_item].name = `${a_item}`;
          gameState3.newItem[a_item].setScale(.5)
          this.input.setDraggable(gameState3.newItem[a_item]);
          if (itemCount % 6 === 0) {
            xcoord2 = 175;
            ycoord2 += 65
          } else {
            xcoord2 += 65
          }
        }
      }
      redisplayItems=false
    }
  }
});
