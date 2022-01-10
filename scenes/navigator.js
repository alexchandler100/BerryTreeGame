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

    gameStateNav.gatorade = this.add.image(200,50,'gatoradeIcon').setInteractive().setScale(.5);
    gameStateNav.gatorade.on('pointerup', function() {
      useItem("Gatorade","Mac");
      gameState.drinkGatorade.play()
    }, this);

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

    gameStateNav.scoreGottenDisplay = this.add.rectangle(250-2, 30-2, 704, 54, 0xb39c0e).setOrigin(0);
    gameStateNav.scoreGottenDisplayFront = this.add.rectangle(250, 30, 700, 50, 0x000000).setOrigin(0);
    gameStateNav.scoreGotten = this.add.text(250, 30+10, ``, {
      fontSize: '40px',
      fill: '#fff',
      align: 'right',
    });
  },
  update: function() {
    if (stamina<=40){
      gameStateNav.gatorade.visible = true
    } else{
      gameStateNav.gatorade.visible = false
    }
    if (showKickTheBallScore){
      gameStateNav.scoreGotten.visible = true;
      gameStateNav.scoreGottenDisplay.visible = true;
      gameStateNav.scoreGottenDisplayFront.visible = true;
  } else {
    gameStateNav.scoreGotten.visible = false;
    gameStateNav.scoreGottenDisplay.visible = false;
    gameStateNav.scoreGottenDisplayFront.visible = false;
    }
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
