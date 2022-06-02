const gameState11 = {};

var QuestLogCompleted = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "QuestLogCompleted"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {},
  create: function() {
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
    gameState11.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState11.pausemenu_button1.setInteractive()
    gameState11.pausemenu_button1.on('pointerup', function() {
      scene_number=10
    }, this);

    //switch to menu 2
    gameState11.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState11.pausemenu_button_white2 = this.add.rectangle(180, 70, 16, 16, 0x000);
    gameState11.pausemenu_button2.setInteractive()
    gameState11.pausemenu_button2.on('pointerup', function() {
      scene_number=11
    }, this);

    //exit button
    gameState11.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState11.exit_button.setInteractive()
    gameState11.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter=false;
    }, this);
    exitText = this.add.text(1080-7, 70-14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    menuText = this.add.text(450, 60, "Quest Log (Completed)", {
      fontSize: '30px',
      fill: '#fff'
    });

    gameState11.newItem={}
    gameState11.activeQuestDisplay={}
    let xcoord10 = 215;
    let ycoord10 = 140;
    let itemCount10=0;
    for (questTitle of Object.keys(completedQuests)) {
        itemCount10+=1;
        gameState11.newItem[questTitle]=this.add.rectangle(xcoord10, ycoord10, 150, 75, 0xb39c0e).setOrigin(0,0).setInteractive()
        gameState11.newItem[questTitle].name=questTitle
          gameState11.activeQuestDisplay[questTitle] = this.add.text(xcoord10, ycoord10, questTitle, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Academy Engraved LET',
            wordWrap: {
              width: 130,
              useAdvancedWrap: true
            }
          }).setOrigin(0, 0);
        if (itemCount10%4===0){
          xcoord10=215;
          ycoord10+=120
        }
        else {xcoord10+=200}
    }

    gameState11.tempBackground = this.add.rectangle(0,0, 400, 200, 0xffffff).setOrigin(0,0).setDepth(2);
    gameState11.tempText=this.add.text(0,0, ``, {
      fontSize: '25px',
      fill: '#000000',
      fontFamily: 'Academy Engraved LET',
      align: 'center',
      wordWrap: {
        width: 300,
        useAdvancedWrap: true
      }
    }).setDepth(3);
    gameState11.tempBackground.visible=false;
    gameState11.tempText.visible=false;

    this.input.on('pointerover', function (pointer, justOver) {
        gameState11.tempBackground.x=pointer.x+15;
        gameState11.tempBackground.y=pointer.y-15;
        gameState11.tempBackground.visible=true;
        gameState11.tempText.visible=true;
        gameState11.tempText.setText(completedQuests[justOver[0].name]);
        gameState11.tempText.x=gameState11.tempBackground.x;
        gameState11.tempText.y=gameState11.tempBackground.y;
        gameState11.tempBackground.width=gameState11.tempText.width;
        gameState11.tempBackground.height=gameState11.tempText.height;
  });

  this.input.on('pointerout', function (pointer, justOut) {
      gameState11.tempText.visible=false;
      gameState11.tempBackground.visible=false;
  });

  gameState11.keyObjX = this.input.keyboard.addKey('X'); // Get key object
  gameState11.keyObjX.on('down', function() {
    this.scene.stop();
    scene_number = 2;
    pause = false
    launchParameter=false;
  }, this);

  },
  update: function() {
    if (scene_number === 10) {
      this.scene.switch('QuestLog');
    }
  }
});
