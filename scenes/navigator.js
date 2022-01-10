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
  preload: function() {
    this.load.image('phoneBackground', "assets/phoneBackground.png");

    this.load.spritesheet('gpsPointer',
      'assets/gpsPointer.png', {
        frameWidth: 100,
        frameHeight: 11
      });
  },
  create: function() {

    this.anims.create({
      key: 'gpsPointerBig',
      frames: this.anims.generateFrameNumbers('gpsPointer', {
        frames: [0,3]
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'gpsPointerMedium',
      frames: this.anims.generateFrameNumbers('gpsPointer', {
        frames: [1,4]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'gpsPointerSmall',
      frames: this.anims.generateFrameNumbers('gpsPointer', {
        frames: [2,5]
      }),
      frameRate: 4,
      repeat: -1
    });

    gameStateNav.phoneBackground = this.add.image(940, 69, 'phoneBackground').setOrigin(0,0);
    gameStateNav.phoneBackground.visible = false;


    gameStateNav.staminaDisplay = this.add.rectangle(50-2, 50-2, 104, 24, 0xffffff).setOrigin(0);
    gameStateNav.staminaDisplayFront = this.add.rectangle(50, 50, 100, 20, 0x70ff00).setOrigin(0);
    gameStateNav.StaminaText = this.add.text(50, 30, 'Stamina', {
      fontSize: '15px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });

    gameStateNav.gatorade = this.add.image(200,50,'gatoradeIcon').setInteractive().setScale(.7);
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

    gameStateNav.gpsPointer = this.physics.add.sprite(1050,175,'gpsPointer').setOrigin(0,0);
    gameStateNav.gpsPointer.visible = false;

    gameStateNav.phone = this.add.image(950,30,'phone').setInteractive().setScale(.7);
    gameStateNav.phone.on('pointerup', function() {
      if (gameState.camera1.visible){
        gameStateNav.phoneBackground.visible = false
        gameState.camera1.visible = false
        gameStateNav.gpsPointer.visible = false;
      } else {
        gameStateNav.phoneBackground.visible = true
        gameState.camera1.visible = true;
        gameStateNav.gpsPointer.visible = true;
      }
    }, this);

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
    pointerScale = Math.sqrt((me.x-gameState.questLocation.x)**2+(me.y-gameState.questLocation.y)**2)/10000
    if (pointerScale<.2){
      gameStateNav.gpsPointer.anims.play('gpsPointerSmall',true)
    } else if (pointerScale>.5){
      gameStateNav.gpsPointer.anims.play('gpsPointerBig',true)
    } else {
      gameStateNav.gpsPointer.anims.play('gpsPointerMedium',true)
    }
    if (gameState.questAngle>=-90||gameState.questAngle<=90){
      gameStateNav.gpsPointer.angle = gameState.questAngle+180;
    }
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
      //gameState.camera1.visible = true;
      gameStateNav.phone.visible = true;
    } else {
      gameStateNav.location.visible = false;
      gameState.camera1.visible = false;
      gameStateNav.phone.visible = false;
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
