const gameState0 = {};
let titletime=0

var TitleScreen = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "TitleScreen"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.image('hausdorf', "assets/hausdorf.png");
    this.load.image('quil', "assets/quil.png");
  },
  create: function() {

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    gameState0.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState0.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //new button
    gameState0.new_button = this.add.rectangle(600, 400, 120, 30, 0x000);
    gameState0.new_button.setInteractive()
    gameState0.new_button.on('pointerup', function() {
      this.scene.launch("LightWorld")
      gameState0.new_button.disableInteractive()
      window.setTimeout(() => {
        this.scene.stop()
      }, 3000);
      pause = false;
    }, this);
    newText = this.add.text(600-37, 400-15, 'begin', {
      fontSize: '25px',
      fill: '#b39c0e'
    });
    gameState0.new_button.on('pointerover', function() {
      gameState0.new_button.setStrokeStyle(2, 0xffe014, 1);
    }, {
    });
    gameState0.new_button.on('pointerout', function() {
      gameState0.new_button.setStrokeStyle(1, 0x000, 1);
    }, {
    });

    titleText = this.add.text(600, 210, "Berry Tree", {
      fontFamily: 'Academy Engraved LET',
      fontSize: '160px',
      fill: '#fff'
    }).setOrigin(0.5);

    /*
    subtitleText = this.add.text(600, 260, "Hausdorffs in the Darkworld", {
      fontFamily: 'Academy Engraved LET',
      fontSize: '60px',
      fill: '#fff'
    }).setOrigin(0.5);
    */

    let xx=Phaser.Math.RND.between(100, 1100);
    let yy=Phaser.Math.RND.between(300, 550);

    hausdorfs = this.physics.add.group()
    hausdorfTitle = hausdorfs.create(xx, yy, 'hausdorf');


  },
  update: function() {
    titletime+=1;
    if (titletime%100==0){
      hausdorfs.children.iterate(function(child) {
        child.setInteractive();
        child.on('pointerover', function() {
          xx=Phaser.Math.RND.between(100, 1100);
          yy=Phaser.Math.RND.between(300, 550);
          child.x=xx;
          child.y=yy;
          child.setTexture('quil', 0)
          child.setScale(.25)
          xx=Phaser.Math.RND.between(100, 1100);
          yy=Phaser.Math.RND.between(300, 550);
          newone = hausdorfs.create(xx, yy, 'hausdorf');
          newone.setScale(Math.random()+.8)
        }, {
        });
      });
    }
    if (scene_number === 1) {
      this.scene.switch('PauseMenu');
    }
    else if (scene_number === 7) {
      this.scene.switch('CharacterMenu');
    }
    else if (scene_number === 8) {
      this.scene.switch('EquipmentMenu');
    }
  }
});
