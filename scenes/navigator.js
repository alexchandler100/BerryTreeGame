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
    gameStateNav.location = this.add.text(1200-200, 10, '', {
      fontSize: '15px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });
  },
  update: function() {

  }
});
