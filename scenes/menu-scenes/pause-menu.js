const gameState1 = {};

var PauseMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "PauseMenu"
    });
  },
  init: function(data) {
    //sumn
  },
  onKeyInput: function(event) {
  },
  preload: function() {},

  create: function() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    gameState1.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState1.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState1.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button_white1 = this.add.rectangle(150, 70, 16, 16, 0x000);
    gameState1.pausemenu_button1.setInteractive()
    gameState1.pausemenu_button1.on('pointerup', function() {
      scene_number=1
    }, this);

    //switch to menu 2
    gameState1.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button2.setInteractive()
    gameState1.pausemenu_button2.on('pointerup', function() {
      scene_number=7
    }, this);

    //switch to menu 3
    gameState1.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button3.setInteractive()
    gameState1.pausemenu_button3.on('pointerup', function() {
      scene_number=8
    }, this);

    //switch to menu 4
    gameState1.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button4.setInteractive()
    gameState1.pausemenu_button4.on('pointerup', function() {
      scene_number=9
    }, this);

    //exit button
    gameState1.save_button = this.add.rectangle(960, 70, 80, 20, 0xfff);
    gameState1.save_button.setInteractive()
    gameState1.save_button.on('pointerup', function() {
      localStorage.setItem("equipment", JSON.stringify(equipment));
      localStorage.setItem("party", JSON.stringify(party));
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }, this);
    saveText = this.add.text(960-7, 70-14, 'save', {
      fontSize: '25px',
      fill: '#fff'
    });


    //exit button
    gameState1.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState1.exit_button.setInteractive()
    gameState1.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter=false;
    }, this);
    exitText = this.add.text(1080-7, 70-14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

//Save function needs some work... its broken. Lets just disable it for now... better than
//the current issue of saving and freezing the game

/*
    //save button
    gameState1.save_button = this.add.rectangle(780, 70, 80, 20, 0xfff);
    gameState1.save_button.setInteractive()
    gameState1.save_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false;
      saveGame();
    }, this);
    saveText = this.add.text(780-28, 70-14, 'save', {
      fontSize: '25px',
      fill: '#fff'
    });
    */

/*
    //load button
    gameState1.load_button = this.add.rectangle(880, 70, 80, 20, 0xfff);
    gameState1.load_button.setInteractive()
    gameState1.load_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false;
      loadGame2();
    }, this);
    loadText = this.add.text(880-28, 70-14, 'load', {
      fontSize: '25px',
      fill: '#fff'
    });
    */


        //controls button
        let control_x = 850;
        gameState1.controls_button = this.add.rectangle(control_x, 70, 140, 20, 0xfff);
        gameState1.controls_button.setInteractive()
        gameState1.controls_button.on('pointerup', function() {
          scene_number=99
        }, this);
        loadText = this.add.text(control_x-56, 70-14, 'controls', {
          fontSize: '25px',
          fill: '#fff'
        });


    //full button
    gameState1.full_button = this.add.rectangle(980, 70, 80, 20, 0xfff);
    gameState1.full_button.setInteractive()
    gameState1.full_button.on('pointerup', function () {
        if (this.scale.isFullscreen)
        {
            this.scale.stopFullscreen();
        }
        else
        {
            this.scale.startFullscreen();
        }
    }, this);
    fullText = this.add.text(980-28, 70-14, 'full', {
      fontSize: '25px',
      fill: '#fff'
    });

    menuText = this.add.text(500, 60, "Party Stats", {
      fontSize: '30px',
      fill: '#fff'
    });

    meHpText = this.add.text(175, 140, `Mac HP: ${party['Mac']['hp']}/${party['Mac']['maxHP']} \nMac SP: ${party['Mac']['sp']}/${party['Mac']['maxSP']} \nMac EXP: ${party['Mac']['exp']}/${100*3**(party['Mac']['level']-1)} \nMac LVL: ${party['Mac']['level']} \nMac DMG: ${party['Mac']['damage']} \nMac DEF: ${party['Mac']['defense']}`, {
      fontSize: '25px',
      fill: '#fff'
    });

    if (al.following) {
      alHpText = this.add.text(175 + 300, 140, `Al HP: ${party['Al']['hp']}/${party['Al']['maxHP']} \nAl SP: ${party['Al']['sp']}/${party['Al']['maxSP']} \nAl EXP: ${party['Al']['exp']}/${100*3**(party['Al']['level']-1)} \nAl LVL: ${party['Al']['level']} \nAl DMG: ${party['Al']['damage']} \nAl DEF: ${party['Al']['defense']}`, {
        fontSize: '25px',
        fill: '#fff'
      });
    }

    if (trevor.following)
      jimmyHpText = this.add.text(175 + 600, 140, `Jimmy HP: ${party['Jimmy']['hp']}/${party['Jimmy']['maxHP']} \nJimmy SP: ${party['Jimmy']['sp']}/${party['Jimmy']['maxSP']} \nJimmy EXP: ${party['Jimmy']['exp']}/${100*3**(party['Jimmy']['level']-1)} \nJimmy LVL: ${party['Jimmy']['level']} \nJimmy DMG: ${party['Jimmy']['damage']} \nJimmy DEF: ${party['Jimmy']['defense']}`, {
        fontSize: '25px',
        fill: '#fff'
      });

      if (bennett.following)
        jimmyHpText = this.add.text(175, 340, `Bennett HP: ${party['Bennett']['hp']}/${party['Bennett']['maxHP']} \nBennett SP: ${party['Bennett']['sp']}/${party['Bennett']['maxSP']} \nBennett EXP: ${party['Bennett']['exp']}/${100*3**(party['Bennett']['level']-1)} \nBennett LVL: ${party['Bennett']['level']} \nBennett DMG: ${party['Bennett']['damage']} \nBennett DEF: ${party['Bennett']['defense']}`, {
          fontSize: '25px',
          fill: '#fff'
        });

      this.input.keyboard.on("keydown", this.onKeyInput, this);

      gameState1.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
      gameState1.keyObjZ.on('down', function() {
        this.scene.stop();
        scene_number = 2;
        pause = false
        launchParameter=false;
      }, this);
  },
  update: function() {
    if (scene_number === 7) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('ItemsMenu');
      time2=0
    }
    else if (scene_number === 8) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('EquipmentMenu');
    }
    else if (scene_number === 9) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('OverworldMenu');
    }
    else if (scene_number === 99) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('ControlsScene');
    }
  }
});
