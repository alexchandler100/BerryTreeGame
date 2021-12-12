gameStateDark={}

var DarkWorld = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "DarkWorld"
    });
  },
  init: function(data) {
    //this.message = data.message;
  },

  //added this for battle scene and changed all instances of cursors to this.cursors (and removed const before cursors initialization)
  wake: function() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    this.scene.restart("DarkWorld");
    playerTexture=0;
  },
  onKeyInput: function(event) {
  },
  preload: function() {
    this.load.audio('holyDiver', ['assets/holyDiver.wav']);
    this.load.audio('slash', ['assets/slash.wav']);
    this.load.audio('smack', ['assets/smack.wav']);
    this.load.audio('airsoft', ['assets/airsoft.wav']);
    this.load.audio('punch', ['assets/Punch.wav']);
    this.load.audio('battle1', ['assets/battle1.wav']);
    this.load.audio('battle2', ['assets/battle2.wav']);
    this.load.audio('battle3', ['assets/battle3.wav']);
    this.load.audio('battle4', ['assets/battle4.wav']);
    this.load.audio('battle5', ['assets/battle5.wav']);
    this.load.audio('battle6', ['assets/battle6.wav']);
    this.load.audio('spooky', ['assets/spooky.wav']);
    this.load.audio('itemget', ['assets/itemget.wav']);
    this.load.audio('secret', ['assets/secret.wav']);
    this.load.audio('beatbox', ['assets/beatbox.wav']);
    this.load.image('hausdorf', "assets/hausdorf.png");
    this.load.image('quil', "assets/quil.png");
    this.load.image('dioshrine', "assets/dio_statue.png");
    this.load.audio('dark_theme', ['assets/dark_theme.wav']);
    this.load.audio('windNoise', ['assets/windNoise.wav']);
    this.load.spritesheet('dio',
      'assets/Dio.png', {
        frameWidth: 200,
        frameHeight: 233
      });
    this.load.spritesheet('darkboy2',
      'assets/darkboy2.png', {
        frameWidth: 300,
        frameHeight: 300
      });
    this.load.spritesheet('me',
      'assets/me_running_BTJM.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('al',
      'assets/homeboy_al.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('trevor',
      'assets/trevor_walking.png', {
        frameWidth: 200,
        frameHeight: 300
      });
    this.load.image("tuxmon-tiles", "assets/tilesets/tuxmon-sample-32px.png");
    this.load.image("elTiles", "assets/tilesets/ff6_town_city_32px.png");
    this.load.image("carTiles", "assets/tilesets/car_tiles.png");
    this.load.tilemapTiledJSON("map", "assets/east_lansing.json");
    this.load.tilemapTiledJSON("dark_map", "assets/dark_east_lansing.json");
  },
  create: function() {
    this.cameras.main.zoom = 2;
    //sound effects and music
    gameStateDark.music = this.sound.add('dark_theme');
    gameStateDark.music.loop = true;
    gameStateDark.music.play();

    //making the map
      mapDark = this.make.tilemap({
        key: "dark_map"
      });

    const tileset1Dark = mapDark.addTilesetImage("tuxmon-sample-32px", "tuxmon-tiles");
    const tileset2Dark = mapDark.addTilesetImage("ff6_town_city_32px", "elTiles");
    const tileset3Dark = mapDark.addTilesetImage("car_tiles", "carTiles");
    const belowDark = mapDark.createDynamicLayer("Below", tileset2Dark, 0, 0);
    const buildingtopsDark = mapDark.createDynamicLayer("BuildingTops", tileset1Dark, 0, 0);

    //spawning objects
    const DioShrineSpawnPoint = mapDark.findObject("Objects", obj => obj.name === "dioshrine spawn point");

    dioshrine = this.physics.add.sprite(DioShrineSpawnPoint.x+42, DioShrineSpawnPoint.y+26, 'dioshrine');
    dioshrine.setScale(.12)

    //spawning map layers which are under player
    const worldDark = mapDark.createDynamicLayer("World", tileset1Dark, 0, 0);
    const specialDark = mapDark.createStaticLayer("Special", tileset1Dark, 0, 0);
    const carsDark = mapDark.createStaticLayer("Cars", tileset3Dark, 0, 0);

    //tinting for tiles
      belowDark.forEachTile(
        t => (t.tint = 0xa31199),
      );
      worldDark.forEachTile(
        t => (t.tint = 0x777777),
      );
      buildingtopsDark.forEachTile(
        t => (t.tint = 0x777777),
      );
    //fratboys
    fratboysDark = this.physics.add.group()

    const Darkboy2SpawnPoint = mapDark.findObject("Objects", obj => obj.name === "darkboy1 spawn point");

    darkboy2 = fratboysDark.create(Darkboy2SpawnPoint.x, Darkboy2SpawnPoint.y, 'darkboy2');
    darkboy2.setScale(.14)
    darkboy2.body.setCircle(20);
    darkboy2.body.setOffset(60, 100);

    //spawning player and setting properties
    gameStateDark.PlayerSpawnPoint = mapDark.findObject("Objects", obj => obj.name === "hausdorf spawn point");
    meDark = this.physics.add.sprite(gameStateDark.PlayerSpawnPoint.x, gameStateDark.PlayerSpawnPoint.y, 'me');
    meDark.setScale(.17);
    meDark.body.setSize(70, 90);
    meDark.body.setOffset(60, 100);

    const aboveDark = mapDark.createStaticLayer("Above", tileset1Dark, 0, 0);
    // create a property for tiles in Tiled called ''collides'' in the tileset editor
    // and set the tiles you wish to collide to 'true'
    worldDark.setCollisionByProperty({
      collides: true
    });
    carsDark.setCollisionByProperty({
      collides: true
    });

    //collisions with player and world
    this.physics.add.collider(meDark, worldDark);
    this.physics.add.collider(meDark, carsDark);

    //colliders for fratboys
    this.physics.add.collider(fratboysDark, meDark);
    this.physics.add.collider(fratboysDark, worldDark);
    this.physics.add.collider(fratboysDark, carsDark);

    this.physics.add.collider(worldDark, worldDark);

    //colliders for car
    this.physics.add.collider(carsDark, worldDark)

    // access main canmera and set bounds, set to follow player
    const cameraDark = this.cameras.main;
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.physics.world.setBounds(0, 0, mapDark.widthInPixels, mapDark.heightInPixels, true, true, true, true);
    meDark.setCollideWorldBounds(true);

    //camera to follow player and camera bounds
    cameraDark.setBounds(0, 0, mapDark.widthInPixels, mapDark.heightInPixels);
    cameraDark.startFollow(meDark, true);

    //dio animations
    this.anims.create({
      key: 'diofloat',
      frames: this.anims.generateFrameNumbers('dio', {
        start: 10,
        end: 14
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'dioslash',
      frames: this.anims.generateFrameNumbers('dio', {
        start: 1,
        end: 9
      }),
      frameRate: 20,
      repeat: 0
    });

    //darkboy2 animations
    this.anims.create({
      key: 'darkboy2walk',
      frames: this.anims.generateFrameNumbers('darkboy2', {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    });

    //player animations
    this.anims.create({
      key: 'turn',
      frames: [{
        key: 'me',
        frame: 0
      }],
      frameRate: 19
    });

    this.anims.create({
      key: 'leftwalk',
      frames: this.anims.generateFrameNumbers('me', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'leftrun',
      frames: this.anims.generateFrameNumbers('me', {
        start: 3,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'leftsprint',
      frames: this.anims.generateFrameNumbers('me', {
        start: 3,
        end: 4
      }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: 'rightwalk',
      frames: this.anims.generateFrameNumbers('me', {
        start: 5,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'rightrun',
      frames: this.anims.generateFrameNumbers('me', {
        start: 7,
        end: 8
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'rightsprint',
      frames: this.anims.generateFrameNumbers('me', {
        start: 7,
        end: 8
      }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('me', {
        start: 9,
        end: 15
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'special',
      frames: this.anims.generateFrameNumbers('me', {
        start: 9,
        end: 17
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'specialty',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [9, 10, 11, 12, 13, 14, 15, 11, 16, 11, 17]
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'alleft',
      frames: this.anims.generateFrameNumbers('al', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alright',
      frames: this.anims.generateFrameNumbers('al', {
        start: 3,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alturn',
      frames: this.anims.generateFrameNumbers('al', {
        start: 0,
        end: 0
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alattack',
      frames: this.anims.generateFrameNumbers('al', {
        start: 5,
        end: 7
      }),
      frameRate: 3,
      repeat: -1
    });
    //adjusting camera zoom with 1,2,3 buttons

    this.input.keyboard.on("keydown", this.onKeyInput, this);

    var keyObj1 = this.input.keyboard.addKey('one'); // Get key object

    keyObj1.on('down', function(event) {
      zoom = .264;
    });

    var keyObj2 = this.input.keyboard.addKey('two'); // Get key object

    keyObj2.on('down', function(event) {
      zoom = .6
    });

    var keyObj3 = this.input.keyboard.addKey('three'); // Get key object

    keyObj3.on('down', function(event) {
      zoom = .76
    });

    var keyObj4 = this.input.keyboard.addKey('four'); // Get key object

    keyObj4.on('down', function(event) {
      zoom = 1
    });

    var keyObj5 = this.input.keyboard.addKey('five'); // Get key object

    keyObj5.on('down', function(event) {
      zoom = 1.6
    });

    var keyObj6 = this.input.keyboard.addKey('six'); // Get key object

    keyObj6.on('down', function(event) {
      zoom = 2.25
    });

    var keyObj7 = this.input.keyboard.addKey('seven'); // Get key object

    keyObj7.on('down', function(event) {
      zoom = 3
    });

    var keyObj8 = this.input.keyboard.addKey('eight'); // Get key object

    keyObj8.on('down', function(event) {
      zoom = 4
    });

    var keyObj9 = this.input.keyboard.addKey('nine'); // Get key object

    keyObj9.on('down', function(event) {
      zoom = 5
    });

    var keyObj0 = this.input.keyboard.addKey('zero'); // Get key object

    keyObj0.on('down', function(event) {
      zoom = 10
    });

    // adjusting speed with i,o,p

    var keyObjU = this.input.keyboard.addKey('U'); // Get key object

    keyObjU.on('down', function(event) {
      speed = 1
    });

    var keyObjI = this.input.keyboard.addKey('I'); // Get key object

    keyObjI.on('down', function(event) {
      speed = 2
    });

    var keyObjO = this.input.keyboard.addKey('O'); // Get key object

    keyObjO.on('down', function(event) {
      speed = 3
    });

    var keyObjP = this.input.keyboard.addKey('P'); // Get key object

    keyObjP.on('down', function(event) {
      speed = 4
    });

    var keyObjM = this.input.keyboard.addKey('M'); // Get key object


    var keyObjS = this.input.keyboard.addKey('S'); // Get key object


    keyObjS.on('down', function(event) {
      doitS = 1;
    });

    keyObjS.on('up', function(event) {
      doitS = 0
    });

    var keyObjR = this.input.keyboard.addKey('R'); // Get key object

    var keyObjC = this.input.keyboard.addKey('C'); // Get key object

    keyObjM.once('down', function(event) {
      devMode1 = 1
    });

    keyObjR.once('down', function(event) {
      devMode2 = 1
    });

    keyObjC.once('down', function(event) {
      devMode3 = 1
    });

    //collecting item

    var keyObjS = this.input.keyboard.addKey('S'); // Get key object

    var keyObjD = this.input.keyboard.addKey('D'); // Get key object

    //adding items to inventory
    //end of create
    this.sys.events.on('wake', this.wake, this);
  },

  update: function() {
    //fail to buy weed
    // boss battle
    if (bossType === 'dio' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    }
    else if (bossType === 'darkboy' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    }
    //enable dev mode
    if (devMode1 + devMode2 + devMode3 >= 3) {
      devMode1 = 0
      devMode2 = 0
      devMode3 = 0
      speed = 7;
      gas = 40;
      keysGet = 1;
      wentPro = 1;
      alGet = 1;
      brothersSeal = 1;
      money = 1000;
      hamms = 10;
      monster = 10;
      gatorade = 10;
      gameState.secret.play()
      maxHPObject['Mac'] += 200
      maxSPObject['Mac'] += 30
      damageObject['Mac'] += 50
      maxHPObject['Jimmy'] += 200
      maxSPObject['Jimmy'] += 30
      damageObject['Jimmy'] += 50
      maxHPObject['Al'] += 200
      maxSPObject['Al'] += 30
      damageObject['Al'] += 50
      hpObject['Mac']= maxHPObject['Mac']
      spObject['Mac']= maxSPObject['Mac']
      hpObject['Jimmy']= maxHPObject['Jimmy']
      spObject['Jimmy']= maxSPObject['Jimmy']
      hpObject['Al']= maxHPObject['Al']
      spObject['Al']= maxSPObject['Al']
    }
    //new dark world dialogue
    if (darkWorld === 0 && worldTheme === 'dark' && newDarkDialogue === 0) {
      this.cameras.main.shake(1000);
      initializePageDark(this)
      let firstPage = fetchPageDark(800)
      displayPageDark(this, firstPage)
      newDarkDialogue = 1
    }
    //gameover and new game
    if (newGame === true && gameOver === false) {
      initializePageDark(this)
      let firstPage = fetchPageDark(1)
      displayPageDark(this, firstPage)
      newGame = false;
    } else if (newGame === false && gameOver === true) {
      initializePageDark(this)
      let page = fetchPageDark(300)
      displayPageDark(this, page)
      gameOver = 0
    }

    //for level dialogue (problem with jimmy and al receiving level up at the same time... fix needed)
    if (checkLevelDialogue === 1) {
      for (let i = 1; i < 1000; i++) {
        if (expObject['Mac'] >= 100 * 3 ** (i - 1) && levelObject['Mac'] === i) {
          levelObject['Mac'] += 1;
          initializePage(this)
          let page = {
            character: 'me',
            page: 500,
            narrative: `Damnnnn, Mac has progressed to level ${levelObject['Mac']}. Mac's HP has increased by 15 and damage has increased by 5.`,
            options: [{
              option: 'tight',
              nextPage: 600,
            }, ]
          }
          displayPage(this, page)
          maxHPObject['Mac'] += 15
          damageObject['Mac'] += 5
          maxSPObject['Mac'] += 3
          hpObject['Mac'] = maxHPObject['Mac']
          spObject['Mac'] = maxSPObject['Mac']
        } else if (expObject['Al'] >= 100 * 3 ** (i - 1) && levelObject['Al'] === i) {
          levelObject['Al'] += 1;
          initializePage(this)
          let page = {
            character: 'me',
            page: 501,
            narrative: `Good shit man, Al has progressed to level ${levelObject['Al']}. Al's HP has increased by 15 and damage has increased by 5.`,
            options: [{
              option: 'tight',
              nextPage: 601,
            }, ]
          }
          displayPage(this, page)
          maxHPObject['Al'] += 15
          damageObject['Al'] += 5
          maxSPObject['Mac'] += 4
          hpObject['Al'] = maxHPObject['Al']
          spObject['Al'] = maxSPObject['Al']
        } else if (expObject['Jimmy'] >= 100 * 3 ** (i - 1) && levelObject['Jimmy'] === i) {
          levelObject['Jimmy'] += 1;
          initializePage(this)
          let page = {
            character: 'me',
            page: 502,
            narrative: `Good shit man, Jimmy has progressed to level ${levelObject['Jimmy']}. Jimmy's HP has increased by 15 and damage has increased by 5. You may choose between getting about tree fiddy, increasing HP by another 3, or increasing damage by another 1.`,
            options: [{
              option: 'sweet',
              nextPage: 602,
            }, ]
          }
          displayPage(this, page)
          maxHPObject['Jimmy'] += 15
          maxSPObject['Jimmy'] += 4
          damageObject['Jimmy'] += 5
          hpObject['Jimmy'] = maxHPObject['Jimmy']
          spObject['Jimmy'] = maxSPObject['Jimmy']
        }

      }
      checkLevelDialogue = 0
    }

    //getting money
    if (moneyPlus) {
      getTreeFitty();
      moneyPlus = false;
    }

    //camera and cursors
    this.cameras.main.zoom = zoom;
    this.cursors = this.input.keyboard.createCursorKeys();

    //ai for chasers

    //ai for dio fight
    if (distance(dioshrine, meDark) < 30 && diodialogue === 0 && worldTheme === 'dark' && brothersSeal===1 && dioEnabled===true) {
      diodialogue = 1
      initializePageDark(this)
      let page = fetchPageDark(1200)
      displayPageDark(this, page)
      gameStateDark.music.stop()
      gameStateDark.music = this.sound.add('windNoise');
      gameStateDark.music.loop = true;
      gameStateDark.music.play();
    }
    if (distance(dioshrine,meDark)>100 && diodialogue===1 && worldTheme === 'dark' ){
      diodialogue=0
      window.setTimeout(() => {
        if (worldTheme ==='dark'){
          gameStateDark.music.stop()
          gameStateDark.music = this.sound.add('dark_theme');
          gameStateDark.music.loop=true;
          gameStateDark.music.play();
        }
      }, 2000);
    }

    //ai for darkboy2
    if (distance(darkboy2, meDark) < 300 && worldTheme === 'dark') {
      darkboy2.anims.play('darkboy2walk', true)
      chase(darkboy2, meDark)
    } else if (worldTheme === 'dark') {
      randomWalk(darkboy2)
      darkboy2.anims.play('darkboy2walk', true)
    }

    if (distance(darkboy2, meDark) < 30 && darkboydialogue === 0 && worldTheme === 'dark') {
      darkboydialogue = 1
      initializePageDark(this)
      let page = fetchPageDark(700)
      displayPageDark(this, page)
    }

    //pause Menu (not working after gameover... fix needed)

    if (pause) {
      this.physics.pause()
      keepaway -= 1
    } else {
      this.physics.resume()
    }

    //player controls and animations
    meDark.body.setVelocity(0);

    if (playerTexture === 0) {
      // player Horizontal movement
      if (this.cursors.left.isDown) {
        meDark.body.setVelocityX(-50 * speed * highness);
      } else if (this.cursors.right.isDown) {
        meDark.body.setVelocityX(50 * speed * highness);
      }

      // player Vertical movement
      if (this.cursors.up.isDown) {
        meDark.body.setVelocityY(-50 * speed * highness);
      } else if (this.cursors.down.isDown) {
        meDark.body.setVelocityY(50 * speed * highness);
      }

      //player walking running animations
      if (this.cursors.left.isDown) {
        if (speed === 1) {
          meDark.anims.play('leftwalk', true);
        } else if (speed === 2) {
          meDark.anims.play('leftrun', true);
        } else if (speed > 2) {
          meDark.anims.play('leftsprint', true);
        }
      } else if (this.cursors.right.isDown) {
        if (speed === 1) {
          meDark.anims.play('rightwalk', true);
        } else if (speed === 2) {
          meDark.anims.play('rightrun', true);
        } else if (speed > 2) {
          meDark.anims.play('rightsprint', true);
        }
      }

      if (this.cursors.up.isDown && !(this.cursors.right.isDown)) {
        if (speed === 1) {
          meDark.anims.play('leftwalk', true);
        } else if (speed === 2) {
          meDark.anims.play('leftrun', true);
        } else if (speed > 2) {
          meDark.anims.play('leftsprint', true);
        }
      } else if (this.cursors.down.isDown && !(this.cursors.left.isDown)) {
        if (speed === 1) {
          meDark.anims.play('rightwalk', true);
        } else if (speed === 2) {
          meDark.anims.play('rightrun', true);
        } else if (speed > 2) {
          meDark.anims.play('rightsprint', true);
        }
      }
      if (meDark.body.velocity.x === 0 && meDark.body.velocity.y === 0) {
        meDark.anims.play('turn', true)
      }

    }
    // for when you get in the car
    else if (playerTexture === 1) {
      if (gas < 0) {
        gas = 0
      }
      // Horizontal car movement
      if (this.cursors.left.isDown && gas > 0) {
        me.body.setVelocityX(-200 * speed);
        gas -= .0013
      } else if (this.cursors.right.isDown && gas > 0) {
        me.body.setVelocityX(200 * speed);
        gas -= .0013
      }

      // Vertical car movement
      if (this.cursors.up.isDown && gas > 0) {
        me.body.setVelocityY(-200 * speed);
        gas -= .0013
      } else if (this.cursors.down.isDown && gas > 0) {
        me.body.setVelocityY(200 * speed);
        gas -= .0013
      }

      //horizontal car animations
      if (this.cursors.right.isDown && gas > 0) {
        me.angle = 90
        me.setSize(64, 32)
        me.setOffset(0, 16)
      } else if (this.cursors.left.isDown && gas > 0) {
        me.angle = 270
        me.setSize(64, 32)
        me.setOffset(0, 16)
      }
      // Vertical car animation
      else if (this.cursors.up.isDown && gas > 0) {
        me.angle = 0
        me.setSize(32, 64)
        me.setOffset(16, 0)
      } else if (this.cursors.down.isDown && gas > 0) {
        me.angle = 180
        me.setSize(32, 64)
        me.setOffset(16, 0)
      }
    }
  }
});
