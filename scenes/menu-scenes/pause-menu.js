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
  partyText: function(x,y,player){
    gameState1.partyText = this.add.text(x,y, '     '+player+`\nHP: ${party[player]['hp']}/${party[player]['maxHP']} \nSP: ${party[player]['sp']}/${party[player]['maxSP']} \nEXP: ${party[player]['exp']}/${100*3**(party[player]['level']-1)} \nLVL: ${party[player]['level']} \nDMG: ${party[player]['damage']} \nDEF: ${party[player]['defense']} \nBleedproof: ${party[player]['bleedProof']} \nBlindproof: ${party[player]['blindProof']} \nNever Miss: ${party[player]['neverMiss']}`, {
      fontSize: '17px',
      fill: '#fff'
    });
  },
  onKeyInput: function(event) {},
  preload: function() {},
  create: function() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    openKeyborder = this.add.rectangle(600, 20, 406, 36, 0xb39c0e).setOrigin(.5, .5);
    openKey_background = this.add.rectangle(600, 20, 400, 30, 0x000).setOrigin(.5, .5);
    openkeyText = this.add.text(600, 20, 'Press Z to open/close', {
      fontSize: '25px',
      fill: '#fff'
    }).setOrigin(.5, .5);
    //background and border
    gameState1.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState1.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState1.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button_white1 = this.add.rectangle(150, 70, 16, 16, 0x000);
    gameState1.pausemenu_button1.setInteractive()
    gameState1.pausemenu_button1.on('pointerup', function() {
      scene_number = 1
    }, this);

    //switch to menu 2
    gameState1.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button2.setInteractive()
    gameState1.pausemenu_button2.on('pointerup', function() {
      scene_number = 7
    }, this);

    //switch to menu 3
    gameState1.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button3.setInteractive()
    gameState1.pausemenu_button3.on('pointerup', function() {
      scene_number = 8
    }, this);

    //switch to menu 4
    gameState1.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    gameState1.pausemenu_button4.setInteractive()
    gameState1.pausemenu_button4.on('pointerup', function() {
      scene_number = 9
    }, this);


    //exit button
    gameState1.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState1.exit_button.setInteractive()
    gameState1.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
    exitText = this.add.text(1080 - 7, 70 - 14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });


    //controls button
    let control_x = 850;
    gameState1.controls_button = this.add.rectangle(control_x, 70, 140, 20, 0xfff);
    gameState1.controls_button.setInteractive()
    gameState1.controls_button.on('pointerup', function() {
      scene_number = 99
    }, this);
    loadText = this.add.text(control_x - 56, 70 - 14, 'controls', {
      fontSize: '25px',
      fill: '#fff'
    });

    this.message = new OnScreenMessage(this, this.events, 600, 300);
    this.add.existing(this.message);

    //save button
    gameState1.save_button = this.add.rectangle(control_x - 140, 70, 96, 20, 0xfff);
    gameState1.save_button.setInteractive()
    gameState1.save_button.on('pointerup', function() {
      joinParams = {
        'Jimmy': trevor.joinParameter,
        'Al': al.joinParameter,
        'Bennett': bennett.joinParameter,
      }
      overworldParams = {
        'money': money,
        'trevorAptFirstDialogue': trevorAptFirstDialogue,
        'gas': gas,
        'carCrashDialogue': carCrashDialogue,
        'skateboardGet': skateboardGet,
        'stripperBanged': stripperBanged,
        'fratboy2primedialogue': fratboy2primedialogue,
        'blondeTalk': blondeTalk,
        'newDarkDialogue': newDarkDialogue,
        'darkboydialogue': darkboydialogue,
        'diodialogue': diodialogue,
        'trevorAptFirstDialogue': trevorAptFirstDialogue,
        'firstTimeCarGet': firstTimeCarGet,
        'larryFirstTalk': larryFirstTalk,
        'drewFirstTalk': drewFirstTalk,
        'jeanClaudeFirstTalk': jeanClaudeFirstTalk,
        'fratboy1FirstTalk': fratboy1FirstTalk,
        'fratboy2FirstTalk': fratboy2FirstTalk,
        'fratboy3FirstTalk': fratboy3FirstTalk,
        'fratboy4FirstTalk': fratboy4FirstTalk,
        'fratboy5FirstTalk': fratboy5FirstTalk,
        'jamesFirstTalk': jamesFirstTalk,
        'joeFirstTalk': joeFirstTalk,
        'bennettFirstTalk': bennettFirstTalk,
        'jonFirstTalk': jonFirstTalk,
        'yogagirlFirstTalk': yogagirlFirstTalk,
        'stripperFirstTalk': stripperFirstTalk,
        'adelineFirstTalk': adelineFirstTalk,
        'volleyballScore': volleyballScore,
        'firstPoolParty': firstPoolParty,
        'ogFirstTalk': ogFirstTalk,
        'gunTalk': gunTalk,
        'joeGet': joeGet,
        'jamesGet': jamesGet,
        'jimmyJoinParam': jimmyJoinParam,
        'neverBeenPro': neverBeenPro,
        'evanFirstDialogue': evanFirstDialogue,
        'anthonyFirstDialogue': anthonyFirstDialogue,
        'girl1FirstDialogue': girl1FirstDialogue,
        'girl2FirstDialogue': girl2FirstDialogue,
        'girl3FirstDialogue': girl3FirstDialogue,
        'girl4FirstDialogue': girl4FirstDialogue,
        'crackheadFirstTalk': crackheadFirstTalk,
        'moneyToCrackhead': moneyToCrackhead,
        'crackheadJoin': crackheadJoin,
        'crackheadFirstJoin': crackheadFirstJoin,
        'highnessDialogue': highnessDialogue,
        'larryStoreOpen': larryStoreOpen,
        'drewStoreOpen': drewStoreOpen,
        'alFirstTalk': alFirstTalk,
        'darkworldDialogue': darkworldDialogue,
        'gotYogaBlocks': gotYogaBlocks,
        'numberOfPlayers': numberOfPlayers,
        'firstStrike': firstStrike,
        'pageForDialogue': pageForDialogue,
        'overworldClock': overworldClock,
        'numberOfFights': numberOfFights,
        'bennettGet': bennettGet,
        'alGet': alGet,
        'speed': speed,
        'brothersSeal': brothersSeal,
        'brothersSealForSkateboarding': brothersSealForSkateboarding,
        'time': time,
        'athletics': athletics,
        'items': items,
        'charStyle': charStyle,
        'walletGet': walletGet,
        'liquorGet': liquorGet,
        'flowersGet': flowersGet,
        'keysGet': keysGet,
        //'phoneGet':phoneGet
      }
      localStorage.setItem("overworldParams", JSON.stringify(overworldParams));
      localStorage.setItem("joinParams", JSON.stringify(joinParams));
      localStorage.setItem("equipment", JSON.stringify(equipment));
      localStorage.setItem("party", JSON.stringify(party));
      localStorage.setItem("inventory", JSON.stringify(inventory));
      localStorage.setItem("equipped", JSON.stringify(equipped));
      localStorage.setItem("activeQuests", JSON.stringify(activeQuests));
      localStorage.setItem("completedQuests", JSON.stringify(completedQuests));
      //this.scene.scene.events.emit("Message", "Game Saved", 600,300);
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
      console.log('game saved')
    }, this);
    saveText = this.add.text(control_x - 140 - 27, 70 - 14, 'save', {
      fontSize: '25px',
      fill: '#fff'
    });

    //full button
    gameState1.full_button = this.add.rectangle(980, 70, 80, 20, 0xfff);
    gameState1.full_button.setInteractive()
    gameState1.full_button.on('pointerup', function() {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    }, this);
    fullText = this.add.text(980 - 28, 70 - 14, 'full', {
      fontSize: '25px',
      fill: '#fff'
    });
    menuText = this.add.text(400, 60, "Party Stats", {
      fontSize: '30px',
      fill: '#fff'
    });

  redisplay = true

    this.input.keyboard.on("keydown", this.onKeyInput, this);
    gameState1.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    gameState1.keyObjZ.on('down', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter = false;
    }, this);
  },
  update: function() {
    //to redisplay party stats
    if (redisplay) {
      console.log(`reloading`)
      redisplay = false
      this.partyText(175,110,'Mac')
      if (al.following) {
        this.partyText(175 + 300, 110,'Al')
      }
      if (trevor.following) {
        this.partyText(175 + 600, 110, 'Jimmy')
      }
      if (bennett.following) {
        this.partyText(175, 330, 'Bennett')
      }
    }
    //to switch scenes on button press
    if (scene_number === 7) {
      redisplay = true
      this.scene.switch('ItemsMenu');
      time2 = 0
    } else if (scene_number === 8) {
      redisplay = true
      this.scene.switch('EquipmentMenu');
    } else if (scene_number === 9) {
      redisplay = true
      this.scene.switch('OverworldMenu');
    } else if (scene_number === 99) {
      redisplay = true
      this.scene.switch('ControlsScene');
    }
  }
});
