const gameStateHB = {};

let highScore = 0;
let highScoreToBeat = 70;
let score = 0;
let buzz = 1;
let health = 2;
var scoreText;
var buzzText;

var HomeboyGame = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "HomeboyGame"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.audio('bong', ['assets/bong.wav']);
    this.load.image('hausdorf', "assets/hausdorf.png");
    this.load.audio('theme', ['assets/Fugginwitsumshiit.wav']);
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/weed.png');
    this.load.image('bomb', 'assets/hausdorf.png');
    this.load.spritesheet('dude',
      'assets/hb_walk.png', {
        frameWidth: 101,
        frameHeight: 97
      });
    this.load.spritesheet('smoke',
      'assets/smokesheet.png', {
        frameWidth: 101,
        frameHeight: 97
      }
    );
  },
  wake: function(){
    gameState.linkWoods.stop();
    gameState.marioWoods.stop();
    gameState.trevorWoods.stop();
  },
  create: function() {
    gameState.linkWoods.stop();
    gameState.marioWoods.stop();
    gameState.trevorWoods.stop();
    gameState.mario2.play();
    let bg = this.add.image(600, 300, 'sky');
    var platforms;
    platforms = this.physics.add.staticGroup();

    //refreshbody is reauired because we have scaled a static object
    platforms.create(600, 567, 'ground').setScale(3).refreshBody();
    platforms.create(800, 400, 'ground');
    platforms.create(100, 250, 'ground');
    platforms.create(1050, 220, 'ground');

    player = this.physics.add.sprite(100, 350, 'dude');

    player.body.setSize(30, 80);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(400);
    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'leftup',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 5
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'rightup',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 6,
        end: 6
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'turndude',
      frames: [{
        key: 'dude',
        frame: 2
      }],
      frameRate: 19
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 3,
        end: 4
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('smoke', {
        start: 1,
        end: 1
      }),
      frameRate: .8,
      repeat: -1
    });

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {
        x: 50,
        y: 0,
        stepX: 100
      }
    });

    stars.children.iterate(function(child) {
      child.body.setGravityY(301)
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setScale(Phaser.Math.FloatBetween(0.7, 1.2));
      console.log(child._scaleX)
    });
    this.physics.add.collider(stars, platforms);
    //checks if the player overlaps with a star and collects star
    this.physics.add.overlap(player, stars, collectStar, null, this);

    function collectStar(player, star) {
      star.disableBody(true, true);
      score += star._scaleX;
      score = Math.round(score * 10) / 10
      scoreText.setText('Weed(grams): ' + score);

      if (stars.countActive(true) === 0) {
        buzz = 1
        buzzText.setText('buzz: ' + "Low");
        stars.children.iterate(function(child) {
          child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 600) ? Phaser.Math.Between(600, 1200) : Phaser.Math.Between(0, 600);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.body.setGravityY(301)
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }


    scoreText = this.add.text(930, 16, 'Weed(grams): 0', {
      fontSize: '25px',
      fill: '#001'
    });

    highScoreText = this.add.text(1050, 70, `PB: ${highScoreToBeat}`, {
      fontSize: '25px',
      fill: '#001'
    });

    buzzText = this.add.text(16, 16, 'Buzz: Low', {
      fontSize: '25px',
      fill: '#001'
    });

    healthText = this.add.text(16, 40, 'Health: All Macked Up', {
      fontSize: '25px',
      fill: '#001'
    });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    let bomb_collider = this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb(player, bomb) {
      if (health === 2) {
        bomb_collider.active = false
        setTimeout(function() {
          bomb_collider.active = true;
        }, 3000);
        health -= 1;
        healthText.setText('Health: ' + 'Shitty');
        player.setTint(0xffacac);
      } else if (health === 1) {
        health -= 1;
        healthText.setText('Health: ' + 'Fucked');
        this.physics.pause();
        player.setTint(0xff2d2d);
        player.anims.play('turndude');
        //gameOver = true;
        //setTimeout(function(){
        //this.registry.destroy();
        //this.events.off();﻿
        //gameOver = true;
        if (score > highScore && score > highScoreToBeat){
          highScoreText.setText(`PBR: ${highScore}`)
        }
        if (score > highScore) {
          highScore = score
        }
        window.setTimeout(() => {
          health = 2;
          buzz = 1;
          score = 0;
          this.scene.restart('HomeboyGame');
          this.scene.switch('LightWorld');
        }, 3000);
        //}, 3000);


      }
    }
  },
  update: function() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160 * buzz / 1.5);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160 * buzz / 1.5);
      player.anims.play('right', true);
    } else if (cursors.down.isDown) {
      player.anims.play('down', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turndude');
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-430 * buzz / 2);
    }
    if (cursors.up.isDown && !(cursors.right.isDown)) {
      player.anims.play('leftup', true);
    } else if (cursors.up.isDown) {
      player.anims.play('rightup', true);
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
      gameState.bongSound.play()
      if (buzz === 1 && score > 1) {
        buzz += 1
        score -= 1
        score = Math.round(score * 10) / 10
        buzzText.setText('buzz: ' + "decent");
        scoreText.setText('Weed(grams): ' + score);
      } else if (buzz === 2 && score > 2) {
        buzz += 1
        score -= 2
        score = Math.round(score * 10) / 10
        buzzText.setText('buzz: ' + "high");
        scoreText.setText('Weed(grams): ' + score);
      } else if (buzz === 3 && score > 4) {
        buzz += 1
        score -= 4
        score = Math.round(score * 10) / 10
        buzzText.setText('buzz: ' + "stoned2bone");
        scoreText.setText('Weed(grams): ' + score);
      }

    }
  }
});
