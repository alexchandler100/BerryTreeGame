//constants and parameters
const gameStateApt = {};
let musRnd = 0
let englishIndicator = {}
let loadedIndoorsThemes = false;
let startFollow = true;
let inPoolTableZone = false;
let poolDialogue = true;
let twoballscore = 0;
let pocketedEight = false;
let pocketedNine = false;
let cueHitEight = false;
let cueHitNine = false;
let alreadyPlayedEightCueCollide = false
let alreadyPlayedNineCueCollide = false
let alreadyPlayedEightNineCollide = false
let x_rnd = 0;
let y_rnd = 0;
let timeApt = 7200;
let resetTime = true;
let dragging = false;
let lineCounter = 0;
let joePoolTalk = false;
let jamesPoolTalk = false;
let joeBets = false;
let jamesBets = false;
let opportunityForExtra2 = false;
let railEnglish = false;
let _hitTopRail = false;
let _hitTopRailRight = false;
let _hitBottomRail = false;
let _hitBottomRailRight = false;
let _hitLeftRail = false;
let _hitRightRail = false;
let aimingLineLength;
let englishStrength = 3;
let joeNotEnoughToBet = false;
let jamesNotEnoughToBet = false;
let english = {
  top: false,
  bottom: false,
  left: false,
  right: false
}
let phi0;
let vx1;
let vy1;
let vx2;
let vy2;
let x1;
let x2;
let y1;
let y2;
let rx;
let ry;
let aa;
let bb;
let cc;
let tt1;
let tt2;
let ttf;
let rProjOnv1;
let rNormalv1;
let px;
let py;
let energy;
let theta; //angle which ball 2 exits at (might have to tweak this based on coordinate system)
let phi; //angle at which ball 1 exits
let ball2finalspeed;
let ball1finalspeed;

function bringToTouching(ball1, ball2) {
  vx1 = ball1.body.velocity.x
  vy1 = ball1.body.velocity.y
  x10 = ball1.x;
  x2 = ball2.x;
  y10 = ball1.y;
  y2 = ball2.y;
  aa = vx1 ** 2 + vy1 ** 2;
  bb = 2 * ((x10 - x2) * vx1 + (y10 - y2) * vy1);
  cc = (x2 - x10) ** 2 + (y2 - y10) ** 2 - 5.6 ** 2;
  tt1 = (-bb + Math.sqrt(bb ** 2 - 4 * aa * cc)) / (2 * aa);
  tt2 = (-bb - Math.sqrt(bb ** 2 - 4 * aa * cc)) / (2 * aa);
  ttf = Math.min(tt1, tt2)
  ball1.x = x10 + vx1 * ttf
  ball1.y = y10 + vy1 * ttf
}

function ballCollide(ball1, ball2) {
  vx1 = ball1.body.velocity.x
  vy1 = ball1.body.velocity.y
  vx2 = ball2.body.velocity.x
  vy2 = ball2.body.velocity.y
  if (vx2 ** 2 + vy2 ** 2 < 10) {
    //initial angle of ball 1
    if (vx1 > 0) {
      phi0 = Math.atan(vy1 / vx1)
    } else if (vx1 <= 0 && vy1 < 0) {
      phi0 = Math.PI + Math.atan(vy1 / vx1)
    } else if (vx1 <= 0 && vy1 > 0) {
      phi0 = Math.PI / 2 - Math.atan(vx1 / vy1)
    }
    x1 = ball1.x;
    x2 = ball2.x;
    y1 = ball1.y;
    y2 = ball2.y;
    px = vx1 + vx2;
    py = vy1 + vy2;
    rx = x2 - x1;
    ry = y2 - y1;
    //thetap is the positive angle between 0 and 90 between v1 and r
    thetap = Math.abs(Math.acos((rx * vx1 + ry * vy1) / (Math.sqrt(vx1 ** 2 + vy1 ** 2) * Math.sqrt(rx ** 2 + ry ** 2))))
    energy = (vx1 ** 2 + vx2 ** 2 + vy1 ** 2 + vy2 ** 2) / 2;
    if (vx1 * ry - vy1 * rx < 0) {
      theta = phi0 - thetap;
    } else {
      theta = phi0 + thetap;
    }
    if (vx1 * ry - vy1 * rx <= 0) {
      phi = theta + Math.PI / 2; //angle at which ball 1 exits
    } else {
      phi = theta - Math.PI / 2; //angle at which ball 1 exits
    }
    let ball2finalspeed = (py - px * Math.tan(phi)) / (Math.sin(theta) - Math.cos(theta) * Math.tan(phi));
    let ball1finalspeed = Math.sqrt(energy - ball2finalspeed ** 2 / 2);
    if (english.bottom) {
      english.bottom = false;
      if (thetap < 10 * Math.PI / 180) {
        phi = theta + Math.PI;
        ball1finalspeed = ball2finalspeed / 2 * englishStrength / 3;
      } else if (10 * Math.PI / 180 <= thetap && thetap <= 80 * Math.PI / 180) {
        if (vx1 * ry - vy1 * rx < 0) {
          phi += Math.PI / 4 * englishStrength / 3
        } else {
          phi -= Math.PI / 4 * englishStrength / 3
        }
      }
    } else if (english.top) {
      english.top = false;
      if (thetap < 10 * Math.PI / 180) {
        if (vx1 * ry - vy1 * rx < 0) {
          phi = theta + 2 * thetap
        } else {
          phi = theta - 2 * thetap
        }
        ball1finalspeed = ball2finalspeed / 2 * englishStrength / 3;
      } else if (10 * Math.PI / 180 <= thetap && thetap <= 80 * Math.PI / 180) {
        if (vx1 * ry - vy1 * rx < 0) {
          phi -= Math.PI / 4 * englishStrength / 3
        } else {
          phi += Math.PI / 4 * englishStrength / 3
        }
      }
    }
    //left and right english do not affect deflection angle so we do not use them here. Only on rail interactions
    ball1.body.velocity.x = ball1finalspeed * Math.cos(phi);
    ball1.body.velocity.y = ball1finalspeed * Math.sin(phi);
    ball2.body.velocity.x = ball2finalspeed * Math.cos(theta);
    ball2.body.velocity.y = ball2finalspeed * Math.sin(theta);
  }
}


var PoolBall = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Sprite,
  initialize: function NPC(scene, x, y, texture, frame, type) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.type = type;
    this.setScale(.22)
    this.setCircle(10)
    this.setOffset(5, 5)
    this.setBounce(1);
  },
  beABall: function() {
    this.body.velocity.x -= this.body.velocity.x / 50
    this.body.velocity.y -= this.body.velocity.y / 50
  },
});

