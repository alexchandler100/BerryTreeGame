/*
if (playerTexture === 0 && gameState.pointer.isDown) {
  var pointerLoc = [Number(gameState.pointer.downX), Number(gameState.pointer.downY)]
  var screenCenter = [Number(600), Number(300)]
  var moveX = pointerLoc[0] - screenCenter[0]
  var moveY = pointerLoc[1] - screenCenter[1]
  var dist = Math.sqrt((pointerLoc[0] - screenCenter[0]) ** 2 + (pointerLoc[1] - screenCenter[1]) ** 2)
  me.body.velocity.x = 50 * speed * athletics * Number(moveX / dist)
  me.body.velocity.y = 50 * speed * athletics * Number(moveY / dist)
  if (me.body.velocity.x<-10) {
    if (speed === 1) {
      me.anims.play('leftwalk', true);
    } else if (speed === 2 || speed === 3) {
      me.anims.play('leftrun', true);
    } else if (speed > 3) {
      me.anims.play('leftsprint', true);
    }
  } else if (me.body.velocity.x>10) {
    if (speed === 1) {
      me.anims.play('rightwalk', true);
    } else if (speed === 2 || speed === 3) {
      me.anims.play('rightrun', true);
    } else if (speed > 3) {
      me.anims.play('rightsprint', true);
    }
  }
  else if (me.body.velocity.y>10) {
    if (speed === 1) {
      me.anims.play('leftwalk', true);
    } else if (speed === 2 || speed === 3) {
      me.anims.play('leftrun', true);
    } else if (speed > 3) {
      me.anims.play('leftsprint', true);
    }
  } else if (me.body.velocity.y<-10) {
    if (speed === 1) {
      me.anims.play('rightwalk', true);
    } else if (speed === 2 || speed === 3) {
      me.anims.play('rightrun', true);
    } else if (speed > 3) {
      me.anims.play('rightsprint', true);
    }
  }
}
*/

// Horizontal car movement
if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown){
  firstKeyDown = ''
} else if (this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown){
  firstKeyDown = 'left'
} else if (!this.cursors.left.isDown && this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown){
  firstKeyDown = 'right'
} else if (!this.cursors.left.isDown && !this.cursors.right.isDown && this.cursors.up.isDown && !this.cursors.down.isDown){
  firstKeyDown = 'up'
} else if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && this.cursors.down.isDown){
  firstKeyDown = 'down'
}
