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
    gameStateNav.location = this.add.text(1200-200, 10, '', {
      fontSize: '15px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });
  },
  update: function() {
    //console.log(stamina)
    gameStateNav.staminaDisplayFront.width=stamina
  }
});
