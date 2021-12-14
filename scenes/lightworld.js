//constants and parameters
const gameState = {};

var OnScreenMessage = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  initialize: function OnScreenMessage(scene, events, x, y) {
    this.x=x;
    this.y=y;
    Phaser.GameObjects.Container.call(this, scene, this.x, this.y);
    var graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-150, -25, 300, 50);
    graphics.fillRect(-150, -25, 300, 50);
    // text describing events of battle
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", {
      color: '#ffffff',
      align: 'center',
      fontSize: 17,
      wordWrap: {
        width: 280,
        useAdvancedWrap: true
      }
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on("Message", this.showMessage, this);
    this.visible = false;
  },
  showMessage: function(text) {
    console.log(`calling show message at this.x=${this.x} and this.y=${this.y}`)
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent)
      this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 2700,
      callback: this.hideMessage,
      callbackScope: this
    });
  },
  hideMessage: function() {
    this.hideEvent = null;
    this.visible = false;
  },
});

var NPC = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Sprite,
  //notes: dialogue is a dictionary of audio objects like {"al": alSound} (fix needed...)
  // left, right, up, down are strings like 'alright' or 'jonleft'
  initialize: function NPC(scene, spawnPoint, texture, frame, type, left, right, up, down, dialogue, joinParameter) {
    let point = map.findObject("Objects", obj => obj.name === spawnPoint);
    Phaser.GameObjects.Sprite.call(this, scene, point.x, point.y, texture, frame);
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.following = false;
    this.joinParameter = joinParameter
    this.type = type;
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
    this.dialogue = dialogue;
    this.setInteractive().on('pointerup', function() {
      if (this.following === false && this.joinParameter) {
        this.following = true;
        currentParty[this.type]=true
      } else if (this.following) {
        this.following = false
        currentParty[this.type]=false
      }
    });
    this.setScale(overworldScale[this.texture.key]);
    this.setSize(sizeAndOffset[this.texture.key].size[0], sizeAndOffset[this.texture.key].size[1])
    this.setOffset(sizeAndOffset[this.texture.key].offset[0], sizeAndOffset[this.texture.key].offset[1])
    this.sound0 = scene.sound.add(this.dialogue);
    if (loading) {
      loading = false;
      loadGame2();
    }
  },
  // to follow player and join party
  follow: function(player, strength = 1) {
    if (this.following && inPool === false) {
      if (distance(this.body, player) > 20) {
        this.body.velocity.x = (player.x - this.body.x) * strength
        this.body.velocity.y = (player.y - this.body.y) * strength
      }
    } else if (this.following && inPool) {
      this.body.velocity.x = (beachball.x - this.body.x) * 2
      this.body.velocity.y = (beachball.y - this.body.y) * 2
    }
  },
  randomWalk: function randomWalk(strength = 1) {
    if (this.following === false) {
      this.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
      this.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);

      if (this.body.velocity.x > 50 || this.body.velocity.x < -50 || this.body.velocity.y > 50 || this.body.velocity.y < -50) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }
  },
  chase: function(thing2, strength = 1.2, offset = 0) { //makes thing1 chase thing2 with strength and offset
    if (this.following === false) {
      if (this.x > thing2.x + offset) {
        if (this.body.velocity.x > 0) {
          this.body.velocity.x = 0
        }
        this.body.velocity.x -= strength
      }
      if (this.x < thing2.x - offset) {
        if (this.body.velocity.x < 0) {
          this.body.velocity.x = 0
        }
        this.body.velocity.x += strength
      }
      if (this.y > thing2.y + offset) {
        if (this.body.velocity.y > 0) {
          this.body.velocity.y = 0
        }
        this.body.velocity.y -= strength
      }
      if (this.y < thing2.y - offset) {
        if (this.body.velocity.y < 0) {
          this.body.velocity.y = 0
        }
        this.body.velocity.y += strength
      }
    }
  },
  speak: function(audioName) {
    dialogue.audioName.play()
  },
  getUnstuck: function(strength = 1) {
    if (this.body.blocked.up) {
      this.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
      this.body.velocity.y -= strength
    }
    if (this.body.blocked.down) {
      this.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
      this.body.velocity.y += strength
    }
    if (this.body.blocked.left) {
      this.body.velocity.x += strength
      this.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);
    }
    if (this.body.blocked.right) {
      this.body.velocity.x -= strength
      this.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);
    }
  },
  animate: function(thresh = 10) {
    if (this.body.velocity.x > thresh) {
      this.anims.play(this.right, true);
    } else if (this.body.velocity.x < -1 * thresh) {
      this.anims.play(this.left, true);
    }
    if (this.body.velocity.x > -1 * thresh / 2 * thresh && this.body.velocity.x < thresh / 2 && this.body.velocity.y > thresh) {
      this.anims.play(this.down, true)
    } else if (this.body.velocity.x > -1 * thresh / 2 * thresh && this.body.velocity.x < thresh / 2 && this.body.velocity.y < -1 * thresh) {
      this.anims.play(this.up, true)
    }
  },
});

