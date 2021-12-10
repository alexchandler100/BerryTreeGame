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
  preload: function() {},
  create: function() {
    //background

    gameState3.narrative_background = this.add.rectangle(512, 370, 600, 400, 0x000);


    storeText = this.add.text(300, 200, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    storeText.setText(`MARATHON \n Your Cash: ${Math.round(money*100)/100}`)


    hammsText = this.add.text(300, 300, '', {
      fontSize: '25px',
      fill: '#fff'
    });

    hammsText.setText(`Hamms: 2 for 3.50$`)
    hammsText.setInteractive()
    hammsText.on('pointerup', function() {
      if (money >= 3.5) {
        money -= 3.5;
        hamms += 2
      }
    }, this);

    monsterText = this.add.text(300, 350, '', {
      fontSize: '25px',
      fill: '#fff'
    });

    monsterText.setText(`monster: 2 for 3$`)
    monsterText.setInteractive()
    monsterText.on('pointerup', function() {
      if (money >= 3) {
        money -= 3;
        monster += 2
      }
    }, this);

    gatoradeText = this.add.text(300, 400, '', {
      fontSize: '25px',
      fill: '#fff'
    });

    gatoradeText.setText(`gatorade: 2 for 3.50$`)
    gatoradeText.setInteractive()
    gatoradeText.on('pointerup', function() {
      if (money >= 3.5) {
        money -= 3.5;
        gatorade += 2
      }
    }, this);

    gasText = this.add.text(300, 450, '', {
      fontSize: '25px',
      fill: '#fff'
    });

    gasText.setText(`gas: 1 gallon for 2.59$`)
    gasText.setInteractive()
    gasText.on('pointerup', function() {
      if (money >= 2.59) {
        money -= 2.59;
        gas += 1
      }
    }, this);

    //trying to do pointerover events but for some reason this is not working... (fix needed)
    gatoradeText.on('pointerover', () => gatoradeText.setStyle({
        fill: '#f39c12'
      }))
      .on('pointerout', () => gatoradeText.setStyle({
        fill: '#FFF'
      }));

    //styles for Items
    gatoradeText.setStyle({
      fill: '#f39c12'
    })
    hammsText.setStyle({
      fill: '#009bfe'
    })
    monsterText.setStyle({
      fill: '#24ff00'
    })
    gasText.setStyle({
      fill: '#005f6a'
    })

    //exit button
    gameState3.exit_button = this.add.rectangle(770, 200, 20, 20, 0xfff);
    gameState3.exit_button.setInteractive()
    gameState3.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      gasStation=0
      pause = false
    }, this);
    exitText = this.add.text(762, 186, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    //pointerover color changes
    /*
    const hammsBox = this.add.rectangle(400, 320, 300,50, 0x000000);
    hammsBox.setInteractive()
    hammsBox.on('pointerover', function() {
      hammsBox.setColor('#ffe014');
    });
    hammsBox.on('pointerout', function() {
      hammsBox.setColor('#ffffff');
    });
    */

    /*
    //coordinates
    for (let i=0;i<15;i++){
      for (let j=0;j<10;j++){
        this.add.text(64*i,64*j, `(${64*i},${64*j})`, {
          fontSize: '10px',
          fill: '#fff'
        });
      }
    }
    */

  },
  update: function() {

  }
});
