var SealMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "SealMenu"
    });
    this.seal1Filled = false;
    this.seal2Filled = false;
  },
  wake: function (){
    redisplay=true
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.image('seal1', "assets/images/seal1.png");
    this.load.image('seal2', "assets/images/seal2.png");
    this.load.image('sealEmpty', "assets/images/sealEmpty.png");
  },
  create: function() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    this.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    this.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //exit button
    this.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    this.exit_button.setInteractive()
    this.exit_button.on('pointerup', function() {
      launchParameter=false;
      this.scene.stop();
      pause = false;
    }, this);
    exitText = this.add.text(1080-7, 70-14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    menuText = this.add.text(500, 60, "Seals", {
      fontSize: '30px',
      fill: '#fff'
    });

    this.mySeal1 = this.physics.add.sprite(200,200,'seal1').setScale(2).setInteractive();
    this.input.setDraggable(this.mySeal1);
    this.mySeal1.name = "Seal 1"

    this.mySeal2 = this.physics.add.sprite(400,200,'seal2').setScale(2).setInteractive();
    this.input.setDraggable(this.mySeal2);
    this.mySeal2.name = "Seal 2"

    this.emptySeal1 = this.physics.add.sprite(700,200,'sealEmpty').setScale(2).setInteractive()
    this.emptySeal2 = this.physics.add.sprite(900,200,'sealEmpty').setScale(2).setInteractive()

    this.emptySeal1DropZone = this.add.zone(700, 200, 150, 150).setRectangleDropZone(150, 150);
    this.emptySeal2DropZone = this.add.zone(900, 200, 150, 150).setRectangleDropZone(150, 150);
    this.emptySeal1DropZone.name = "seal 1 drop zone"
    this.emptySeal2DropZone.name = "seal 2 drop zone"

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
  });

  this.input.on('drop', function (pointer, gameObject, dropZone) {
    console.log(dropZone.name)
    console.log(gameObject.name)
    if (dropZone.name==="seal 1 drop zone" && gameObject.name==="Seal 1"){
      this.seal1Filled = true;
      this.emptySeal1.setTexture('seal1',0)
      this.mySeal1.setTexture('sealEmpty',0)
      console.log(`seal1filled`)
    } else if (dropZone.name==="seal 1 drop zone" && gameObject.name==="Seal 2"){
      this.emptySeal1.setTexture('seal2',0)
      this.mySeal2.setTexture('sealEmpty',0)
    } else if (dropZone.name==="seal 2 drop zone" && gameObject.name==="Seal 1"){
      this.emptySeal2.setTexture('seal1',0)
      this.mySeal1.setTexture('sealEmpty',0)
    } if (dropZone.name==="seal 2 drop zone" && gameObject.name==="Seal 2"){
      this.seal2Filled = true;
      this.emptySeal2.setTexture('seal2',0)
      this.mySeal2.setTexture('sealEmpty',0)
    }
    redisplay=true;
  }, this);

 this.scene.bringToTop();


  },
  update: function() {
    if (this.seal1Filled && this.seal2Filled){
      this.seal1Filled = false;
      this.seal2Filled = false;
      this.scene.stop()
      launchParameter = false;
    }
  }
});
