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
    //background and border
    gameState1.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState1.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState10.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState10.pausemenu_button1.setInteractive()
    gameState10.pausemenu_button1.on('pointerup', function() {
      scene_number=10
    }, this);

    //switch to menu 2
    gameState10.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState10.pausemenu_button_white2 = this.add.rectangle(180, 70, 16, 16, 0x000);
    gameState10.pausemenu_button2.setInteractive()
    gameState10.pausemenu_button2.on('pointerup', function() {
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

    gameState11.activeQuestDisplay={}
    let xcoord2 = 175;
    let ycoord2 = 140;
    for (questTitle of Object.keys(completedQuests)) {
        gameState11.activeQuestDisplay[questTitle]=this.add.text(xcoord2,ycoord2,questTitle+': '+completedQuests[questTitle], {
          fontSize: '25px',
          fill: '#fff',
          wordWrap: { width: 850, useAdvancedWrap: true }
        }).setOrigin(0,0)
        ycoord2+=125
    }

  },
  update: function() {
    if (scene_number === 10) {
      this.scene.switch('QuestLog');
    }
  }
});
