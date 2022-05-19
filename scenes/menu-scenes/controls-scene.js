var ControlsScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "ControlsScene"
    });
  },
  init: function(data) {
    //sumn
  },
  onKeyInput: function(event) {
  },
  preload: function() {
    this.load.image('controls', "assets/images/controls.png");
  },

  create: function() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    this.border = this.add.image(600, 300, 1006, 506, 0xb39c0e);
    this.controls = this.add.image(600, 300, 'controls')




    //exit button
    this.exit_button = this.add.rectangle(1130, 70, 20, 20, 0xfff);
    this.exit_button.setInteractive()
    this.exit_button.on('pointerup', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter=false;
    }, this);
    exitText = this.add.text(1130-7, 70-14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });



    menuText = this.add.text(500, 20, "Controls", {
      fontSize: '30px',
      fill: '#fff'
    });


  },
  update: function() {

  }
});
