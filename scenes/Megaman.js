var Megaman = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "Megaman"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
      this.load.spritesheet('megaman',
        'assets/megaman.png', {
          frameWidth: 32,
          frameHeight: 32
        });
        this.load.spritesheet('penguin',
          'assets/chillPenguin.png', {
            frameWidth: 45,
            frameHeight: 45
          });
          this.load.spritesheet('flameStag',
            'assets/flameStag.png', {
              frameWidth: 60,
              frameHeight: 65
            });
        this.load.audio("enemyDamage", "assets/EnemyDamage.wav");
        this.load.audio("explosion", "assets/Explosion.wav");
        this.load.audio("lemonSound", "assets/lemon.wav");
        this.load.audio("slideSound", "assets/slideSound.wav");
        this.load.audio("bossFightTheme", "assets/megamanBossFight.wav");
        this.load.image("megamanTiles", "assets/tilesets/megamanTiles.png");
        this.load.image("lemon", "assets/lemon.png");
        this.load.image("health", "assets/megamanHealth.png");
        this.load.tilemapTiledJSON("megaMap", "assets/megaman.json");
  },
  wake: function(){
      this.myHealth = 100;
      this.myHealthMeter.visible = true;
      if (this.penguinAlive){
        this.penguinHealth = 100;
        chill.x = 400;
        chill.y = 200;
      }
      if (this.stagAlive){
        this.stagHealth = 100;
        stag.x = 400;
        stag.y = 200;
      }
      player.x = 50;
      player.y = 50;
      player.visible = true;

      //gameStateApt.indoors0.stop()
      //gameStateApt.indoors1.stop()
      //gameStateApt.indoors2.stop()
      //gameStateApt.indoors3.stop()
      //gameState.bossfight.play();
  },
  create: function() {
    this.penguinAlive = true;
    this.exitVictoryPenguin = false;

    this.stagAlive = true;
    this.exitVictoryStag = false

    const camera = this.cameras.main;
    camera.zoom = 1.8;
    camera.setBounds(0, 0, 640,320);

    gameState.bossfight = this.sound.add('bossFightTheme', {
      volume: .7
    });

    gameState.bossfight.loop = true;

    gameStateApt.indoors0.stop()
    gameStateApt.indoors1.stop()
    gameStateApt.indoors2.stop()
    gameStateApt.indoors3.stop()
    gameState.bossfight.play()

    megaMap = this.make.tilemap({
      key: "megaMap"
    });

    const tilesetMega = megaMap.addTilesetImage("megamanTiles", "megamanTiles");
    const background = megaMap.createStaticLayer("Background", tilesetMega, 0, 0);
    const ground = megaMap.createStaticLayer("Ground", tilesetMega, 0, 0);

    ground.setCollisionByProperty({
      collides: true
    });

    this.lemon = this.sound.add('lemonSound', {
      volume: .7
    });

    this.slideSound = this.sound.add('slideSound', {
      volume: .7
    });

    this.enemyDamage = this.sound.add('enemyDamage', {
      volume: .7
    });
    this.explosion = this.sound.add('explosion', {
      volume: .7
    });

    chill = this.physics.add.sprite(400,200, 'penguin')
    chill.body.setGravityY(300);
    this.chillGoingLeft = true;

    stag = this.physics.add.sprite(400,200, 'flameStag')
    stag.body.setGravityY(300);
    this.stagGoingLeft = true;
    stag.disableBody(true, true);

    player = this.physics.add.sprite(50,50, 'megaman');
    player.setSize(25,28);
    player.setOffset(0,0);
    player.body.setGravityY(300);

    player.setCollideWorldBounds(true);
    chill.setCollideWorldBounds(true);
    stag.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);
    this.physics.add.collider(chill, ground);
    this.physics.add.collider(stag, ground);

    this.lemons = this.physics.add.group({
            defaultKey: 'lemon',
            maxSize: 10
        });

    this.shoot = function() {
          var lemon = this.lemons.get(player.x, player.y);
          if (lemon) {
              lemon.setActive(true);
              lemon.setVisible(true);
              if (player.flipX){
                lemon.body.setVelocityX(300)
              } else {
                lemon.body.setVelocityX(-300)
              }
          }
      }


    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'stagdie',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [14, 15]
      }),
      frameRate: 2,
      repeat: 0
    });

    this.anims.create({
      key: 'stagpunch',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [0,1,2,3,4,5]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'stagrush',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [7,8,9,10]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'stagjump',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [11,12,13]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'chilldie',
      frames: this.anims.generateFrameNumbers('penguin', {
        frames: [12, 12, 12, 12,13,14,15,15,16, 16, 16, 16, 16, 16]
      }),
      frameRate: 2,
      repeat: 0
    });

    this.anims.create({
      key: 'chillattack',
      frames: this.anims.generateFrameNumbers('penguin', {
        frames: [0,1,2,8,2]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'chillslide',
      frames: this.anims.generateFrameNumbers('penguin', {
        frames: [6,7,8,11]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'gethit',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 36,
        end: 37
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'megaleft',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'turnmega',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 4,
        end: 4
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'megajump',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 12,
        end: 14
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'megajumpshoot',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 15,
        end: 17
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'megashootrun',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 6,
        end: 11
      }),
      frameRate: 5
    });

    this.anims.create({
      key: 'megashootground',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 30,
        end: 33
      }),
      frameRate: 5
    });

    this.anims.create({
      key: 'megaslide',
      frames: this.anims.generateFrameNumbers('megaman', {
        start: 24,
        end: 27
      }),
      frameRate: 5
    });

    this.sliding = false;
    this.slidingCounter = 0;



    this.keyObjS = this.input.keyboard.addKey('S'); // Get key object
    this.keyObjS.on('down', function(event) {
      if (!this.gettingHit){
        this.lemon.play()
        this.shoot()
      }
    }, this);

    this.keyObjD = this.input.keyboard.addKey('D'); // Get key object
    this.keyObjD.on('down', function(event) {
      if (!this.gettingHit){
        this.sliding = true;
        this.slideSound.play()
      }
    }, this);
    this.keyObjD.on('up', function(event) {
      this.sliding = false;
      this.slidingCounter = 0;
    }, this);

    this.myHealth = 100;
    this.myHealthMeter = this.add.rectangle(20, 20, 10, 100, 0xe3ec3d).setOrigin(0,0);
    this.myHealthMeterCover = this.add.image(20,20, 'health').setOrigin(0,0);

    this.enemyHealthMeterCover = this.add.image(600,20, 'health').setOrigin(0,0).setDepth(1);

    this.penguinHealth = 100;
    this.penguinHealthMeter = this.add.rectangle(600, 20, 10, 100, 0xe3ec3d).setOrigin(0,0);

    this.stagHealth = 100;
    this.stagHealthMeter = this.add.rectangle(600, 20, 10, 100, 0xe3ec3d).setOrigin(0,0);
    this.stagHealthMeter.visible = false;

    this.physics.add.overlap(player, chill, hitPlayer, null, this);

    this.physics.add.overlap(player, stag, hitPlayer, null, this);

    function hitPlayer() {
      console.log(`prehitting player`)
      if (!this.gettingHit) {
        console.log(`hitting player`)
        this.gettingHit = true;
        window.setTimeout(()=>{
          this.gettingHit = false;
        }, 1500)
        this.myHealth-=15;
        this.enemyDamage.play();
        console.log(this.myHealth)
        this.myHealthMeter.y = 20+100 - this.myHealth
        this.myHealthMeter.height = this.myHealth;
      }
    }

    this.physics.add.overlap(chill, this.lemons,  hitChill, null, this);

    this.physics.add.overlap(stag, this.lemons,  hitStag, null, this);

    this.penguinGettingHit = false;

    this.stagGettingHit = false;

    function hitChill(chill, lemon) {
      lemon.setActive(false);
      if (!this.penguinGettingHit) {
        this.penguinGettingHit = true;
        window.setTimeout(()=>{
          this.penguinGettingHit = false;
        }, 100)
        this.penguinHealth-=2;
        this.enemyDamage.play();
        console.log(`penguin: ${this.penguinHealth}`)
        this.penguinHealthMeter.y = 20+100 - this.penguinHealth
        this.penguinHealthMeter.height = this.penguinHealth;
      }
    }

    function hitStag(stag, lemon) {
      lemon.setActive(false);
      if (!this.stagGettingHit) {
        this.stagGettingHit = true;
        window.setTimeout(()=>{
          this.stagGettingHit = false;
        }, 100)
        this.stagHealth-=2;
        this.enemyDamage.play();
        console.log(`stag: ${this.stagHealth}`)
        this.stagHealthMeter.y = 20+100 - this.stagHealth
        this.stagHealthMeter.height = this.stagHealth;
      }
    }
    this.sys.events.on('wake', this.wake, this);
  },
  update: function() {
    // ai for lemons
    this.lemons.children.each(function(b) {
            if (b.active) {
                if (b.x < 0 || b.x>700) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    //penguin dies
    if (this.penguinHealth<=0 && this.penguinAlive){
      this.exitVictoryPenguin = true
      this.penguinHealthMeter.visible = false;
      this.penguinAlive = false
      console.log(`end of penguin 0 `)
    }
    if (this.exitVictoryPenguin){
      console.log(`start of exit victory`)
      this.exitVictoryPenguin = false;
      this.explosion.play();
      gameState.bossfight.stop()
      window.setTimeout(()=>{
        this.scene.switch('LightWorld')
        scene_number = 2
        chill.disableBody(true, true);
        stag.enableBody(true, 400, 200, true, true);
        this.stagHealthMeter.visible = true;
        //enable the next boss here
      }, 5000)
      console.log(`end of exit victory`)
    }

    if (this.stagHealth<=0 && this.stagAlive){
      this.exitVictoryStag = true
      this.stagHealthMeter.visible = false;
      this.stagAlive = false
      console.log(`end of stag 0 `)
    }
    if (this.exitVictoryStag){
      console.log(`start of exit victory`)
      this.exitVictoryStag = false;
      this.explosion.play();
      gameState.bossfight.stop()
      window.setTimeout(()=>{
        this.scene.switch('LightWorld')
        scene_number = 2
        stag.disableBody(true, true);
        //enable the next boss here
      }, 5000)
      console.log(`end of exit victory stag`)
    }
    //I die
    if (player.y>500 || this.myHealth<=0){
      player.anims.play('gethit', true)
      this.explosion.play()
      player.y = 50
      player.x = 50
      player.visible = false;
      this.myHealth = 100;
      this.myHealthMeter.visible = false;
      gameState.bossfight.stop()
      window.setTimeout(()=>{
        this.scene.switch('LightWorld')
        scene_number = 2
      }, 3000)

    }
    //ai for penguin
    if (this.penguinAlive){
      if (chill.x<50 && this.chillGoingLeft){   //to avoid running into walls
        this.chillGoingLeft = false;
      } else if (chill.x>600 && !this.chillGoingLeft){
        this.chillGoingLeft = true;
      }
      if (chill.x<player.x - 250 && this.chillGoingLeft){    //to turn around if he's going in the opposite way of player
        this.chillGoingLeft = false;
      } else if (chill.x>player.x + 250 && !this.chillGoingLeft){
        this.chillGoingLeft = true;
      }
      if (chill.body.blocked.down && !chill.body.blocked.left && !chill.body.blocked.right && this.chillGoingLeft){    //to make him slide on the ground and jump over bumps
        chill.setVelocityX(-150)
        chill.anims.play('chillslide',true)
      } else if (chill.body.blocked.down && !chill.body.blocked.left && !chill.body.blocked.right && !this.chillGoingLeft){
        chill.setVelocityX(150)
        chill.anims.play('chillslide',true)
      } else if (chill.body.blocked.left || chill.body.blocked.right){
        chill.y-=30
        chill.anims.play('chillattack',true)
      }
      if (chill.flipX && !chill.body.blocked.down){
        chill.body.setVelocityX(150)
      } else if (!chill.body.blocked.down){
        chill.body.setVelocityX(-150)
      }

      if (chill.body.velocity.x>0){
        chill.flipX = true;
      } else if (chill.body.velocity.x<0){
        chill.flipX = false;
      }
    } else if (!this.penguinAlive){
      chill.body.setVelocityX(0);
      chill.body.setVelocityY(0);
      chill.anims.play('chilldie', true);
    }

    //ai for stag
    if (this.stagAlive && !this.penguinAlive){
      if (stag.x<50 && this.stagGoingLeft){   //to avoid running into walls
        this.stagGoingLeft = false;
      } else if (stag.x>600 && !this.stagGoingLeft){
        this.stagGoingLeft = true;
      }
      if (stag.x<player.x - 250 && this.stagGoingLeft){    //to turn around if he's going in the opposite way of player
        this.stagGoingLeft = false;
      } else if (stag.x>player.x + 250 && !this.stagGoingLeft){
        this.stagGoingLeft = true;
      }
      if (stag.body.blocked.down && !stag.body.blocked.left && !stag.body.blocked.right && this.stagGoingLeft){    //to make him slide on the ground and jump over bumps
        stag.setVelocityX(-150)
        stag.anims.play('stagrush',true)
      } else if (stag.body.blocked.down && !stag.body.blocked.left && !stag.body.blocked.right && !this.stagGoingLeft){
        stag.setVelocityX(150)
        stag.anims.play('stagrush',true)
      } else if (stag.body.blocked.left || stag.body.blocked.right){
        stag.y-=30
        stag.anims.play('stagpunch',true)
      }
      if (stag.flipX && !stag.body.blocked.down){
        stag.body.setVelocityX(150)
      } else if (!stag.body.blocked.down){
        stag.body.setVelocityX(-150)
      }

      if (stag.body.velocity.x>0){
        stag.flipX = true;
      } else if (stag.body.velocity.x<0){
        stag.flipX = false;
      }
    } else if (!this.stagAlive){
      stag.body.setVelocityX(0);
      stag.body.setVelocityY(0);
      stag.anims.play('stagdie', true);
    }

    //animations
    if (this.gettingHit){
      player.anims.play('gethit', true)
    }
    else {
      if (player.body.velocity.x>0){
        player.flipX = true;
      } else if (player.body.velocity.x<0){
        player.flipX = false;
      }
      if (this.keyObjS.isDown && player.body.velocity.x===0){
        player.anims.play('megashootground', true)
      } else if (this.keyObjS.isDown && player.body.velocity.x!=0){
        player.anims.play('megashootrun', true)
      } else if (this.keyObjD.isDown && this.sliding){
        if (this.slidingCounter>=30){
          this.sliding = false;
        }
        this.slidingCounter+=1;
        player.anims.play('megaslide', true)
        if (player.flipX){
          player.x+=1
        } else{
          player.x-=1
        }
      } else if (cursors.left.isDown) {
        player.anims.play('megaleft', true);
        player.flipX = false;
      } else if (cursors.right.isDown) {
        player.anims.play('megaleft', true);
        player.flipX = true;
      } else {
        player.anims.play('turnmega', true);
      }
      if (!player.body.blocked.down) {
        if (this.keyObjS.isDown){
          player.anims.play('megajumpshoot', true);
        } else {
          player.anims.play('megajump', true);
        }
      }

      //motions
      if (cursors.left.isDown) {
        player.setVelocityX(-80);
      } else if (cursors.right.isDown) {
        player.setVelocityX(80);
      } else {
        player.setVelocityX(0);
      }
      if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-200);
      }
    }

  }
});
