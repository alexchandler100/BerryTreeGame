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
        hamms += 2
        usable_items["Hamms"]+=2
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
        monster += 2
        usable_items["Monster"]=monster
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
        gatorade += 2
        usable_items["Gatorade"]=gatorade
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
        andycapps += 1;
        if (usable_items["Andy Capp's Hot Fries"]) {
          usable_items["Andy Capp's Hot Fries"] += 1;
        } else {
          usable_items["Andy Capp's Hot Fries"] = 1;
        }
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

    //console.log(Object.keys(usable_items))
    gameState3.newItem={}
    let xcoord2 = 175;
    let ycoord2 = 230;
    let itemCount=0;
    for (a_item of Object.keys(usable_items)) {
      if (usable_items[a_item]>0){
        itemCount+=1;
        gameState3.newItem[a_item]=this.add.image(xcoord2,ycoord2,all_usable_items_icons[a_item]).setOrigin(0,0).setInteractive()
        gameState3.newItem[a_item].name=`${a_item}`
        this.input.setDraggable(gameState3.newItem[a_item]);
        if (itemCount%3===0){
          xcoord2=175;
          ycoord2+=125
        }
        else {xcoord2+=125}
      }
    }

    //adding cursor hover menus when you hover over your Items
    gameState3.tempBackground = this.add.rectangle(0,0, 400, 200, 0xffffff).setOrigin(0,0);
    gameState3.tempBackground.visible=false;
    gameState3.tempBackground.setDepth(2)
    gameState3.tempText=this.add.text(0,0, ``, {
      fontSize: '25px',
      fill: '#000000'
    });
    gameState3.tempText.visible=false;
    gameState3.tempText.setDepth(3)

    this.input.on('pointerover', function (pointer, justOver) {
      if (justOver[0].name && justOver[0].name!=="Mac" && justOver[0].name!=="Al" && justOver[0].name!=="Jimmy"){
        console.log(`Name: ${justOver[0].name} \nQuantity: ${usable_items[justOver[0].name]} \nEffect: ${itemEffects[justOver[0].name]}`)
        gameState3.tempBackground.x=pointer.x+50;
        gameState3.tempBackground.y=pointer.y-15;
        gameState3.tempBackground.visible=true;
        gameState3.tempText.visible=true;
        gameState3.tempText.setText(`Name: ${justOver[0].name} \nQuantity: ${usable_items[justOver[0].name]} \nEffect: ${itemEffects[justOver[0].name]}`);
        gameState3.tempText.x=gameState3.tempBackground.x;
        gameState3.tempText.y=gameState3.tempBackground.y;
        gameState3.tempBackground.width=gameState3.tempText.width;
        gameState3.tempBackground.height=gameState3.tempText.height;
      } else if (justOver[0].inventoryName){
        gameState3.tempBackground.x=pointer.x+50;
        gameState3.tempBackground.y=pointer.y-15;
        gameState3.tempBackground.visible=true;
        gameState3.tempText.visible=true;
        gameState3.tempText.setText(`Effect: ${itemEffects[justOver[0].inventoryName]}`);
        gameState3.tempText.x=gameState3.tempBackground.x;
        gameState3.tempText.y=gameState3.tempBackground.y;
        gameState3.tempBackground.width=gameState3.tempText.width;
        gameState3.tempBackground.height=gameState3.tempText.height;
      }
  });

  this.input.on('pointerout', function (pointer, justOut) {
      gameState3.tempText.visible=false;
      gameState3.tempBackground.visible=false;
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
      for (a_item of Object.keys(usable_items)) {
        if (gameState3.newItem[a_item])
        {gameState3.newItem[a_item].destroy()}
      }
      gameState3.newItem={}
      let xcoord2 = 175;
      let ycoord2 = 230;
      let itemCount=0;
      for (a_item of Object.keys(usable_items)) {
        if (usable_items[a_item]>0){
          itemCount+=1;
          gameState3.newItem[a_item]=this.add.image(xcoord2,ycoord2,all_usable_items_icons[a_item]).setOrigin(0,0).setInteractive()
          gameState3.newItem[a_item].name=`${a_item}`
          this.input.setDraggable(gameState3.newItem[a_item]);
          if (itemCount%3===0){
            xcoord2=175;
            ycoord2+=125
          }
          else {xcoord2+=125}
        }
      }
      redisplayItems=false
    }
  }
});
