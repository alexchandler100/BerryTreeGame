const gameStateNav = {};

var Navigator = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "Navigator"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {},
  create: function() {
    gameStateNav.staminaDisplay = this.add.rectangle(50-2, 50-2, 104, 24, 0xffffff).setOrigin(0);
    gameStateNav.staminaDisplayFront = this.add.rectangle(50, 50, 100, 20, 0x70ff00).setOrigin(0);
    gameStateNav.StaminaText = this.add.text(50, 30, 'Stamina', {
      fontSize: '15px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });
    gameStateNav.gasDisplay = this.add.rectangle(50-2, 100-2, 104, 24, 0xffffff).setOrigin(0);
    gameStateNav.gasDisplayFront = this.add.rectangle(50, 100, 100, 20, 0x2f1e12).setOrigin(0);
    gameStateNav.gasText = this.add.text(50, 80, 'Gas', {
      fontSize: '15px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });
    gameStateNav.gasDisplay.visible=false
    gameStateNav.gasDisplayFront.visible=false
    gameStateNav.gasText.visible=false


    gameStateNav.location = this.add.text(1200-200, 10, '', {
      fontSize: '15px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });

    gameStateNav.kickTheBallDisplay = this.add.text(50, 550, ``, {
      fontSize: '20px',
      fill: '#fff',
      align: 'right',
    });
  },
  update: function() {
    if (kickTheBallScoreDisplayed){
      gameStateNav.kickTheBallDisplay.visible = true;
      if (keepaway > keepawayHighScore) {
        gameStateNav.kickTheBallDisplay.setText(`Kick-The-Ball: ${keepaway} \nHigh Score: ${keepaway}`);
      } else {
        gameStateNav.kickTheBallDisplay.setText(`Kick-The-Ball: ${keepaway} \nHigh Score: ${keepawayHighScore}`);
      }
    } else {
      gameStateNav.kickTheBallDisplay.visible = false;
    }
    if (phoneGet){
      gameStateNav.location.visible = true;
    } else {
      gameStateNav.location.visible = false;
    }
    //console.log(stamina)
    gameStateNav.staminaDisplayFront.width=stamina
    gameStateNav.gasDisplayFront.width=gas*100/12
    if (playerTexture===1){
      gameStateNav.gasDisplay.visible=true
      gameStateNav.gasDisplayFront.visible=true
      gameStateNav.gasText.visible=true
    } else {
        gameStateNav.gasDisplay.visible=false
        gameStateNav.gasDisplayFront.visible=false
        gameStateNav.gasText.visible=false
    }
  }
});
