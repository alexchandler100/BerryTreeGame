const gameState5 = {};

var OverworldMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "OverworldMenu"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {},
  create: function() {

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    gameState5.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState5.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState5.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState5.pausemenu_button1.setInteractive()
    gameState5.pausemenu_button1.on('pointerup', function() {
      scene_number=1
    }, this);

    //switch to menu 2
    gameState5.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState5.pausemenu_button2.setInteractive()
    gameState5.pausemenu_button2.on('pointerup', function() {
      scene_number=7
    }, this);

    //switch to menu 3
    gameState5.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    gameState5.pausemenu_button3.setInteractive()
    gameState5.pausemenu_button3.on('pointerup', function() {
      scene_number=8
    }, this);

    //switch to menu 4
    gameState5.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    gameState5.pausemenu_button_white4 = this.add.rectangle(240, 70, 16, 16, 0x000);
    gameState5.pausemenu_button4.setInteractive()
    gameState5.pausemenu_button4.on('pointerup', function() {
      scene_number=9
    }, this);

    //switch to menu 5
    gameState5.pausemenu_button5 = this.add.rectangle(270, 70, 20, 20, 0xfff);
    gameState5.pausemenu_button5.setInteractive()
    gameState5.pausemenu_button5.on('pointerup', function() {
      if (keyboardGet===true){
        scene_number=10
      }
    }, this);

    //exit button
    gameState5.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState5.exit_button.setInteractive()
    gameState5.exit_button.on('pointerup', function() {
      launchParameter=false;
      this.scene.stop();
      scene_number = 2;
      pause = false;
    }, this);
    exitText = this.add.text(1080-7, 70-14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    menuText = this.add.text(500, 60, "Overworld Stats", {
      fontSize: '30px',
      fill: '#fff'
    });

    moneyText = this.add.text(175, 140, `Money: ${Math.round(money*100)/100}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    gasText = this.add.text(175, 170, `Gas: ${Math.round(gas*100)/100} Gallons`, {
      fontSize: '25px',
      fill: '#fff'
    });

    athleticsText = this.add.text(175, 200, `Athletics: ${Math.floor(athletics*100)/100}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    kickTheBallText = this.add.text(175, 230, `Kick-the-Ball High Score: ${keepawayHighScore}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    volleyballScoreText = this.add.text(175, 260, `Goals Scored on Jon: ${Math.floor(volleyballScore)}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    hbScoreText = this.add.text(175, 290, `Homeboy Video Game High Score: ${Math.floor(highScore)}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    crackheadText = this.add.text(175, 320, `Money Given to Crackhead: ${moneyToCrackhead}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    poolScoreText = this.add.text(175, 350, `2-Ball Score: ${twoballscore}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    itemsText = this.add.text(175, 460, '', {
      fontSize: '25px',
      fill: '#fff'
    });
    items = items.filter(onlyUnique)
    item_list = "Special Items: \n";
    for (let i = 0; i < items.length; i++) {
      item_list += ` ${items[i]}`
    }
    itemsText.setText(item_list)
  },
  update: function() {
    if (scene_number === 1) {
      this.scene.switch('PauseMenu');
    }
    else if (scene_number === 7) {
      this.scene.switch('ItemsMenu');
    }
    else if (scene_number === 8) {
      this.scene.switch('EquipmentMenu');
    } else if (scene_number === 10) {
      this.scene.switch('Keyboard');
    }
  }
});