var LightWorld = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "LightWorld"
    });
  },
  init: function(data) {},
  wake: function() {
    this.scene.sleep("PoolScore");
    if (loadedIndoorsThemes){
      gameStateApt.indoors0.stop()
      gameStateApt.indoors1.stop()
      gameStateApt.indoors2.stop()
      gameStateApt.indoors3.stop()
    }
    zoom = 2;
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    changeThemeSong = true;
    gameState.mario2.stop();
  },
  onKeyInput: function(event) {
    if (event.code === "Backspace") {
      ball.disableBody(true, true);
      ball.enableBody(true, gameState.BallSpawnPoint.x, gameState.BallSpawnPoint.y, true, true);
      volleyball.disableBody(true, true);
      volleyball.enableBody(true, gameState.VolleyballSpawnPoint.x - 32, gameState.VolleyballSpawnPoint.y - 250, true, true);
    }
  },
  preload: function() {
    //loading audio
    this.load.audio('carcrash', ['assets/carcrash.wav']);
    this.load.audio('trevorWoods', ['assets/trevorwoods.wav']);
    this.load.audio('marioWoods', ['assets/8mario_forest.mp3']);
    this.load.audio('linkWoods', ['assets/8link_forest.mp3']);
    this.load.audio('mario2', ['assets/9mario2.wav']);
    this.load.audio('swimNoise', ['assets/swimNoise.wav']);
    this.load.audio('holyDiver', ['assets/holyDiver.wav']);
    this.load.audio('slash', ['assets/slash.wav']);
    this.load.audio('spray', ['assets/spray.mp3']);
    this.load.audio('smack', ['assets/smack.wav']);
    this.load.audio('bodyhit', ['assets/bodyhit.wav']);
    this.load.audio('airsoft', ['assets/airsoft.wav']);
    this.load.audio('punch', ['assets/Punch.wav']);
    this.load.audio('stabnoise', ['assets/stabnoise.wav']);
    this.load.audio('bitenoise', ['assets/bitenoise.wav']);
    this.load.audio('battle1', ['assets/battle1.wav']);
    this.load.audio('battle2', ['assets/battle2.wav']);
    this.load.audio('battle3', ['assets/battle3.wav']);
    this.load.audio('battle4', ['assets/battle4.wav']);
    this.load.audio('battle5', ['assets/battle5.wav']);
    this.load.audio('battle6', ['assets/battle6.wav']);
    this.load.audio('battle7', ['assets/battle7.wav']);
    this.load.audio('battle8', ['assets/battle8.mp3']);
    this.load.audio('battle9', ['assets/battle9.wav']);
    this.load.audio('spooky', ['assets/spooky.wav']);
    this.load.audio('ball1', ['assets/ball1.wav']);
    this.load.audio('ball2', ['assets/ball2.wav']);
    this.load.audio('bennett_run', ['assets/bennett.wav']);
    this.load.audio('arnold_bennett', ['assets/arnold_bennett.mp3']);
    this.load.audio('heyy', ['assets/heyy.wav']);
    this.load.audio('erggh', ['assets/erggh.wav']);
    this.load.audio('hello', ['assets/Hello.wav']);
    this.load.audio('wutt', ['assets/wutt.wav']);
    this.load.audio('ooo', ['assets/ooo.wav']);
    this.load.audio('block', ['assets/block.wav']);
    this.load.audio('iwantsomecrack', ['assets/iwantsomecrack.mp3']);
    this.load.audio('itemget', ['assets/itemget.wav']);
    this.load.audio('dead', ['assets/dead.wav']);
    this.load.audio('poolhit', ['assets/poolhit.wav']);
    this.load.audio('poolcollide', ['assets/poolcollide.wav']);
    this.load.audio('poolpocket', ['assets/poolpocket.wav']);
    this.load.audio('drinkCan', ['assets/drinkCan.wav']);
    this.load.audio('drinkGatorade', ['assets/drinkGatorade.wav']);
    this.load.audio('menuSelect', ['assets/menuSelect.wav']);
    this.load.audio('menuSelect2', ['assets/menuSelect2.wav']);
    this.load.audio('secret', ['assets/secret.wav']);
    this.load.audio('start', ['assets/start.wav']);
    this.load.audio('bong', ['assets/bong.wav']);
    this.load.audio('al', ['assets/al.wav']);
    this.load.audio('holdon', ['assets/holdon.wav']);
    this.load.audio('beatbox', ['assets/beatbox.wav']);
    this.load.audio('carNoise', ['assets/shitty_car.wav']);
    this.load.audio('theme', ['assets/fugginwitsumshiit.wav']);
    this.load.audio('dark_theme', ['assets/dark_theme.wav']);
    this.load.audio('windNoise', ['assets/windNoise.wav']);
    //menu items icons
    this.load.image('monsterIcon', "assets/monster.png");
    this.load.image('maxiceIcon', "assets/maxice.png");
    this.load.image('andycappsIcon', "assets/andycapps.png");
    this.load.image('liquorIcon', "assets/liquorIcon.png");
    this.load.image('hammsIcon', "assets/hamms.png");
    this.load.image('larrySpecialIcon', "assets/larrySpecial.png");
    this.load.image('gatoradeIcon', "assets/gatorade.png");
    //loading sprite images
    //this.load.image('bikinigirl2', "assets/bikinigirl2.png");
    this.load.image('towel1', "assets/towel1.png");
    this.load.image('towel2', "assets/towel2.png");
    this.load.image('poolchair1', "assets/poolchair1.png");
    this.load.image('poolchair2', "assets/poolchair2.png");
    this.load.image('hausdorf', "assets/hausdorf.png");
    this.load.image('quil', "assets/quil.png");
    this.load.image('dioshrine', "assets/dio_statue.png");
    this.load.image('car_keys', "assets/car_keys.png");
    this.load.image('blonde', "assets/blonde.png");
    //this.load.image('girl3', "assets/girl3.png");
    this.load.image('girl4', "assets/girl4.png");
    this.load.image('net', "assets/net.png");
    this.load.image('volleyballnet', "assets/volleyballnet.png");
    this.load.image('phone', "assets/phone.png");
    this.load.image('wallet', "assets/wallet.png");
    this.load.image('liquor', "assets/liquor.png");
    this.load.image('yogamat', "assets/yogamat.png");
    //loading spritesheets
    this.load.spritesheet('pool',
      'assets/burcham_pool_animated.png', {
        frameWidth: 224,
        frameHeight: 288
      });
    this.load.spritesheet('explosion',
      'assets/explosion-4.png', {
        frameWidth: 128,
        frameHeight: 128
      });
    this.load.spritesheet('stripper',
      'assets/stripper.png', {
        frameWidth: 120,
        frameHeight: 120
      });
    this.load.spritesheet('adeline',
      'assets/adeline.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('yogagirl',
      'assets/yogagirl.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('dancinggirl',
      'assets/girl_dancing.png', {
        frameWidth: 68,
        frameHeight: 96
      });
    this.load.spritesheet('meSwimming',
      'assets/me_swimming.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('dio',
      'assets/Dio.png', {
        frameWidth: 200,
        frameHeight: 233
      });
    this.load.spritesheet('fratboy2prime',
      'assets/fratboy2prime.png', {
        frameWidth: 300,
        frameHeight: 300
      });
    this.load.spritesheet('junkie',
      'assets/junkie.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('crackhead',
      'assets/crackhead.png', {
        frameWidth: 300,
        frameHeight: 320
      });
    this.load.spritesheet('ex_junkie',
      'assets/ex_junkie.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('fratboy1',
      'assets/fratboy1.png', {
        frameWidth: 300,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy2',
      'assets/fratboy2.png', {
        frameWidth: 300,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy3',
      'assets/fratboy3.png', {
        frameWidth: 300,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy4',
      'assets/fratboy4.png', {
        frameWidth: 300,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy5',
      'assets/fratboy5.png', {
        frameWidth: 300,
        frameHeight: 350
      });
    this.load.spritesheet('car4',
      'assets/car4.png', {
        frameWidth: 64,
        frameHeight: 64
      });
    this.load.spritesheet('me',
      'assets/me_running_BTJM.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('me_boxing',
      'assets/me_boxing.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('bennett',
      'assets/bennett.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('bennettattack',
      'assets/bennettattack.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('joe',
      'assets/joe.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('james',
      'assets/james.png', {
        frameWidth: 200,
        frameHeight: 280
      });
    this.load.spritesheet('al',
      'assets/al.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('jon',
      'assets/jon_running.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('trevor',
      'assets/trevor_walking.png', {
        frameWidth: 200,
        frameHeight: 300
      });
    this.load.spritesheet('volleyball',
      'assets/soccer_ball.png', {
        frameWidth: 20,
        frameHeight: 20
      });
    this.load.spritesheet('ball',
      'assets/volleyball.png', {
        frameWidth: 16,
        frameHeight: 16
      });
    this.load.spritesheet('beachball',
      'assets/beachball.png', {
        frameWidth: 32,
        frameHeight: 32
      });
    this.load.spritesheet('grl_dnc',
      'assets/grl_dnc.png', {
        frameWidth: 38,
        frameHeight: 88
      });
    this.load.spritesheet('girl1',
      'assets/girl1.png', {
        frameWidth: 84,
        frameHeight: 194
      });
    this.load.spritesheet('girl2',
      'assets/girl2.png', {
        frameWidth: 86,
        frameHeight: 204
      });
    this.load.spritesheet('girl3',
      'assets/girl3.png', {
        frameWidth: 86,
        frameHeight: 188
      });
    this.load.spritesheet('smoke',
      'assets/smokesheet.png', {
        frameWidth: 101,
        frameHeight: 97
      }
    );
    //loading tilesets and tilemaps
    this.load.image("tuxmon-tiles", "assets/tilesets/tuxmon-sample-32px.png");
    this.load.image("buildings1", "assets/tilesets/buildings1.png");
    this.load.image("elTiles", "assets/tilesets/el_tileset_custom.png");
    this.load.image("buildingTiles", "assets/tilesets/buildings_custom.png");
    this.load.image("elTiles2", "assets/tilesets/[Base]BaseChip_pipo.png");
    this.load.image("carTiles", "assets/tilesets/car_tiles.png");
    this.load.tilemapTiledJSON("map", "assets/east_lansing.json");
    this.load.tilemapTiledJSON("dark_map", "assets/dark_east_lansing.json");
  },
  create: function() {
    //camera controls
    const camera = this.cameras.main;
    camera.zoom = 2;
    camera.roundPixels = true;
    //sound effects and music
    gameState.swimNoise = this.sound.add('swimNoise', {
      volume: .6
    });
    gameState.swimNoise.loop = true;
    gameState.bodyhit = this.sound.add('bodyhit', {
      volume: 1
    });
    gameState.holyDiver = this.sound.add('holyDiver', {
      volume: 2
    });
    gameState.slash = this.sound.add('slash', {
      volume: .25
    });
    gameState.spray = this.sound.add('spray', {
      volume: 1
    });
    gameState.iwantsomecrack = this.sound.add('iwantsomecrack', {
      volume: 1
    });
    gameState.smack = this.sound.add('smack', {
      volume: .25
    });
    gameState.airsoft = this.sound.add('airsoft', {
      volume: .5
    });
    gameState.punchSound = this.sound.add('punch', {
      volume: .4
    });
    gameState.stabnoise = this.sound.add('stabnoise', {
      volume: .8
    });
    gameState.bitenoise = this.sound.add('bitenoise', {
      volume: .4
    });
    gameState.bennettSound = this.sound.add('bennett_run', {
      volume: 2
    });
    gameState.ball1 = this.sound.add('ball1', {
      volume: .6
    });
    gameState.ball2 = this.sound.add('ball2', {
      volume: .6
    });
    gameState.alSound = this.sound.add('al');
    //gameState.holdOn = this.sound.add('holdon');
    gameState.beatbox = this.sound.add('beatbox', {
      volume: 1.5
    });
    gameState.bongSound = this.sound.add('bong', {
      volume: 3
    });
    gameState.carSound = this.sound.add('carNoise', {
      volume: 0.1
    });
    gameState.carSound.loop = true;
    gameState.arnold_bennett = this.sound.add('arnold_bennett', {
      volume: 1
    });
    gameState.heyy = this.sound.add('heyy', {
      volume: 1
    });
    gameState.hello = this.sound.add('hello', {
      volume: 1
    });
    gameState.wutt = this.sound.add('wutt', {
      volume: 1
    });
    gameState.ooo = this.sound.add('ooo', {
      volume: 1
    });
    gameState.erggh = this.sound.add('erggh', {
      volume: 2
    });
    gameState.block = this.sound.add('block', {
      volume: 1
    });
    gameState.itemget = this.sound.add('itemget', {
      volume: 0.6
    });
    gameState.dead = this.sound.add('dead', {
      volume: 0.6
    });
    gameState.poolhit = this.sound.add('poolhit', {
      volume: 1
    });
    gameState.poolcollide = this.sound.add('poolcollide', {
      volume: 1
    });
    gameState.poolpocket = this.sound.add('poolpocket', {
      volume: 1
    });
    gameState.drinkCan = this.sound.add('drinkCan', {
      volume: 0.6
    });
    gameState.drinkGatorade = this.sound.add('drinkGatorade', {
      volume: 0.6
    });
    gameState.menuSelect = this.sound.add('menuSelect', {
      volume: 0.5
    });
    gameState.menuSelect2 = this.sound.add('menuSelect2', {
      volume: 0.5
    });
    gameState.secret = this.sound.add('secret', {
      volume: 0.6
    });
    gameState.start = this.sound.add('start', {
      volume: 1
    });
    // theme music set to play
    gameState.music = this.sound.add('theme');
    gameState.music.loop = true;
    gameState.music.play();
    // theme for hb game
    gameState.mario2 = this.sound.add('mario2');
    gameState.mario2.loop = true;
    //car explosion sound
    gameState.carCrash = this.sound.add('carcrash');
    // woods themes
    gameState.trevorWoods = this.sound.add('trevorWoods', {
      volume: 0.6
    });
    gameState.trevorWoods.loop = true;
    gameState.marioWoods = this.sound.add('marioWoods');
    gameState.marioWoods.loop = true;
    gameState.linkWoods = this.sound.add('linkWoods');
    gameState.linkWoods.loop = true;
    //songs to use in random battles
    gameState.battlesong1 = this.sound.add('battle1')
    gameState.battlesong2 = this.sound.add('battle2')
    gameState.battlesong3 = this.sound.add('battle3')
    gameState.battlesong4 = this.sound.add('battle4')
    gameState.battlesong5 = this.sound.add('battle5')
    gameState.battlesong6 = this.sound.add('battle6')
    gameState.battlesong7 = this.sound.add('battle7')
    gameState.battlesong8 = this.sound.add('battle8')
    gameState.battlesong9 = this.sound.add('battle9')
    gameState.spooky = this.sound.add('spooky', {
      volume: 2.5
    })
    gameState.battlesong1.loop = true;
    gameState.battlesong2.loop = true;
    gameState.battlesong3.loop = true;
    gameState.battlesong4.loop = true;
    gameState.battlesong5.loop = true;
    gameState.battlesong6.loop = true;
    gameState.battlesong7.loop = true;
    gameState.battlesong8.loop = true;
    gameState.battlesong9.loop = true;
    gameState.spooky.loop = true;
    gameState.holyDiver.loop = true;

    //making the map
    map = this.make.tilemap({
      key: "map"
    });
    const tileset1 = map.addTilesetImage("tuxmon-sample-32px", "tuxmon-tiles");
    const tileset2 = map.addTilesetImage("el_tileset_custom", "elTiles")
    const tileset33 = map.addTilesetImage("buildings_custom", "buildingTiles")
    const tileset22 = map.addTilesetImage("[Base]BaseChip_pipo", "elTiles2")
    const tileset3 = map.addTilesetImage("car_tiles", "carTiles");
    const tileset4 = map.addTilesetImage("buildings1", "buildings1");
    const below = map.createStaticLayer("Below2", tileset2, 0, 0);
    const buildingtops = map.createStaticLayer("BuildingTops", tileset1, 0, 0);
    //defining spawn points
    const NetSpawnPoint = map.findObject("Objects", obj => obj.name === "net spawn point");
    const KeysSpawnPoint = map.findObject("Objects", obj => obj.name === "keys spawn point");
    const PhoneSpawnPoint = map.findObject("Objects", obj => obj.name === "phone spawn point");
    const WalletSpawnPoint = map.findObject("Objects", obj => obj.name === "wallet spawn point");
    gameState.BallSpawnPoint = map.findObject("Objects", obj => obj.name === "ball spawn point");
    gameState.VolleyballSpawnPoint = map.findObject("Objects", obj => obj.name === "volleyball spawn point");
    const CarSpawnPoint = map.findObject("Objects", obj => obj.name === "car spawn point");
    const DioShrineSpawnPoint = map.findObject("Objects", obj => obj.name === "dioshrine spawn point");
    car = this.physics.add.sprite(CarSpawnPoint.x - 200, CarSpawnPoint.y, 'car4');
    const VolleyballNetSpawnPoint = map.findObject("Objects", obj => obj.name === "volleyballnet spawn point");
    const BurchamPoolSpawnPoint = map.findObject("Objects", obj => obj.name === "burchampool spawn point");


    //spawning phone wallet and keys
    if (phoneGet === 0) {
      phone = this.physics.add.sprite(PhoneSpawnPoint.x, PhoneSpawnPoint.y + 8, 'phone');
      phone.setScale(.2);
      phone.angle = -25;
    }
    if (keysGet === 0) {
      keys = this.physics.add.sprite(KeysSpawnPoint.x, KeysSpawnPoint.y, 'car_keys');
      keys.setScale(.07);
    }
    if (walletGet === 0) {
      wallet = this.physics.add.sprite(WalletSpawnPoint.x, WalletSpawnPoint.y + 20, 'wallet');
      wallet.setScale(.2);
      wallet.angle = -50;
    }

    //creating the soccer net in the field by the church
    goalieZones = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    goalieZone = goalieZones.create(NetSpawnPoint.x - 60, NetSpawnPoint.y + 30, 120, 50).setOrigin(0, 0);
    var goalieZoneOutline = this.add.rectangle(NetSpawnPoint.x - 60, NetSpawnPoint.y + 30, 120, 50).setOrigin(0, 0);
    goalieZone.body.immovable = true;
    goalieZone.body.moves = false;
    goalieZoneOutline.setStrokeStyle(2, 0xffffff);
    net = this.physics.add.group()
    net1 = net.create(NetSpawnPoint.x, NetSpawnPoint.y, 'net');
    net2 = net.create(NetSpawnPoint.x, NetSpawnPoint.y, 'net');
    net3 = net.create(NetSpawnPoint.x, NetSpawnPoint.y, 'net');
    net4 = net.create(NetSpawnPoint.x, NetSpawnPoint.y, 'net');
    net2.visible = false;
    net3.visible = false;
    net4.visible = false;
    net1.setSize(20, 64);
    net1.setOffset(108, 0)
    net2.setSize(20, 64);
    net2.setOffset(0, 0)
    net3.setSize(128, 20);
    net3.setOffset(0, 0)
    net4.setSize(88, 20);
    net4.setOffset(20, 20);

    //creating volleyball net
    volleyballnet = net.create(VolleyballNetSpawnPoint.x, VolleyballNetSpawnPoint.y, 'volleyballnet');
    volleyballnet.setOrigin(0, 0);
    volleyballnet.setSize(12, 128);
    volleyballnet.setOffset(0, 0);

    net.children.iterate(function(child) {
      child.body.immovable = true;
      child.body.moves = false;
    });

    //pool water animation
    this.anims.create({
      key: 'poolwaves',
      frames: this.anims.generateFrameNumbers('pool', {
        frames: [0,1,2,1]
      }),
      frameRate: 3,
      repeat: -1
    });
    burchamPool = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 16, BurchamPoolSpawnPoint.y + 16, 'pool')
    burchamPool.setOrigin(0, 0);
    burchamPool.anims.play('poolwaves', true);
    towel1 = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 50 + 64, BurchamPoolSpawnPoint.y + 220 + 64, 'towel1')
    towel2 = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 100 + 64, BurchamPoolSpawnPoint.y + 220 + 64, 'towel2')
    //bikinigirl2=this.physics.add.sprite(BurchamPoolSpawnPoint.x+100+64, BurchamPoolSpawnPoint.y+220+64, 'bikinigirl2')
    //bikinigirl2.angle=180;
    //bikinigirl2.setScale(.23)
    adeline = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 50 + 64, BurchamPoolSpawnPoint.y + 220 + 64, 'adeline');
    adeline.setScale(.16)
    adeline.body.immovable = true;
    //bikinigirl2.body.immovable = true;
    //adeline anims
    this.anims.create({
      key: 'adeline_party',
      frames: this.anims.generateFrameNumbers('adeline', {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });
    adeline.anims.play('adeline_party', true)

    dancingGirl = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 165, BurchamPoolSpawnPoint.y + 280, 'dancinggirl');
    dancingGirl.setScale(.35)
    dancingGirl.body.immovable = true;
    //dancing girl anims
    this.anims.create({
      key: 'dancinggirldancing',
      frames: this.anims.generateFrameNumbers('dancinggirl', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    dancingGirl.anims.play('dancinggirldancing', true)

    yogamat = this.add.image(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 220 + 10, 'yogamat');
    yogagirl = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 220 - 7, 'yogagirl');
    yogagirl.setScale(.22)
    yogagirl.body.immovable = true;
    //yogagirl anims
    this.anims.create({
      key: 'yogagirlyoga',
      frames: this.anims.generateFrameNumbers('yogagirl', {
        frames: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9]
      }),
      frameRate: 1,
      repeat: -1
    });
    yogagirl.anims.play('yogagirlyoga', true)

    poolchairs = this.physics.add.group()
    poolchair1 = poolchairs.create(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 40, 'poolchair1')
    poolchair2 = poolchairs.create(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 70, 'poolchair2')
    poolchair3 = poolchairs.create(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 90, 'poolchair2')
    poolchair4 = poolchairs.create(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 110, 'poolchair2')
    poolchair5 = poolchairs.create(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 140, 'poolchair1')
    poolchair6 = poolchairs.create(BurchamPoolSpawnPoint.x + 220, BurchamPoolSpawnPoint.y + 170, 'poolchair1')

    poolchairs.children.iterate(function(child) {
      child.setScale(.6);
      child.body.immovable = true;
      child.body.moves = false;
    });

    liquor = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 25 + 64, BurchamPoolSpawnPoint.y + 300 + 5, 'liquor');
    liquor.setScale(.1);

    //creating the soccer ball
    ball = this.physics.add.sprite(gameState.BallSpawnPoint.x + 16, gameState.BallSpawnPoint.y - 16, 'ball');
    ball.setScale(.75);
    ball.setBounce(.8);
    ball.body.setCircle(8);
    ball.body.setOffset(0, 0);
    //creating the volleyball
    volleyball = this.physics.add.sprite(gameState.VolleyballSpawnPoint.x - 31, gameState.VolleyballSpawnPoint.y - 500, 'volleyball');
    volleyball.setScale(1.2);
    volleyball.setBounce(1);
    volleyball.disableBody(true, true);
    volleyball.body.setCircle(3);
    volleyball.body.setOffset(8, 9);
    volleyball.setFrictionX(100)
    volleyball.setFrictionY(100)
    //creating the beachball
    beachball = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 50, BurchamPoolSpawnPoint.y + 80, 'beachball');
    beachball.setBounce(.3);
    beachball.body.setCircle(10);
    beachball.body.setOffset(6, 6);

    //spawning map layers which are under player and npcs (should this be static? fix needed...)
    const world = map.createDynamicLayer("World", tileset1, 0, 0);
    const world3 = map.createDynamicLayer("World3", tileset33, 0, 0);
    const world2 = map.createDynamicLayer("World2", tileset22, 0, 0);
    const special = map.createStaticLayer("Special", tileset4, 0, 0);
    const cars = map.createStaticLayer("Cars", tileset3, 0, 0);
    //spawning npcs
    //NPC(scene, spawnPoint, texture, frame, type, left, right, up, down, dialogue)
    bennett = new NPC(this, "bennett spawn point", "bennett", 0, "Bennett", "bennettleft", "bennettright", "bennettup", "bennettdown", "bennett_run", potentialParty["Bennett"]);
    al = new NPC(this, "al spawn point", "al", 0, "Al", "alleft", "alright", "alleft", "alright", "holdon", potentialParty["Al"]);
    joe = new NPC(this, "joe spawn point", "joe", 0, "Joe Bell", "joeleft", "joeright", "joeleft", "joeright", "punch", false);
    jon = new NPC(this, "jon spawn point", "jon", 0, "Homeboy Jon", "jonleft", "jonright", "jonleft", "jonright", "bitenoise", false);
    jon.body.setSize(120, 20);
    jon.body.setOffset(40, 150); //overriding scale given by NPC class
    james = new NPC(this, "james spawn point", "james", 0, "Homeboy Jon", "jamesleft", "jamesright", "jamesup", "jamesdown", "bitenoise", false);
    james.body.setCircle(180);
    james.body.setOffset(50, 100); //overriding scale given by NPC class
    oghomeboy = new NPC(this, "homeboy spawn point", "smoke", 0, "Original Homeboy", "smoke", "smoke", "smoke", "smoke", "bong", false);
    oghomeboy.body.immovable = true;
    oghomeboy.body.moves = false;
    trevor = new NPC(this, "trevor spawn point", "trevor", 0, "Jimmy", "trevorleft", "trevorright", "trevorleft", "trevorright", "bong", potentialParty["Jimmy"]);
    trevor.body.setCircle(60);
    trevor.body.setOffset(60, 180);
    hausdorf = new NPC(this, "hausdorf spawn point", "hausdorf", 0, "hausdorf", "hausdorf", "hausdorf", "hausdorf", "hausdorf", "bong", false);
    stripper = new NPC(this, "stripper spawn point", "stripper", 0, "Stripper", "stripperleft", "stripperleft", "stripperup", "stripperdown", "bong", false);

    chasersGroup = this.physics.add.group()
    for (let i = 0; i < enemsForChasers.length; i++) {
      chasers[i] = chasersGroup.create(1200 + 100, 600 + 300, enemsForChasers[i][0]);
      chasers[i].disableBody(true, true);
      chasers[i].setScale(enemsForChasers[i][3])
      chasers[i].body.setCircle(enemsForChasers[i][4]);
      chasers[i].body.setOffset(enemsForChasers[i][5], enemsForChasers[i][6]);
    }

    fratboys = this.physics.add.group()
    //fratboys
    gameState.fratboy1SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy1 spawn point");
    gameState.fratboy2SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy3 spawn point");
    gameState.fratboy3SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy4 spawn point");
    gameState.fratboy4SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy5 spawn point");
    crackhead = fratboys.create(gameState.fratboy1SpawnPoint.x - 100, gameState.fratboy1SpawnPoint.y - 2000, 'crackhead');
    ex_junkie = fratboys.create(gameState.fratboy1SpawnPoint.x - 100, gameState.fratboy1SpawnPoint.y + 200, 'ex_junkie');
    junkie = fratboys.create(gameState.fratboy1SpawnPoint.x + 100, gameState.fratboy1SpawnPoint.y - 200, 'junkie');
    fratboy1 = fratboys.create(gameState.fratboy1SpawnPoint.x, gameState.fratboy1SpawnPoint.y, 'fratboy1');
    fratboy2 = fratboys.create(gameState.fratboy2SpawnPoint.x, gameState.fratboy2SpawnPoint.y, 'fratboy2');
    fratboy3 = fratboys.create(gameState.fratboy3SpawnPoint.x, gameState.fratboy3SpawnPoint.y, 'fratboy3');
    fratboy4 = fratboys.create(gameState.fratboy4SpawnPoint.x, gameState.fratboy4SpawnPoint.y, 'fratboy4');
    fratboy5 = fratboys.create(gameState.fratboy4SpawnPoint.x + 20, gameState.fratboy4SpawnPoint.y + 200, 'fratboy5');

    fratboys.children.iterate(function(child) {
      child.setScale(.16);
      child.setCircle(40);
      child.setOffset(110, 80);
    });

    //fratboy2
    gameState.JonSpawnPoint = map.findObject("Objects", obj => obj.name === "jon spawn point");
    const Fratboy2PrimeSpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy2prime spawn point");
    fratboy2prime = fratboys.create(Fratboy2PrimeSpawnPoint.x, Fratboy2PrimeSpawnPoint.y, 'fratboy2prime');
    fratboy2prime.setScale(.14)
    fratboy2prime.body.setCircle(20);
    fratboy2prime.body.setOffset(60, 100);

    //spawning girls
    gameState.Girl1SpawnPoint = map.findObject("Objects", obj => obj.name === "girl1 spawn point");
    gameState.Girl2SpawnPoint = map.findObject("Objects", obj => obj.name === "girl2 spawn point");
    gameState.Girl3SpawnPoint = map.findObject("Objects", obj => obj.name === "girl3 spawn point");
    gameState.Girl4SpawnPoint = map.findObject("Objects", obj => obj.name === "girl4 spawn point");
    grls = this.physics.add.group();
    girl1 = grls.create(gameState.Girl1SpawnPoint.x, gameState.Girl1SpawnPoint.y, 'girl1');
    girl3 = grls.create(gameState.Girl3SpawnPoint.x + 4, gameState.Girl3SpawnPoint.y, 'girl3');
    girl4 = grls.create(gameState.Girl4SpawnPoint.x + 7, gameState.Girl4SpawnPoint.y, 'girl4');
    girl2 = grls.create(gameState.Girl2SpawnPoint.x - 5, gameState.Girl2SpawnPoint.y, 'girl2');

    grls.children.iterate(function(child) {
      child.setCircle(20);
      child.setScale(.2)
    });

    //spawn blnde
    const BlondeSpawnPoint = map.findObject("Objects", obj => obj.name === "blonde spawn point");
    blonde = grls.create(BlondeSpawnPoint.x, BlondeSpawnPoint.y, 'blonde');
    blonde.setScale(.25);
    blonde.setSize(1, 80);
    blonde.setOffset(30, 80);

    //spawning player and setting properties
    gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "player spawn point");
    //to start at level i and get skill at level i
    //levelObject["Mac"]=3; window.setTimeout(() => {skillCheck("Mac")}, 5000);
    //to spawn at pool area
    //gameState.PlayerSpawnPoint=BurchamPoolSpawnPoint
    //to spawn at highschool roof
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "hausdorf spawn point")
    //to spawn at soccer net
    //gameState.PlayerSpawnPoint.x = map.findObject("Objects", obj => obj.name === "jon spawn point").x
    //gameState.PlayerSpawnPoint.y = map.findObject("Objects", obj => obj.name === "jon spawn point").y+50
    //to spawn at oghomeboy spawn point
    //gameState.PlayerSpawnPoint.x = map.findObject("Objects", obj => obj.name === "homeboy spawn point").x-40
    //gameState.PlayerSpawnPoint.y = map.findObject("Objects", obj => obj.name === "homeboy spawn point").y
    //to spawn at race start
    //raceBegin=true; athletics=1.3
    //to spawn at bottom left corner of map
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "abbott bottom right")
    //to spawn at marathon
    //gameState.PlayerSpawnPoint.x = map.findObject("Objects", obj => obj.name === "marathon top left").x+200
    //gameState.PlayerSpawnPoint.y = map.findObject("Objects", obj => obj.name === "marathon top left").y+650
    //to spawn at pool table
    //gameState.PlayerSpawnPoint.x = map.findObject("Objects", obj => obj.name === "731 clubhouse entrance top left").x+10
    //gameState.PlayerSpawnPoint.y = map.findObject("Objects", obj => obj.name === "731 clubhouse entrance top left").y+10


    me = this.physics.add.sprite(gameState.PlayerSpawnPoint.x, gameState.PlayerSpawnPoint.y, 'me');
    me.setScale(.17);
    me.body.setSize(70, 90);
    me.body.setOffset(60, 100);

    const above = map.createStaticLayer("Above", tileset1, 0, 0);
    // create a boolean for tiles in Tiled called ''collides'' in the tileset editor and set collides = 'true'
    world.setCollisionByProperty({
      collides: true
    });
    world2.setCollisionByProperty({
      collides: true
    });
    world3.setCollisionByProperty({
      collides: true
    });
    cars.setCollisionByProperty({
      collides: true
    });
    special.setCollisionByProperty({
      collides: true
    });
    //followers colliding
    this.physics.add.collider(trevor, al);
    this.physics.add.collider(trevor, bennett);
    this.physics.add.collider(bennett, al);
    //collisions with pool chairs
    this.physics.add.collider(me, goalieZone);
    this.physics.add.collider(me, dancingGirl);
    this.physics.add.collider(me, yogagirl);
    this.physics.add.collider(me, adeline);
    //this.physics.add.collider(me,bikinigirl2);
    this.physics.add.collider(me, poolchairs);
    this.physics.add.collider(beachball, poolchairs);
    this.physics.add.collider(poolchairs, poolchairs);
    this.physics.add.collider(poolchairs, world);
    //collisions with net
    this.physics.add.collider(me, net);
    this.physics.add.collider(volleyball, net);
    this.physics.add.collider(jon, net);
    this.physics.add.collider(ball, net);
    this.physics.add.collider(net, trevor);
    this.physics.add.collider(net, al);
    this.physics.add.collider(net, bennett);
    //collisions with player and world
    this.physics.add.collider(me, grls);
    this.physics.add.collider(me, blonde);
    this.physics.add.collider(me, world);
    this.physics.add.collider(me, world2);
    this.physics.add.collider(me, world3);
    this.physics.add.collider(me, special);
    this.physics.add.collider(me, cars);
    this.physics.add.collider(me, ball);
    this.physics.add.collider(me, volleyball);
    this.physics.add.collider(me, beachball);
    this.physics.add.collider(me, oghomeboy);
    this.physics.add.collider(me, james);
    this.physics.add.collider(me, joe);
    this.physics.add.collider(me, fratboys);
    //colliders for grls
    this.physics.add.collider(grls, special);
    this.physics.add.collider(grls, grls);
    this.physics.add.collider(grls, me);
    this.physics.add.collider(grls, world);
    this.physics.add.collider(grls, world2);
    this.physics.add.collider(grls, world3);
    this.physics.add.collider(grls, cars);
    this.physics.add.collider(grls, trevor);
    this.physics.add.collider(grls, ball);
    this.physics.add.collider(grls, volleyball);
    //colliders for fratboys
    this.physics.add.collider(fratboys, special);
    this.physics.add.collider(fratboys, fratboys);
    this.physics.add.collider(fratboys, me);
    this.physics.add.collider(fratboys, world);
    this.physics.add.collider(fratboys, world2);
    this.physics.add.collider(fratboys, world3);
    this.physics.add.collider(fratboys, cars);
    this.physics.add.collider(fratboys, trevor);
    this.physics.add.collider(fratboys, ball);
    this.physics.add.collider(fratboys, volleyball);
    //colliders for world
    this.physics.add.collider(oghomeboy, world);
    this.physics.add.collider(oghomeboy, world2);
    this.physics.add.collider(oghomeboy, world3);
    this.physics.add.collider(world, world);
    this.physics.add.collider(world2, world2);
    this.physics.add.collider(world, ball);
    this.physics.add.collider(world2, ball);
    this.physics.add.collider(world3, ball);
    this.physics.add.collider(world, volleyball);
    this.physics.add.collider(world2, volleyball);
    this.physics.add.collider(world3, volleyball);
    this.physics.add.collider(world, beachball);
    this.physics.add.collider(world2, beachball);
    this.physics.add.collider(world3, beachball);
    this.physics.add.collider(oghomeboy, ball);
    this.physics.add.collider(oghomeboy, volleyball);
    this.physics.add.collider(cars, ball);
    this.physics.add.collider(cars, volleyball);
    //colliders for bennett
    this.physics.add.collider(bennett, ball)
    this.physics.add.collider(bennett, volleyball)
    this.physics.add.collider(bennett, world)
    this.physics.add.collider(bennett, world2)
    this.physics.add.collider(bennett, world3)
    this.physics.add.collider(bennett, cars)
    this.physics.add.collider(bennett, jon)
    //colliders for stripper
    this.physics.add.collider(stripper, ball)
    this.physics.add.collider(stripper, volleyball)
    this.physics.add.collider(stripper, world)
    this.physics.add.collider(stripper, world2)
    this.physics.add.collider(stripper, world3)
    this.physics.add.collider(stripper, cars)
    this.physics.add.collider(stripper, jon)
    //colliders for trevor
    this.physics.add.collider(trevor, ball)
    this.physics.add.collider(trevor, volleyball)
    this.physics.add.collider(trevor, world)
    this.physics.add.collider(trevor, world2)
    this.physics.add.collider(trevor, world3)
    this.physics.add.collider(trevor, cars)
    this.physics.add.collider(trevor, jon)
    //colliders for joe
    this.physics.add.collider(joe, ball)
    this.physics.add.collider(joe, volleyball)
    this.physics.add.collider(joe, world)
    this.physics.add.collider(joe, world2)
    this.physics.add.collider(joe, world3)
    this.physics.add.collider(joe, cars)
    this.physics.add.collider(joe, jon)
    //colliders for jon
    this.physics.add.collider(jon, ball)
    this.physics.add.collider(jon, volleyball)
    this.physics.add.collider(jon, world)
    this.physics.add.collider(jon, world2)
    this.physics.add.collider(jon, world3)
    this.physics.add.collider(jon, cars)
    //colliders for al
    this.physics.add.collider(al, world)
    this.physics.add.collider(al, world2)
    this.physics.add.collider(al, world3)
    this.physics.add.collider(al, cars)
    //colliders for james
    this.physics.add.collider(james, ball)
    this.physics.add.collider(james, volleyball)
    this.physics.add.collider(james, world)
    this.physics.add.collider(james, world2)
    this.physics.add.collider(james, world3)
    this.physics.add.collider(james, cars)
    this.physics.add.collider(james, jon)
    //colliders for car
    this.physics.add.collider(car, ball)
    this.physics.add.collider(car, volleyball)
    this.physics.add.collider(car, joe)
    this.physics.add.collider(car, trevor)
    this.physics.add.collider(car, jon)
    this.physics.add.collider(car, james)
    this.physics.add.collider(car, world)
    this.physics.add.collider(car, world2)
    this.physics.add.collider(car, world3)
    //colliders for chasersGroup
    this.physics.add.collider(chasersGroup, world)
    this.physics.add.collider(chasersGroup, world2)
    this.physics.add.collider(chasersGroup, world3)
    this.physics.add.collider(chasersGroup, cars)
    this.physics.add.collider(chasersGroup, ball)
    //colliders for special
    this.physics.add.collider(volleyball, special)
    this.physics.add.collider(ball, special)
    this.physics.add.collider(beachball, special)

    //setting world bounds and setting objects to collide with world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
    me.setCollideWorldBounds(true);
    trevor.setCollideWorldBounds(true);
    jon.setCollideWorldBounds(true);
    joe.setCollideWorldBounds(true);
    james.setCollideWorldBounds(true);
    bennett.setCollideWorldBounds(true);
    al.setCollideWorldBounds(true);
    ball.setCollideWorldBounds(true);
    volleyball.setCollideWorldBounds(true);
    beachball.setCollideWorldBounds(true);

    //set camera to follow main character but stay inside world bounds
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(me, true);

    //stripper animations
    this.anims.create({
      key: 'stripperleft',
      frames: this.anims.generateFrameNumbers('stripper', {
        start: 11,
        end: 14
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'stripperup',
      frames: this.anims.generateFrameNumbers('stripper', {
        start: 41,
        end: 44
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'stripperdown',
      frames: this.anims.generateFrameNumbers('stripper', {
        start: 1,
        end: 4
      }),
      frameRate: 5,
      repeat: -1
    });
    //car explosion animation
    this.anims.create({
      key: 'carexplosion',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 11
      }),
      frameRate: 5,
      repeat: 0
    });
    //swimming animations
    this.anims.create({
      key: 'leftswim',
      frames: this.anims.generateFrameNumbers('meSwimming', {
        frames: [0, 1]
      }),
      frameRate: 3,
      repeat: -1
    });

    //swimming animations
    this.anims.create({
      key: 'rightswim',
      frames: this.anims.generateFrameNumbers('meSwimming', {
        frames: [3, 4]
      }),
      frameRate: 3,
      repeat: -1
    });

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



    //fratboy2prime animations
    this.anims.create({
      key: 'fratboy2primestab',
      frames: this.anims.generateFrameNumbers('fratboy2prime', {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'fratboy2primewalk',
      frames: this.anims.generateFrameNumbers('fratboy2prime', {
        start: 4,
        end: 6
      }),
      frameRate: 5,
      repeat: -1
    });

    //crackhead anims
    this.anims.create({
      key: 'crackheadleft',
      frames: this.anims.generateFrameNumbers('crackhead', {
        start: 3,
        end: 4
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'crackheadright',
      frames: this.anims.generateFrameNumbers('crackhead', {
        start: 1,
        end: 2
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'crackheadturn',
      frames: this.anims.generateFrameNumbers('crackhead', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'crackheadattack',
      frames: this.anims.generateFrameNumbers('crackhead', {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: 0
    });

    //junkie anims
    this.anims.create({
      key: 'junkieleft',
      frames: this.anims.generateFrameNumbers('junkie', {
        start: 3,
        end: 4
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'junkieright',
      frames: this.anims.generateFrameNumbers('junkie', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'junkieturn',
      frames: this.anims.generateFrameNumbers('junkie', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'junkieattack',
      frames: this.anims.generateFrameNumbers('junkie', {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: 0
    });

    //junkie anims
    this.anims.create({
      key: 'ex_junkieleft',
      frames: this.anims.generateFrameNumbers('ex_junkie', {
        start: 3,
        end: 4
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'ex_junkieright',
      frames: this.anims.generateFrameNumbers('ex_junkie', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'ex_junkieturn',
      frames: this.anims.generateFrameNumbers('ex_junkie', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'ex_junkieattack',
      frames: this.anims.generateFrameNumbers('ex_junkie', {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: 0
    });

    //fratboy anims
    this.anims.create({
      key: 'frat1left',
      frames: this.anims.generateFrameNumbers('fratboy1', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'frat1right',
      frames: this.anims.generateFrameNumbers('fratboy1', {
        start: 3,
        end: 4
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'frat1turn',
      frames: this.anims.generateFrameNumbers('fratboy1', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'frat1attack',
      frames: this.anims.generateFrameNumbers('fratboy1', {
        start: 5,
        end: 5
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'frat2left',
      frames: this.anims.generateFrameNumbers('fratboy2', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'frat2right',
      frames: this.anims.generateFrameNumbers('fratboy2', {
        start: 3,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'frat2turn',
      frames: this.anims.generateFrameNumbers('fratboy2', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'frat2attack',
      frames: this.anims.generateFrameNumbers('fratboy2', {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'frat3left',
      frames: this.anims.generateFrameNumbers('fratboy3', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'frat3right',
      frames: this.anims.generateFrameNumbers('fratboy3', {
        start: 3,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'frat3turn',
      frames: this.anims.generateFrameNumbers('fratboy3', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'frat3attack',
      frames: this.anims.generateFrameNumbers('fratboy3', {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'frat4left',
      frames: this.anims.generateFrameNumbers('fratboy4', {
        start: 1,
        end: 2
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'frat5huhuh',
      frames: this.anims.generateFrameNumbers('fratboy5', {
        start: 0,
        end: 3
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'frat4right',
      frames: this.anims.generateFrameNumbers('fratboy4', {
        start: 3,
        end: 4
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'frat4turn',
      frames: this.anims.generateFrameNumbers('fratboy4', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'frat4attack',
      frames: this.anims.generateFrameNumbers('fratboy4', {
        start: 5,
        end: 5
      }),
      frameRate: 1,
      repeat: -1
    });
    //girl animations

    this.anims.create({
      key: 'girl1dnc',
      frames: this.anims.generateFrameNumbers('girl1', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'girl2dnc',
      frames: this.anims.generateFrameNumbers('girl2', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: 'girl3dnc',
      frames: this.anims.generateFrameNumbers('girl3', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    });
    //bennett animations
    this.anims.create({
      key: 'bennett_walk',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [0, 1]
      }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'bennett_attack',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [2]
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'bennett_special_attack',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [3, 1, 3, 0, 4]
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'bennettleft',
      frames: this.anims.generateFrameNumbers('bennett', {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'bennettright',
      frames: this.anims.generateFrameNumbers('bennett', {
        start: 4,
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'bennettup',
      frames: this.anims.generateFrameNumbers('bennett', {
        start: 8,
        end: 9
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'bennettdown',
      frames: this.anims.generateFrameNumbers('bennett', {
        start: 10,
        end: 11
      }),
      frameRate: 5,
      repeat: -1
    });

    //joe animations
    this.anims.create({
      key: 'joeleft',
      frames: this.anims.generateFrameNumbers('joe', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'joeright',
      frames: this.anims.generateFrameNumbers('joe', {
        start: 3,
        end: 4
      }),
      frameRate: 4,
      repeat: -1
    });

    //jon animations

    this.anims.create({
      key: 'jonleft',
      frames: this.anims.generateFrameNumbers('jon', {
        start: 1,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'jonright',
      frames: this.anims.generateFrameNumbers('jon', {
        start: 3,
        end: 4
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'jonturn',
      frames: this.anims.generateFrameNumbers('jon', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0
    });

    //james animations

    this.anims.create({
      key: 'jamesleft',
      frames: this.anims.generateFrameNumbers('james', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'jamesright',
      frames: this.anims.generateFrameNumbers('james', {
        start: 1,
        end: 1
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'jamesdown',
      frames: this.anims.generateFrameNumbers('james', {
        start: 2,
        end: 2
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'jamesup',
      frames: this.anims.generateFrameNumbers('james', {
        start: 3,
        end: 3
      }),
      frameRate: 1,
      repeat: -1
    });



    //bldne animations

    this.anims.create({
      key: 'blnde_turn',
      frames: this.anims.generateFrameNumbers('blonde', {
        start: 0,
        end: 0
      }),
      frameRate: 2,
      repeat: -1
    });

    //trevor animations

    this.anims.create({
      key: 'trevorleft',
      frames: this.anims.generateFrameNumbers('trevor', {
        start: 0,
        end: 1
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'trevorright',
      frames: this.anims.generateFrameNumbers('trevor', {
        start: 2,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'trevorslap',
      frames: this.anims.generateFrameNumbers('trevor', {
        start: 4,
        end: 5
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'trevor_drink_gatorade',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [8]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'trevor_drink_hamms',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [7]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'trevor_drink_monster',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [6]
      }),
      frameRate: 3,
      repeat: 0
    });

    //player animations
    this.anims.create({
      key: 'ball',
      frames: this.anims.generateFrameNumbers('ball', {
        start: 0,
        end: 10
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'still',
      frames: this.anims.generateFrameNumbers('ball', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'volleyball',
      frames: this.anims.generateFrameNumbers('volleyball', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'volleyballstill',
      frames: this.anims.generateFrameNumbers('volleyball', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'beachball',
      frames: this.anims.generateFrameNumbers('beachball', {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'beachballstill',
      frames: this.anims.generateFrameNumbers('beachball', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'dnc',
      frames: this.anims.generateFrameNumbers('grl_dnc', {
        start: 0,
        end: 5
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'drink_monster',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0,18,18,0,18,18,0,18,18,0]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_hamms',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0,19,19,0,19,19,0,19,19,0]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_gatorade',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0,20,20,0,20,20,0,20,20,0]
      }),
      frameRate: 3,
      repeat: 0
    });



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

    //me boxing animations

    this.anims.create({
      key: 'attack_improved',
      frames: this.anims.generateFrameNumbers('me_boxing', {
        frames: [4, 2, 4, 2, 4, 7]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'attack_improved2',
      frames: this.anims.generateFrameNumbers('me_boxing', {
        frames: [4, 3, 4, 1, 4, 5]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'attack_improved3',
      frames: this.anims.generateFrameNumbers('me_boxing', {
        frames: [4, 0, 4, 6, 4, 8]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'special_combo',
      frames: this.anims.generateFrameNumbers('me_boxing', {
        frames: [4, 2, 4, 0, 4, 1, 4, 3, 4, 5, 4, 8]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'fuck_everybody_up',
      frames: this.anims.generateFrameNumbers('me_boxing', {
        frames: [6, 4, 5, 4, 6, 4, 7, 4, 8, 4, 1, 4]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'smoke',
      frames: this.anims.generateFrameNumbers('smoke', {
        start: 0,
        end: 1
      }),
      frameRate: .8,
      repeat: -1
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
    //keyboard commands
    this.input.keyboard.on("keydown", this.onKeyInput, this);
    //adjusting camera zoom with 1,2,3 buttons
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

    //enabling dev mode
    var keyObjM = this.input.keyboard.addKey('M'); // Get key object
    keyObjM.once('down', function(event) {
      devMode1 = 1
    });
    var keyObjR = this.input.keyboard.addKey('R'); // Get key object
    keyObjR.once('down', function(event) {
      devMode2 = 1
    });
    var keyObjC = this.input.keyboard.addKey('C'); // Get key object
    keyObjC.once('down', function(event) {
      devMode3 = 1
    });

    //collecting items
    var keyObjS = this.input.keyboard.addKey('S'); // Get key object
    keyObjS.on('down', function(event) {
      numberOfItems=0
      for (let i=0; i<Object.keys(usable_items).length;i++){
        numberOfItems+=usable_items[Object.keys(usable_items)[i]]
      }
      console.log(numberOfItems)
      if (playerTexture === 0 && me.body.velocity.x === 0 && me.body.velocity.y === 0 && keysGet > 0 && distance(car, me) < 30) {
        playerTexture = 1;
        speed = 1;
        car.disableBody(true, true);
        me.setTexture('car4', 0);
        me.setScale(1)
        gameState.carSound.play();
        gameState.itemget.play();
        me.setSize(64, 32);
        me.setOffset(0, 0);
        zoom = .75
        if (bennett.following) {
          bennett.disableBody(true, true);
        }
        if (al.following) {
          al.disableBody(true, true);
        }
        if (trevor.following) {
          trevor.disableBody(true, true);
        }
      } else if (distance(phone, me) < 30 && phoneGet === 0) {
        phone.disableBody(true, true);
        items.push("Phone");
        this.message.x=me.x;
        this.message.y=me.y;
        this.scene.scene.events.emit("Message", "You found your phone", me.x, me.y);
        phoneGet = 1;
        gameState.itemget.play();
      } else if (darkWorld === 0 && distance(hausdorf, me) < 30 && worldTheme === 'light') {
        darkWorld = 1;
        worldTheme = 'dark';
        zoom = 1
      } else if (distance(liquor, me) < 40 && liquorGet === 0 && trevor.joinParameter) {
        liquor.disableBody(true, true);
        liquorItem = 5;
        usable_items["Liquor"] = liquorItem;
        liquorGet = 1;
        gameState.itemget.play()
        this.message.x=me.x;
        this.message.y=me.y;
        this.scene.scene.events.emit("Message", "You found some liquor", me.x, me.y);
      } else if (distance(wallet, me) < 30 && walletGet === 0) {
        wallet.disableBody(true, true);
        items.push("Wallet");
        this.message.x=me.x;
        this.message.y=me.y;
        this.scene.scene.events.emit("Message", "You found your wallet", me.x, me.y);
        walletGet = 1;
        moneyPlus = true;
        gameState.itemget.play()
      } else if (distance(keys, me) < 30 && keysGet === 0) {
        this.message.x=me.x;
        this.message.y=me.y;
        this.scene.scene.events.emit("Message", "You found your apartment and car keys", me.x, me.y);
        keys.disableBody(true, true);
        items.push("Keys");
        keysGet = 1;
        gameState.itemget.play()
      } else if (me.x < 45 * 32 && me.x > 15 * 32 && me.y < 45 * 32 && me.y > 15 * 32 && gasStation === 0) {
        scene_number = 3;
        gasStation = 1
      } else if (distance(me, volleyball) < 20) {
        volleyball.body.velocity.x += directionVector(me, volleyball)[0] * 40 * (1 + spriteSpeed(me) / 35);
        volleyball.body.velocity.y += directionVector(me, volleyball)[1] * 40 * (1 + spriteSpeed(me) / 35);
        gameState.ball1.play()
      } else if (distance(me, ball) < 20) {
        ball.body.velocity.x += directionVector(me, ball)[0] * 25 * (1 + spriteSpeed(me) / 40);
        ball.body.velocity.y += directionVector(me, ball)[1] * 25 * (1 + spriteSpeed(me) / 40);
        gameState.ball1.play();
        //problem here if you go in apartment and then go in pool room, you warp to the wrong place when you change scenes
      } else if (myAptDoor === 1 && keysGet === 0) {
        cantGetIn = 1;
        myAptDoor = 0;
      } else if (myAptDoor === 1 && keysGet) {
        me.x = gameState.PlayerSpawnPoint.x;
        me.y = gameState.PlayerSpawnPoint.y;
        myAptDoor = 0;
        goInsideApt = 1;
      } else if (me.x>gameState.clubhouse731TL.x && me.x<gameState.clubhouse731BR.x && me.y>gameState.clubhouse731TL.y && me.y<gameState.clubhouse731BR.y) {
        indoorZone='clubhouse 731'
        this.scene.switch("MyApartment");
        gameState.music.stop()
        console.log('switch scene')
        zoom = 1;
      } else if (me.x>gameState.clubhousewoodsTL.x && me.x<gameState.clubhousewoodsBR.x && me.y>gameState.clubhousewoodsTL.y && me.y<gameState.clubhousewoodsBR.y) {
        indoorZone='clubhouse woods'
        gameState.music.stop()
        this.scene.switch("MyApartment");
        zoom = 1;
      }
    }, this);

    var keyObjD = this.input.keyboard.addKey('D'); // Get key object
    keyObjD.on('down', function(event) {
      if (playerTexture === 1) {
        playerTexture = 0
        car.enableBody(true, me.x, me.y, true, true);
        me.setTexture('me', 0)
        car.angle = me.angle
        gameState.carSound.stop();
        me.angle = 0;
        me.setScale(.16);
        me.body.setSize(70, 90);
        me.body.setOffset(60, 100);
        if (bennett.following) {
          bennett.enableBody(true, me.x + 30, me.y, true, true);
        }
        if (trevor.following) {
          trevor.enableBody(true, me.x, me.y + 60, true, true);
        }
        if (al.following) {
          al.enableBody(true, me.x - 20, me.y - 20, true, true);
        }
      }
    });

    //pause Menu
    var keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    keyObjZ.on('down', function() {
      if (scene_number === 2) {
        scene_number = 1
      }
    });

    //to end the race
    raceFinish = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    raceZoneBR = map.findObject("Objects", obj => obj.name === "abbott bottom right")
    raceFinished = raceFinish.create(raceZoneBR.x - 50, raceZoneBR.y + 100, 20, 400).setOrigin(0, 0);
    //zone for the burcham pool
    enterPoolZones = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    poolZoneEnter1 = enterPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 64, BurchamPoolSpawnPoint.y + 16 + 64, 224 - 128, 288 - 128).setOrigin(0, 0);

    exitPoolZones = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    poolZoneExit1 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 32, BurchamPoolSpawnPoint.y + 16 + 32, 160, 10).setOrigin(0, 0);
    poolZoneExit2 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 32 + 32, BurchamPoolSpawnPoint.y + 16 + 32, 2, 224).setOrigin(0, 0);
    poolZoneExit3 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 32, BurchamPoolSpawnPoint.y + 16 + 224, 160, 2).setOrigin(0, 0);
    poolZoneExit4 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 160 + 12, BurchamPoolSpawnPoint.y + 16 + 32, 2, 224).setOrigin(0, 0);

    exitPoolZones.children.iterate(function(child) {
      child.body.immovable = true;
      child.body.moves = false;
    });
    enterPoolZones.children.iterate(function(child) {
      child.body.immovable = true;
      child.body.moves = false;
    });

    this.physics.add.overlap(enterPoolZones, me, goInPool, false, this);
    this.physics.add.overlap(exitPoolZones, me, exitPool, false, this);
    this.physics.add.overlap(enterPoolZones, beachball, ballGoInPool, false, this);
    this.physics.add.overlap(exitPoolZones, beachball, ballExitPool, false, this);
    this.physics.add.overlap(raceFinish, me, meWinRace, false, this);
    this.physics.add.overlap(raceFinish, bennett, bennettWinRace, false, this);

    this.physics.add.collider(trevor, enterPoolZones);
    this.physics.add.collider(al, enterPoolZones);
    this.physics.add.collider(bennett, enterPoolZones);
    this.physics.add.collider(trevor, beachball);
    this.physics.add.collider(al, beachball);
    this.physics.add.collider(bennett, beachball);
    //door zone for my apartment
    doorZone = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    doorZone.create(gameState.PlayerSpawnPoint.x - 15 - 32, gameState.PlayerSpawnPoint.y - 40 - 32, 30, 40)
    this.physics.add.overlap(doorZone, me, goInDoor, false, this);

    //goalzone
    goalZone = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    goalZone.create(net4.x, net4.y + 10, 88, 10)
    this.physics.add.overlap(volleyball, goalZone, scoreGoal, false, this);
    //battlescene zones
    spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    for (var i = 0; i < 1800; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(me, spawns, onMeetEnemy1, false, this);
    this.physics.add.overlap(me, chasersGroup, onMeetEnemy2, false, this);

    //location zone points
    gameState.clubhouse731TL = map.findObject("Objects", obj => obj.name === "731 clubhouse entrance top left")
    gameState.clubhouse731BR = map.findObject("Objects", obj => obj.name === "731 clubhouse entrance bottom right")
    gameState.clubhousewoodsTL = map.findObject("Objects", obj => obj.name === "burcham woods clubhouse entrance top left")
    gameState.clubhousewoodsBR = map.findObject("Objects", obj => obj.name === "burcham woods clubhouse entrance bottom right")
    gameState.burcham731TL = map.findObject("Objects", obj => obj.name === "731 burcham top left")
    gameState.burcham731BR = map.findObject("Objects", obj => obj.name === "731 burcham bottom right")
    gameState.burcham711TL = map.findObject("Objects", obj => obj.name === "711 burcham top left")
    gameState.burcham711BR = map.findObject("Objects", obj => obj.name === "711 burcham bottom right")
    gameState.burchamwoodsTL = map.findObject("Objects", obj => obj.name === "burcham woods top left")
    gameState.burchamwoodsBR = map.findObject("Objects", obj => obj.name === "burcham woods bottom right")
    gameState.burcham787TL = map.findObject("Objects", obj => obj.name === "787 burcham top left")
    gameState.burcham787BR = map.findObject("Objects", obj => obj.name === "787 burcham bottom right")
    gameState.highschoolTL = map.findObject("Objects", obj => obj.name === "east lansing high school top left")
    gameState.highschoolBR = map.findObject("Objects", obj => obj.name === "east lansing high school bottom right")
    gameState.westburchamroadTL = map.findObject("Objects", obj => obj.name === "west burcham road top left")
    gameState.westburchamroadBR = map.findObject("Objects", obj => obj.name === "west burcham road bottom right")
    gameState.eastburchamroadTL = map.findObject("Objects", obj => obj.name === "east burcham road top left")
    gameState.eastburchamroadBR = map.findObject("Objects", obj => obj.name === "east burcham road bottom right")
    gameState.churchTL = map.findObject("Objects", obj => obj.name === "st thomas aquinas school top left")
    gameState.churchBR = map.findObject("Objects", obj => obj.name === "st thomas aquinas school bottom right")
    gameState.abbottTL = map.findObject("Objects", obj => obj.name === "abbott top left")
    gameState.abbottBR = map.findObject("Objects", obj => obj.name === "abbott bottom right")
    gameState.altonTL = map.findObject("Objects", obj => obj.name === "alton top left")
    gameState.altonBR = map.findObject("Objects", obj => obj.name === "alton bottom right")
    gameState.saginawTL = map.findObject("Objects", obj => obj.name === "saginaw top left")
    gameState.saginawBR = map.findObject("Objects", obj => obj.name === "saginaw bottom right")
    gameState.macTL = map.findObject("Objects", obj => obj.name === "mac top left")
    gameState.macBR = map.findObject("Objects", obj => obj.name === "mac bottom right")
    gameState.divisionTL = map.findObject("Objects", obj => obj.name === "division top left")
    gameState.divisionBR = map.findObject("Objects", obj => obj.name === "division bottom right")
    gameState.woodsTL = map.findObject("Objects", obj => obj.name === "woods top left")
    gameState.woodsBR = map.findObject("Objects", obj => obj.name === "woods bottom right")
    gameState.marathonTL = map.findObject("Objects", obj => obj.name === "marathon top left")
    gameState.marathonBR = map.findObject("Objects", obj => obj.name === "marathon bottom right")
    gameState.poolTL = map.findObject("Objects", obj => obj.name === "pool top left")
    gameState.poolBR = map.findObject("Objects", obj => obj.name === "pool bottom right")
    gameState.volleyballTL = map.findObject("Objects", obj => obj.name === "volleyball top left")
    gameState.volleyballBR = map.findObject("Objects", obj => obj.name === "volleyball bottom right")
    this.scene.launch('Navigator');
    //end of create
    this.sys.events.on('wake', this.wake, this);
    //do this so that if you die without saving and press load game, you don't have 0 health.
    if (saveFileExists === false) {
      saveGame();
    }
    this.message = new OnScreenMessage(this, this.events, me.x, me.y);
    this.add.existing(this.message);
  },

  update: function() {
    //new skill dialogue
    if (skillDialogue["Mac"][3]){
      skillDialogue["Mac"][3]=false;
      initializePage(this);
      let firstPage = fetchPage(1900);
      displayPage(this, firstPage);
    }
    //camera shaking from dialogue
    if (shakeTheWorld){
      shakeTheWorld=false
      this.cameras.main.shake(2000);
    }
    //car crash
    if (playerTexture === 1&& !me.body.blocked.none && speed>=3) {
      pause=true
      speed=1
      playerTexture = 0
      car.enableBody(true, me.x, me.y, true, true);
      me.setTexture('me', 0)
      car.angle = 0
      gameState.carSound.stop();
      me.angle = 0;
      me.setScale(.16);
      me.body.setSize(70, 90);
      me.body.setOffset(60, 100);
      hpObject["Mac"]=1
      if (bennett.following) {
        bennett.enableBody(true, me.x + 30, me.y, true, true);
        hpObject["Bennett"]=1
      }
      if (trevor.following) {
        trevor.enableBody(true, me.x, me.y + 60, true, true);
        hpObject["Jimmy"]=1
      }
      if (al.following) {
        al.enableBody(true, me.x - 20, me.y - 20, true, true);
        hpObject["Al"]=1
      }
      car.anims.play('carexplosion', false);
      this.cameras.main.shake(2200);
      window.setTimeout(() => {
        car.disableBody(true, true);
        carCrashDialogue=true;
      }, 2200);
      gameState.carCrash.play();
    }
    if (carCrashDialogue){
      carCrashDialogue=false;
      initializePage(this);
      let firstPage = fetchPage(1800);
      displayPage(this, firstPage);
    }
    //followers leave if you get too far away (with some code to keep them from leaving if you're in the car.)
    if (distance(me, trevor) > 1200 && playerTexture === 0) {
      trevor.following = false;
    }
    if (distance(me, al) > 1200 && playerTexture === 0) {
      al.following = false;
    }
    if (distance(me, bennett) > 1200 && playerTexture === 0) {
      bennett.following = false;
    }
    //ai for race with bennett
    if (raceBegin) {
      zoom = .75
      raceBegin = false;
      raceOngoing = true
      me.x = gameState.westburchamroadBR.x - 260
      me.y = map.findObject("Objects", obj => obj.name === "bennett spawn point").y + 80
      bennett.x = gameState.westburchamroadBR.x - 260
      bennett.y = map.findObject("Objects", obj => obj.name === "bennett spawn point").y
      playerTexture = 'race'
      if (al.following) {
        al.x = gameState.westburchamroadBR.x + 50
        al.y = map.findObject("Objects", obj => obj.name === "bennett spawn point").y
      }
      if (trevor.following) {
        trevor.x = gameState.westburchamroadBR.x + 50
        trevor.y = map.findObject("Objects", obj => obj.name === "bennett spawn point").y + 60
      }
    }
    if (winRace === 1 && raceOngoing) {
      this.cameras.main.fade(1000);
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      bennett.x = me.x + 200;
      raceOngoing = false;
      winRace = 0
      initializePage(this);
      let firstPage = fetchPage(1700);
      displayPage(this, firstPage);
    } else if (winRace === 2 && raceOngoing) {
      this.cameras.main.fade(1000);
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      me.x = bennett.x
      raceOngoing = false;
      winRace = 0
      initializePage(this);
      let firstPage = fetchPage(1701);
      displayPage(this, firstPage);
    }
    if (wonRace === 1) {
      wonRace = 0
      playerTexture = 0
      initializePage(this);
      let firstPage = fetchPage(37);
      displayPage(this, firstPage);
    } else if (wonRace === 2) {
      wonRace = 0
      playerTexture = 0
    }
    //this is supposed to change to random woods theme when in woods, but not sure how to initiate something only once on zone change... fix needed...
    if (changeThemeSong && overworldSong === 'woods') {
      changeThemeSong = false;
      gameState.music.stop()
      gameState.marioWoods.stop()
      gameState.linkWoods.stop()
      gameState.trevorWoods.stop()
      let mscRnd = Math.floor(Math.random() * 3)
      if (mscRnd === 0) {
        gameState.marioWoods.play()
      } else if (mscRnd===1){
        gameState.linkWoods.play();
      } else if (mscRnd===2){
        gameState.trevorWoods.play();
      }
    } else if (changeThemeSong && overworldSong === 'theme') {
      changeThemeSong = false;
      gameState.marioWoods.stop();
      gameState.linkWoods.stop();
      gameState.trevorWoods.stop();
      gameState.music.stop();
      gameState.music.play();
    }
    //location settings for pool and volleyball court
    if (me.x > gameState.poolTL.x && me.y > gameState.poolTL.y && me.x < gameState.poolBR.x && me.y < gameState.poolBR.y) {
      nearPool=true
    } else {nearPool=false}
    if (me.x > gameState.volleyballTL.x && me.y > gameState.volleyballTL.y && me.x < gameState.volleyballBR.x && me.y < gameState.volleyballBR.y) {
      nearVolleyballCourt=true
    } else {nearVolleyballCourt=false}
    //setting location text, battle background and theme song based on location
    if (me.x > gameState.burcham731TL.x && me.y > gameState.burcham731TL.y && me.x < gameState.burcham731BR.x && me.y < gameState.burcham731BR.y) {
      gameStateNav.location.setText("731 Burcham Apartments\nEast Lansing, Mi");
      if (nearPool){
        battleBackgroundIndex=11
      }
      else if (nearVolleyballCourt){
        battleBackgroundIndex=12
      }
      else {
        battleBackgroundIndex=0
      }
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.burcham711TL.x && me.y > gameState.burcham711TL.y && me.x < gameState.burcham711BR.x && me.y < gameState.burcham711BR.y) {
      gameStateNav.location.setText("711 Burcham Apartments\nEast Lansing, Mi");
      battleBackgroundIndex=13
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.burcham787TL.x && me.y > gameState.burcham787TL.y && me.x < gameState.burcham787BR.x && me.y < gameState.burcham787BR.y) {
      gameStateNav.location.setText("Burcham Place Apartments\nEast Lansing, Mi");
      battleBackgroundIndex=15
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.burchamwoodsTL.x && me.y > gameState.burchamwoodsTL.y && me.x < gameState.burchamwoodsBR.x && me.y < gameState.burchamwoodsBR.y) {
      gameStateNav.location.setText("Burcham Woods\nEast Lansing, Mi");
      battleBackgroundIndex=14
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.highschoolTL.x && me.y > gameState.highschoolTL.y && me.x < gameState.highschoolBR.x && me.y < gameState.highschoolBR.y) {
      gameStateNav.location.setText("East Lansing High School\nEast Lansing, Mi");
      battleBackgroundIndex=9
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.churchTL.x && me.y > gameState.churchTL.y && me.x < gameState.churchBR.x && me.y < gameState.churchBR.y) {
      gameStateNav.location.setText("St. Thomas Aquinas School\nEast Lansing, Mi");
      battleBackgroundIndex=4
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.westburchamroadTL.x && me.y > gameState.westburchamroadTL.y && me.x < gameState.westburchamroadBR.x && me.y < gameState.westburchamroadBR.y) {
      gameStateNav.location.setText("Burcham Road\nEast Lansing, Mi");
      battleBackgroundIndex=8
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.eastburchamroadTL.x && me.y > gameState.eastburchamroadTL.y && me.x < gameState.eastburchamroadBR.x && me.y < gameState.eastburchamroadBR.y) {
      gameStateNav.location.setText("Burcham Road\nEast Lansing, Mi");
      battleBackgroundIndex=5
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.abbottTL.x && me.y > gameState.abbottTL.y && me.x < gameState.abbottBR.x && me.y < gameState.abbottBR.y) {
      gameStateNav.location.setText("Abbott Road\nEast Lansing, Mi");
      battleBackgroundIndex=3
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.saginawTL.x && me.y > gameState.saginawTL.y && me.x < gameState.saginawBR.x && me.y < gameState.saginawBR.y) {
      gameStateNav.location.setText("E Saginaw Road\nEast Lansing, Mi");
      battleBackgroundIndex=1
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.altonTL.x && me.y > gameState.altonTL.y && me.x < gameState.altonBR.x && me.y < gameState.altonBR.y) {
      gameStateNav.location.setText("Alton Road\nEast Lansing, Mi");
      battleBackgroundIndex=4
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.macTL.x && me.y > gameState.macTL.y && me.x < gameState.macBR.x && me.y < gameState.macBR.y) {
      gameStateNav.location.setText("M.A.C Avenue\nEast Lansing, Mi");
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.divisionTL.x && me.y > gameState.divisionTL.y && me.x < gameState.divisionBR.x && me.y < gameState.divisionBR.y) {
      gameStateNav.location.setText("Division Street\nEast Lansing, Mi");
      if (overworldSong !== 'theme') {
        changeThemeSong = true;
        overworldSong = 'theme';
      }
    } else if (me.x > gameState.woodsTL.x && me.y > gameState.woodsTL.y && me.x < gameState.woodsBR.x && me.y < gameState.woodsBR.y) {
      gameStateNav.location.setText("Woods behind Burcham\nEast Lansing, Mi")
      battleBackgroundIndex=10
      if (overworldSong !== 'woods') {
        overworldSong = 'woods';
        changeThemeSong = true;
      }
    } else if (me.x > gameState.marathonTL.x && me.y > gameState.marathonTL.y && me.x < gameState.marathonBR.x && me.y < gameState.marathonBR.y) {
      gameStateNav.location.setText("Marathon Gas Station\nEast Lansing, Mi")
      battleBackgroundIndex=2
      if (overworldSong !== 'theme') {
        overworldSong = 'theme';
        changeThemeSong = true;
      }
    } else {
      gameStateNav.location.setText("               ???")
      battleBackgroundIndex=7
    }
    // so that it only says jimmy joins party once
    if (jimmyJoinParam && neverBeenPro) {
      neverBeenPro = false
      jimmyJoinParam = false;
      initializePage(this);
      let firstPage = fetchPage(23);
      displayPage(this, firstPage);
    }
    //ai for poolchairs
    poolchairs.children.iterate(function(child) {
      child.body.velocity.x = 0
      child.body.velocity.x = 0
    });

    //swim noise and swimming animation breaks and swimming size and offset
    if (ballInPool) {
      beachball.body.velocity.x /= 1.1;
      beachball.body.velocity.y /= 1.1;
    }
    if (inPool && swimNoisePlaying === false) {
      gameState.swimNoise.play()
      swimNoisePlaying = true
      me.body.setSize(70, 70);
      me.body.setOffset(60, 0);
    } else if (inPool === false) {
      gameState.swimNoise.stop()
      swimNoisePlaying = false
      me.body.setSize(70, 90);
      me.body.setOffset(60, 100);
    }

    //to restart the scene
    if (restart) {
      restart = false;
      gameState.music.stop();
      this.scene.restart()
    }
    //cant get inside apartment
    if (cantGetIn === 1) {
      cantGetIn = 0
      initializePage(this)
      let firstPage = fetchPage(1400)
      displayPage(this, firstPage)
    }
    //go inside apartment
    if (goInsideApt === 1) {
      goInsideApt = 0;
      this.scene.switch("MyApartment");
    }
    //increase athletics
    if (spriteSpeed(me) > 20 && scene_number === 2) {
      athletics += .00001
    }
    //fail to buy weed
    if (buyFailed === 1) {
      initializePage(this)
      let firstPage = fetchPage(85)
      displayPage(this, firstPage)
      buyFailed = 0
    }
    // boss battle
    if (bossType === 'dio' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    } else if (bossType === 'fratboy2prime' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    } else if (bossType === 'darkboy' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    } else if (bossType === 'frank' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    }
    //enable dev mode
    if (devMode1 + devMode2 + devMode3 >= 3) {
      devMode1 = 0
      devMode2 = 0
      devMode3 = 0
      gas = 4;
      keysGet = 1;
      keyboardGet=true;
      trevor.joinParameter = true;
      al.joinParameter = true;
      bennett.joinParameter = true;
      potentialParty["Jimmy"] = true;
      potentialParty["Al"] = true
      potentialParty["Bennett"] = true
      brothersSeal = 1;
      money += 10;
      hamms += 1;
      monster += 1;
      maxice+=1;
      andycapps+=1;
      gatorade += 1;
      larrySpecial += 1;
      usable_items["Hamms"] += 1;
      usable_items["Monster"] += 1;
      usable_items["Gatorade"] += 1;
      if (usable_items["Larry Special"]){
        usable_items["Larry Special"] += 1;
      } else {
        usable_items["Larry Special"] = 1;
      }
      if (usable_items["Andy Capp's Hot Fries"]){
        usable_items["Andy Capp's Hot Fries"] += 1;
      } else {
        usable_items["Andy Capp's Hot Fries"] = 1;
      }
      if (usable_items["Labatt Max Ice"]){
        usable_items["Labatt Max Ice"] += 1;
      } else {
        usable_items["Labatt Max Ice"] = 1;
      }
      gameState.secret.play()
      for (itemz of ["SP Booster", "HP Booster", "Camo Pants", "Camo Hoody", "Damage Booster", "Fubu Shirt", "Jorts", "Wife Beater", "Sprinting Shoes"]) {
        equipment.push(itemz)
      }
      //good stuff
      for (itemz of ["Brothers Seal"]) {
        items.push(itemz)
      }
    }
    //hausdorf change to quil
    if (distance(me, hausdorf) < 120) {
      if (distance(me, hausdorf) < 60) {
        hausdorf.setTexture('quil', 0)
        hausdorf.setScale(.06)
      } else {
        hausdorf.setTexture('hausdorf', 0)
        hausdorf.setScale(.4)
      }
    }

    //change to homeboy game
    if (adventure === 1) {
      this.cameras.main.fade(1000);
      adventure = 2
    } else if (adventure === 2) {
      adventure = 0
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      this.scene.switch("HomeboyGame")
      gameState.music.stop()
    }

    //change to dark world
    if (darkWorld === 1) {
      this.cameras.main.fade(1000);
      gameState.secret.play()
      this.cameras.main.shake(1000);
      darkWorld = 2
    } else if (darkWorld === 2) {
      gameState.music.stop();
      darkWorld = 0
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      this.scene.switch("DarkWorld")
    }

    //gameover and new game
    if (newGame === true && gameOver === false) {
      initializePage(this)
      let firstPage = fetchPage(1)
      displayPage(this, firstPage)
      newGame = false;
    } else if (newGame === false && gameOver === true) {
      initializePage(this)
      let page = fetchPage(300)
      displayPage(this, page)
      gameOver = false
    }

    //for level dialogue (problem with jimmy and al receiving level up at the same time... fix needed)
    //only allows level up to level 30... may need to fix structure to allow arbitrarily high
    if (checkLevelDialogue === 1) {
      zoom = 2
      for (let i = 1; i < 30; i++) {
        if (expObject['Mac'] >= 100 * 3 ** (i - 1) && levelObject['Mac'] === i) {
          levelObject['Mac'] += 1;
          initializePage(this)
          let page = {
            character: 'me',
            page: 500,
            narrative: `Damnnnn, Mac has progressed to level ${levelObject['Mac']}. Mac's HP has increased by 15, SP has increased by 5, and damage has increased by 5.`,
            options: [{
              option: 'tight',
              nextPage: 600,
            }, ]
          }
          displayPage(this, page)
          maxHPObject['Mac'] += 15;
          damageObject['Mac'] += 5;
          maxSPObject['Mac'] += 5;
          hpObject['Mac'] = maxHPObject['Mac'];
          spObject['Mac'] = maxSPObject['Mac']
        } else if (expObject['Al'] >= 100 * 3 ** (i - 1) && levelObject['Al'] === i) {
          levelObject['Al'] += 1;
          initializePage(this)
          let page = {
            character: 'me',
            page: 501,
            narrative: `Good shit man, Al has progressed to level ${levelObject['Al']}. Al's HP has increased by 15, SP has increased by 5, and damage has increased by 5.`,
            options: [{
              option: 'tight',
              nextPage: 601,
            }, ]
          }
          displayPage(this, page)
          maxHPObject['Al'] += 15;
          damageObject['Al'] += 5;
          maxSPObject['Mac'] += 5
          hpObject['Al'] = maxHPObject['Al'];
          spObject['Al'] = maxSPObject['Al']
        } else if (expObject['Jimmy'] >= 100 * 3 ** (i - 1) && levelObject['Jimmy'] === i) {
          levelObject['Jimmy'] += 1;
          initializePage(this)
          let page = {
            character: 'me',
            page: 502,
            narrative: `Good shit man, Jimmy has progressed to level ${levelObject['Jimmy']}. Jimmy's HP has increased by 15, SP has increased by 5, and damage has increased by 5. You may choose between getting about tree fiddy, increasing HP by another 3, or increasing damage by another 1.`,
            options: [{
              option: 'sweet',
              nextPage: 602,
            }, ]
          }
          displayPage(this, page)
          maxHPObject['Jimmy'] += 15;
          maxSPObject['Jimmy'] += 5;
          damageObject['Jimmy'] += 5
          hpObject['Jimmy'] = maxHPObject['Jimmy'];
          spObject['Jimmy'] = maxSPObject['Jimmy']
        }
      }
      checkLevelDialogue = 0
    }

    //for experience dialogue
    if (wonBattle === 1) {
      initializePage(this)
      let page = {
        character: 'me',
        page: 400,
        narrative: `Check it out, you got ${exp} experience points and ${reward} dollars.`,
        options: [{
          option: 'tight',
          nextPage: 401,
        }, ]
      }
      if (itemReward.length > 0) {
        page.narrative += ` They also dropped ${itemReward}.`
      }
      displayPage(this, page)
      wonBattle = 0;
      exp = 0;
      reward = 0;
      itemReward = '';
    }

    //getting money
    if (moneyPlus) {
      getTreeFitty();
      moneyPlus = false;
    }

    //camera and cursors
    this.cameras.main.zoom = zoom;
    this.cursors = this.input.keyboard.createCursorKeys();

    //so car doesn't roll away
    car.body.velocity.x = 0;
    car.body.velocity.y = 0;

    //pondering and highness
    if (highness.toFixed(2) == 2 && highnessDialogue == 1) {
      initializePage(this)
      let page = fetchPage(140)
      displayPage(this, page)
      highness = 1
    } else if (highness.toFixed(2) == 2.01 && highnessDialogue == 3) {
      initializePage(this)
      let page = fetchPage(141)
      displayPage(this, page)
      highness = 1
    } else if (highness.toFixed(2) == 2.01 && highnessDialogue == 5) {
      initializePage(this)
      let page = fetchPage(144)
      displayPage(this, page)
      highness = 1
    } else if (highness.toFixed(2) == 2.01 && highnessDialogue == 7) {
      initializePage(this)
      let page = fetchPage(147)
      displayPage(this, page)
      highness = 1
    }

    //ai for chasers
    chasersGroup.children.iterate(function(child) {
      if (chasersEnabled) {
        let rr = Math.random() * 6 - 3
        if (distance(child, me) < 300) {
          chase(child, me, 4.5 + rr) //use 3 for laptop and 4.5 for desktop (I think because my macbook has faster refresh rate)
        }
      }
    });

    for (let i = 0; i < enemsForChasers.length; i++) {
      if (chasers[i].body.velocity.x > 5) {
        chasers[i].anims.play(enemsForChasers[i][1], true)
      } else if (chasers[i].body.velocity.x < 5) {
        chasers[i].anims.play(enemsForChasers[i][2], true)
      }
    }

    //ai for fratboy2prime
    if (distance(fratboy2prime, me) < 300 && worldTheme === 'light') {
      fratboy2prime.anims.play('fratboy2primestab', true)
    }
    if (distance(fratboy2prime, me) < 30 && fratboy2primedialogue === 0 && worldTheme === 'light') {
      fratboy2primedialogue = 1
      initializePage(this)
      let page = fetchPage(900)
      displayPage(this, page)
    }

    //ai for girls
    time += 1;
    if (time % 35 === 0 && !(time % 70 === 0)) {
      grls.children.iterate(function(child) {
        if (child !== blonde) {
          child.flipX = true;
        }
      });
    } else if (time % 70 === 0) {
      grls.children.iterate(function(child) {
        child.flipX = false;
      });
    }

    if (ergh === 1) {
      gameState.erggh.play();
      ergh = 0
    } else if (blocked === 1) {
      gameState.block.play();
      blocked = 0
    }

    //dialogue for girl1
    if (distance(me, girl1) < 20 && distance(girl1, volleyball) < 100 && girl1VolleyballDialogue === 0 && trevor.joinParameter) {
      gameState.ooo.play()
      initializePage(this)
      let firstPage = fetchPage(121)
      displayPage(this, firstPage)
      girl1VolleyballDialogue = 1
    }
    //dialogue for girl4 (colleen)
    else if (distance(me, girl4) < 20 && girl4FirstDialogue === 0 && trevor.joinParameter && !items.includes("Gram of Coke")) {
      gameState.wutt.play()
      initializePage(this)
      let firstPage = fetchPage(130)
      displayPage(this, firstPage)
      girl4FirstDialogue = 1
    } else if (distance(me, girl4) < 20 && girl4FirstDialogue === 2 && trevor.joinParameter) {
      gameState.wutt.play()
      initializePage(this)
      let firstPage = fetchPage(136)
      displayPage(this, firstPage)
      girl4FirstDialogue = 4
    } else if (distance(me, girl4) > 400 && girl4FirstDialogue === 1 && trevor.joinParameter) {
      girl4FirstDialogue = 0
    } else if (distance(me, girl4) > 400 && girl4FirstDialogue === 4 && trevor.joinParameter) {
      girl4FirstDialogue = 2
    }
    //dialogue for girl3
    else if (distance(me, girl3) < 20 && girl3FirstDialogue === 0 && distance(girl3, volleyball) > 300 && trevor.joinParameter) {
      gameState.hello.play()
      initializePage(this)
      let firstPage = fetchPage(120)
      displayPage(this, firstPage)
      girl3FirstDialogue = 1
    }
    //dialogue for girl2
    else if (distance(me, girl2) < 20 && girl2FirstDialogue === 0 && trevor.joinParameter) {
      gameState.heyy.play()
      initializePage(this)
      let firstPage = fetchPage(98)
      displayPage(this, firstPage)
      girl2FirstDialogue = 1
    } else if (distance(me, girl2) > 700 && girl2FirstDialogue === 1 && trevor.joinParameter) {
      girl2FirstDialogue = 0
    } else if (distance(me, girl1) < 20 && girl2FirstDialogue === 1 && items.includes('Marlboro lights') && trevor.joinParameter) {
      //hamms -= 2
      initializePage(this)
      let firstPage = fetchPage(110)
      displayPage(this, firstPage)
      girl2FirstDialogue = 2
    }
    //dialogue for pool party
    else if (firstPoolParty === 0 && distance(joe, girl1) < 800 && distance(jon, girl1) < 800 && distance(trevor, girl1) < 800 && distance(james, girl1) < 800) {
      initializePage(this)
      let page = fetchPage(60)
      displayPage(this, page)
      firstPoolParty = 1
    }

    //highness effects
    if (highness > 1) {
      this.cameras.main.shake(18);
    }
    highness -= .001
    if (highness < 1) {
      highness = 1
    }

    //pool grls only appear if you have gone pro (means we are disabling once per frame... must be a more efficient way... fix needed...)
    if (trevor.joinParameter === false) {
      girl1.disableBody(true, true)
      girl2.disableBody(true, true)
      girl3.disableBody(true, true)
      girl4.disableBody(true, true)
      liquor.disableBody(true, true)
      adeline.disableBody(true, true)
      dancingGirl.disableBody(true, true)
    } else if (trevor.joinParameter) {
      girl1.enableBody(true, gameState.Girl1SpawnPoint.x, gameState.Girl1SpawnPoint.y, true, true);
      girl3.enableBody(true, gameState.Girl3SpawnPoint.x + 4, gameState.Girl3SpawnPoint.y, true, true);
      girl4.enableBody(true, gameState.Girl4SpawnPoint.x + 7, gameState.Girl4SpawnPoint.y, true, true);
      girl2.enableBody(true, gameState.Girl2SpawnPoint.x - 5, gameState.Girl2SpawnPoint.y, true, true);
      if (liquorGet === 0) {
        liquor.enableBody(true, liquor.x, liquor.y, true, true);
      }
      adeline.enableBody(true, adeline.x, adeline.y, true, true);
      yogagirl.disableBody(true, true);
      yogagirl.enableBody(true, adeline.x - 3 * 32, adeline.y - 19 * 32, true, true);
      yogamat.x = yogagirl.x;
      yogamat.y = yogagirl.y + 20;
      dancingGirl.enableBody(true, dancingGirl.x, dancingGirl.y, true, true);
    }

    //dialogue for getting car first time
    if (playerTexture === 1 && firstTimeCarGet === 0) {
      initializePage(this)
      let page = fetchPage(7)
      displayPage(this, page)
      firstTimeCarGet = 1
    }

    //dialogue for finding phone and wallet
    if (phoneGet + walletGet === 2 && keysGet === 0) {
      phoneGet += 1;
      walletGet += 1;
      window.setTimeout(() => {
        initializePage(this)
        let page = fetchPage(5)
        displayPage(this, page)
      }, 3000);
    }

    //dialogue for finding Keys
    if (phoneGet + walletGet + keysGet === 5) {
      keysGet += 1;
      window.setTimeout(() => {
        initializePage(this)
        let page = fetchPage(6)
        displayPage(this, page)
      }, 3000);
    }

    //we resume every frame... must be more efficient way... fix needed...
    if (pause) {
      this.physics.pause();
      trevor.body.velocity.x = 0;
      trevor.body.velocity.y = 0;
      keepaway -= 1
    } else {
      this.physics.resume()
    }

    if (scene_number === 1 && launchParameter===false) {
      pause = true;
      this.scene.launch('PauseMenu');
      launchParameter=true
    } else if (scene_number === 3 && launchParameter===false) {
      pause = true;
      this.scene.launch('GasStation');
      launchParameter=true
    }
    // this next part is only here so that numbers in the character menu update every frame... maybe this is causing some issues with speed? (fix needed...)
    /*
    else if (scene_number === 7) {
      pause = true;
      this.scene.launch('ItemsMenu');
    }
    */

    //out of gas text
    if (gas === 0 && gasAlert === 0) {
      gasAlert = 1;
      gasAlertText = this.add.text(me.x - 100, me.y - 300, 'You ran out of gas', {
        fontSize: '50px',
        fill: '#fff'
      });
      window.setTimeout(() => {
        gasAlertText.setText('')
      }, 3000);
    }
    if (gas > 0 && gasAlert === 1) {
      gasAlert = 0
    }

    //ai for james
    if (distance(james, me) < 1000) {
      if (distance(james, me) < 600 && distance(james, me) > 100) {
        james.chase(me, 1)
      }
      if (distance(james, ball) < 200) {
        james.chase(ball, 3)
      }
      if (distance(james, volleyball) < 200) {
        james.chase(volleyball, 2)
      }
      james.animate(40);
      james.getUnstuck();
      james.randomWalk(3)

      if (distance(me, james) < 30 && jamesFirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(40)
        displayPage(this, page)
        jamesFirstTalk = 1
      }
    }

    //ai for joe
    if (distance(joe, me) < 1000) {
      if (distance(joe, me) < 200 && distance(joe, me) > 50) {
        joe.chase(me, .5)
      }
      if (distance(joe, ball) < 300) {
        joe.chase(ball, 2)
      }
      if (distance(joe, volleyball) < 300) {
        joe.chase(volleyball, 3)
      }
      joe.animate();
      joe.getUnstuck();
      joe.randomWalk()

      if (distance(me, joe) < 30 && joeFirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(50)
        displayPage(this, page)
        joeFirstTalk = 1
      }
    }

    //ai for bennett
    bennett.animate()
    bennett.follow(me, 1.4)
    if (bennett.following === false) {
      if (distance(bennett, me) < 150 && distance(bennett, me) > 50) {
        bennett.chase(me, .5)
      }
      if (distance(bennett, ball) < 100) {
        bennett.chase(ball, 3)
      }
      if (distance(bennett, volleyball) < 100) {
        bennett.chase(volleyball, 5)
      }
      if (bennett.y <= 290 && bennett.y >= 256 && bennett.x >= 96 && bennett.x <= 14528) {
        //bennett.y+=100;
        bennett.body.velocity.x = 250;
        bennett.body.velocity.y = 0;
      } else if (bennett.y <= 10304 && bennett.y >= 10272 && bennett.x >= 160 && bennett.x <= 14528) {
        //bennett.y+=100;
        bennett.body.velocity.x = -250;
        bennett.body.velocity.y = 0;
      } else if (bennett.x >= 96 && bennett.x <= 160 && bennett.y >= 256 && bennett.y <= 10304) {
        //bennett.x+=100;
        bennett.body.velocity.x = 0;
        bennett.body.velocity.y = -250;
      } else if (bennett.x >= 14528 && bennett.x <= 14592 && bennett.y >= 256 && bennett.y <= 10240) {
        //bennett.x-=100;
        bennett.body.velocity.x = 0;
        bennett.body.velocity.y = 250;
      } else {
        bennett.body.velocity.x += Phaser.Math.FloatBetween(-50, 50);
        bennett.body.velocity.y += Phaser.Math.FloatBetween(-50, 50);
      }
      if (distance(me, bennett) < 600 && distance(me, bennett) > 580) {
        gameState.bennettSound.play()
      } else if (distance(me, bennett) > 600) {
        gameState.bennettSound.stop()
      }
      if (distance(me, bennett) < 30 && bennettFirstTalk === 0 && playerTexture === 0) {
        initializePage(this)
        let page = fetchPage(90)
        displayPage(this, page)
        bennettFirstTalk = 1
        gameState.arnold_bennett.play()
      }
      else if (distance(me,bennett) > 100){
        bennettFirstTalk=0
      }
    }
      //for bennett to join the party
    if (bennettGet===1){
      bennettGet=2
      bennett.joinParameter=true;
      potentialParty["Bennett"]=true
    }


    //ai for al
    al.follow(me, 1.2);
    if (distance(al, me) < 1000) {
      al.getUnstuck();
      al.randomWalk();
      al.animate()
      if (holdon === 1) {
        al.sound0.play();
        holdon = 0
      } else if (beatbox === 1) {
        gameState.beatbox.play();
        beatbox = 0
      } else if (gunTalk === 1) {
        initializePage(this)
        let page = fetchPage(35)
        displayPage(this, page)
        const index = items.indexOf('Weed (2g)');
        if (index > -1) {
          items.splice(index, 1);
        }
        hamms -= 4
        gunTalk = 0
      } else if (distance(me, al) < 30 && alFirstTalk === 0 && al.joinParameter === false) {
        gameState.alSound.play()
        initializePage(this)
        let page = fetchPage(30)
        displayPage(this, page)
        alFirstTalk = 1
      } else if (distance(me, al) > 300 && alFirstTalk === 1) {
        alFirstTalk = 0
      }
    }

    if (alGet===1){
      alGet=2;
      al.joinParameter=true;
      potentialParty["Al"]=true;
    }

    //ai for og homeboy
    if (distance(oghomeboy, me) < 1000) {
      oghomeboy.anims.play('smoke', true);
      if (distance(me, oghomeboy) < 30 && ogFirstTalk === 0) {
        ogFirstTalk = 1
        initializePage(this)
        let page = fetchPage(80)
        displayPage(this, page)
      } else if (distance(me, oghomeboy) > 200) {
        ogFirstTalk = 0
      }
    }

    //ai for stripper
    if (distance(stripper, me) < 1000) {
      //stripper.getUnstuck()
      //seemed to just be getting her stuck strangely enough...
      stripper.randomWalk()
      stripper.animate(6)
      if (stripper.body.velocity.x > 3) {
        stripper.flipX = true;
      } else if (stripper.body.velocity.x < -3) {
        stripper.flipX = false;
      }
      if (distance(me, stripper) < 30 && stripperFirstTalk === 0 && !items.includes("Gram of Coke")) {
        stripperFirstTalk = 1
        initializePage(this)
        let page = fetchPage(1600)
        displayPage(this, page)
      } else if (distance(me, stripper) < 30 && stripperFirstTalk === 0 && items.includes("Gram of Coke")) {
        stripperFirstTalk = 2
        initializePage(this)
        let page = fetchPage(1602)
        displayPage(this, page)
      } else if (distance(me, stripper) > 200 && stripperFirstTalk === 1) {
        stripperFirstTalk = 0
      }
    }

    //ai for yoga girl
    if (distance(me, yogagirl) < 30 && yogagirlFirstTalk === 0) {
      yogagirlFirstTalk = 1
      initializePage(this)
      let page = fetchPage(1500)
      displayPage(this, page)
    } else if (distance(me, yogagirl) > 200) {
      yogagirlFirstTalk = 0
    }


    //ai for trevor
    if (distance(trevor, me) < 1000) {
      if (distance(trevor, ball) > 400 && trevor.following === false) {
        trevor.disableBody(true, true)
        trevor.enableBody(true, ball.x + Phaser.Math.FloatBetween(-150, 150), ball.y + Phaser.Math.FloatBetween(-100, 100), true, true);
      }
      trevor.follow(me, 1)
      trevor.animate(5);
      trevor.chase(ball, 1.4); ////use 1.1 for laptop and 1.4 for desktop (I think because my macbook has faster refresh rate)
      trevor.getUnstuck()
      //high score for keepaway and dialogue
      if (trevor.following === false && distance(me, ball) < 100 && distance(trevor, ball) > 40 && ((trevor.body.velocity.x) ** 2 + (trevor.body.velocity.y) ** 2 > 50)) {
        keepaway += 1;
      }
      if (distance(trevor, ball) < 40) {
        if (keepaway > keepawayHighScore) {
          keepawayHighScore = keepaway
        }
        if (keepaway > 300 && trevor.joinParameter === false) {
          initializePage(this)
          let page = fetchPage(20)
          displayPage(this, page)
        } else if (keepaway > 400 && brothersSeal === 0 && neverBeenPro === true) {
          initializePage(this)
          let page = fetchPage(21)
          displayPage(this, page)
        } else if (keepaway > 400 && brothersSeal === 0 && neverBeenPro === false) {
          initializePage(this)
          let page = fetchPage(24)
          displayPage(this, page)
        } else if (keepaway > 750 && brothersSeal === 1) {
          initializePage(this)
          let page = fetchPage(22)
          displayPage(this, page)
        }
        keepaway = 0
      }
      if (keepaway === 400) {
        trevor.joinParameter = true;
        potentialParty["Jimmy"]=true;
        highScoreText = this.add.text(me.x - 100, me.y - 50, 'You went pro', {
          fontFamily: 'Academy Engraved LET',
          fontSize: '50px',
          fill: '#fff'
        });
        window.setTimeout(() => {
          highScoreText.setText('')
        }, 3000);
      } else if (keepaway === 750) {
        items.push("Brothers Seal")
        brothersSeal = 1
        highScoreText = this.add.text(me.x - 300, me.y - 50, '        You got the brothers seal.\nYou sense a dark gate unhinged...', {
          fontFamily: 'Academy Engraved LET',
          fontSize: '30px',
          fill: '#fff'
        });
        window.setTimeout(() => {
          highScoreText.setText('')
        }, 4000);
      }
    }

    //ai for jon
    if (distance(net1, me) < 10000) {
      jon.animate()
      if (distance(me, jon) < 30 && jonFirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(70)
        displayPage(this, page)
        jonFirstTalk = 1
        jon.y = gameState.JonSpawnPoint.y - 60
        volleyball.enableBody(true, gameState.VolleyballSpawnPoint.x - 32, gameState.VolleyballSpawnPoint.y - 250, true, true);
      }
      if (distance(volleyball, net4) < 250 && (jon.x >= volleyball.x + 10 || jon.x < volleyball.x - 10)) {
        jon.y = gameState.JonSpawnPoint.y - 60
        chasex(jon, volleyball, jonChaseX)
        jon.body.velocity.y = 0
        jon.y = gameState.JonSpawnPoint.y - 60
        if (jon.x > gameState.JonSpawnPoint.x + 50) {
          jon.x = gameState.JonSpawnPoint.x + 50
          jon.body.velocity.x = 0
        } else if (jon.x < gameState.JonSpawnPoint.x - 50) {
          jon.x = gameState.JonSpawnPoint.x - 50
          jon.body.velocity.x = 0
        }
        if (volleyballScore === 1) {
          initializePage(this)
          let page = fetchPage(72)
          displayPage(this, page)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 1.1
          jonChaseX += 5 //makes him harder to score on
          jon.body.setSize(130, 20);
          jon.body.setOffset(35, 150); //makes him harder to score on
        } else if (volleyballScore === 2.1) {
          initializePage(this)
          let page = fetchPage(73)
          displayPage(this, page)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 2.2
          jonChaseX += 5 //makes him harder to score on
          jon.body.setSize(140, 20);
          jon.body.setOffset(30, 150); //makes him harder to score on
        } else if (volleyballScore === 3.2) {
          initializePage(this)
          let page = fetchPage(74)
          displayPage(this, page)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 3.3
          jonChaseX += 5 //makes him harder to score on
          jon.body.setSize(150, 20);
          jon.body.setOffset(25, 150); //makes him harder to score on
        } else if (volleyballScore === 4.3) {
          initializePage(this)
          let page = fetchPage(75)
          displayPage(this, page)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 4.4
          jonChaseX += 55 //makes him harder to score on
          jon.body.setSize(150, 20);
          jon.body.setOffset(25, 150); //makes him harder to score on
        } else if (volleyballScore === 5.4) {
          initializePage(this)
          let page = fetchPage(76)
          displayPage(this, page)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 5.5
          jonChaseX -= 20 //makes him easier to score on
          jon.body.setSize(170, 20);
          jon.body.setOffset(15, 150); //makes him harder to score on
        } else if (volleyballScore === 6.5) {
          initializePage(this)
          let page = fetchPage(76)
          displayPage(this, page)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 6.6
          jonChaseX -= 20 //makes him easier to score on
          jon.body.setSize(180, 20);
          jon.body.setOffset(10, 150); //makes him harder to score on
        }
      } else if (distance(volleyball, net4) > 250) {
        jon.chase(volleyball, 2.5)
      }
    }

    //fratboys ai
    fratboys.children.iterate(function(child) {
      if (distance(child, me) < 1000) {
        if (child !== fratboy2prime && child !== fratboy5) {
          getUnstuck(child)
          randomWalk(child)
        }
        if (distance(child, me) < 400 && child !== fratboy2prime && child !== fratboy5) {
          chase(child, me, 1.2)
        }
      }
    });

    //ai for crackhead
    if (distance(crackhead, me) < 1000) {
      if (crackhead.body.velocity.x > 5) {
        crackhead.anims.play('crackheadright', true)
      }
      if (crackhead.body.velocity.x < -5) {
        crackhead.anims.play('crackheadleft', true)
      }
      if (distance(me, crackhead) < 30 && crackheadFirstTalk === 0) {
        gameState.iwantsomecrack.play()
        if (moneyToCrackhead>=10 && crackheadFirstJoin){
          crackheadJoin=true;
          crackheadFirstJoin=false;
          crackheadFirstTalk = 1
          initializePage(this)
          let page = fetchPage(2002)
          displayPage(this, page)
        } else {
          initializePage(this)
          let page = fetchPage(2000)
          displayPage(this, page)
          crackheadFirstTalk = 1
        }
      }
      else if (distance(me, crackhead) > 50 && crackheadFirstTalk === 1) {
        crackheadFirstTalk = 0
      }
    }

    //ai for junkie
    if (distance(junkie, me) < 1000) {
      if (junkie.body.velocity.x > 5) {
        junkie.anims.play('junkieright', true)
      }
      if (junkie.body.velocity.x < 5) {
        junkie.anims.play('junkieleft', true)
      }
    }

    //ai for ex_junkie
    if (distance(ex_junkie, me) < 1000) {
      if (ex_junkie.body.velocity.x > 5) {
        ex_junkie.anims.play('ex_junkieright', true)
      }
      if (ex_junkie.body.velocity.x < 5) {
        ex_junkie.anims.play('ex_junkieleft', true)
      }
    }

    //ai for fratboy1
    if (distance(fratboy1, me) < 1000) {
      if (fratboy1.body.velocity.x > 5) {
        fratboy1.anims.play('frat1right', true)
      }
      if (fratboy1.body.velocity.x < 5) {
        fratboy1.anims.play('frat1left', true)
      }
      if (distance(me, fratboy1) < 30 && fratboy1FirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(200)
        displayPage(this, page)
        fratboy1FirstTalk = 1
      }
    }

    //ai for fratboy2
    if (distance(fratboy2, me) < 1000) {
      if (fratboy2.body.velocity.x > 5) {
        fratboy2.anims.play('frat2right', true)
      }
      if (fratboy2.body.velocity.x < 5) {
        fratboy2.anims.play('frat2left', true)
      }

      if (distance(me, fratboy2) < 30 && fratboy2FirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(210)
        displayPage(this, page)
        fratboy2FirstTalk = 1
      }
    }


    //ai for fratboy3
    if (distance(fratboy3, me) < 1000) {
      if (fratboy3.body.velocity.x > 5) {
        fratboy3.anims.play('frat3right', true)
      }
      if (fratboy3.body.velocity.x < 5) {
        fratboy3.anims.play('frat3left', true)
      }

      if (distance(me, fratboy3) < 30 && fratboy3FirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(220)
        displayPage(this, page)
        fratboy3FirstTalk = 1
      }
    }

    //ai for fratboy4
    if (distance(fratboy4, me) < 1000) {
      if (fratboy4.body.velocity.x > 5) {
        fratboy4.anims.play('frat4right', true)
      }
      if (fratboy4.body.velocity.x < 5) {
        fratboy4.anims.play('frat4left', true)
      }

      if (distance(me, fratboy4) < 30 && fratboy4FirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(230)
        displayPage(this, page)
        fratboy4FirstTalk = 1
      }
    }

    //ai for fratboy5
    if (distance(fratboy5, me) < 1000) {
      fratboy5.anims.play('frat5huhuh', true)
      if (distance(me, fratboy5) < 30 && fratboy5FirstTalk === 0) {
        initializePage(this)
        let page = fetchPage(1100)
        displayPage(this, page)
        fratboy5FirstTalk = 1
      }
    }

    //ball animations and physics (first block doesn't really work... fix needed)

    if (distance(ball, me) < 1000) {
      if (ball.body.blocked.up && ball.body.blocked.down && ball.body.blocked.left && ball.body.blocked.right) {
        ball.disableBody(true, true)
        ball.enableBody(true, gameState.BallSpawnPoint.x, gameState.BallSpawnPoint.y, true, true);
      }
      if ((ball.body.velocity.x) ** 2 + (ball.body.velocity.y) ** 2 > 10) {
        ball.anims.play('ball', true)
      }
      if ((ball.body.velocity.x) ** 2 + (ball.body.velocity.y) ** 2 < 10) {
        ball.anims.play('still', true)
      }
      beABall(ball)
    }

    //volleyball animations and physics
    if (distance(volleyball, me) < 1000) {
      if ((volleyball.body.velocity.x) ** 2 + (volleyball.body.velocity.y) ** 2 > 10) {
        volleyball.anims.play('volleyball', true)
      }
      if ((volleyball.body.velocity.x) ** 2 + (volleyball.body.velocity.y) ** 2 < 10) {
        volleyball.anims.play('volleyballstill', true)
      }
      beABall(volleyball)
    }

    //volleyball animations and physics
    if (distance(beachball, me) < 1000) {
      if ((beachball.body.velocity.x) ** 2 + (beachball.body.velocity.y) ** 2 > 10) {
        beachball.anims.play('beachball', true)
      }
      if ((beachball.body.velocity.x) ** 2 + (beachball.body.velocity.y) ** 2 < 10) {
        beachball.anims.play('beachballstill', true)
      }
      beABall(beachball)
    }

    //player controls and animations
    me.body.setVelocity(0);
    if (playerTexture === 0 && inPool === false) {
      // player Horizontal movement
      if (this.cursors.left.isDown) {
        me.body.setVelocityX(-50 * speed * athletics);
      } else if (this.cursors.right.isDown) {
        me.body.setVelocityX(50 * speed * athletics);
      }
      // player Vertical movement
      if (this.cursors.up.isDown) {
        me.body.setVelocityY(-50 * speed * athletics);
      } else if (this.cursors.down.isDown) {
        me.body.setVelocityY(50 * speed * athletics);
      }
      //player walking running animations
      if (this.cursors.left.isDown) {
        if (speed === 1) {
          me.anims.play('leftwalk', true);
        } else if (speed === 2) {
          me.anims.play('leftrun', true);
        } else if (speed > 2) {
          me.anims.play('leftsprint', true);
        }
      } else if (this.cursors.right.isDown) {
        if (speed === 1) {
          me.anims.play('rightwalk', true);
        } else if (speed === 2) {
          me.anims.play('rightrun', true);
        } else if (speed > 2) {
          me.anims.play('rightsprint', true);
        }
      }
      if (this.cursors.up.isDown && !(this.cursors.right.isDown)) {
        if (speed === 1) {
          me.anims.play('leftwalk', true);
        } else if (speed === 2) {
          me.anims.play('leftrun', true);
        } else if (speed > 2) {
          me.anims.play('leftsprint', true);
        }
      } else if (this.cursors.down.isDown && !(this.cursors.left.isDown)) {
        if (speed === 1) {
          me.anims.play('rightwalk', true);
        } else if (speed === 2) {
          me.anims.play('rightrun', true);
        } else if (speed > 2) {
          me.anims.play('rightsprint', true);
        }
      }
      if (me.body.velocity.x === 0 && me.body.velocity.y === 0) {
        me.anims.play('turn', true)
      }
    }
    // for when you get in pool
    else if (playerTexture === 0 && inPool === true) {
      // player Horizontal movement
      if (this.cursors.left.isDown) {
        me.body.setVelocityX(-10 * speed * athletics);
      } else if (this.cursors.right.isDown) {
        me.body.setVelocityX(10 * speed * athletics);
      }
      // player Vertical movement
      if (this.cursors.up.isDown) {
        me.body.setVelocityY(-10 * speed * athletics);
      } else if (this.cursors.down.isDown) {
        me.body.setVelocityY(10 * speed * athletics);
      }
      //player walking running animations
      if (this.cursors.left.isDown) {
        me.anims.play('leftswim', true);
      } else if (this.cursors.right.isDown) {
        me.anims.play('rightswim', true);
      }
      if (this.cursors.up.isDown && !(this.cursors.right.isDown)) {
        me.anims.play('leftswim', true);
      } else if (this.cursors.down.isDown && !(this.cursors.left.isDown)) {
        me.anims.play('rightswim', true);
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
        me.angle = 90;
        me.setSize(64, 32);
        me.setOffset(0, 16)
      } else if (this.cursors.left.isDown && gas > 0) {
        me.angle = 270;
        me.setSize(64, 32);
        me.setOffset(0, 16)
      }
      // Vertical car animation
      else if (this.cursors.up.isDown && gas > 0) {
        me.angle = 0;
        me.setSize(32, 64);
        me.setOffset(16, 0)
      } else if (this.cursors.down.isDown && gas > 0) {
        me.angle = 180;
        me.setSize(32, 64);
        me.setOffset(16, 0)
      }
    } else if (playerTexture === 'race') {
      // player Horizontal movement
      if (this.cursors.left.isDown) {
        me.body.setVelocityX(-50 * speed * athletics);
      }
      //player walking running animations
      if (this.cursors.left.isDown) {
        if (speed > 2) {
          me.anims.play('leftsprint', true);
        }
      }
      if (me.body.velocity.x === 0 && me.body.velocity.y === 0) {
        me.anims.play('turn', true)
      }
    }
    me.x=Math.round(me.x);
    me.y=Math.round(me.y);
  }
});
