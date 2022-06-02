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
    openKeyborder = this.add.rectangle(600, 20, 406, 36, 0xb39c0e).setOrigin(.5,.5);
    openKey_background = this.add.rectangle(600, 20, 400, 30, 0x000).setOrigin(.5,.5);
    openkeyText = this.add.text(600, 20, 'Press X to open/close', {
      fontSize: '25px',
      fill: '#fff'
    }).setOrigin(.5,.5);
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

/*
    gameState10.activeQuestDisplay = this.add.text(175, 140, '', {
      fontSize: '25px',
      fill: '#fff',
      wordWrap: {
        width: 850,
        useAdvancedWrap: true
      }
    }).setOrigin(0, 0);
    let textFiller='';
    for (questTitle of Object.keys(activeQuests)) {
      textFiller += `${questTitle}: ${activeQuests[questTitle]}\n\n`
    };
    gameState10.activeQuestDisplay.setText(`${textFiller}`);
    */

    gameState10.newItem={}
    gameState10.activeQuestDisplay={}
    let xcoord10 = 215;
    let ycoord10 = 140;
    let itemCount10=0;
    for (questTitle of Object.keys(activeQuests)) {
        itemCount10+=1;
        if (currentQuest === questTitle){
          gameState10.newItem[questTitle]=this.add.rectangle(xcoord10, ycoord10, 150, 80, 0x1dad46).setOrigin(0,0).setInteractive()
          gameState10.newItem[questTitle].name=questTitle
        } else {
          gameState10.newItem[questTitle]=this.add.rectangle(xcoord10, ycoord10, 150, 80, 0xb39c0e).setOrigin(0,0).setInteractive()
          gameState10.newItem[questTitle].name=questTitle
        }
        if (currentQuest === questTitle){
          gameState10.activeQuestDisplay[questTitle] = this.add.text(xcoord10, ycoord10, questTitle, {
            fontSize: '20px',
            fill: '#000',
            fontFamily: 'Academy Engraved LET',
            wordWrap: {
              width: 130,
              useAdvancedWrap: true
            }
          }).setOrigin(0, 0);
        } else {
          gameState10.activeQuestDisplay[questTitle] = this.add.text(xcoord10, ycoord10, questTitle, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Academy Engraved LET',
            wordWrap: {
              width: 130,
              useAdvancedWrap: true
            }
          }).setOrigin(0, 0);
        }


        if (itemCount10%4===0){
          xcoord10=215;
          ycoord10+=125
        }
        else {xcoord10+=200}
    }

    gameState10.tempBackground = this.add.rectangle(0,0, 400, 200, 0xffffff).setOrigin(0,0).setDepth(2);
    gameState10.tempText=this.add.text(0,0, ``, {
      fontSize: '25px',
      fontFamily: 'Academy Engraved LET',
      align: 'center',
      fill: '#000000',
      wordWrap: {
        width: 300,
        useAdvancedWrap: true
      }
    }).setDepth(3);
    gameState10.tempBackground.visible=false;
    gameState10.tempText.visible=false;

    this.input.on('pointerover', function (pointer, justOver) {
        if (justOver[0].name){
          gameState10.tempBackground.x=pointer.x;
          gameState10.tempBackground.y=pointer.y-50;
          gameState10.tempBackground.visible=true;
          gameState10.tempText.visible=true;
          gameState10.tempText.setText(activeQuests[justOver[0].name]);
          gameState10.tempText.x=gameState10.tempBackground.x;
          gameState10.tempText.y=gameState10.tempBackground.y;
          gameState10.tempBackground.width=gameState10.tempText.width;
          gameState10.tempBackground.height=gameState10.tempText.height;
        }
  });

  this.input.on('pointerup', function (pointer,justOver) {
    if (justOver[0].name){
      currentQuest = justOver[0].name
      console.log(gameState.questLocations[currentQuest])
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }
}, this);

  this.input.on('pointerout', function (pointer, justOut) {
      gameState10.tempText.visible=false;
      gameState10.tempBackground.visible=false;
  });

  gameState10.keyObjX = this.input.keyboard.addKey('X'); // Get key object
  gameState10.keyObjX.on('down', function() {
    this.scene.stop();
    scene_number = 2;
    pause = false
    launchParameter=false;
  }, this);
  },
  update: function() {
    if (scene_number === 11) {
      this.scene.switch('QuestLogCompleted');
    }
  }
});
