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
    this.load.audio("gainlife", "assets/gainlife.wav");
    this.load.audio("explosion", "assets/Explosion.wav");
    this.load.audio("hitwall", "assets/hitwall.wav");
    this.load.audio("lemonSound", "assets/lemon.wav");
    this.load.audio("iceSound", "assets/iceball.wav");
    this.load.audio("fireSound", "assets/fireSound.wav");
    this.load.audio("slideSound", "assets/slideSound.wav");
    this.load.audio("bossFightTheme", "assets/megamanBossFight.wav");
    this.load.image("megamanTiles", "assets/tilesets/megamanTiles.png");
    this.load.image("iceball", "assets/iceball.png");
    this.load.image("fireball", "assets/fireball.png");
    this.load.image("lemon", "assets/lemon.png");
    this.load.tilemapTiledJSON("megaMap", "assets/megaman.json");
  },
  wake: function() {
    this.iceballs.children.each(function(b) {
      if (b.active) {
          b.setActive(false);
          b.visible = false;
      }
    }.bind(this));
    this.fireballs.children.each(function(b) {
      if (b.active) {
          b.setActive(false);
          b.visible = false;
      }
    }.bind(this));
    this.timeCounter = 0;
    this.pause = true;
    this.physics.pause();
    window.setTimeout(() => {
      this.pause = false;
      this.physics.resume();
    }, 2000);
    this.scene.run("MegamanUI");
    this.myHealth = 98;
    this.myIceMeter = 98;
    this.playerAlive = true
    this.MegamanUI.myHealthMeter.y = 40 + 196 - 2 * this.myHealth + 2;
    this.MegamanUI.myHealthMeter.height = 2 * this.myHealth;
    if (this.penguinAlive) {
      this.camera.setBounds(this.chillTL.x, this.chillTL.y, this.chillBR.x, this.chillBR.y);
      this.penguinHealth = 0;
      chill.x = this.chillSpawnPoint.x;
      chill.y = this.chillSpawnPoint.y;
      player.x = this.spawnPointForChill.x
      player.y = this.spawnPointForChill.y
      this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.penguinHealth + 2;
      this.MegamanUI.enemyHealthMeter.height = 2 * this.penguinHealth;
    }
    if (!this.penguinAlive && this.stagAlive) {
      this.camera.setBounds(0, 0, 100 * 32, 100 * 32);
      this.stagHealth = 0;
      stag.x = this.stagSpawnPoint.x;
      stag.y = this.stagSpawnPoint.y;
      player.x = this.spawnPointForStag.x
      player.y = this.spawnPointForStag.y
      this.camera.startFollow(player, true);
      this.camera.setBounds(this.stagTL.x, this.stagTL.y, this.stagBR.x, this.stagBR.y);
      this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.stagHealth + 2;
      this.MegamanUI.enemyHealthMeter.height = 2 * this.stagHealth;
    }
    player.visible = true;
    gameStateApt.indoors0.stop()
    gameStateApt.indoors1.stop()
    gameStateApt.indoors2.stop()
    gameStateApt.indoors3.stop()
    gameState.bossfight.play();

  },
  create: function() {
    this.pause = true;
    this.physics.pause();
    window.setTimeout(() => {
      this.pause = false;
      this.physics.resume();
    }, 2000);

    this.MegamanUI = this.scene.get("MegamanUI");

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
        frames: [0, 1, 2, 3, 4, 5]
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'stagrush',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [7, 8, 16, 17, 18, 19]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'stagretreat',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [8, 9]
      }),
      frameRate: 4,
      repeat: 0
    });

    this.anims.create({
      key: 'stagjump',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [11, 12, 13]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'stagground',
      frames: this.anims.generateFrameNumbers('flameStag', {
        frames: [21, 22, 23, 24, 25, 24, 23, 22]
      }),
      frameRate: 14,
      repeat: 0
    });

    this.anims.create({
      key: 'chilldie',
      frames: this.anims.generateFrameNumbers('penguin', {
        frames: [12, 12, 12, 12, 13, 14, 15, 15, 16, 16, 16, 16, 16, 16]
      }),
      frameRate: 2,
      repeat: 0
    });

    this.anims.create({
      key: 'chillattack',
      frames: this.anims.generateFrameNumbers('penguin', {
        frames: [8]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'chillslide',
      frames: this.anims.generateFrameNumbers('penguin', {
        frames: [11]
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

    this.lemon = this.sound.add('lemonSound', {
      volume: .7
    });
    this.iceSound = this.sound.add('iceSound', {
      volume: .7
    });
    this.fireSound = this.sound.add('fireSound', {
      volume: .7
    });
    this.slideSound = this.sound.add('slideSound', {
      volume: .7
    });
    this.enemyDamage = this.sound.add('enemyDamage', {
      volume: .7
    });
    this.hitwall = this.sound.add('hitwall', {
      volume: .7
    });
    this.explosion = this.sound.add('explosion', {
      volume: .7
    });
    this.gainlife = this.sound.add('gainlife', {
      volume: .7
    });

    gameState.bossfight = this.sound.add('bossFightTheme', {
      volume: .4
    });
    gameState.bossfight.loop = true;
    gameStateApt.indoors0.stop()
    gameStateApt.indoors1.stop()
    gameStateApt.indoors2.stop()
    gameStateApt.indoors3.stop()
    gameState.bossfight.play()

    this.playerAlive = true;

    //to start at stag, switch to false
    this.penguinAlive = true;
    this.exitVictoryPenguin = false;

    this.stagAlive = true;
    this.exitVictoryStag = false

    megaMap = this.make.tilemap({
      key: "megaMap"
    });

    const tilesetMega = megaMap.addTilesetImage("megamanTiles", "megamanTiles");
    const background = megaMap.createStaticLayer("Background", tilesetMega, 0, 0);
    const ground = megaMap.createStaticLayer("Ground", tilesetMega, 0, 0);
    const onlyICollide = megaMap.createStaticLayer("OnlyICollide", tilesetMega, 0, 0);

    ground.setCollisionByProperty({
      collides: true
    });

    onlyICollide.setCollisionByProperty({
      collides: true
    });

    this.spawnPointForChill = megaMap.findObject("Objects", obj => obj.name === "spawn point for chill");
    this.spawnPointForStag = megaMap.findObject("Objects", obj => obj.name === "spawn point for stag");
    this.chillSpawnPoint = megaMap.findObject("Objects", obj => obj.name === "chill spawn point");
    this.stagSpawnPoint = megaMap.findObject("Objects", obj => obj.name === "stag spawn point");
    this.chillTL = megaMap.findObject("Objects", obj => obj.name === "chillTL");
    this.chillBR = megaMap.findObject("Objects", obj => obj.name === "chillBR");
    this.stagTL = megaMap.findObject("Objects", obj => obj.name === "stagTL");
    this.stagBR = megaMap.findObject("Objects", obj => obj.name === "stagBR");

    chill = this.physics.add.sprite(this.chillSpawnPoint.x, this.chillSpawnPoint.y, 'penguin')
    chill.body.setGravityY(300);
    this.chillGoingLeft = true;
    this.physics.add.collider(chill, ground);
    this.penguinHealth = 0;

    stag = this.physics.add.sprite(this.stagSpawnPoint.x, this.stagSpawnPoint.y, 'flameStag')
    stag.body.setGravityY(300);
    stag.body.setSize(35, 45);
    stag.body.setOffset(15, 20);
    this.stagGoingLeft = true;
    this.stagGoingUp = true;
    stag.disableBody(true, true);
    if (!this.penguinAlive && this.stagAlive) {
      stag.enableBody(true, this.stagSpawnPoint.x, this.stagSpawnPoint.y, true, true);
    }
    this.physics.add.collider(stag, ground);
    //this.physics.add.collider(stag, onlyICollide);
    this.stagHealth = 0;

    player = this.physics.add.sprite(this.spawnPointForChill.x, this.spawnPointForChill.y, 'megaman');
    player.setSize(20, 28);
    player.setOffset(5, 0);
    player.flipX = true;
    player.body.setGravityY(300);
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, onlyICollide);
    this.myHealth = 100;
    this.fightOngoing = true;

    this.lemons = this.physics.add.group({
      defaultKey: 'lemon',
      maxSize: 5
    });

    this.iceballs = this.physics.add.group({
      defaultKey: 'iceball',
      //maxSize: 50
    });

    this.fireballs = this.physics.add.group({
      defaultKey: 'fireball',
      //maxSize: 50
    });

    this.shoot = function() {
      if (!this.pause) {
        var lemon = this.lemons.get(player.x, player.y);
        if (lemon) {
          this.lemon.play()
          lemon.setActive(true);
          lemon.setVisible(true);
          if (player.flipX) {
            lemon.body.setVelocityX(300)
          } else {
            lemon.body.setVelocityX(-300)
          }
        }
      }
    }

    this.shootIce = function(shooter, target) {
      var lemon = this.iceballs.get(shooter.x + 50 * directionVector(shooter, target)[0], shooter.y + 50 * directionVector(shooter, target)[1]).setScale(1);
      if (lemon) {
        this.iceSound.play()
        lemon.setActive(true);
        lemon.setVisible(true);
        let iceSpeed = 220;
        if (this.penguinHealth < 50) {
          iceSpeed += 50
        }
        lemon.body.setVelocityX(directionVector(shooter, target)[0] * iceSpeed)
        lemon.body.setVelocityY(directionVector(shooter, target)[1] * iceSpeed)
      }
    }

    this.shootFire = function(shooter, target) {
      var lemon = this.fireballs.get(shooter.x + 20 * directionVector(shooter, target)[0], shooter.y + 20 * directionVector(shooter, target)[1]).setScale(1);
      if (lemon) {
        this.fireSound.play()
        lemon.setActive(true);
        lemon.setVisible(true);
        let fireSpeed = 260;
        lemon.body.setVelocityX(directionVector(shooter, target)[0] * fireSpeed)
        lemon.body.setVelocityY(directionVector(shooter, target)[1] * fireSpeed)
      }
    }

    this.sprayFire = function(shooter,target) { //fix needed... stops working on wake
      var lemon2 = this.fireballs.get(shooter.x + 40, shooter.y).setScale(1);
      var lemon1 = this.fireballs.get(shooter.x + 20, shooter.y+30).setScale(2);
      var lemon3 = this.fireballs.get(shooter.x + 0, shooter.y+60).setScale(3);
      var lemon4 = this.fireballs.get(shooter.x - 20, shooter.y+30).setScale(2);
      var lemon5 = this.fireballs.get(shooter.x - 40, shooter.y).setScale(1);
      console.log(`shooting spray fire`)
        this.fireSound.play()
        let fireSpeed = 300;
        lemon1.setActive(true);
        lemon1.setVisible(true);
        lemon2.setActive(true);
        lemon2.setVisible(true);
        lemon3.setActive(true);
        lemon3.setVisible(true);
        lemon4.setActive(true);
        lemon4.setVisible(true);
        lemon5.setActive(true);
        lemon5.setVisible(true);
        lemon1.body.setVelocityX(directionVector(shooter, target)[0] * fireSpeed)
        lemon1.body.setVelocityY(directionVector(shooter, target)[1] * fireSpeed)
        lemon2.body.setVelocityX(directionVector(shooter, target)[0] * fireSpeed)
        lemon2.body.setVelocityY(directionVector(shooter, target)[1] * fireSpeed)
        lemon3.body.setVelocityX(directionVector(shooter, target)[0] * fireSpeed)
        lemon3.body.setVelocityY(directionVector(shooter, target)[1] * fireSpeed)
        lemon4.body.setVelocityX(directionVector(shooter, target)[0] * fireSpeed)
        lemon4.body.setVelocityY(directionVector(shooter, target)[1] * fireSpeed)
        lemon5.body.setVelocityX(directionVector(shooter, target)[0] * fireSpeed)
        lemon5.body.setVelocityY(directionVector(shooter, target)[1] * fireSpeed)
    }

    this.sprayIce = function(shooter) {
      var ice1 = this.iceballs.get(shooter.x + 10, shooter.y + 10).setScale(.5);
      var ice2 = this.iceballs.get(shooter.x + 10, shooter.y - 10).setScale(.5);
      var ice3 = this.iceballs.get(shooter.x - 10, shooter.y + 10).setScale(.5);
      var ice4 = this.iceballs.get(shooter.x - 10, shooter.y - 10).setScale(.5);
      this.iceSound.play()
      ice1.setActive(true);
      ice1.setVisible(true);
      ice2.setActive(true);
      ice2.setVisible(true);
      ice3.setActive(true);
      ice3.setVisible(true);
      ice4.setActive(true);
      ice4.setVisible(true);
      ice1.body.setVelocityX(50)
      ice1.body.setVelocityY(50)
      ice2.body.setVelocityX(50)
      ice2.body.setVelocityY(-50)
      ice3.body.setVelocityX(-50)
      ice3.body.setVelocityY(50)
      ice4.body.setVelocityX(-50)
      ice4.body.setVelocityY(-50)
    }

    this.sprayIce2 = function(shooter) {
      var ice1 = this.iceballs.get(shooter.x, shooter.y + 10).setScale(.25);
      var ice2 = this.iceballs.get(shooter.x - 10, shooter.y).setScale(.25);
      var ice3 = this.iceballs.get(shooter.x, shooter.y - 10).setScale(.25);
      var ice4 = this.iceballs.get(shooter.x + 10, shooter.y).setScale(.25);
      this.iceSound.play()
      ice1.setActive(true);
      ice1.setVisible(true);
      ice2.setActive(true);
      ice2.setVisible(true);
      ice3.setActive(true);
      ice3.setVisible(true);
      ice4.setActive(true);
      ice4.setVisible(true);
      ice1.body.setVelocityY(350)
      ice2.body.setVelocityX(-350)
      ice3.body.setVelocityY(-350)
      ice4.body.setVelocityX(350)
    }

    this.sliding = false;
    this.slidingCounter = 0;

    /*
        this.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
        this.keyObjZ.on('down', function(event) {
          if (this.pause){
            this.pause = false
          } else {
            this.pause = true
          }

        }, this);
        */

    this.keyObjS = this.input.keyboard.addKey('S'); // Get key object
    this.keyObjS.on('down', function(event) {
      if (switchToNextWeapon && this.playerShootIceMeter >= 120) {
        this.shootIce(player, stag)
        this.playerShootIceMeter = 0
      } else if (!switchToNextWeapon) {
        if (!this.gettingHit) {
          this.shoot()
        }
      }

    }, this);

    this.keyObjP = this.input.keyboard.addKey('P'); // Get key object
    this.keyObjP.on('down', function(event) {
      switchToNextWeapon = true
    }, this);

    this.keyObjD = this.input.keyboard.addKey('D'); // Get key object
    this.keyObjD.on('down', function(event) {
      if (!this.gettingHit) {
        this.sliding = true;
        this.slideSound.play()
      }
    }, this);
    this.keyObjD.on('up', function(event) {
      this.sliding = false;
      this.slidingCounter = 0;
    }, this);

    this.physics.add.overlap(player, chill, hitPlayer, null, this);

    this.physics.add.overlap(player, stag, hitPlayer, null, this);

    function hitPlayer() {
      if (!this.gettingHit && this.fightOngoing) {
        this.gettingHit = true;
        window.setTimeout(() => {
          this.gettingHit = false;
        }, 1500)
        this.myHealth -= 15;
        this.enemyDamage.play();
        this.MegamanUI.myHealthMeter.y = 40 + 196 - 2 * this.myHealth + 2;
        this.MegamanUI.myHealthMeter.height = 2 * this.myHealth;
      }
    }

    this.physics.add.overlap(chill, this.lemons, hitChill, null, this);

    this.physics.add.overlap(stag, this.lemons, hitStag, null, this);

    this.physics.add.overlap(this.iceballs, stag, hitStag, null, this);

    this.physics.add.overlap(player, this.iceballs, hitPlayer, null, this);

    this.physics.add.overlap(player, this.fireballs, hitPlayer, null, this);

    this.penguinGettingHit = false;

    this.stagGettingHit = false;

    this.stagPunching = false;

    this.stagPunchingDone = false;

    this.stagPunchCounter = 0;

    this.timeCounter = 0;

    this.rando = Math.random() + 1;

    this.setChillVelocity = false;

    this.playerShootIceMeter = 0;


    function hitChill(chill, lemon) {
      lemon.setActive(false);
      if (!this.penguinGettingHit) {
        this.penguinGettingHit = true;
        window.setTimeout(() => {
          this.penguinGettingHit = false;
        }, 200)
        this.penguinHealth -= 2;
        this.enemyDamage.play();
        this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.penguinHealth + 2;
        this.MegamanUI.enemyHealthMeter.height = 2 * this.penguinHealth;
      }
    }

    function hitStag(stag, lemon) {
      lemon.setActive(false);
      if (!this.stagGettingHit) {
        this.stagGettingHit = true;
        window.setTimeout(() => {
          this.stagGettingHit = false;
        }, 200)
        if (!switchToNextWeapon) {
          this.stagHealth -= 4;
        } else if (switchToNextWeapon) {
          this.stagHealth -= 5;
        }
        this.enemyDamage.play();
        this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.stagHealth + 2;
        this.MegamanUI.enemyHealthMeter.height = 2 * this.stagHealth;
      }
    }
    this.sys.events.on('wake', this.wake, this);

    this.camera = this.cameras.main;
    this.camera.zoom = 1.719;
    this.camera.startFollow(player, true);
    this.camera.setBounds(this.chillTL.x, this.chillTL.y, this.chillBR.x, this.chillBR.y);

    if (this.penguinAlive) {
      this.camera.setBounds(this.chillTL.x, this.chillTL.y, this.chillBR.x, this.chillBR.y);
      this.penguinHealth = 0;
      chill.x = this.chillSpawnPoint.x;
      chill.y = this.chillSpawnPoint.y;
      player.x = this.spawnPointForChill.x
      player.y = this.spawnPointForChill.y
      this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.penguinHealth + 2;
      this.MegamanUI.enemyHealthMeter.height = 2 * this.penguinHealth;
    } else if (!this.penguinAlive && this.stagAlive) {
      this.camera.setBounds(0, 0, 100 * 32, 100 * 32);
      this.stagHealth = 0;
      stag.x = this.stagSpawnPoint.x;
      stag.y = this.stagSpawnPoint.y;
      player.x = this.spawnPointForStag.x
      player.y = this.spawnPointForStag.y
      this.camera.startFollow(player, true);
      this.camera.setBounds(this.stagTL.x, this.stagTL.y, this.stagBR.x, this.stagBR.y);
      this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.stagHealth + 2;
      this.MegamanUI.enemyHealthMeter.height = 2 * this.stagHealth;
    }
  },
  update: function() {
    if (this.pause) {
      this.penguinHealth += 98 / 120
      this.stagHealth += 98 / 120
      if (this.penguinAlive){
        this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.penguinHealth + 2;
        this.MegamanUI.enemyHealthMeter.height = 2 * this.penguinHealth;
      } else if (this.stagAlive){
        this.MegamanUI.enemyHealthMeter.y = 40 + 196 - 2 * this.stagHealth + 2;
        this.MegamanUI.enemyHealthMeter.height = 2 * this.stagHealth;
      }

      if (this.timeCounter<120 && this.timeCounter%7===0){
          this.gainlife.play();
      }
    }
    this.playerShootIceMeter += 1;
    this.timeCounter += 1
    // ai for lemons
    this.lemons.children.each(function(b) {
      if (b.active) {
        if (b.x < player.x - 500 || b.x > player.x + 500) {
          b.setActive(false);
        }
      }
    }.bind(this));


    this.iceballs.children.each(function(b) {
      b.angle += 2
    }.bind(this));

    this.fireballs.children.each(function(b) {
      if (player.x > b.x) {
        b.angle = Math.atan((player.y - b.y) / (player.x - b.x))
      } else {
        b.angle = Math.atan((player.y - b.y) / (player.x - b.x)) + 180
      }
    }.bind(this));


    //penguin dies
    if (this.penguinHealth <= 0 && this.penguinAlive) {
      this.fightOngoing = false;
      this.exitVictoryPenguin = true
      this.MegamanUI.enemyHealthMeter.visible = false;
      this.penguinAlive = false
    }
    if (this.exitVictoryPenguin) {
      this.iceballs.children.each(function(b) {
        b.destroy()
      }.bind(this));
      beatChill = 1;
      this.exitVictoryPenguin = false;
      this.explosion.play();
      gameState.bossfight.stop()
      window.setTimeout(() => { //disable boss
        chill.disableBody(true, true);
      }, 3000)
      window.setTimeout(() => {
        //enable the next boss here
        this.fightOngoing = true;
        stag.enableBody(true, this.stagSpawnPoint.x, this.stagSpawnPoint.y, true, true);
        this.MegamanUI.enemyHealthMeter.visible = true;
        this.scene.switch('LightWorld')
        this.scene.sleep("MegamanUI");
        scene_number = 2
      }, 5000)
    }

    // stag dies
    if (this.stagHealth <= 0 && this.stagAlive) {
      this.exitVictoryStag = true
      this.MegamanUI.enemyHealthMeter.visible = false;
      this.stagAlive = false
    }
    if (this.exitVictoryStag) {
      beatStag = 1;
      this.exitVictoryStag = false;
      this.explosion.play();
      gameState.bossfight.stop()
      window.setTimeout(() => {
        this.scene.switch('LightWorld')
        this.scene.sleep("MegamanUI");
        scene_number = 2
        stag.disableBody(true, true);
        //enable the next boss here
      }, 5000)
    }
    //I die
    if (this.myHealth <= 0 && this.playerAlive) {
      this.iceballs.children.each(function(b) {
        b.destroy()
      }.bind(this));
      lostAtMegaman = 1;
      this.playerAlive = false
      player.anims.play('gethit', true)
      this.explosion.play()
      this.MegamanUI.myHealthMeter.visible = false;
      gameState.bossfight.stop()
      window.setTimeout(() => {
        this.scene.switch('LightWorld')
        this.scene.sleep("MegamanUI");
        scene_number = 2
      }, 3000)

    }
    //ai for penguin

    if (this.penguinAlive && !this.pause) {
      //chil animations
      if (chill.body.blocked.down) {
        chill.anims.play('chillslide', true);
        chill.angle = 0;
      } else if (chill.body.velocity.x === 0) {
        chill.setFrame(12)
        if (this.chillGoingLeft) {
          chill.angle = 90;
        } else {
          chill.angle = -90;
        }
      } else {
        chill.anims.play('chillattack', true);
        chill.angle = 0
      }
      if (chill.body.velocity.x > 0) {
        chill.flipX = true;
      } else if (chill.body.velocity.x < 0) {
        chill.flipX = false;
      }

      //chill movement

      if (chill.body.velocity.x === 0) {
        chill.body.setVelocityY(-146)
      }
      if (chill.body.velocity.x === 0 || chill.body.velocity.y === 0) {
        this.setChillVelocity = true;
      } else {
        this.setChillVelocity = false;
      }
      if (this.chillGoingLeft && this.setChillVelocity) {
        this.setChillVelocity = false
        if (this.penguinHealth >= 50) {
          chill.body.setVelocityX(-150);
        } else {
          chill.body.setVelocityX(-200);
        }
      } else if (!this.chillGoingLeft && this.setChillVelocity) {
        this.setChillVelocity = false
        if (this.penguinHealth >= 50) {
          chill.body.setVelocityX(150);
        } else {
          chill.body.setVelocityX(200);
        }
      }

      if ((chill.y < 100) && chill.body.blocked.left) {
        this.chillGoingLeft = false
        this.shootIce(chill, player)
      } else if ((chill.y < 100) && chill.body.blocked.right) {
        this.chillGoingLeft = true
        this.shootIce(chill, player)
      }
      if (this.timeCounter % 250 === 0 && this.penguinHealth < 40) {
        this.sprayIce(chill)
      } else if (this.timeCounter % 250 === 125 && this.penguinHealth < 20) {
        this.sprayIce2(chill)
      }



    } else if (!this.penguinAlive) {
      chill.body.setVelocityX(0);
      chill.body.setVelocityY(0);
      chill.anims.play('chilldie', true);
    }

    //ai for stag
    if (this.stagAlive && !this.penguinAlive && !this.pause) {
      //flipping
      if (stag.body.velocity.x > 0) {
        stag.flipX = true;
      } else if (stag.body.velocity.x < 0) {
        stag.flipX = false;
      }
      //punch attack timer
      if (this.timeCounter % 400 === 0 && !this.stagPunching && distance(player, stag) > 150) {
        this.stagPunching = true;
        window.setTimeout(() => {
          this.stagPunching = false;
        }, 1000)
      }
      if (this.timeCounter % 800 === 0) {
        this.shootFire(stag, player)
      }

      if (this.stagPunching && (distance(player, stag) < 20 || stag.body.blocked.left || stag.body.blocked.right)) {
        this.stagPunching = false;
        this.stagPunchingDone = true;
        this.stagPunchCounter = 0;
      }
      if (this.stagPunchingDone) {
        window.setTimeout(() => {
          this.stagPunchingDone = false
        }, 1000)
      }

      //animations for stag
      if (this.stagPunching) { //punch when near player
        stag.anims.play('stagrush', true)
        this.stagPunchCounter += 1;
      } else if (this.stagPunchingDone) { //punch when near player
        stag.anims.play('stagretreat', true)
      } else if (stag.body.blocked.down) {
        stag.anims.play('stagground', true);
      } else if (stag.body.blocked.right) {
        stag.anims.play('stagjump', true);
      } else if (stag.body.blocked.left) {
        stag.anims.play('stagjump', true);
      } else {
        stag.anims.play('stagrush', true);
      }

      //motion for stag
      if (this.stagPunching && this.stagPunchCounter < 5) { //to turn around if he's going in the opposite way of player
        stag.setVelocityX(directionVector(stag, player)[0] * 400)
        stag.setVelocityY(directionVector(stag, player)[1] * 400)
      } else if (this.stagPunchingDone) { //to turn around if he's going in the opposite way of player
        stag.setVelocityX(-directionVector(stag, player)[0] * 250)
        stag.setVelocityY(-directionVector(stag, player)[1] * 250)
      } else if (stag.body.blocked.left) {
        this.hitwall.play()
        stag.body.setVelocityX(350)
        this.stagGoingLeft = false
        if (this.stagGoingUp) {
          stag.body.setVelocityY(-250)
        }
      } else if (stag.body.blocked.right) {
        this.hitwall.play()
        stag.body.setVelocityX(-350)
        this.stagGoingLeft = true
        if (this.stagGoingUp) {
          stag.body.setVelocityY(-250)
        }
      } else if (stag.body.blocked.up) {
        this.hitwall.play()
        this.stagGoingUp = false
        this.sprayFire(stag,player)
      } else if (stag.body.blocked.down) {
        this.stagGoingUp = true;
        if (this.stagGoingLeft) {
          if (this.stagHealth > 30) {
            stag.body.setVelocityX(-250)
          } else {
            stag.body.setVelocityX(-350)
          }
        } else {
          if (this.stagHealth > 30) {
            stag.body.setVelocityX(250)
          } else {
            stag.body.setVelocityX(350)
          }
        }
      }
    } else if (!this.penguinAlive && !this.stagAlive) {
      stag.body.setVelocityX(0);
      stag.body.setVelocityY(0);
      stag.anims.play('stagdie', true);
    }

    //animations
    if (this.gettingHit) {
      player.anims.play('gethit', true)
    } else {
      if (player.body.velocity.x > 0) {
        player.flipX = true;
      } else if (player.body.velocity.x < 0) {
        player.flipX = false;
      }
      if (this.keyObjS.isDown && player.body.velocity.x === 0) {
        player.anims.play('megashootground', true)
      } else if (this.keyObjS.isDown && player.body.velocity.x != 0) {
        player.anims.play('megashootrun', true)
      } else if (this.keyObjD.isDown && this.sliding) {
        if (this.slidingCounter >= 30) {
          this.sliding = false;
        }
        this.slidingCounter += 1;
        player.anims.play('megaslide', true)
        if (player.flipX) {
          player.x += 1;
        } else {
          player.x -= 1;
        }
        if (cursors.up.isDown) {
          player.y -= 1;
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
        if (this.keyObjS.isDown) {
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


var MegamanUI = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "MegamanUI"
    });
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.spritesheet('healthBar',
      'assets/megamanHealth.png', {
        frameWidth: 10,
        frameHeight: 110
      });
  },
  create: function() {
    this.myHealthMeter = this.add.rectangle(40, 40, 20, 200, 0xe3ec3d).setOrigin(0, 0);
    this.myWeaponMeter = this.add.rectangle(70, 40, 20, 200, 0x2145e2).setOrigin(0, 0);
    this.myWeaponMeter.visible = false;
    this.myHealthMeterCover = this.add.image(40, 40, 'healthBar').setOrigin(0, 0).setDepth(1).setScale(2).setFrame(0);
    this.myWeaponMeterCover = this.add.image(70, 40, 'healthBar').setOrigin(0, 0).setDepth(1).setScale(2).setFrame(0);
    this.myWeaponMeterCover.visible = false;

    this.enemyHealthMeter = this.add.rectangle(1160, 40, 20, 200, 0xe3ec3d).setOrigin(0, 0);
    this.enemyHealthMeterCover = this.add.image(1160, 40, 'healthBar').setOrigin(0, 0).setDepth(1).setScale(2).setFrame(1);

    this.scene.bringToTop();
  },
  update: function() {
    if (switchToNextWeapon)
      if (this.myWeaponMeter.visible) {
        this.myWeaponMeter.visible = false;
        this.myWeaponMeterCover.visible = false;
      } else {
        this.myWeaponMeter = true;
        this.myWeaponMeterCover.visible = true;
      }
  }
});