var MyApartment = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "MyApartment"
    });
  },
  init: function(data) {
    gameState.music.stop()
  },
  openDialoguePage: function (page){
    pageForDialogue = page
    openingDialogue = true;
    if (gameState.phoneBackground){
      if (gameState.camera1.visible){
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
    console.log(`indoorzone: ${indoorZone}`)
    if (indoorZone === 'clubhouse 731' || indoorZone === 'clubhouse woods') {
      this.scene.run("PoolScore");
    }
    this.scene.run("DialogueMenu");
    gameState.music.stop();
    if (gameState.bossfight){
      gameState.bossfight.stop();
    }
    musRnd = Math.floor(Math.random() * 4);
    if (musRnd === 0) {
      gameStateApt.indoors0.play()
    } else if (musRnd === 1) {
      gameStateApt.indoors1.play()
    } else if (musRnd === 2) {
      gameStateApt.indoors2.play()
    } else if (musRnd === 3) {
      gameStateApt.indoors3.play()
    }
    poolDialogue = true
    zoom = 1;
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    // gameStateApt.spawn changes to wherever we want to spawn but gameStateApt.enter is fixed
    gameStateApt.spawn = mapApt.findObject("objects", obj => obj.name === "enter");
    gameStateApt.enter = mapApt.findObject("objects", obj => obj.name === "enter");
    gameStateApt.trevorAptEnter = mapApt.findObject("objects", obj => obj.name === "trevor apartment");
    gameStateApt.elevatorUpstairs = mapApt.findObject("objects", obj => obj.name === "clubhouse elevator");
    gameStateApt.elevatorDownstairs = mapApt.findObject("objects", obj => obj.name === "downstairs elevator");

    if (indoorZone === 'myApartment') {
      gameStateApt.spawn = mapApt.findObject("objects", obj => obj.name === "enter");
    } else if (indoorZone === 'TrevorsApartment') {
      gameStateApt.spawn = mapApt.findObject("objects", obj => obj.name === "trevor apartment");
    } else if (indoorZone === 'clubhouse 731') {
      gameStateApt.spawn = gameState.clubhouseInside731Entrance;
    } else if (indoorZone === 'clubhouse woods') {
      gameStateApt.spawn = gameState.clubhouseInsideWoodsEntrance
    }
    if (meApt) {
      meApt.x = gameStateApt.spawn.x;
      meApt.y = gameStateApt.spawn.y;
    }
    if (stripper.following) {
      stripperApt.following = true
      stripperApt.x = meApt.x + 50
      stripperApt.y = meApt.y - 60
    }
  },
  onKeyInput: function(event) {
    if (event.code === "Backspace") {
      triangleChalk.x = gameStateApt.poolTableTL.x + 152
      triangleChalk.y = gameStateApt.poolTableTL.y + 57.1
      cueball.disableBody(true, true);
      cueball.enableBody(true, gameStateApt.poolTableTL.x + 50, gameStateApt.poolTableTL.y + 50, true, true);
      eightball.disableBody(true, true);
      x_rnd = Math.floor(Math.random() * 7)
      y_rnd = Math.floor(Math.random() * 5)
      eightball.enableBody(true, gameStateApt.poolTableTL.x + (x_rnd + 1) * 20, gameStateApt.poolTableTL.y + (y_rnd + 2) * 12, true, true);
      nineball.disableBody(true, true);
      x_rnd = Math.floor(Math.random() * 7)
      y_rnd = Math.floor(Math.random() * 5)
      nineball.enableBody(true, gameStateApt.poolTableTL.x + (x_rnd + 1) * 20, gameStateApt.poolTableTL.y + (y_rnd + 2) * 12, true, true);
      poolcue.disableBody(true, true)
      poolcue.enableBody(true, gameStateApt.poolTableTL.x + 50, gameStateApt.poolTableTL.y + 80, true, true);
      poolcue.angle = 45
    }
  },
  preload: function() {
    this.load.image('yogamat', "assets/yogamat.png");
    this.load.image('liquorApt', "assets/liquor.png");
    this.load.image('yogaBlocks', "assets/yogaBlocks.png");
    this.load.image('monsterApt', "assets/monster.png");
    this.load.image('hammsApt', "assets/hamms.png");
    this.load.image('larrySpecialApt', "assets/larrySpecial.png");
    this.load.audio('ohshit', ['assets/ohshitohshit.wav']);
    this.load.audio('chalk', ['assets/chalk.wav']);
    this.load.audio('indoors0', ['assets/aidsBoogerBoogerAids.wav']);
    this.load.audio('indoors1', ['assets/blessed.wav']);
    this.load.audio('indoors2', ['assets/hungryMath.wav']);
    this.load.audio('indoors3', ['assets/trick_daddy.wav']);
    this.load.spritesheet('me',
      'assets/me_running_BTJM.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.image("poolCue", "assets/poolcue.png");
    this.load.image("triangleChalk", "assets/triangleChalk.png");
    this.load.tilemapTiledJSON("mapApt", "assets/myApartment.json");
    this.load.image("interiors", "assets/tilesets/interiors.png");
    this.load.image("roomBuilder", "assets/tilesets/roombuilder.png");
    this.load.image("customIndoor", "assets/tilesets/custom_indoors_stuff.png");
    this.load.spritesheet('poolballs',
      'assets/poolballs.png', {
        frameWidth: 25,
        frameHeight: 25
      });
  },
  create: function() {

    //adding poolscore just in case
    if (!gameStateApt.poolscore) {
      gameStateApt.poolscore = this.add.text(1200 - 200, 10, '', {
        fontSize: '30px',
        fill: '#fff',
        align: 'right',
        wordWrap: {
          width: 190
        }
      });
    }
    //adding indoor audio
    loadedIndoorsThemes = true
    gameStateApt.ohShit = this.sound.add('ohshit', {
      volume: .7
    });
    gameStateApt.chalk = this.sound.add('chalk', {
      volume: .7
    });
    gameStateApt.indoors0 = this.sound.add('indoors0', {
      volume: 1
    });
    gameStateApt.indoors1 = this.sound.add('indoors1', {
      volume: 1
    });
    gameStateApt.indoors2 = this.sound.add('indoors2', {
      volume: 1
    });
    gameStateApt.indoors3 = this.sound.add('indoors3', {
      volume: 1
    });
    gameStateApt.indoors0.loop = true;
    gameStateApt.indoors1.loop = true;
    gameStateApt.indoors2.loop = true;
    gameStateApt.indoors3.loop = true;
    musRnd = Math.floor(Math.random() * 4);
    if (musRnd === 0) {
      gameStateApt.indoors0.play()
    } else if (musRnd === 1) {
      gameStateApt.indoors1.play()
    } else if (musRnd === 2) {
      gameStateApt.indoors2.play()
    } else if (musRnd === 3) {
      gameStateApt.indoors3.play()
    }

    //this.input.setDefaultCursor('url(assets/cursors/sword.cur), pointer');
    this.input.setDefaultCursor('url(assets/cross.png), pointer');
    zoom = 1
    //making the map
    mapApt = this.make.tilemap({
      key: "mapApt"
    });
    const tileset5 = mapApt.addTilesetImage("Interiors_free_32x32", "interiors");
    const tileset6 = mapApt.addTilesetImage("Room_Builder_free_32x32", "roomBuilder");
    const tileset7 = mapApt.addTilesetImage("custom_indoors_stuff", "customIndoor");
    const under0room = mapApt.createStaticLayer("under0room", tileset6, 0, 0);
    const under1room = mapApt.createStaticLayer("under1room", tileset6, 0, 0);
    const under2room = mapApt.createStaticLayer("under2room", tileset6, 0, 0);
    const under3interiors = mapApt.createStaticLayer("under3interiors", tileset5, 0, 0);
    const over1interiors = mapApt.createStaticLayer("over1interiors", tileset5, 0, 0);
    const over2interiors = mapApt.createStaticLayer("over2interiors", tileset5, 0, 0);
    const over3interiors = mapApt.createStaticLayer("over3interiors", tileset5, 0, 0);
    const over4custom = mapApt.createStaticLayer("over4custom", tileset7, 0, 0);
    const over5interiors = mapApt.createStaticLayer("over5interiors", tileset5, 0, 0);
    gameStateApt.stripperAptSpawnPoint = mapApt.findObject("objects", obj => obj.name === "stripper apt spawn point");
    gameState.clubhouseInside731Entrance = mapApt.findObject("objects", obj => obj.name === "731 entrance clubhouse")
    gameState.clubhouseInsideWoodsEntrance = mapApt.findObject("objects", obj => obj.name === "burcham woods entrance clubhouse");
    gameStateApt.poolTableTL = mapApt.findObject("objects", obj => obj.name === "pool table top left");
    gameStateApt.poolTableZoneTL = mapApt.findObject("objects", obj => obj.name === "pool table zone top left");
    gameStateApt.poolTableZoneBR = mapApt.findObject("objects", obj => obj.name === "pool table zone bottom right");

    //spawning tiles
    under0room.setCollisionByProperty({
      collides: true
    });
    under2room.setCollisionByProperty({
      collides: true
    });
    over1interiors.setCollisionByProperty({
      collides: true
    });
    over2interiors.setCollisionByProperty({
      collides: true
    });
    over3interiors.setCollisionByProperty({
      collides: true
    });
    over4custom.setCollisionByProperty({
      collides: true
    });
    over5interiors.setCollisionByProperty({
      collides: true
    });

    //pool table rails
    railZone = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    toprail = railZone.create(gameStateApt.poolTableTL.x + 46, gameStateApt.poolTableTL.y + 9, 58, 15)
    toprightrail = railZone.create(gameStateApt.poolTableTL.x + 46 + 58 + 10, gameStateApt.poolTableTL.y + 9, 58, 15)

    bottomrail = railZone.create(gameStateApt.poolTableTL.x + 46, gameStateApt.poolTableTL.y + 90, 58, 15)
    bottomrightrail = railZone.create(gameStateApt.poolTableTL.x + 46 + 58 + 10, gameStateApt.poolTableTL.y + 90, 58, 15)

    leftrail = railZone.create(gameStateApt.poolTableTL.x + 5, gameStateApt.poolTableTL.y + 49, 15, 55)
    rightrail = railZone.create(gameStateApt.poolTableTL.x + 141 + 15, gameStateApt.poolTableTL.y + 49, 15, 55)
    //make the rails not move
    railZone.children.iterate(function(child) {
      child.body.immovable = true;
      child.body.moves = false;
    });

    pocketZone = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    topleftpocket1 = pocketZone.create(gameStateApt.poolTableTL.x + 10, gameStateApt.poolTableTL.y + 8, 13, 13)
    topleftpocket2 = pocketZone.create(gameStateApt.poolTableTL.x + 4, gameStateApt.poolTableTL.y + 14, 13, 13)

    toprightpocket1 = pocketZone.create(gameStateApt.poolTableTL.x + 155, gameStateApt.poolTableTL.y + 15, 10, 10)
    toprightpocket2 = pocketZone.create(gameStateApt.poolTableTL.x + 148, gameStateApt.poolTableTL.y + 9, 10, 10)

    bottomleftpocket1 = pocketZone.create(gameStateApt.poolTableTL.x + 11, gameStateApt.poolTableTL.y + 12 + 76, 10, 10)
    bottomleftpocket2 = pocketZone.create(gameStateApt.poolTableTL.x + 6, gameStateApt.poolTableTL.y + 6 + 76, 10, 10)

    bottomrightpocket1 = pocketZone.create(gameStateApt.poolTableTL.x + 155, gameStateApt.poolTableTL.y + 6 + 76, 10, 10)
    bottomrightpocket2 = pocketZone.create(gameStateApt.poolTableTL.x + 148, gameStateApt.poolTableTL.y + 12 + 76, 10, 10)


    topmiddlepocket = pocketZone.create(gameStateApt.poolTableTL.x + 80, gameStateApt.poolTableTL.y + 10, 8, 10)
    bottommiddlepocket = pocketZone.create(gameStateApt.poolTableTL.x + 80, gameStateApt.poolTableTL.y + 12 + 76, 8, 10)


    //pool Balls
    cueball = new PoolBall(this, gameStateApt.poolTableTL.x + 50, gameStateApt.poolTableTL.y + 50, "poolballs", 15, "cueball");
    cueball.body.setMaxSpeed(600)
    eightball = new PoolBall(this, gameStateApt.poolTableTL.x + 110, gameStateApt.poolTableTL.y + 50, "poolballs", 7, "eightball");
    nineball = new PoolBall(this, gameStateApt.poolTableTL.x + 120, gameStateApt.poolTableTL.y + 70, "poolballs", 8, "eightball");

    this.physics.add.overlap(pocketZone, cueball, goInPocketCue, false, this);
    this.physics.add.overlap(pocketZone, eightball, goInPocketEight, false, this);
    this.physics.add.overlap(pocketZone, nineball, goInPocketNine, false, this);

    //cueball.setOrigin(gameStateApt.poolTableTL)
    this.physics.add.collider(cueball, railZone);
    this.physics.add.collider(eightball, railZone);
    this.physics.add.collider(nineball, railZone);

    this.physics.add.overlap(cueball, railZone, applyRailEnglish, false, this);
    this.physics.add.overlap(cueball, toprail, hitTopRail, false, this);
    this.physics.add.overlap(cueball, toprightrail, hitTopRailRight, false, this);
    this.physics.add.overlap(cueball, bottomrail, hitBottomRail, false, this);
    this.physics.add.overlap(cueball, bottomrightrail, hitBottomRailRight, false, this);
    this.physics.add.overlap(cueball, leftrail, hitLeftRail, false, this);
    this.physics.add.overlap(cueball, rightrail, hitRightRail, false, this);



    //ball collisions... might have to erase
    //this.physics.add.collider(cueball, eightball);
    //this.physics.add.collider(eightball, nineball);
    //this.physics.add.collider(nineball, cueball);

    //poolcue.body.immovable = true;
    //a_circle = this.add.circle(gameStateApt.poolTableTL.x + 50, gameStateApt.poolTableTL.y + 50, 5);
    //a_circle.setStrokeStyle(2, 0x1a65ac);

    let odX;
    let odY;
    let ogX;
    let ogY;

    jamesApt = this.physics.add.sprite(gameState.clubhouseInside731Entrance.x + 470, gameState.clubhouseInside731Entrance.y + 50, 'james');
    jamesApt.setScale(.25);
    jamesApt.body.setSize(80, 50);
    jamesApt.body.setOffset(60, 140);
    jamesApt.setDepth(jamesApt.y)


    triangleChalk = this.physics.add.sprite(gameStateApt.poolTableTL.x + 152, gameStateApt.poolTableTL.y + 57.1, 'triangleChalk');
    triangleChalk.setScale(.1)

    poolcue = this.physics.add.sprite(gameStateApt.poolTableTL.x + 50, gameStateApt.poolTableTL.y + 80, 'poolCue');
    poolcue.angle = 45
    //aiming = new Phaser.Line(poolcue.x, poolcue.y, cueball.x, cueball.y);
    //aiming.visible=false;
    // creating my line
    poolcue.setScale(.14)
    poolcue.body.setSize(10, 100)
    poolcue.setInteractive()
    this.input.setDraggable(poolcue);
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      //this.sys.canvas.style.cursor = 'none';
      //aiming.visible=true;
      if (cueball.body.velocity.x ** 2 + cueball.body.velocity.y ** 2 < 10) {
        dragging = true
        odX = JSON.parse(JSON.stringify(dragX))
        odY = JSON.parse(JSON.stringify(dragY))
        ogX = JSON.parse(JSON.stringify(gameObject.x))
        ogY = JSON.parse(JSON.stringify(gameObject.y))
        gameObject.x = (((dragX - odX) / 3) + ogX) + (dragX - (((dragX - odX) / 3) + ogX)) / 3;
        gameObject.y = (((dragY - odY) / 3) + ogY) + (dragY - (((dragY - odY) / 3) + ogY)) / 3;
        //gameObject.x = (((pointer.x - 468) / 3 + 2816)) * 3
        //gameObject.y = (((pointer.y - 155) / 3 + 1408)) * 3
        poolcue.body.velocity.x = 0;
        poolcue.body.velocity.y = 0;
        if (dragY - cueball.y > 0) {
          poolcue.angle = Math.atan((cueball.x - dragX) / (dragY - cueball.y)) * 180 / Math.PI
        } else {
          poolcue.angle = Math.atan((cueball.x - dragX) / (dragY - cueball.y)) * 180 / Math.PI + 180
        }
      }
    });

    //spawning player and setting properties
    gameStateApt.keyboard = mapApt.findObject("objects", obj => obj.name === "keyboard");
    gameStateApt.trevorSpawnPoint = mapApt.findObject("objects", obj => obj.name === "trevor apt spawn point");
    gameStateApt.trevorAptEnter = mapApt.findObject("objects", obj => obj.name === "trevor apartment");
    gameStateApt.spawn = mapApt.findObject("objects", obj => obj.name === "enter");
    gameStateApt.enter = mapApt.findObject("objects", obj => obj.name === "enter");
    gameStateApt.elevatorUpstairs = mapApt.findObject("objects", obj => obj.name === "clubhouse elevator");
    gameStateApt.elevatorDownstairs = mapApt.findObject("objects", obj => obj.name === "downstairs elevator");

    //yoga blocks and mats in gym
    yogamatApt = this.add.image(gameStateApt.elevatorDownstairs.x, gameStateApt.elevatorDownstairs.y - 800, 'yogamat');
    yogamatApt2 = this.add.image(gameStateApt.elevatorDownstairs.x - 150, gameStateApt.elevatorDownstairs.y - 800, 'yogamat');
    yogamatApt3 = this.add.image(gameStateApt.elevatorDownstairs.x, gameStateApt.elevatorDownstairs.y - 800 + 50, 'yogamat');
    yogamatApt4 = this.add.image(gameStateApt.elevatorDownstairs.x - 150, gameStateApt.elevatorDownstairs.y - 800 + 50, 'yogamat');
    yogamatApt5 = this.add.image(gameStateApt.elevatorDownstairs.x, gameStateApt.elevatorDownstairs.y - 800 + 100, 'yogamat');
    yogamatApt6 = this.add.image(gameStateApt.elevatorDownstairs.x - 150, gameStateApt.elevatorDownstairs.y - 800 + 100, 'yogamat');
    yogamatApt.setScale(2);
    yogamatApt2.setScale(2);
    yogamatApt3.setScale(2);
    yogamatApt4.setScale(2);
    yogamatApt5.setScale(2);
    yogamatApt6.setScale(2);

    yogaBlocks = this.physics.add.sprite(gameStateApt.elevatorDownstairs.x, gameStateApt.elevatorDownstairs.y - 800, 'yogaBlocks');
    yogaBlocks.setScale(.3);

    blondeApt = this.physics.add.sprite(gameStateApt.elevatorDownstairs.x + 32, gameStateApt.elevatorDownstairs.y - 800 - 32, 'blonde');
    blondeApt.setScale(.5);
    blondeApt.body.setSize(80, 50);
    blondeApt.body.setOffset(0, 52);
    blondeApt.anims.play('blondeJumping', true);
    blondeApt.body.immovable = true;

    console.log(`indoor zone: ${indoorZone}`)
    if (indoorZone === 'myApartment') {
      gameStateApt.spawn = mapApt.findObject("objects", obj => obj.name === "enter");
    } else if (indoorZone === 'TrevorsApartment') {
      gameStateApt.spawn = mapApt.findObject("objects", obj => obj.name === "trevor apartment");
    } else if (indoorZone === 'clubhouse 731') {
      gameStateApt.spawn = gameState.clubhouseInside731Entrance;
    } else if (indoorZone === 'clubhouse woods') {
      gameStateApt.spawn = gameState.clubhouseInsideWoodsEntrance
    }
    meApt = this.physics.add.sprite(gameStateApt.spawn.x + 16, gameStateApt.spawn.y - 32, 'me');
    meApt.setScale(.3);
    meApt.body.setSize(80, 50);
    meApt.body.setOffset(60, 140);

    bennettApt = this.physics.add.sprite(mapApt.findObject("objects", obj => obj.name === "enter").x + 200, mapApt.findObject("objects", obj => obj.name === "enter").y + 320, 'bennett');
    bennettApt.anims.play('bennettdown', true);
    bennettApt.setScale(.25);
    bennettApt.body.setSize(80, 50);
    bennettApt.body.setOffset(60, 140);

    joeApt = this.physics.add.sprite(gameState.clubhouseInside731Entrance.x + 480, gameState.clubhouseInside731Entrance.y - 50, 'joe');
    joeApt.setScale(.35);
    joeApt.body.setSize(80, 50);
    joeApt.body.setOffset(60, 140);
    joeApt.setDepth(joeApt.y)

    trevorApt = this.physics.add.sprite(gameStateApt.trevorSpawnPoint.x, gameStateApt.trevorSpawnPoint.y, 'trevor');
    trevorApt.setScale(.35*.7);
    trevorApt.body.setSize(80, 50);
    trevorApt.body.setOffset(60, 140);
    trevorApt.setDepth(trevorApt.y)

    stripperApt = new NPC(this, "stripper apt spawn point", "stripper", 0, "Stripper", "stripperleft", "stripperleft", "stripperup", "stripperdown", "bong", false);
    //stripperApt = this.physics.add.sprite(gameStateApt.stripperAptSpawnPoint.x, gameStateApt.stripperAptSpawnPoint.y, 'stripper');
    stripperApt.setScale(.5)
    if (stripper.following) {
      stripperApt.following = true
    }
    stripperApt.body.setCircle(10);
    stripperApt.body.setOffset(50, 70);

    if (stripperApt.following) {
      stripperApt.x = meApt.x + 50
      stripperApt.y = meApt.y
    }

    //collisions with walls and stuff
    this.physics.add.collider(meApt, stripperApt);
    this.physics.add.collider(meApt, blondeApt);
    this.physics.add.collider(meApt, under0room);
    this.physics.add.collider(meApt, over1interiors);
    this.physics.add.collider(meApt, over2interiors);
    this.physics.add.collider(meApt, over3interiors);
    this.physics.add.collider(meApt, over4custom);
    this.physics.add.collider(meApt, over5interiors);

    this.physics.add.collider(stripperApt, under0room);
    this.physics.add.collider(stripperApt, over1interiors);
    this.physics.add.collider(stripperApt, over2interiors);
    this.physics.add.collider(stripperApt, over3interiors);
    this.physics.add.collider(stripperApt, over4custom);
    this.physics.add.collider(stripperApt, over5interiors);

    this.physics.add.collider(nineball, james);
    this.physics.add.collider(eightball, james);
    this.physics.add.collider(cueball, james);
    this.physics.add.collider(nineball, joe);
    this.physics.add.collider(eightball, joe);
    this.physics.add.collider(cueball, joe);

    this.physics.add.collider(cueball, meApt);
    this.physics.add.collider(cueball, under0room);
    this.physics.add.collider(cueball, over1interiors);
    this.physics.add.collider(cueball, over2interiors);
    this.physics.add.collider(cueball, over3interiors);
    this.physics.add.collider(cueball, over4custom);
    this.physics.add.collider(cueball, over5interiors);

    this.physics.add.collider(eightball, meApt);
    this.physics.add.collider(eightball, under0room);
    this.physics.add.collider(eightball, over1interiors);
    this.physics.add.collider(eightball, over2interiors);
    this.physics.add.collider(eightball, over3interiors);
    this.physics.add.collider(eightball, over4custom);
    this.physics.add.collider(eightball, over5interiors);

    this.physics.add.collider(nineball, meApt);
    this.physics.add.collider(nineball, under0room);
    this.physics.add.collider(nineball, over1interiors);
    this.physics.add.collider(nineball, over2interiors);
    this.physics.add.collider(nineball, over3interiors);
    this.physics.add.collider(nineball, over4custom);
    this.physics.add.collider(nineball, over5interiors);

    this.physics.add.collider(poolcue, meApt);
    this.physics.add.collider(poolcue, under0room);
    this.physics.add.collider(poolcue, over1interiors);
    this.physics.add.collider(poolcue, over2interiors);
    this.physics.add.collider(poolcue, over3interiors);
    this.physics.add.collider(poolcue, over4custom);
    this.physics.add.collider(poolcue, over5interiors);

    gameState.lines = {}
    // turning ball collisions off because I now handle these with my custom collision function ballCollide (keeping 8-9 because they are being glitchy...)
    //this.physics.add.collider(cueball, eightball);
    //this.physics.add.collider(cueball, nineball);
    this.physics.add.collider(eightball, nineball);

    camera = this.cameras.main;
    camera.startFollow(meApt, true);
    //camera.setTint(0xbe3c72)
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.physics.world.setBounds(0, 0, mapApt.widthInPixels, mapApt.heightInPixels, true, true, true, true);
    meApt.setCollideWorldBounds(true);

    //camera to follow player and camera bounds
    camera.setBounds(0, 0, mapApt.widthInPixels, mapApt.heightInPixels);

    //bed zone for sleep event
    gameState.bed = {
      x: gameStateApt.enter.x + 650,
      y: gameStateApt.enter.y + 200
    }

    //liquorApt = this.physics.add.sprite(gameStateApt.enter.x + 650, gameStateApt.enter.y+32, 'liquorApt');
    //liquorApt.setScale(.25);

    //monsterApt = this.physics.add.sprite(gameStateApt.enter.x + 700, gameStateApt.enter.y+32, 'monsterApt');
    //monsterApt.setScale(.25);

    //hammsApt = this.physics.add.sprite(gameStateApt.enter.x + 750, gameStateApt.enter.y+32, 'hammsApt');
    //hammsApt.setScale(.25);

    //larrySpecialApt = this.physics.add.sprite(gameStateApt.enter.x + 800, gameStateApt.enter.y+32, 'larrySpecialApt');
    //larrySpecialApt.setScale(.25);

    //door zone to leave

    //hitting pool balls

    canvas = this.sys.canvas;

    this.input.on('pointerdown', function(pointer, localX, localY) {
      //this is how you transform coordinates from ingame coordinates to "pointer" coordinates
      if (cueball.body.velocity.x < 5 && cueball.body.velocity.y < 5 && cueball.body.velocity.x > -5 && cueball.body.velocity.y > -5) {
        this.input.setDefaultCursor('url(assets/empty.png), pointer');
      }
    }, this);

    this.input.on('pointerup', function(pointer, localX, localY) {
      this.input.setDefaultCursor('url(assets/cross.png), pointer');
      //this is how you transform coordinates from ingame coordinates to "pointer" coordinates
      if (cueball.body.velocity.x < 5 && cueball.body.velocity.y < 5 && cueball.body.velocity.x > -5 && cueball.body.velocity.y > -5 && dragging) {

        //this.sys.canvas.style.cursor = 'default';
        //aiming.visible=false;
        //make chalk noise after a second
        opportunityForExtra2 = false;
        window.setTimeout(() => {
          triangleChalk.visible = false
        }, 1500)
        window.setTimeout(() => {
          gameStateApt.chalk.play()
        }, 2000)
        window.setTimeout(() => {
          x_rnd = Math.floor(Math.random() * 8)
          y_rnd = Math.floor(Math.random() * 6)
          triangleChalk.x = gameStateApt.poolTableTL.x + 5 + (x_rnd) * 21
          if (x_rnd > 0 && x_rnd < 7) {
            if (y_rnd > 2) {
              triangleChalk.y = gameStateApt.poolTableTL.y + 5
            } else {
              triangleChalk.y = gameStateApt.poolTableTL.y + 90
            }
          } else {
            triangleChalk.y = gameStateApt.poolTableTL.y + 5 + (y_rnd) * 12
          }
          triangleChalk.visible = true
        }, 5500)
        //setting english
        if (gameStateApt.keyObjS.isDown) {
          english.bottom = true;
        } else {
          english.bottom = false;
        }
        if (gameStateApt.keyObjA.isDown) {
          english.left = true;
        } else {
          english.left = false;
        }
        if (gameStateApt.keyObjD.isDown) {
          english.right = true;
        } else {
          english.right = false;
        }
        if (gameStateApt.keyObjW.isDown) {
          english.top = true;
        } else {
          english.top = false;
        }
        dragging = false
        cueHitEight = false;
        cueHitNine = false;
        pocketedEight = false;
        pocketedNine = false;
        gameState.poolhit.play()

        aimingLineLength = Math.sqrt(((cueball.x - poolcue.x - 40 * Math.sin(poolcue.angle * Math.PI / 180)) * 1.5) ** 2 + ((cueball.y - poolcue.y + 40 * Math.cos(poolcue.angle * Math.PI / 180)) * 1.5) ** 2)
        cueball.body.velocity.x = (cueball.x - poolcue.x) * aimingLineLength / 10
        cueball.body.velocity.y = (cueball.y - poolcue.y) * aimingLineLength / 10
        //cueball.body.velocity.x = (cueball.x - poolcue.x) * 5
        //cueball.body.velocity.y = (cueball.y - poolcue.y) * 5
        poolcue.x += (cueball.x - poolcue.x) / 2.2
        poolcue.y += (cueball.y - poolcue.y) / 2.2
        //changed from the following so that you could shoot using the stick instead of the pointer
        //cueball.body.velocity.x = (cueball.x - ((pointer.x - 468) / 3 + 2816)) * 3
        //cueball.body.velocity.y = (cueball.y - ((pointer.y - 155) / 3 + 1408)) * 3
      }
    }, this);
    //animations for balls

    this.anims.create({
      key: 'eightballspin',
      frames: this.anims.generateFrameNumbers('poolballs', {
        frames: [7, 9]
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: 'nineballspin',
      frames: this.anims.generateFrameNumbers('poolballs', {
        frames: [8, 10]
      }),
      frameRate: 5,
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

    this.input.keyboard.on("keydown", this.onKeyInput, this);

    var keyObj1 = this.input.keyboard.addKey('one'); // Get key object

    keyObj1.on('down', function(event) {
      zoom = .76
    });

    var keyObj2 = this.input.keyboard.addKey('two'); // Get key object

    keyObj2.on('down', function(event) {
      zoom = .76
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
      zoom = 6
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

    gameStateApt.keyObjS = this.input.keyboard.addKey('S'); // Get key object
    gameStateApt.keyObjA = this.input.keyboard.addKey('A'); // Get key object
    gameStateApt.keyObjD = this.input.keyboard.addKey('D'); // Get key object
    gameStateApt.keyObjW = this.input.keyboard.addKey('W'); // Get key object

    gameStateApt.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    gameStateApt.keyObjX = this.input.keyboard.addKey('X'); // Get key object
    gameStateApt.keyObjC = this.input.keyboard.addKey('C'); // Get key object

    //item collection and object interaction
    gameStateApt.keyObjS.on('down', function(event) {
      //back to light world from my apartment door
      if (meApt.x > gameStateApt.enter.x - 30 && meApt.x < gameStateApt.enter.x + 30 && meApt.y > gameStateApt.enter.y - 90 && meApt.y < gameStateApt.enter.y + 10) {
        scene_number = 2
        this.scene.switch("LightWorld");
        this.scene.sleep("PoolScore");
        me.x = gameState.PlayerSpawnPoint.x - 48;
        me.y = gameState.PlayerSpawnPoint.y - 64;
        console.log(`switched to lightworld from my apartment door inside`)
      } else if (distance(meApt, gameStateApt.trevorAptEnter)<30) {
        scene_number = 2
        this.scene.switch("LightWorld");
        this.scene.sleep("PoolScore");
        me.x = gameState.trevorsApartment.x;
        me.y = gameState.trevorsApartment.y;
        console.log(`switched to lightworld from my apartment door inside`)
      } else if (distance(yogaBlocks, meApt) < 40 && gotYogaBlocks === false) {
        console.log('got yoga blocks')
        gotYogaBlocks = true;
        yogaBlocks.disableBody(true, true);
        items.push("Yoga Blocks")
        gameState.itemget.play()
      }
      //switch to light world from clubhouse 731 entrance
      else if (!joeBets && !jamesBets && meApt.x > gameState.clubhouseInside731Entrance.x - 30 && meApt.x < gameState.clubhouseInside731Entrance.x + 30 && meApt.y > gameState.clubhouseInside731Entrance.y - 30 && meApt.y < gameState.clubhouseInside731Entrance.y + 30) {
        scene_number = 2
        this.scene.switch("LightWorld");
        this.scene.sleep("PoolScore");
        me.x = gameState.clubhouse731BR.x - 16;
        me.y = gameState.clubhouse731BR.y - 100;
      }
      //switch to light world from clubhouse burcham woods entrance
      else if (!joeBets && !jamesBets &&  meApt.x > gameState.clubhouseInsideWoodsEntrance.x - 30 && meApt.x < gameState.clubhouseInsideWoodsEntrance.x + 30 && meApt.y > gameState.clubhouseInsideWoodsEntrance.y - 30 && meApt.y < gameState.clubhouseInsideWoodsEntrance.y + 30) {
        scene_number = 2
        this.scene.switch("LightWorld");
        this.scene.sleep("PoolScore");
        me.x = gameState.clubhousewoodsTL.x + 20;
        me.y = gameState.clubhousewoodsTL.y + 35;
      } else if (distance(meApt, gameStateApt.elevatorUpstairs) < 60) {
        meApt.x = gameStateApt.elevatorDownstairs.x
        meApt.y = gameStateApt.elevatorDownstairs.y
        if (stripperApt.following){
          stripperApt.x = meApt.x;
          stripperApt.y = meApt.y;
        }
      } else if (distance(meApt, gameStateApt.elevatorDownstairs) < 60) {
        meApt.x = gameStateApt.elevatorUpstairs.x
        meApt.y = gameStateApt.elevatorUpstairs.y
        if (stripperApt.following){
          stripperApt.x = meApt.x;
          stripperApt.y = meApt.y;
        }
      }
      //to sleep in bed
      else if (meApt.x > gameState.bed.x - 50 && meApt.x < gameState.bed.x + 50 && meApt.y > gameState.bed.y - 50 && meApt.y < gameState.bed.y + 50) {
        this.physics.pause()
        this.cameras.main.fade(1000);
        sleep();
        window.setTimeout(() => {
          this.cameras.main.fadeIn(1000, 0, 0, 0)
        }, 1000);
        if (!stripperApt.following) {
          window.setTimeout(() => {
            sleepyText = this.add.text(meApt.x - 100, meApt.y - 150, 'You feel well rested', {
              fontSize: '30px',
              fill: '#fff'
            });
          }, 1000);
          window.setTimeout(() => {
            sleepyText.setText('')
            this.physics.resume()
          }, 6000);
        } else if (stripperApt.following) {
          console.log(`shes following`)
          window.setTimeout(() => {
            gameState.itemget.play();
            stripperApt.x = gameStateApt.stripperAptSpawnPoint.x;
            stripperApt.y = gameStateApt.stripperAptSpawnPoint.y;
            stripperApt.following = false;
            stripperBanged = true;
            damageObject["Mac"] += 5;
            hpObject["Mac"] += 20;
            maxHPObject["Mac"] += 20;
            sleepyText = this.add.text(meApt.x - 100, meApt.y - 200, 'You feel well rested.\nMac gets the "Bang Bonus"\n+5 damage +20 HP (permanent)', {
              fontSize: '30px',
              fill: '#fff'
            });
          }, 1000);
          window.setTimeout(() => {
            sleepyText.setText('')
            this.physics.resume()
          }, 6000);

        }
      }
      //get keyboard
      else if (!keyboardGet && distance(meApt,gameStateApt.keyboard)<40) {
          keyboardDialogue = true;
          gameState.itemget.play;
          keyboardGet = true;
      }
    }, this);

    this.Megaman = this.scene.get("Megaman");

    this.sys.events.on('wake', this.wake, this);
    this.scene.launch("PoolScore");
    this.scene.run("PoolScore");
    this.scene.launch('DialogueMenu');
    this.scene.run('DialogueMenu');
  },

  update: function() {
    if (startMegaman){
      startMegaman = false;
      this.scene.launch("MegamanUI");
      //this.scene.run("MegamanUI");
      this.scene.switch("Megaman")
    }

    //opens penguin fight if penguin is alive, and opens stag fight if stag is alive
    if (distance(meApt,trevorApt)<30 && trevorAptFirstDialogue === 0){
      trevorAptFirstDialogue = 1;
      this.openDialoguePage(29)
    } else if (distance(meApt,trevorApt)>60 && trevorAptFirstDialogue === 1){
      if (this.Megaman.penguinAlive){
        trevorAptFirstDialogue = 0;
      } else {
        trevorAptFirstDialogue = 2;
      }
    } else if (distance(meApt,trevorApt)<30 && trevorAptFirstDialogue === 2){
      trevorAptFirstDialogue = 3;
      this.openDialoguePage(299)
    } else if (distance(meApt,trevorApt)>60 && trevorAptFirstDialogue === 3){
      if (this.Megaman.stagAlive){
        trevorAptFirstDialogue = 2;
      } else {
        trevorAptFirstDialogue = 4;
      }
    }
    if (keyboardGet && distance(meApt,gameStateApt.keyboard)>60){
      keyboardGet = false;
    }
    //setting depth for me
    meApt.setDepth(meApt.y);

    //ai for stripper

    if (stripperApt.following) {
      stripperApt.follow(meApt, .55);
      stripperApt.animate(5);
      if (stripperApt.body.velocity.x > 3) {
        stripperApt.flipX = true;
      } else if (stripperApt.body.velocity.x < -3) {
        stripperApt.flipX = false;
      }
    }
    //fixed speed at 2 becuase always using walk animations
    speed = 2;
    //launch keyboard dialogue
    if (keyboardDialogue) {
      keyboardDialogue = false;
      this.openDialoguePage(4000)
    }
    if (openKeyboard){
      openKeyboard = false;
      this.scene.launch('Keyboard');
        gameStateApt.indoors0.stop()
        gameStateApt.indoors1.stop()
        gameStateApt.indoors2.stop()
        gameStateApt.indoors3.stop()
    }
    //for english indicator
    if (gameStateApt.keyObjS.isDown) {
      englishIndicator.bottom = true;
    } else {
      englishIndicator.bottom = false;
    }
    if (gameStateApt.keyObjA.isDown) {
      englishIndicator.left = true;
    } else {
      englishIndicator.left = false;
    }
    if (gameStateApt.keyObjD.isDown) {
      englishIndicator.right = true;
    } else {
      englishIndicator.right = false;
    }
    if (gameStateApt.keyObjW.isDown) {
      englishIndicator.top = true;
    } else {
      englishIndicator.top = false;
    }
    //to set the strength of english
    if (gameStateApt.keyObjZ.isDown) {
      englishStrength = 1
    } else if (gameStateApt.keyObjX.isDown) {
      englishStrength = 2
    } else if (gameStateApt.keyObjC.isDown) {
      englishStrength = 3
    }
    //for rail english
    if (railEnglish === true) {
      railEnglish = false;
      vx1 = cueball.body.velocity.x
      vy1 = cueball.body.velocity.y
      ball1finalspeed = Math.sqrt(vx1 ** 2 + vy1 ** 2)
      if (vx1 > 0) {
        phi0 = Math.atan(vy1 / vx1)
      } else if (vx1 <= 0 && vy1 < 0) {
        phi0 = Math.PI + Math.atan(vy1 / vx1)
      } else if (vx1 <= 0 && vy1 > 0) {
        phi0 = Math.PI / 2 - Math.atan(vx1 / vy1)
      }
      phi = -phi0;
      if (english.right && (_hitTopRail || _hitTopRailRight || _hitBottomRail || _hitBottomRailRight)) {
        english = {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
        //this describes quadrants 3 and 4 in the usual sense
        if ((phi0 <= -Math.PI / 3 && phi0 >= -Math.PI / 2) || (phi0 <= 3 * Math.PI / 2 && phi0 >= 3 * Math.PI / 2 - Math.PI / 6)) {
          phi = -phi0 + Math.PI / 6 * englishStrength / 3
        } else if ((phi0 <= 0 && phi0 > -Math.PI / 3) || (phi0 < 3 * Math.PI / 2 - Math.PI / 6 && phi0 > Math.PI)) {
          if (vx1 > 0) {
            phi = -phi0 - Math.abs(phi0) / 2 * englishStrength / 3
          } else {
            phi = 2 * Math.PI - phi0 + (phi0 - Math.PI) / 2 * englishStrength / 3
          }
        }
        //and this describes the first two quadrants
        else if (phi0 >= Math.PI / 3 && phi0 <= 2 * Math.PI / 3) {
          phi = -phi0 + Math.PI / 6 * englishStrength / 3
        } else if (phi0 >= 0 && phi0 <= Math.PI) {
          phi = -phi0 + Math.abs(phi0) / 2 * englishStrength / 3
        }
        cueball.body.velocity.x = ball1finalspeed * Math.cos(phi);
        cueball.body.velocity.y = ball1finalspeed * Math.sin(phi);
      } else if (english.left && (_hitTopRail || _hitTopRailRight || _hitBottomRail || _hitBottomRailRight)) {
        english = {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
        //this describes quadrants 3 and 4 in the usual sense
        if ((phi0 <= -Math.PI / 3 && phi0 >= -Math.PI / 2) || (phi0 <= 3 * Math.PI / 2 && phi0 >= 3 * Math.PI / 2 - Math.PI / 6)) {
          phi = -phi0 - Math.PI / 6 * englishStrength / 3
        } else if ((phi0 <= 0 && phi0 > -Math.PI / 3) || (phi0 < 3 * Math.PI / 2 - Math.PI / 6 && phi0 > Math.PI)) {
          if (vx1 > 0) {
            phi = -phi0 - Math.abs(phi0) / 2 * englishStrength / 3
          } else {
            phi = 2 * Math.PI - phi0 + (phi0 - Math.PI) / 2 * englishStrength / 3
          }
        }
        //and this describes the first two quadrants
        else if (phi0 >= Math.PI / 3 && phi0 <= 2 * Math.PI / 3) {
          phi = -phi0 - Math.PI / 6 * englishStrength / 3
        } else if (phi0 >= 0 && phi0 <= Math.PI) {
          phi = -phi0 - Math.abs(phi0) / 2 * englishStrength / 3
        }
        cueball.body.velocity.x = ball1finalspeed * Math.cos(phi);
        cueball.body.velocity.y = ball1finalspeed * Math.sin(phi);
      } else if (english.right && (_hitLeftRail || _hitRightRail)) {
        english = {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
        //this describes quadrants 2 and 3 in the usual sense
        if (phi0 >= Math.PI / 2 + Math.PI / 3 && phi0 <= 3 * Math.PI / 2 - Math.PI / 3) {
          phi = -(phi0 - Math.PI) + Math.PI / 6 * englishStrength / 3
        } else if (phi0 >= Math.PI / 2 && phi0 <= 3 * Math.PI / 2) {
          phi = -(phi0 - Math.PI) //+ (phi0-Math.PI)/2
        }
        //and this describes quandrants 1 and 4
        else if (phi0 >= -Math.PI / 3 && phi0 <= Math.PI / 3) {
          phi = (Math.PI - phi0) + Math.PI / 6 * englishStrength / 3
        } else if (phi0 >= -Math.PI / 2 && phi0 <= Math.PI / 2) {
          phi = (Math.PI - phi0) //- (Math.PI/2-Math.abs(phi0))/2
        }
        cueball.body.velocity.x = ball1finalspeed * Math.cos(phi);
        cueball.body.velocity.y = ball1finalspeed * Math.sin(phi);
      } else if (english.left && (_hitLeftRail || _hitRightRail)) {
        english = {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
        //this describes quadrants 2 and 3 in the usual sense
        if (phi0 >= Math.PI / 2 + Math.PI / 3 && phi0 <= 3 * Math.PI / 2 - Math.PI / 3) {
          phi = -(phi0 - Math.PI) - Math.PI / 6 * englishStrength / 3
        } else if (phi0 >= Math.PI / 2 && phi0 <= 3 * Math.PI / 2) {
          phi = -(phi0 - Math.PI) //- (phi0-Math.PI)/2
        }
        //and this describes quandrants 1 and 4
        else if (phi0 >= -Math.PI / 3 && phi0 <= Math.PI / 3) {
          phi = -(Math.PI - phi0) - Math.PI / 6 * englishStrength / 3
        } else if (phi0 >= -Math.PI / 2 && phi0 <= Math.PI / 2) {
          phi = -(Math.PI - phi0) //- (Math.PI/2-Math.abs(phi0))/2
        }
        cueball.body.velocity.x = ball1finalspeed * Math.cos(phi);
        cueball.body.velocity.y = ball1finalspeed * Math.sin(phi);
      }
      _hitTopRail = false;
      _hitTopRailRight = false;
      _hitBottomRail = false;
      _hitBottomRailRight = false
      _hitLeftRail = false;
      _hitRightRail = false;
    }
    if (dragging) {
      lineCounter += 1
      gameState.lines[lineCounter] = new Phaser.Geom.Line(cueball.x, cueball.y, cueball.x + (cueball.x - poolcue.x - 40 * Math.sin(poolcue.angle * Math.PI / 180)) * 1.5, cueball.y + (cueball.y - poolcue.y + 40 * Math.cos(poolcue.angle * Math.PI / 180)) * 1.5);
      if (!this.graphics) {
        this.graphics = this.add.graphics({
          x: 0,
          y: 0,

          lineStyle: {
            width: 1,
            color: 0xffffff,
            //     alpha: 1
          },
          fillStyle: {
            color: 0xffffff,
            //     alpha: 1
          },

          add: true
        });
      }
      this.graphics.strokeLineShape(gameState.lines[lineCounter]);
      window.setTimeout(() => {
        this.graphics.clear()
      }, 5);
    }

    // timer for pool betting
    gameStateApt.poolscore.setText(`Points: ${twoballscore}`)
    if (joeNotEnoughToBet) {
      joeNotEnoughToBet = false
      this.openDialoguePage(3014)

    } else if (jamesNotEnoughToBet) {
      jamesNotEnoughToBet = false
      this.openDialoguePage(3024)

    }
    if (_timerStart) {
      if (resetTime) {
        if (joeBets) {
          timeApt = 7200;
          resetTime = false
        } else if (jamesBets) {
          timeApt = 7200 * 3 / 2;
          resetTime = false
        }
      }
      poolDialogue = false
      timeApt -= 1
      gameStateApt.pooltimer.setText(`Time: ${Math.floor(timeApt/60/60)}:${Math.floor((timeApt/60)%60)}`);
      if (twoballscore >= 4 && joeBets) {
        this.openDialoguePage(3015)
        _timerStart = false;
        joeBets = false;
        twoballscore = 0
        gameStateApt.pooltimer.setText(``)
        timeApt = 0
        if (activeQuests["Bets with Joe"]) {
          completeQuest("Bets with Joe")
        }
      } else if (twoballscore >= 3 && jamesBets) {
        this.openDialoguePage(3025)
        _timerStart = false;
        jamesBets = false;
        twoballscore = 0
        gameStateApt.pooltimer.setText(``)
        timeApt = 0
      } else if (timeApt === 0) {
        if (joeBets) {
          joeBets = false;
          _timerStart = false;
          if (twoballscore < 4) {
            console.log(`twoballscore: ${twoballscore}`)
            this.openDialoguePage(3016)
          }
          twoballscore = 0
        } else if (jamesBets) {
          jamesBets = false;
          _timerStart = false;
          if (twoballscore < 3) {
            this.openDialoguePage(3026)
          }
          twoballscore = 0
        }
      }
    }
    if (distance(meApt, blondeApt) < 20 && blondeTalk === false) {
      blondeTalk = true;
      this.openDialoguePage(4010)

    } else if (distance(meApt, blondeApt) > 40) {
      blondeTalk = false
    }

    //spawn joe if you spoke outside
    if (joeGet === 'initial') {
      joeApt.disableBody(true, true)
      joeGet = 'waiting'
    } else if (joeGet === 'spoke') {
      joeApt.enableBody(true, gameState.clubhouseInside731Entrance.x + 480, gameState.clubhouseInside731Entrance.y - 50, true, true);
      joeGet = 'spawned'
    }

    //spawn joe if you spoke outside
    if (jamesGet === 'initial') {
      jamesApt.disableBody(true, true)
      jamesGet = 'waiting'
    } else if (jamesGet === 'spoke') {
      jamesApt.enableBody(true, gameState.clubhouseInside731Entrance.x + 470, gameState.clubhouseInside731Entrance.y + 50, true, true);
      jamesGet = 'spawned'
    }
    //dialogue for joe and james
    if (distance(meApt, joeApt) < 10 && joePoolTalk === false && joeGet === 'spawned') {
      joePoolTalk = true;
      this.openDialoguePage(3010)

    } else if (distance(meApt, joeApt) > 40) {
      joePoolTalk = false
    }
    if (distance(meApt, jamesApt) < 10 && jamesPoolTalk === false && jamesGet === 'spawned') {
      jamesPoolTalk = true;
      this.openDialoguePage(3020)

    } else if (distance(meApt, jamesApt) > 40) {
      jamesPoolTalk = false
    }
    if (nineball.body.velocity.x ** 2 + nineball.body.velocity.y ** 2 > 40 && !nineball.body.velocity.x === 0) {
      nineball.angle = Math.atan(nineball.body.velocity.y / nineball.body.velocity.x)
    }
    if (eightball.body.velocity.x ** 2 + eightball.body.velocity.y ** 2 > 40) {
      eightball.anims.play('eightballspin', true)
    }
    if (nineball.body.velocity.x ** 2 + nineball.body.velocity.y ** 2 > 40) {
      nineball.anims.play('nineballspin', true)
    }
    if (distance(cueball, eightball) < 5.6) { //was 5.6
      cueHitEight = true
      if (!alreadyPlayedEightCueCollide) {
        bringToTouching(cueball, eightball)
        gameState.poolcollide.play()
        alreadyPlayedEightCueCollide = true
        ballCollide(cueball, eightball);
      }
    }
    if (distance(cueball, nineball) < 5.6) { //was 5.6
      cueHitNine = true
      if (!alreadyPlayedNineCueCollide) {
        bringToTouching(cueball, nineball)
        gameState.poolcollide.play()
        alreadyPlayedNineCueCollide = true
        ballCollide(cueball, nineball);
      }
    }
    if (distance(eightball, nineball) < 5.6) {
      if (!alreadyPlayedEightNineCollide) {
        gameState.poolcollide.play()
        alreadyPlayedEightNineCollide = true
        ballCollide(eightball, nineball);
      }
    }
    if (distance(cueball, eightball) > 10) {
      alreadyPlayedEightCueCollide = false
    }
    if (distance(cueball, nineball) > 10) {
      alreadyPlayedNineCueCollide = false
    }
    if (distance(eightball, nineball) > 10) {
      alreadyPlayedEightNineCollide = false
    }
    if (pocketedEight || pocketedNine) {
      if (cueHitEight && cueHitNine) {
        pocketedEight = false;
        pocketedNine = false;
        twoballscore += 1
        //gameState.itemget.play()
        gameStateApt.ohShit.play()
        opportunityForExtra2 = true
      }
    }
    if (opportunityForExtra2) {
      if (pocketedEight || pocketedNine) {
        opportunityForExtra2 = false
        pocketedEight = false;
        pocketedNine = false;
        twoballscore += 2
        gameState.itemget.play()
        gameStateApt.ohShit.play()
      }
    }
    //for balls falling in pockets
    if (eightInPocket) {
      gameState.poolpocket.play()
      pocketedEight = true
      eightInPocket = false
      eightball.disableBody(true, true);
    } else if (nineInPocket) {
      gameState.poolpocket.play()
      pocketedNine = true
      nineInPocket = false
      nineball.disableBody(true, true);
    } else if (cueInPocket) {
      gameState.poolpocket.play()
      cueInPocket = false
      cueball.disableBody(true, true);
    }

    //for camera in pool zone
    if (meApt.x > gameStateApt.poolTableZoneTL.x + 20 && meApt.x < gameStateApt.poolTableZoneBR.x + 50 && meApt.y > gameStateApt.poolTableZoneTL.y - 50 && meApt.y < gameStateApt.poolTableZoneBR.y + 50) {
      camera.stopFollow();
      //zoom = 3;
      camera.centerOn(2890, 1457);
      if (poolDialogue) {
        poolDialogue = false
        //meApt.x = gameStateApt.poolTableTL.x - 110
        //meApt.y = gameStateApt.poolTableTL.y + 50
        this.openDialoguePage(3000)

      }
    } else {
      camera.startFollow(meApt, true)
      //zoom = 1
    }
    //balls should be balls
    cueball.beABall()
    eightball.beABall()
    nineball.beABall()
    //for going back to light world
    //pause
    if (pause) {
      this.physics.pause()
      keepaway -= 1
    } else {
      this.physics.resume()
    }

    //camera and cursors
    this.cameras.main.zoom = zoom;
    this.cursors = this.input.keyboard.createCursorKeys();

    //player controls and animations
    meApt.body.setVelocity(0);

    // player Horizontal movement
    if (this.cursors.left.isDown) {
      meApt.body.setVelocityX(-50 * speed * athletics);
    } else if (this.cursors.right.isDown) {
      meApt.body.setVelocityX(50 * speed * athletics);
    }

    // player Vertical movement
    if (this.cursors.up.isDown) {
      meApt.body.setVelocityY(-50 * speed * athletics);
    } else if (this.cursors.down.isDown) {
      meApt.body.setVelocityY(50 * speed * athletics);
    }

    //player walking running animations
    if (this.cursors.left.isDown) {
      meApt.anims.play('rightwalk', true);
      meApt.flipX = true;
    } else if (this.cursors.right.isDown) {
      meApt.anims.play('rightwalk', true);
      meApt.flipX = false;
    }

    if (this.cursors.up.isDown && !(this.cursors.right.isDown)) {
      meApt.anims.play('rightwalk', true);
      meApt.flipX = true;
    } else if (this.cursors.down.isDown && !(this.cursors.left.isDown)) {
      meApt.anims.play('rightwalk', true);
      meApt.flipX = false;
    }
    if (meApt.body.velocity.x === 0 && meApt.body.velocity.y === 0) {
      meApt.anims.play('turn', true)
    }
    meApt.x = Math.round(meApt.x);
    meApt.y = Math.round(meApt.y);
  }

});
