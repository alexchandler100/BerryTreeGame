const gameState10 = {};

var QuestLog = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "QuestLog"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {},
  create: function() {
    //background and border
    openKeyborder = this.add.rectangle(600, 20, 406, 36, 0xb39c0e).setOrigin(.5, .5);
    openKey_background = this.add.rectangle(600, 20, 400, 30, 0x000).setOrigin(.5, .5);
    openkeyText = this.add.text(600, 20, 'Press X to open/close', {
      fontSize: '25px',
      fill: '#fff'
    }).setOrigin(.5, .5);
    //background and border
    gameState1.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState1.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState10.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState10.pausemenu_button_white1 = this.add.rectangle(150, 70, 16, 16, 0x000);
    gameState10.pausemenu_button1.setInteractive()
    gameState10.pausemenu_button1.on('pointerup', function() {
      scene_number = 10
    }, this);

    //switch to menu 2
    gameState10.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState10.pausemenu_button2.setInteractive()
    gameState10.pausemenu_button2.on('pointerup', function() {
      scene_number = 11
    }, this);

    //exit button
    gameState10.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState10.exit_button.setInteractive()
    gameState10.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
    exitText = this.add.text(1080 - 7, 70 - 14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    menuText = this.add.text(450, 60, "Quest Log (Current)", {
      fontSize: '30px',
      fill: '#fff'
    });

    gameState10.newItem = {}
    gameState10.activeQuestDisplay = {}
    let xcoord10 = 215;
    let ycoord10 = 140;
    let itemCount10 = 0;
    let graphics = this.add.graphics().setDepth(5)
    for (questTitle of Object.keys(activeQuests)) {
      itemCount10 += 1;
      if (currentQuest === questTitle) {
        gameState10.newItem[questTitle] = this.add.rectangle(xcoord10, ycoord10, 150, 80, 0x1dad46).setOrigin(0, 0).setInteractive()
        gameState10.newItem[questTitle].name = questTitle
        graphics.lineStyle(4, 0xffffff);
        graphics.strokeRoundedRect(xcoord10, ycoord10, 150, 80, 5);

      } else {
        gameState10.newItem[questTitle] = this.add.rectangle(xcoord10, ycoord10, 150, 80, 0x333333).setOrigin(0, 0).setInteractive()
        gameState10.newItem[questTitle].name = questTitle
        graphics.lineStyle(4, 0xffffff);
        graphics.strokeRoundedRect(xcoord10, ycoord10, 150, 80, 5);
      }
      if (currentQuest === questTitle) {
        gameState10.activeQuestDisplay[questTitle] = this.add.text(xcoord10 + 5, ycoord10 + 5, questTitle, {
          fontSize: '20px',
          fill: '#000',
          fontFamily: 'Academy Engraved LET',
          wordWrap: {
            width: 140,
            useAdvancedWrap: true
          }
        }).setOrigin(0, 0);
      } else {
        gameState10.activeQuestDisplay[questTitle] = this.add.text(xcoord10 + 5, ycoord10 + 5, questTitle, {
          fontSize: '20px',
          fill: '#fff',
          fontFamily: 'Academy Engraved LET',
          wordWrap: {
            width: 140,
            useAdvancedWrap: true
          }
        }).setOrigin(0, 0);
      }


      if (itemCount10 % 4 === 0) {
        xcoord10 = 215;
        ycoord10 += 125
      } else {
        xcoord10 += 200
      }
    }

    gameState10.tempText = this.add.text(0, 0, ``, {
      fontSize: '25px',
      fontFamily: 'Academy Engraved LET',
      align: 'center',
      fill: '#ffffff',
      wordWrap: {
        width: 300,
        useAdvancedWrap: true
      }
    }).setDepth(7);

    var setSize = function(rect, width, height) {
      rect.setSize(width, height);
      rect.geom.setSize(width, height);
      rect.updateDisplayOrigin();
      rect.updateData();
    }

    gameState10.tempBackground = this.add.rectangle(0, 0, 300, 200, 0x000000).setOrigin(0, 0).setDepth(6);
    gameState10.tempBackground.setStrokeStyle(4, 0xb39c0e);
    gameState10.tempBackground.visible = false;
    gameState10.tempText.visible = false;

    this.input.on('pointerover', function(pointer, justOver) {
      if (justOver[0].name) {
        gameState10.tempBackground.x = pointer.x;
        gameState10.tempBackground.y = pointer.y - 50;
        gameState10.tempBackground.visible = true;
        gameState10.tempText.visible = true;
        gameState10.tempText.setText(activeQuests[justOver[0].name]);
        gameState10.tempText.x = gameState10.tempBackground.x + 5;
        gameState10.tempText.y = gameState10.tempBackground.y + 5;
        setSize(gameState10.tempBackground, gameState10.tempText.width + 10, gameState10.tempText.height + 10)
      }
    });

    this.input.on('pointerout', function(pointer, justOut) {
      gameState10.tempText.visible = false;
      gameState10.tempBackground.visible = false;
    });

    this.input.on('pointerup', function(pointer, justOver) {
      if (justOver[0].name) {
        currentQuest = justOver[0].name
        console.log(gameState.questLocations[currentQuest])
        this.scene.stop();
        scene_number = 2;
        pause = false
        launchParameter = false;
      }
    }, this);

    gameState10.keyObjX = this.input.keyboard.addKey('X'); // Get key object
    gameState10.keyObjX.on('down', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
  },
  update: function() {
    if (scene_number === 11) {
      this.scene.switch('QuestLogCompleted');
    }
  }
});
