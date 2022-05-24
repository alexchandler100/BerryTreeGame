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
  openDialoguePage: function(page) {
    pageForDialogue = page
    openingDialogue = true;
    if (gameState.phoneBackground) {
      if (gameState.camera1.visible) {
        gameStateNav.phoneBackground.visible = false
        gameState.camera1.visible = false
        gameStateNav.gpsPointer.visible = false;
      } else {
        gameStateNav.phoneBackground.visible = true
        gameState.camera1.visible = true;
        gameStateNav.gpsPointer.visible = true;
      }
    }
  },

  //added this for battle scene and changed all instances of cursors to this.cursors (and removed const before cursors initialization)
  wake: function() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    //this.scene.restart("DarkWorld");
    playerTexture=0;
    gameStateDark.music.play();
    meDark.x = gameStateDark.PlayerSpawnPoint.x;
    meDark.y = gameStateDark.PlayerSpawnPoint.y;
  },
  onKeyInput: function(event) {
  },
  preload: function() {
    //audio
    this.load.audio('holyDiver', ['assets/audio/holyDiver.wav']);
    this.load.audio('slash', ['assets/audio/slash.wav']);
    this.load.audio('airsoft', ['assets/audio/airsoft.wav']);
    this.load.audio('punch', ['assets/audio/Punch.wav']);
    this.load.audio('battle1', ['assets/audio/battle1.wav']);
    this.load.audio('battle2', ['assets/audio/battle2.wav']);
    this.load.audio('battle3', ['assets/audio/battle3.wav']);
    this.load.audio('battle4', ['assets/audio/battle4.wav']);
    this.load.audio('battle5', ['assets/audio/battle5.wav']);
    this.load.audio('battle6', ['assets/audio/battle6.wav']);
    this.load.audio('spooky', ['assets/audio/spooky.wav']);
    this.load.audio('itemget', ['assets/audio/itemget.wav']);
    this.load.audio('secret', ['assets/audio/secret.wav']);
    this.load.audio('beatbox', ['assets/audio/beatbox.wav']);
    this.load.audio('dark_theme', ['assets/audio/dark_theme.wav']);
    this.load.audio('windNoise', ['assets/audio/windNoise.wav']);
    //images
    this.load.image('hausdorf', "assets/images/hausdorf.png");
    this.load.image('quil', "assets/images/quil.png");
    this.load.image('dioshrine', "assets/images/dio_statue.png");
    //spritesheets
    this.load.spritesheet('dio',
      'assets/images/Dio.png', {
        frameWidth: 200,
        frameHeight: 233
      });
    this.load.spritesheet('darkboy2',
      'assets/images/darkboy2.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('Mac',
      'assets/images/me_running_BTJM.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('Al',
      'assets/images/homeboy_al.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('Jimmy',
      'assets/images/trevor_walking.png', {
        frameWidth: 200,
        frameHeight: 300
      });
      //loading tilesets and tilemaps
      this.load.image("buildingsCustom", "assets/tilesets/EL_buildings.png");
      this.load.image("tuxmon-tiles", "assets/tilesets/tuxmon-sample-32px.png");
      this.load.image("elTiles", "assets/tilesets/el_tileset_custom.png");
      this.load.image("elTiles2", "assets/tilesets/[Base]BaseChip_pipo.png");
      this.load.image("carTiles", "assets/tilesets/car_tiles.png");
      this.load.tilemapTiledJSON("map", "assets/json/east_lansing.json");
  },
  create: function() {
    this.cameras.main.zoom = 2;
    //sound effects and music
    gameStateDark.music = this.sound.add('dark_theme');
    gameStateDark.music.loop = true;
    gameStateDark.music.play();

    //making the map
      map = this.make.tilemap({
        key: "map"
      });

      const tileset1 = map.addTilesetImage("tuxmon-sample-32px", "tuxmon-tiles");
      const tileset2 = map.addTilesetImage("el_tileset_custom", "elTiles")
      const tileset22 = map.addTilesetImage("[Base]BaseChip_pipo", "elTiles2")
      const tileset3 = map.addTilesetImage("car_tiles", "carTiles");
      const tileset4 = map.addTilesetImage("EL_buildings", "buildingsCustom");
      const below = map.createDynamicLayer("Below2", tileset2, 0, 0);
      const belowBottoms = map.createDynamicLayer("Below1", tileset2, 0, 0);
      const buildingtops = map.createDynamicLayer("BuildingTops", tileset1, 0, 0);
      const customBuildingsBelow = map.createDynamicLayer("CustomBuildings", tileset4, 0, 0).setDepth(1);

    //spawning objects
    const DioShrineSpawnPoint = map.findObject("Objects", obj => obj.name === "dioshrine spawn point");

    dioshrine = this.physics.add.sprite(DioShrineSpawnPoint.x+42, DioShrineSpawnPoint.y+26, 'dioshrine');
    dioshrine.setScale(.12)

    //spawning map layers which are under player

    //spawning map layers which are under player and npcs (should this be static? fix needed...)
    const world = map.createDynamicLayer("World", tileset1, 0, 0).setDepth(0);
    const world2 = map.createDynamicLayer("World2", tileset22, 0, 0);
    const cars = map.createDynamicLayer("Cars", tileset3, 0, 0);

    //tinting for tiles

    //color1hex = #ff5dea
    //color2hex = #ff2b7e
    //color3hex = #93945f

    const color1 = 0xff5dea //below layers
    const color2 = 0xff2b7e //buildings
    const color3 = 0x93945f //world2

      below.forEachTile(
        t => (t.tint = color1),
      );
      belowBottoms.forEachTile(
        t => (t.tint = color1),
      );
      world.forEachTile(
        t => (t.tint = color2),
      );
      buildingtops.forEachTile(
        t => (t.tint = color2),
      );
      customBuildingsBelow.forEachTile(
        t => (t.tint = color2),
      );
      cars.forEachTile(
        t => (t.tint = color2),
      );
      world2.forEachTile(
        t => (t.tint = color3),
      );

    //fratboys
    fratboysDark = this.physics.add.group()

    const Darkboy2SpawnPoint = map.findObject("Objects", obj => obj.name === "darkboy1 spawn point");

    darkboy2 = fratboysDark.create(Darkboy2SpawnPoint.x, Darkboy2SpawnPoint.y, 'darkboy2');
    darkboy2.setScale(.14)
    darkboy2.body.setCircle(20);
    darkboy2.body.setOffset(60, 100);

    //spawning player and setting properties
    gameStateDark.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "hausdorf spawn point");
    meDark = this.physics.add.sprite(gameStateDark.PlayerSpawnPoint.x, gameStateDark.PlayerSpawnPoint.y, 'Mac');
    meDark.setScale(.17);
    meDark.body.setSize(70, 90);
    meDark.body.setOffset(60, 100);

    //spawning layers which are above the player
    const above = map.createStaticLayer("Above", tileset2, 0, 0).setDepth(100001);

    //spawning layers which are above the player
    const buildingsAbove = map.createStaticLayer("BuildingsAbove", tileset1, 0, 0).setDepth(100000);

    const customBuildingsAbove = map.createStaticLayer("CustomBuildingsAbove", tileset4, 0, 0).setDepth(100001);


    // Collisions. Note: must create a boolean for tiles in Tiled called ''collides'' in the tileset editor and set collides = 'true'
    customBuildingsBelow.setCollisionByProperty({
      collides: true
    });
    belowBottoms.setCollisionByProperty({
      collides: true
    });
    world.setCollisionByProperty({
      collides: true
    });
    world2.setCollisionByProperty({
      collides: true
    });

    cars.setCollisionByProperty({
      collides: true
    });

    above.setCollisionByProperty({
      collides: true
    });

    //collisions with player and world
    this.physics.add.collider(meDark, world);
    this.physics.add.collider(meDark, cars);

    //colliders for fratboys
    this.physics.add.collider(fratboysDark, meDark);
    this.physics.add.collider(fratboysDark, world);
    this.physics.add.collider(fratboysDark, cars);
    //colliders for car

    // access main canmera and set bounds, set to follow player
    const cameraDark = this.cameras.main;
    cameraDark.roundPixels = true;
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
    meDark.setCollideWorldBounds(true);

    //camera to follow player and camera bounds
    cameraDark.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
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

    //darkboy2 animations
    this.anims.create({
      key: 'darkboy2attack',
      frames: this.anims.generateFrameNumbers('darkboy2', {
        frames: [3,0]
      }),
      frameRate: 2,
      repeat: 0
    });

    //player animations
    this.anims.create({
      key: 'turn',
      frames: [{
        key: 'Mac',
        frame: 0
      }],
      frameRate: 19
    });

    this.anims.create({
      key: 'leftwalk',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'leftrun',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 3,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'leftsprint',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 3,
        end: 4
      }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: 'rightwalk',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 5,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'rightrun',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 7,
        end: 8
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'rightsprint',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 7,
        end: 8
      }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 9,
        end: 15
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'special',
      frames: this.anims.generateFrameNumbers('Mac', {
        start: 9,
        end: 17
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'specialty',
      frames: this.anims.generateFrameNumbers('Mac', {
        frames: [9, 10, 11, 12, 13, 14, 15, 11, 16, 11, 17]
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'alleft',
      frames: this.anims.generateFrameNumbers('Al', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alright',
      frames: this.anims.generateFrameNumbers('Al', {
        start: 3,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alturn',
      frames: this.anims.generateFrameNumbers('Al', {
        start: 0,
        end: 0
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alattack',
      frames: this.anims.generateFrameNumbers('Al', {
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
      zoom = 2
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
    if (worldTheme === 'light'){
      this.scene.switch('LightWorld');
    }
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

    //new dark world dialogue
    if (darkWorld === 0 && worldTheme === 'dark' && newDarkDialogue === 0) {
      this.cameras.main.shake(1000);
      this.openDialoguePage(800);
      newDarkDialogue = 1
    }
    //gameover and new game
    if (newGame === true && gameOver === false) {
      this.openDialoguePage(1);
      newGame = false;
    } else if (newGame === false && gameOver === true) {
      this.openDialoguePage(300);
      gameOver = 0
    }

    //for level dialogue (problem with jimmy and al receiving level up at the same time... fix needed)
    if (checkLevelDialogue === 1) {
      for (let i = 1; i < 1000; i++) {
        if (expObject['Mac'] >= 100 * 3 ** (i - 1) && levelObject['Mac'] === i) {
          levelObject['Mac'] += 1;
          initializePage(this)
          let page = {
            character: 'Mac',
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
            character: 'Mac',
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
            character: 'Mac',
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

    //camera and cursors
    this.cameras.main.zoom = zoom;
    this.cursors = this.input.keyboard.createCursorKeys();

    //ai for chasers

    //ai for dio fight
    if (distance(dioshrine, meDark) < 30 && diodialogue === 0 && worldTheme === 'dark'&& launchParameter === false) {
      diodialogue = 1
      pause = true;
      this.scene.launch('SealMenu');
      launchParameter = true
    } else if (distance(dioshrine, meDark) < 30 && diodialogue === 1 && worldTheme === 'dark'&& launchParameter === false) {
      this.openDialoguePage(1200);
      gameStateDark.music.stop()
      gameStateDark.music = this.sound.add('windNoise');
      gameStateDark.music.loop = true;
      gameStateDark.music.play();
      diodialogue = 2;
    }
    else if (distance(dioshrine,meDark)>100 && (diodialogue===1 || diodialogue===2) && worldTheme === 'dark' ){
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

    if (darkboy2.body.velocity.x>0){
      darkboy2.flipX = true
    } else {
      darkboy2.flipX = false
    }

    if (distance(darkboy2, meDark) < 30 && darkboydialogue === 0 && worldTheme === 'dark') {
      darkboydialogue = 1;
      this.openDialoguePage(700);
    } else if (distance(darkboy2, meDark) >100 && darkboydialogue === 1 && worldTheme === 'dark'){
      darkboydialogue = 0;
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
        meDark.body.setVelocityX(-50 * speed * athletics);
      } else if (this.cursors.right.isDown) {
        meDark.body.setVelocityX(50 * speed * athletics);
      }
      // player Vertical movement
      if (this.cursors.up.isDown) {
        meDark.body.setVelocityY(-50 * speed * athletics);
      } else if (this.cursors.down.isDown) {
        meDark.body.setVelocityY(50 * speed * athletics);
      }
      //player walking running animations
      if (this.cursors.left.isDown && !diving && !kicking) {
        meDark.flipX = true;
        if (speed === 1) {
          meDark.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          meDark.anims.play('newrightrun', true);
        } else if (speed > 3) {
          meDark.anims.play('newrightsprint', true);
        }
      } else if (this.cursors.right.isDown && !diving && !kicking) {
        meDark.flipX = false;
        if (speed === 1) {
          meDark.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          meDark.anims.play('newrightrun', true);
        } else if (speed > 3) {
          meDark.anims.play('newrightsprint', true);
        }
      }
      if (this.cursors.up.isDown && !(this.cursors.right.isDown) && !diving && !kicking) {
        meDark.flipX = true;
        if (speed === 1) {
          meDark.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          meDark.anims.play('newrightrun', true);
        } else if (speed > 3) {
          meDark.anims.play('newrightsprint', true);
        }
      } else if (this.cursors.down.isDown && !(this.cursors.left.isDown) && !diving && !kicking) {
        meDark.flipX = false;
        if (speed === 1) {
          meDark.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          meDark.anims.play('newrightrun', true);
        } else if (speed > 3) {
          meDark.anims.play('newrightsprint', true);
        }
      }
      if (meDark.body.velocity.x === 0 && meDark.body.velocity.y === 0) {
        meDark.anims.play('turn', true)
        meDark.flipX = false;
      }
    }
    meDark.x = Math.round(meDark.x);
    meDark.y = Math.round(meDark.y);

  }
});
