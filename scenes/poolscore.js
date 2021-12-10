var PoolScore = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "PoolScore"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {},
  create: function() {
    console.log(`launched pool score scene`)
    gameStateApt.poolscore = this.add.text(1200-200, 10, '', {
      fontSize: '30px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });
    gameStateApt.pooltimer = this.add.text(1200-200, 40, '', {
      fontSize: '30px',
      fill: '#fff',
      align: 'right',
      wordWrap: { width: 190 }
    });
    cueballIndicator = this.add.image(100, 500, 'poolballs');
    cueballIndicator.setFrame(15)
    cueballIndicator.setScale(4)
    a_circle = this.add.circle(cueballIndicator.x, cueballIndicator.y, 3);
    a_circle.setStrokeStyle(2, 0x1a65ac);
    gameStateApt.poolscore.setDepth(1)
    gameStateApt.pooltimer.setDepth(1)

  },
  update: function() {
    if (dragging){
      cueballIndicator.visible=true
      a_circle.visible=true
    } else {
      cueballIndicator.visible=false
      a_circle.visible=false
    }
    if (!(englishIndicator.top || englishIndicator.bottom || englishIndicator.left || englishIndicator.right)){
      a_circle.setPosition(cueballIndicator.x,cueballIndicator.y)
    } else if (!(englishIndicator.top || englishIndicator.bottom || englishIndicator.left) && englishIndicator.right){
      a_circle.setPosition(cueballIndicator.x+14.1*englishStrength,cueballIndicator.y)
    } else if (!(englishIndicator.bottom || englishIndicator.left) && englishIndicator.right && englishIndicator.top){
      a_circle.setPosition(cueballIndicator.x+10*englishStrength,cueballIndicator.y-10*englishStrength)
    } else if (!(englishIndicator.top|| englishIndicator.left) && englishIndicator.right && englishIndicator.bottom){
      a_circle.setPosition(cueballIndicator.x+10*englishStrength,cueballIndicator.y+10*englishStrength)
    } else if (!(englishIndicator.bottom || englishIndicator.top || englishIndicator.right) &&  englishIndicator.left){
      a_circle.setPosition(cueballIndicator.x-14.1*englishStrength,cueballIndicator.y)
    } else if (!(englishIndicator.bottom || englishIndicator.right) && englishIndicator.left && englishIndicator.top){
      a_circle.setPosition(cueballIndicator.x-10*englishStrength,cueballIndicator.y-10*englishStrength)
    } else if (!(englishIndicator.top || englishIndicator.right) && englishIndicator.left && englishIndicator.bottom){
      a_circle.setPosition(cueballIndicator.x-10*englishStrength,cueballIndicator.y+10*englishStrength)
    } else if (!(englishIndicator.right || englishIndicator.bottom || englishIndicator.left) && englishIndicator.top){
      a_circle.setPosition(cueballIndicator.x,cueballIndicator.y-14.1*englishStrength)
    } else if (!(englishIndicator.right || englishIndicator.top || englishIndicator.left) && englishIndicator.bottom){
      a_circle.setPosition(cueballIndicator.x,cueballIndicator.y+14.1*englishStrength)
    }
  }
});
