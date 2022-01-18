const gameState0 = {};

var Hausdorff = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Sprite,
  //notes: dialogue is a dictionary of audio objects like {"al": alSound} (fix needed...)
  // left, right, up, down are strings like 'alright' or 'jonleft'
  initialize: function Hausdorff(scene, x,y) {
    Phaser.GameObjects.Sprite.call(this, scene, x,y, 'hausdorf');
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.spawn = false
    this.setInteractive().on('pointerover', function() {
      this.x = Phaser.Math.RND.between(100, 1100);
      this.y = Phaser.Math.RND.between(300, 550);
      let rnd = Math.floor(Math.random()*2);
      if (rnd===0){
        this.setTexture('quil', 0)
        this.setScale(.25)
      } else {
        this.setTexture('hausdorf', 0)
        this.setScale(1)
      }
      //this.spawns()
    });
  },
  spawns: function(){ //this is  not working...
      newone = new Hausdorff(this, Phaser.Math.RND.between(100, 1100), Phaser.Math.RND.between(300, 550));
      newone.setScale(Math.random() + .8)
  }
});

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
    this.load.audio('banner','assets/banner.mp3');
    this.load.audio('trueStory','assets/trueStory.mp3');
    this.load.image('hausdorf', "assets/hausdorf.png");
    this.load.image('quil', "assets/quil.png");
    this.load.image('banner', 'assets/banner.png');
  },
  create: function() {
    //to skip title

    this.scene.launch("LightWorld")
    this.scene.launch('DialogueMenu');
    this.scene.stop();



    this.bannerSound = this.sound.add('banner', {
      volume: .5
    });
    this.trueStorySound = this.sound.add('trueStory', {
      volume: .5
    });
    this.titleTime = 0;
    this.buttonPushed = false;
    this.input.setDefaultCursor('url(assets/handPointer.png), pointer');
    this.input.on('pointerdown', function(pointer) {
      this.input.setDefaultCursor('url(assets/handPointerClosed.png), pointer');
    }, this);

    this.input.on('pointerup', function(pointer) {
      this.input.setDefaultCursor('url(assets/handPointer.png), pointer');
    }, this);

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(3, 0xb39c0e);
    this.graphics.strokeRect(100, 50, 1000, 500, 0xb39c0e);

    //gameState0.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    //gameState0.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //new button
    this.startButton = this.add.rectangle(600, 400, 120, 30, 0x000);
    this.startButton.setInteractive()
    this.startButton.on('pointerup', function() {
      this.startButton.disableInteractive();
      this.startButton.destroy();
      this.titleText.destroy();
      this.newText.destroy();
      this.graphics.destroy();
      this.titleTime = 0;
      this.buttonPushed = true;
      titleHausdorf.destroy()
      /*
      hausdorfs.children.iterate(function(child) {
        child.destroy()
      }, {});
      */
      window.setTimeout(() => {
        this.scene.launch("LightWorld")
        this.scene.launch('DialogueMenu');
        this.scene.stop();
      }, 12000);
      pause = false;
      this.bannerBack = this.add.rectangle(0, 0, 1200, 600, 0x000).setDepth(1);
      //this.bannerBack.alpha = 0;
      this.banner = this.add.image(0, 0, 'banner').setOrigin(0, 0).setDepth(1);
      this.banner.alpha = 0;
      window.setTimeout(()=>{
        this.bannerSound.play()
      }, 100);
      this.tweens.add({
        targets: this.banner,
        duration: 2000,
        alpha: 1
      });
      window.setTimeout(() => {
        this.tweens.add({
          targets: this.banner,
          duration: 4000,
          alpha: 0
        });
      }, 2000);
      this.trueStory = this.add.text(600, 300, 'based on a true story', {
        fontSize: 20,
        fill: '#ffffff',
        align: 'center',
      }).setDepth(1); //this.banner.alpha = 0;
      this.trueStory.alpha = 0
      window.setTimeout(() => {
        //this.trueStorySound.play()
        this.tweens.add({
          targets: this.trueStory,
          duration: 2000,
          alpha: 1
        });
      }, 8000);
      window.setTimeout(() => {
        this.tweens.add({
          targets: this.trueStory,
          duration: 2000,
          alpha: 0
        });
      }, 10000);
    }, this);

    this.newText = this.add.text(600 - 37, 400 - 15, 'begin', {
      fontSize: '25px',
      fill: '#b39c0e'
    });
    this.startButton.on('pointerover', function() {
      this.startButton.setStrokeStyle(2, 0xffe014, 1);
    }, this);
    this.startButton.on('pointerout', function() {
      this.startButton.setStrokeStyle(1, 0x000, 1);
    }, this);

    this.titleText = this.add.text(600, 210, "Berry Tree", {
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
    /*
    let xx = Phaser.Math.RND.between(100, 1100);
    let yy = Phaser.Math.RND.between(300, 550);

    hausdorfs = this.physics.add.group()
    hausdorfTitle = hausdorfs.create(xx, yy, 'hausdorf');
    if (!this.buttonPushed) {
      hausdorfs.children.iterate(function(child) {
        child.setInteractive();
        child.on('pointerover', function() {
          xx = Phaser.Math.RND.between(100, 1100);
          yy = Phaser.Math.RND.between(300, 550);
          child.x = xx;
          child.y = yy;
          child.setTexture('quil', 0)
          child.setScale(.25)
          xx = Phaser.Math.RND.between(100, 1100);
          yy = Phaser.Math.RND.between(300, 550);
          newone = hausdorfs.create(xx, yy, 'hausdorf');
          newone.setScale(Math.random() + .8)
        }, {});
      });
    }
    */

    titleHausdorf = new Hausdorff(this, Phaser.Math.RND.between(100, 1100), Phaser.Math.RND.between(300, 550));

  },
  update: function() {
    /*
    if (this.titleTime<60*3 && this.buttonPushed){
      this.bannerBack.alpha = this.titleTime/60*3
    } else if (this.titleTime>60*3 && this.buttonPushed && this.bannerBack.alpha<1){
      this.banner.alpha = (this.titleTime-60*3)/60*3
    }
    */
    if (scene_number === 1) {
      this.scene.switch('PauseMenu');
    } else if (scene_number === 7) {
      this.scene.switch('CharacterMenu');
    } else if (scene_number === 8) {
      this.scene.switch('EquipmentMenu');
    }
  }
});
