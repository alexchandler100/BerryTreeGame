//constants and parameters
const gameState = {};

var OnScreenMessage = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  initialize: function OnScreenMessage(scene, events, x, y) {
    this.x = x;
    this.y = y;
    Phaser.GameObjects.Container.call(this, scene, this.x, this.y);
    var graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-150, -25, 300, 50);
    graphics.fillRect(-150, -25, 300, 50);
    graphics.setDepth(2000000)
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
    this.text.setOrigin(0.5).setDepth(2000000);
    events.on("Message", this.showMessage, this);
    this.visible = false;
  },
  showMessage: function(text) {
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
  initialize: function NPC(scene, spawnPoint, texture, frame, type, left, right, up, down, idle, dialogue, joinParameter, slowFollowRate, fastFollowRate, idleFollowRate) {
    let point;
    if (scene_number === 'indoors') {
      point = mapApt.findObject("objects", obj => obj.name === spawnPoint);
    } else {
      point = map.findObject("Objects", obj => obj.name === spawnPoint);
    }
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
    this.idle = idle;
    this.dialogue = dialogue;
    this.slowFollowRate = slowFollowRate;
    this.fastFollowRate = fastFollowRate;
    this.idleFollowRate = idleFollowRate;
    this.position = 0;
    this.stuck = false;
    this.stuckTimer = 0;
    this.stuckTimerStart = false;
    this.stuckTimerOngoing = false;
    this.changeDirection = false;
    this.idleRadius = 130;
    this.setInteractive().on('pointerup', function() {
      if (this.following === false && this.joinParameter) {
        this.following = true;
        currentParty[this.type] = true
      } else if (this.following) {
        this.following = false
        currentParty[this.type] = false
      }
    });
    this.setScale(overworldScale[this.texture.key]);
    this.setSize(sizeAndOffset[this.texture.key].size[0], sizeAndOffset[this.texture.key].size[1])
    this.setOffset(sizeAndOffset[this.texture.key].offset[0], sizeAndOffset[this.texture.key].offset[1])
    this.sound0 = scene.sound.add(this.dialogue);
  },
  animate: function(thresh = 10) {
    this.setDepth(this.y)
    if (distance(this.body,me) > this.idleRadius || !this.following){
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
    } else if (distance(this.body,me) < this.idleRadius - 20 && this.following){
      this.anims.play(this.idle, true);
    }
  },
  // to follow player and join party
  follow: function(player, strength = 1) {
    if (this.following && !this.stuck && inPool === false) {
      if (distance(this.body, player) > 600 && playerTexture === 0) { //appears near you if following and too far away
        let xx = (Math.random()-.5)*60;
        let yy = (Math.random()-.5)*60;
        this.disableBody(true, true);
        this.enableBody(true, player.x+xx, player.y+yy, true, true);
      } else if (distance(this.body, player) > this.idleRadius) { // if you are running away they follow you and change frame rate depending on their speed
        if (spriteSpeed(this)<200){
          this.anims.msPerFrame = this.slowFollowRate;
        } else if (spriteSpeed(this)>200){
          this.anims.msPerFrame = this.fastFollowRate;
        }
        this.body.velocity.x = Math.sign(player.x - this.body.x)*(player.x - this.body.x)**2/500 * strength
        this.body.velocity.y = Math.sign(player.y - this.body.y)*(player.y - this.body.y)**2/500 * strength
      } else if (distance(this.body, player) < this.idleRadius - 20 && (this.type==="Jimmy"|| this.type==="James")) {
        if (overworldClock%60 === 0){
            this.body.setVelocity(0,0);
        }
        this.randomWalk(2);
        this.anims.msPerFrame = this.idleFollowRate;
      } else if (distance(this.body, player) < this.idleRadius - 20 && (this.type==="Jean Claude")) {
        if (spriteSpeed(player) <50 && this.body.x>player.x && this.body.x<player.x+15){
          this.x = player.x+15
        } else if (spriteSpeed(player) <50 && this.body.x<player.x && this.body.x>player.x-15){
          this.x = player.x-15
        }
        this.body.setVelocityX((player.x - this.body.x) * strength)
        this.body.setVelocityY((player.y - this.body.y) * strength)
        this.anims.msPerFrame = this.idleFollowRate;
      } else if (distance(this.body, player) < this.idleRadius - 20 && (this.type==="Bennett" || this.type==="Al" || this.type==="Stripper")) {
        this.body.setVelocity(0,0);
        this.anims.msPerFrame = this.idleFollowRate;
      }
    } else if (this.following && !this.stuck && inPool) {
      this.body.velocity.x = (beachball.x - this.body.x) * 2
      this.body.velocity.y = (beachball.y - this.body.y) * 2
    }
  },
  randomWalk: function randomWalk(strength = 1) {
    this.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
    this.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);

    if (this.body.velocity.x > 50 || this.body.velocity.x < -50 || this.body.velocity.y > 50 || this.body.velocity.y < -50) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

    }
  },
  chase: function(thing2, strength = 1.2, offset = 0) { //makes thing1 chase thing2 with strength and offset
    if (this.following === false && !this.stuck && !pause) {
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
  getUnstuck: function(strength = 5) {
    if ((this.body.blocked.up || this.body.blocked.down || this.body.blocked.right || this.body.blocked.left) && (!this.stuckTimerStart && !this.stuckTimerOngoing)) {
      this.stuck = true;
      this.stuckTimerStart = true;
    }
    if (this.stuckTimerStart) {
      this.stuckTimerStart = false
      this.stuckTimerOngoing = true
    }
    if (this.stuckTimerOngoing) {
      this.stuckTimer += 1
    }
    if (this.stuckTimer >= 50 && this.body.velocity.x ** 2 + this.body.velocity.y ** 2 > 50) {
      this.stuck = false;
      this.stuckTimerOngoing = false;
      this.stuckTimer = 0
    }

    if (this.body.blocked.up) {
      let direction = me.x - this.x;
      if (direction > 0) {
        this.x += strength
      } else if (direction <= 0) {
        this.x -= strength
      }
    }
    if (this.body.blocked.down) {
      let direction = me.x - this.x;
      if (direction > 0) {
        this.x += strength
      } else if (direction <= 0) {
        this.x -= strength
      }
    }
    if (this.body.blocked.left) {
      let direction = me.y - this.y;
      if (direction > 0) {
        this.y += strength
      } else if (direction <= 0) {
        this.y -= strength
      }
    }
    if (this.body.blocked.right) {
      let direction = me.y - this.y;
      if (direction > 0) {
        this.y += strength
      } else if (direction <= 0) {
        this.y -= strength
      }
    } else if (this.stuck) {
      let directionX = me.x - this.x;
      let directionY = me.y - this.y
      this.body.velocity.x = -directionY
      this.body.velocity.y = directionX
    }

  },

});

var Car = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Sprite,
  //notes: dialogue is a dictionary of audio objects like {"al": alSound} (fix needed...)
  // left, right, up, down are strings like 'alright' or 'jonleft'
  initialize: function Car(scene, spawnPoint, frame, position = 0) {
    let point = map.findObject("Objects", obj => obj.name === spawnPoint);
    point.x += 1;
    point.y += 1;
    Phaser.GameObjects.Sprite.call(this, scene, point.x, point.y, 'cars', frame);
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.position = position;
    this.changeDirection = false;
    this.body.setCircle(16);
    this.body.setOffset(0, 16);
    this.honking = false;
  },
  honk: function() {
    if (distance(me, this) < 100 && !this.honking) {
      this.honking = true
      honkIndex = Math.floor(Math.random() * 3);
      screamIndex = Math.floor(Math.random() * 8);
      chanceToScreamIndex = Math.floor(Math.random() * 3);
      chanceToHonkIndex = Math.floor(Math.random() * 3);
      if (honkIndex === 0 && chanceToHonkIndex === 0) {
        gameState.honk1.play()
      } else if (honkIndex === 1 && chanceToHonkIndex === 0) {
        gameState.honk2.play()
      } else if (honkIndex === 2 && chanceToHonkIndex === 0) {
        gameState.honk3.play()
      }
      if (screamIndex === 0 && chanceToScreamIndex === 0) {
        gameState.carScream1.play()
      } else if (screamIndex === 1 && chanceToScreamIndex === 0) {
        gameState.carScream2.play()
      } else if (screamIndex === 2 && chanceToScreamIndex === 0) {
        gameState.carScream3.play()
      } else if (screamIndex === 3 && chanceToScreamIndex === 0) {
        gameState.carScream4.play()
      } else if (screamIndex === 4 && chanceToScreamIndex === 0) {
        gameState.carScream5.play()
      } else if (screamIndex === 5 && chanceToScreamIndex === 0) {
        gameState.carScream6.play()
      } else if (screamIndex === 6 && chanceToScreamIndex === 0) {
        gameState.carScream7.play()
      } else if (screamIndex === 7 && chanceToScreamIndex === 0) {
        gameState.carScream8.play()
      }
    } else if (distance(me, this) > 200) {
      this.honking = false;
    }
  },
  animate: function() {
    if (this.body.velocity.x > 50 && this.body.velocity.y ** 2 < 100) {
      this.angle = 90
      this.body.setOffset(0, 16);
    } else if (this.body.velocity.x < -50 && this.body.velocity.y ** 2 < 100) {
      this.angle = 270
    }
    if (this.body.velocity.y > 50 && this.body.velocity.x ** 2 < 100) {
      this.angle = 180
    } else if (this.body.velocity.y < -50 && this.body.velocity.x ** 2 < 100) {
      this.angle = 0
    }
  },
});

var CopCar = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Sprite,
  //notes: dialogue is a dictionary of audio objects like {"al": alSound} (fix needed...)
  // left, right, up, down are strings like 'alright' or 'jonleft'
  initialize: function CopCar(scene, spawnPoint, position = 0) {
    let point = map.findObject("Objects", obj => obj.name === spawnPoint);
    point.x += 1;
    point.y += 1;
    Phaser.GameObjects.Sprite.call(this, scene, point.x, point.y, 'cars', 4);
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.position = position;
    this.changeDirection = false;
    this.body.setCircle(16);
    this.body.setOffset(0, 16);
    this.sirens = false;
  },
  soundSiren: function() {
    if (distance(me, this) < 500 && playerTexture === 0 && !this.sirens) {
      this.sirens = true
      rnd = Math.floor(Math.random() * 2);
      if (rnd === 0) {
        gameState.siren1.play()
      } else if (rnd === 1) {
        gameState.siren2.play()
      }
    } else if (distance(me, this) > 500) {
      this.sirens = false;
    }
  },
  animate: function() {
    if (this.body.velocity.x > 50 && this.body.velocity.y ** 2 < 100) {
      this.angle = 90
      this.body.setOffset(0, 16);
    } else if (this.body.velocity.x < -50 && this.body.velocity.y ** 2 < 100) {
      this.angle = 270
    }
    if (this.body.velocity.y > 50 && this.body.velocity.x ** 2 < 100) {
      this.angle = 180
    } else if (this.body.velocity.y < -50 && this.body.velocity.x ** 2 < 100) {
      this.angle = 0
    }
  },
});

var LightWorld = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "LightWorld"
    });
    this.gettingHitByCar = false;
    this.gettingLaidOutByCar = false;
    this.gettingLaidOutByCarFrame = 12;
    this.gettingLaidOutByCarAngularSpeed = 10;
    this.gettingLaidOutByCarvelocity = [0, 0];
    this.ollie = false;
    this.ollieTimer = 0;
    this.kickflip = false;
    this.kickflipTimer = 0;
    this.kickflipTimerRunning = false;
    this.playingSkateboard = false;
    this.kickflipCounter = 0;
  },
  init: function(data) {},
  //custom functions
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
  wake: function() {
    this.input.setDefaultCursor('url(assets/images/handPointer.png), pointer');
    this.scene.sleep("PoolScore");
    if (playing){
      gameState.music.stop()
    }
    if (loadedIndoorsThemes) {
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
    if (stripperBanged) { //after you bang, she stops following
      stripper.following = false;
      stripper.joinParameter = false;
      stripper.position = 9
      stripper.x = stripperPath[9].x - 2;
      stripper.y = stripperPath[9].y;
      jeanClaude.x = stripper.x;
      jeanClaude.y = stripper.y - 4;
    }
  },
  onKeyInput: function(event) {
    if (event.code === "Backspace") {
      ball.disableBody(true, true);
      ball.enableBody(true, gameState.BallSpawnPoint.x, gameState.BallSpawnPoint.y, true, true);
      if (distance(me, volleyball) < 700) {
        volleyball.disableBody(true, true);
        volleyball.enableBody(true, gameState.VolleyballSpawnPoint.x - 32, gameState.VolleyballSpawnPoint.y - 250, true, true);
      }
    }
  },
  getHitByCar: function() {
    if (!this.gettingHitByCar && !this.ollie && playerTexture!==1) {
      gameState.carhit.play()
      this.gettingHitByCar = true
      if (stamina > 10 && playerTexture === 0) {
        stamina = 10
      } else if (playerTexture === 'board') {
        stamina -= 15
      }
        me.setFrame(12)
      } else if (!this.gettingHitByCar && !this.ollie && playerTexture===1) {
        gameState.carhit.play()
        this.gettingHitByCar = true
        }
  },
  onMeetEnemy1: function(player, zone) {
    if (worldTheme === 'light' && playerTexture === 0 && inPool === false && !chasersEnabled) {
      chasersEnabled = true;
      chaserClock = 0
      zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      rr = Math.floor(Math.random() * enemsForChasers.length);
      ss = Math.floor(Math.random() * enemsForChasers.length);
      tt = Math.floor(Math.random() * enemsForChasers.length);
      pp = Math.floor(Math.random() * enemsForChasers.length);
      qq = Math.floor(Math.random() * enemsForChasers.length);
      set1 = new Set([rr, ss]);
      set2 = new Set([rr, ss, tt]);
      set3 = new Set([rr, ss, tt, pp]);
      set4 = new Set([rr, ss, tt, pp, qq]);
      let chasersIndexArray = []
      chasersIndexArray.push(rr)
      if (set1.size === 2) {
        chasersIndexArray.push(ss)
      }
      if (set2.size === 3 && numberOfPlayers >= 2) {
        chasersIndexArray.push(tt)
      }
      if (set3.size === 4 && numberOfPlayers >= 2) {
        chasersIndexArray.push(pp)
      }
      if (set4.size === 5 && numberOfPlayers >= 3) {
        chasersIndexArray.push(qq)
      }
      for (const i of chasersIndexArray) {
        let theta = Math.random() * 2 * 3.1415;
        //I need to make these only exist during the chasing and then destroy to optimize memory usage (fix needed...)
        chasers[i].enableBody(true, me.x + 250 * Math.cos(theta), me.y + 250 * Math.sin(theta), true, true);
      }
      window.setTimeout(() => {
        for (const i of chasersIndexArray) {
          runaway = true;
        }
      }, 7000);
      window.setTimeout(() => {
        for (const i of chasersIndexArray) {
          runaway = false;
          chasers[i].disableBody(true, true);
          chasersEnabled = false;
        }
      }, 14000);
    }
  },

  onMeetEnemy2: function() {
    if (worldTheme === 'light' && playerTexture === 0 && keepaway <= 100 && !diving && pageDisplayed === 0) {
      //keepaway<400 because otherwise fight can disrupt quest dialogue for jimmy
      //this.cameras.main.flash(1000)
      this.start.play();
      gameState.swimNoise.stop();
      gameState.meWalkingSound.stop();
      gameState.meRunningSound.stop();
      gameState.music.stop();
      gameState.marioWoods.stop();
      gameState.linkWoods.stop();
      gameState.trevorWoods.stop();
      gameState.battleSongIndex = Math.floor(Math.random() * 9);
      if (gameState.battleSongIndex === 0) {
        gameState.battlesong1.play()
      } else if (gameState.battleSongIndex === 1) {
        gameState.battlesong2.play()
      } else if (gameState.battleSongIndex === 2) {
        gameState.battlesong3.play()
      } else if (gameState.battleSongIndex === 3) {
        gameState.battlesong4.play()
      } else if (gameState.battleSongIndex === 4) {
        gameState.battlesong5.play()
      } else if (gameState.battleSongIndex === 5) {
        gameState.battlesong6.play()
      } else if (gameState.battleSongIndex === 6) {
        gameState.battlesong7.play()
      } else if (gameState.battleSongIndex === 7) {
        gameState.battlesong8.play()
      } else if (gameState.battleSongIndex === 8) {
        gameState.battlesong9.play()
      }
      this.scene.switch('BattleScene');
      chaserInitiateFight = 0;
      for (let i = 0; i < chasers.length; i++) {
        chasers[i].disableBody(true, true)
      }
    }
  },
  preload: function() {
    //loading audio
    this.load.audio('startSound', 'assets/audio/smrpg_battlestart.wav')
    this.load.audio('brown_rap', 'assets/audio/brown_rap.wav')
    this.load.audio('cardiB', ['assets/audio/cardiB.wav']);
    this.load.audio('skateboard', ['assets/audio/skateboard.wav']);
    this.load.audio('ollie_takeoff', ['assets/audio/ollie_takeoff.mp3']);
    this.load.audio('crashBoard', ['assets/audio/crashBoard.wav']);
    this.load.audio('ollie_land', ['assets/audio/ollie_land.mp3']);
    this.load.audio('carhit', ['assets/audio/carhit.mp3']);
    this.load.audio('outOfBreath', ['assets/audio/outOfBreath.mp3']);
    this.load.audio('carcrash', ['assets/audio/carcrash.wav']);
    this.load.audio('trevorWoods', ['assets/audio/trevorwoods.wav']);
    this.load.audio('marioWoods', ['assets/audio/8mario_forest.mp3']);
    this.load.audio('linkWoods', ['assets/audio/8link_forest.mp3']);
    this.load.audio('mario2', ['assets/audio/9mario2.wav']);
    this.load.audio('swimNoise', ['assets/audio/swimNoise.wav']);
    this.load.audio('holyDiver', ['assets/audio/holyDiver.wav']);
    this.load.audio('slash', ['assets/audio/slash.wav']);
    this.load.audio('spray', ['assets/audio/spray.mp3']);
    this.load.audio('bodyhit', ['assets/audio/bodyhit.wav']);
    this.load.audio('throw', ['assets/audio/throw.mp3']);
    this.load.audio('bichon_bark', ['assets/audio/bichon_bark.wav']);
    this.load.audio('airsoft', ['assets/audio/airsoft.wav']);
    this.load.audio('punch', ['assets/audio/punch.wav']);
    this.load.audio('stabnoise', ['assets/audio/stabnoise.wav']);
    this.load.audio('shatter', ['assets/audio/shatter.mp3']);
    this.load.audio('mohawkGround', ['assets/audio/mohawkGround.mp3']);
    this.load.audio('bitenoise', ['assets/audio/bitenoise.wav']);
    this.load.audio('battle1', ['assets/audio/battle1.wav']);
    this.load.audio('battle2', ['assets/audio/battle2.wav']);
    this.load.audio('battle3', ['assets/audio/battle3.wav']);
    this.load.audio('battle4', ['assets/audio/battle4.wav']);
    this.load.audio('battle5', ['assets/audio/battle5.wav']);
    this.load.audio('battle6', ['assets/audio/battle6.wav']);
    this.load.audio('battle7', ['assets/audio/battle7.wav']);
    this.load.audio('battle8', ['assets/audio/battle8.mp3']);
    this.load.audio('battle9', ['assets/audio/battle9.wav']);
    this.load.audio('spooky', ['assets/audio/spooky.wav']);
    this.load.audio('ball1', ['assets/audio/ball1.wav']);
    this.load.audio('ball2', ['assets/audio/ball2.wav']);
    this.load.audio('bennett_run', ['assets/audio/bennett.wav']);
    this.load.audio('me_walking', ['assets/audio/me_walking.mp3']);
    this.load.audio('arnold_bennett', ['assets/audio/arnold_bennett.mp3']);
    this.load.audio('heyy', ['assets/audio/heyy.wav']);
    this.load.audio('erggh', ['assets/audio/erggh.wav']);
    this.load.audio('hello', ['assets/audio/Hello.wav']);
    this.load.audio('adeline_idk', ['assets/audio/adeline_idk.wav']);
    this.load.audio('adeline_hungry', ['assets/audio/adeline_hungry.wav']);
    this.load.audio('adeline_wtf', ['assets/audio/adeline_wtf.wav']);
    this.load.audio('adeline_scared', ['assets/audio/adeline_scared.wav']);
    this.load.audio('wutt', ['assets/audio/wutt.wav']);
    this.load.audio('ooo', ['assets/audio/ooo.wav']);
    this.load.audio('block', ['assets/audio/block.wav']);
    this.load.audio('iwantsomecrack', ['assets/audio/iwantsomecrack.mp3']);
    this.load.audio('itemget', ['assets/audio/itemget.wav']);
    this.load.audio('siren1', ['assets/audio/cop_siren_1.wav']);
    this.load.audio('siren2', ['assets/audio/cop_siren_2.wav']);
    this.load.audio('honk1', ['assets/audio/honk1.wav']);
    this.load.audio('honk2', ['assets/audio/honk2.wav']);
    this.load.audio('honk3', ['assets/audio/honk3.wav']);
    this.load.audio('carScream1', ['assets/audio/carScream1.wav']);
    this.load.audio('carScream2', ['assets/audio/carScream2.wav']);
    this.load.audio('carScream3', ['assets/audio/carScream3.wav']);
    this.load.audio('carScream4', ['assets/audio/carScream4.wav']);
    this.load.audio('carScream5', ['assets/audio/carScream5.wav']);
    this.load.audio('carScream6', ['assets/audio/carScream6.wav']);
    this.load.audio('carScream7', ['assets/audio/carScream7.wav']);
    this.load.audio('carScream8', ['assets/audio/carScream8.wav']);

    this.load.audio('dead', ['assets/audio/dead.wav']);
    this.load.audio('poolhit', ['assets/audio/poolhit.wav']);
    this.load.audio('poolcollide', ['assets/audio/poolcollide.wav']);
    this.load.audio('poolpocket', ['assets/audio/poolpocket.wav']);
    this.load.audio('drinkCan', ['assets/audio/drinkCan.wav']);
    this.load.audio('larry_special_sound', ['assets/audio/larry_special_sound.wav']);
    this.load.audio('drinkGatorade', ['assets/audio/drinkGatorade.wav']);
    this.load.audio('menuSelect', ['assets/audio/menuSelect.wav']);
    this.load.audio('menuSelect2', ['assets/audio/menuSelect2.wav']);
    this.load.audio('secret', ['assets/audio/secret.wav']);
    this.load.audio('start', ['assets/audio/start.wav']);
    this.load.audio('bong', ['assets/audio/bong.wav']);
    this.load.audio('al', ['assets/audio/al.wav']);
    this.load.audio('holdon', ['assets/audio/holdon.wav']);
    this.load.audio('beatbox', ['assets/audio/beatbox.wav']);
    this.load.audio('carNoise', ['assets/audio/shitty_car.wav']);
    this.load.audio('theme', ['assets/audio/fugginwitsumshiit.wav']);
    this.load.audio('dark_theme', ['assets/audio/dark_theme.wav']);
    this.load.audio('windNoise', ['assets/audio/windNoise.wav']);
    //menu items icons
    this.load.image('monsterIcon', "assets/images/monster.png");
    this.load.image('maxiceIcon', "assets/images/maxice.png");
    this.load.image('andycappsIcon', "assets/images/andycapps.png");
    this.load.image('flowers', "assets/images/flowers.png");
    this.load.image('liquorIcon', "assets/images/liquorIcon.png");
    this.load.image('hammsIcon', "assets/images/hamms.png");
    this.load.image('larrySpecialIcon', "assets/images/larrySpecial.png");
    this.load.image('gatoradeIcon', "assets/images/gatorade.png");
    //loading sprite images
    this.load.image('towel1', "assets/images/towel1.png");
    this.load.image('towel2', "assets/images/towel2.png");
    this.load.image('poolchair1', "assets/images/poolchair1.png");
    this.load.image('poolchair2', "assets/images/poolchair2.png");
    this.load.image('hausdorf', "assets/images/hausdorf.png");
    this.load.image('quil', "assets/images/quil.png");
    this.load.image('dioshrine', "assets/images/dio_statue.png");
    this.load.image('car_keys', "assets/images/car_keys.png");
    this.load.image('girl4', "assets/images/girl4.png");
    this.load.image('net', "assets/images/net.png");
    this.load.image('phone', "assets/images/phone.png");
    this.load.image('wallet', "assets/images/wallet.png");
    this.load.image('liquor', "assets/images/liquor.png");
    this.load.image('yogamat', "assets/images/yogamat.png");
    //loading spritesheets
    this.load.spritesheet('cars',
      'assets/tilesets/car_tiles.png', {
        frameWidth: 32,
        frameHeight: 64
      });
    this.load.spritesheet('pool',
      'assets/images/burcham_pool_animated.png', {
        frameWidth: 112,
        frameHeight: 176
      });
    this.load.spritesheet('explosion',
      'assets/images/explosion-4.png', {
        frameWidth: 128,
        frameHeight: 128
      });
    this.load.spritesheet('blonde',
      'assets/images/blonde.png', {
        frameWidth: 96,
        frameHeight: 115
      });
    this.load.spritesheet('stripper',
      'assets/images/stripper.png', {
        frameWidth: 120,
        frameHeight: 120
      });
    this.load.spritesheet('jeanClaude',
      'assets/images/jeanClaude.png', {
        frameWidth: 100,
        frameHeight: 80
      });
    this.load.spritesheet('adeline',
      'assets/images/adeline.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('yogagirl',
      'assets/images/yogagirl.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('dio',
      'assets/images/Dio.png', {
        frameWidth: 200,
        frameHeight: 233
      });
    this.load.spritesheet('fratboy2prime',
      'assets/images/fratboy2prime.png', {
        frameWidth: 300,
        frameHeight: 300
      });
    this.load.spritesheet('junkie',
      'assets/images/junkie.png', {
        frameWidth: 130,
        frameHeight: 200
      });
    this.load.spritesheet('crackhead',
      'assets/images/crackhead.png', {
        frameWidth: 165,
        frameHeight: 176
      });
    this.load.spritesheet('ex_junkie',
      'assets/images/ex_junkie.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('fratboy1',
      'assets/images/fratboy1.png', {
        frameWidth: 165,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy2',
      'assets/images/fratboy2.png', {
        frameWidth: 140,
        frameHeight: 250
      });

    this.load.spritesheet('fratboy3',
      'assets/images/fratboy3.png', {
        frameWidth: 150,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy4',
      'assets/images/fratboy4.png', {
        frameWidth: 300,
        frameHeight: 250
      });
    this.load.spritesheet('fratboy5',
      'assets/images/fratboy5.png', {
        frameWidth: 300,
        frameHeight: 350
      });
    this.load.spritesheet('car4',
      'assets/images/car4.png', {
        frameWidth: 64,
        frameHeight: 64
      });
    this.load.spritesheet('canjam-0',
      'assets/images/canjam-0.png', {
        frameWidth: 200,
        frameHeight: 1200
      });
    this.load.spritesheet('canjam-1',
      'assets/images/canjam-1.png', {
        frameWidth: 200,
        frameHeight: 1200
      });
    this.load.spritesheet('me',
      'assets/images/me_running_BTJM.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('me_boxing',
      'assets/images/me_boxing.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('bennett',
      'assets/images/bennett.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('bennettattack',
      'assets/images/bennettattack.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('joe',
      'assets/images/joe.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('james',
      'assets/images/james.png', {
        frameWidth: 200,
        frameHeight: 280
      });
    this.load.spritesheet('al',
      'assets/images/al.png', {
        frameWidth: 200,
        frameHeight: 250
      });
    this.load.spritesheet('jon',
      'assets/images/jon_running.png', {
        frameWidth: 200,
        frameHeight: 200
      });
    this.load.spritesheet('trevor',
      'assets/images/trevor_walking.png', {
        frameWidth: 200,
        frameHeight: 300
      });
    this.load.spritesheet('volleyball',
      'assets/images/soccer_ball.png', {
        frameWidth: 20,
        frameHeight: 20
      });
    this.load.spritesheet('ball',
      'assets/images/volleyball.png', {
        frameWidth: 16,
        frameHeight: 16
      });
    this.load.spritesheet('beachball',
      'assets/images/beachball.png', {
        frameWidth: 32,
        frameHeight: 32
      });
    this.load.spritesheet('grl_dnc',
      'assets/images/grl_dnc.png', {
        frameWidth: 38,
        frameHeight: 88
      });
    this.load.spritesheet('girl1',
      'assets/images/girl1.png', {
        frameWidth: 84,
        frameHeight: 194
      });
    this.load.spritesheet('girl2',
      'assets/images/girl2.png', {
        frameWidth: 86,
        frameHeight: 204
      });
    this.load.spritesheet('girl3',
      'assets/images/girl3.png', {
        frameWidth: 86,
        frameHeight: 188
      });
    this.load.spritesheet('smoke',
      'assets/images/smokesheet.png', {
        frameWidth: 101,
        frameHeight: 97
      }
    );
    //loading tilesets and tilemaps
    this.load.image("buildingsCustom", "assets/tilesets/EL_buildings.png");
    this.load.image("tuxmon-tiles", "assets/tilesets/tuxmon-sample-32px.png");
    this.load.image("elTiles", "assets/tilesets/el_tileset_custom.png");
    this.load.image("elTiles2", "assets/tilesets/[Base]BaseChip_pipo.png");
    this.load.image("carTiles", "assets/tilesets/car_tiles.png");
    this.load.tilemapTiledJSON("map", "assets/json/east_lansing.json");
  },
  create: function() {
    this.cameras.main.fadeIn(7000, 0, 0, 0)
    //default pointer
    this.input.setDefaultCursor('url(assets/images/handPointer.png), pointer');
    //camera controls
    const camera = this.cameras.main;

    camera.zoom = 2;
    camera.roundPixels = true;

    gameState.camera1 = this.cameras.add(950, 75, 200, 200);
    gameState.camera1.zoom = .051
    //console.log(gameState.camera1)
    //sound effects and music
    this.brown_rap = this.sound.add('brown_rap', {
      volume: 1
    });
    this.start = this.sound.add('startSound', {
      volume: .7
    });
    gameState.swimNoise = this.sound.add('swimNoise', {
      volume: .6
    });
    gameState.swimNoise.loop = true;
    gameState.bodyhit = this.sound.add('bodyhit', {
      volume: 1
    });
    gameState.throw = this.sound.add('throw', {
      volume: 1.5
    });
    gameState.bark = this.sound.add('bichon_bark', {
      volume: .8
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
      volume: 1.8
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
    gameState.shatter = this.sound.add('shatter', {
      volume: .8
    });
    gameState.mohawkGround = this.sound.add('mohawkGround', {
      volume: .8
    });
    gameState.bitenoise = this.sound.add('bitenoise', {
      volume: .4
    });
    gameState.bennettSound = this.sound.add('bennett_run', {
      volume: 1.5
    });
    gameState.meWalkingSound = this.sound.add('me_walking', {
      volume: .2
    });
    gameState.meWalkingSound.loop = true
    gameState.meRunningSound = this.sound.add('bennett_run', {
      volume: .4
    });
    gameState.meRunningSound.loop = true
    gameState.ball1 = this.sound.add('ball1', {
      volume: .6
    });
    gameState.ball2 = this.sound.add('ball2', {
      volume: .6
    });
    gameState.carhit = this.sound.add('carhit', {
      volume: 1
    });
    gameState.skateboard = this.sound.add('skateboard', {
      volume: .2
    });
    gameState.skateboard.loop = true
    gameState.ollie_takeoff = this.sound.add('ollie_takeoff', {
      volume: 1
    });
    gameState.ollie_land = this.sound.add('ollie_land', {
      volume: 1
    });
    gameState.cardiB = this.sound.add('cardiB', {
      volume: 1
    });
    gameState.crashBoard = this.sound.add('crashBoard', {
      volume: 1
    });
    gameState.outOfBreath = this.sound.add('outOfBreath', {
      volume: 1
    });
    gameState.outOfBreath.loop = true;
    gameState.alSound = this.sound.add('al');
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
      volume: .6
    });
    gameState.hello = this.sound.add('hello', {
      volume: 1
    });
    gameState.adeline_idk = this.sound.add('adeline_idk', {
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
    gameState.honk1 = this.sound.add('honk1', {
      volume: 0.25
    });
    gameState.honk2 = this.sound.add('honk2', {
      volume: 0.25
    });
    gameState.honk3 = this.sound.add('honk3', {
      volume: 0.25
    });
    gameState.carScream1 = this.sound.add('carScream1', {
      volume: 0.6
    });
    gameState.carScream2 = this.sound.add('carScream2', {
      volume: 1.2
    });
    gameState.carScream3 = this.sound.add('carScream3', {
      volume: 0.6
    });
    gameState.carScream4 = this.sound.add('carScream4', {
      volume: 0.6
    });
    gameState.carScream5 = this.sound.add('carScream5', {
      volume: 0.6
    });
    gameState.carScream6 = this.sound.add('carScream6', {
      volume: 0.6
    });
    gameState.carScream7 = this.sound.add('carScream7', {
      volume: 0.6
    });
    gameState.carScream8 = this.sound.add('carScream8', {
      volume: 0.6
    });
    gameState.siren1 = this.sound.add('siren1', {
      volume: 0.25
    });
    gameState.siren2 = this.sound.add('siren2', {
      volume: 0.25
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
      volume: 0.8
    });
    gameState.larrySpecialSound = this.sound.add('larry_special_sound', {
      volume: 0.8
    });
    gameState.drinkGatorade = this.sound.add('drinkGatorade', {
      volume: 0.8
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
    gameState.music = this.sound.add('theme', {
      volume: 1.5
    });
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
    const tileset22 = map.addTilesetImage("[Base]BaseChip_pipo", "elTiles2")
    const tileset3 = map.addTilesetImage("car_tiles", "carTiles");
    const tileset4 = map.addTilesetImage("EL_buildings", "buildingsCustom");
    const below = map.createStaticLayer("Below2", tileset2, 0, 0);
    const belowBottoms = map.createStaticLayer("Below1", tileset2, 0, 0);
    const buildingtops = map.createStaticLayer("BuildingTops", tileset1, 0, 0);
    const customBuildingsBelow = map.createStaticLayer("CustomBuildings", tileset4, 0, 0).setDepth(1);

    //defining NPC paths

    alPath = []
    for (let i = 0; i < 8; i++) {
      let stri = "alPath" + i.toString()
      alPath.push(map.findObject("Objects", obj => obj.name === stri));
    }
    stripperPath = []
    for (let i = 0; i < 18; i++) {
      let stri = "stripperPath" + i.toString()
      stripperPath.push(map.findObject("Objects", obj => obj.name === stri));
    }
    jeanPath = []
    for (let i = 0; i < 34; i++) {
      let stri = "jeanPath" + i.toString()
      jeanPath.push(map.findObject("Objects", obj => obj.name === stri));
    }
    joePath = []
    for (let i = 0; i < 38; i++) {
      let stri = "joePath" + i.toString()
      joePath.push(map.findObject("Objects", obj => obj.name === stri));
    }
    jamesPath = []
    for (let i = 0; i < 29; i++) {
      let stri = "jamesPath" + i.toString()
      jamesPath.push(map.findObject("Objects", obj => obj.name === stri));
    }
    bennettPath = []
    for (let i = 0; i < 19; i++) {
      let stri = "bennettPath" + i.toString()
      bennettPath.push(map.findObject("Objects", obj => obj.name === stri));
    }

    cwCarPath = []
    for (let i = 0; i < 13; i++) {
      let stri = "cwCarPath" + i.toString()
      cwCarPath.push(map.findObject("Objects", obj => obj.name === stri));
    }

    ccwCarPath = []
    for (let i = 0; i < 12; i++) {
      let stri = "ccwCarPath" + i.toString()
      ccwCarPath.push(map.findObject("Objects", obj => obj.name === stri));
    }

    //defining spawn points
    gameState.myApartment = map.findObject("Objects", obj => obj.name === "my apartment");
    gameState.trevorsApartment = map.findObject("Objects", obj => obj.name === "trevor apartment enter");
    gameState.YogaGirlSpawnPoint1 = map.findObject("Objects", obj => obj.name === "yoga girl spawn point 1");
    gameState.YogaGirlSpawnPoint2 = map.findObject("Objects", obj => obj.name === "yoga girl spawn point 2");
    gameState.fratboy1SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy1 spawn point");
    gameState.fratboy2SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy3 spawn point");
    gameState.fratboy3SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy4 spawn point");
    gameState.fratboy4SpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy5 spawn point");
    gameState.JonSpawnPoint = map.findObject("Objects", obj => obj.name === "jon spawn point");
    const Fratboy2PrimeSpawnPoint = map.findObject("Objects", obj => obj.name === "fratboy2prime spawn point");
    gameState.AdelineSpawnPoint = map.findObject("Objects", obj => obj.name === "adeline spawn point");
    gameState.Girl1SpawnPoint = map.findObject("Objects", obj => obj.name === "girl1 spawn point");
    gameState.Girl2SpawnPoint = map.findObject("Objects", obj => obj.name === "girl2 spawn point");
    gameState.Girl3SpawnPoint = map.findObject("Objects", obj => obj.name === "girl3 spawn point");
    gameState.Girl4SpawnPoint = map.findObject("Objects", obj => obj.name === "girl4 spawn point");
    const BlondeSpawnPoint = map.findObject("Objects", obj => obj.name === "blonde spawn point");
    gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "player spawn point");

    gameState.gasStationEnter = map.findObject("Objects", obj => obj.name === "gas station enter");

    const CanJamSpawnPoint = map.findObject("Objects", obj => obj.name === "canjam spawn point");
    gameState.evanSpawnPoint = {
      x: CanJamSpawnPoint.x,
      y: CanJamSpawnPoint.y - 32
    }
    gameState.anthonySpawnPoint = {
      x: CanJamSpawnPoint.x,
      y: CanJamSpawnPoint.y + 64
    }
    const NetSpawnPoint = map.findObject("Objects", obj => obj.name === "net spawn point");
    const KeysSpawnPoint = map.findObject("Objects", obj => obj.name === "keys spawn point");
    const PhoneSpawnPoint = map.findObject("Objects", obj => obj.name === "phone spawn point");
    const WalletSpawnPoint = map.findObject("Objects", obj => obj.name === "wallet spawn point");
    gameState.BallSpawnPoint = map.findObject("Objects", obj => obj.name === "ball spawn point");
    gameState.VolleyballSpawnPoint = map.findObject("Objects", obj => obj.name === "volleyball spawn point");
    this.CarSpawnPoint = map.findObject("Objects", obj => obj.name === "car spawn point");
    const DioShrineSpawnPoint = map.findObject("Objects", obj => obj.name === "dioshrine spawn point");
    const BurchamPoolSpawnPoint = map.findObject("Objects", obj => obj.name === "burchampool spawn point");

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

    //making canjam evan and anthony
    canjam = this.physics.add.sprite(CanJamSpawnPoint.x, CanJamSpawnPoint.y, 'canjam-0');
    canjam.body.immovable = true;
    canjam.setScale(.1)

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

    net.children.iterate(function(child) {
      child.body.immovable = true;
      child.body.moves = false;
    });

    //animations

    this.anims.create({
      key: 'flashingLights',
      frames: this.anims.generateFrameNumbers('cars', {
        start: 17,
        end: 18
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'blnde_turn',
      frames: this.anims.generateFrameNumbers('blonde', {
        start: 0,
        end: 0
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'blondeJumping',
      frames: this.anims.generateFrameNumbers('blonde', {
        frames: [3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 3, 5, 5, 4, 4, 5, 5, 4, 4, 5, 5, 4, 4, 5, 5, 4, 4, 5, 5, 4, 4, 4, 5, 5, 5, 4, 4, 4, 5, 5, 5, 4, 4, 4, 5, 5, 5, 5, 5, 4, 4, 5, 5]
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'canjamplay',
      frames: this.anims.generateFrameNumbers('canjam-0', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'canjamplay1',
      frames: this.anims.generateFrameNumbers('canjam-1', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'poolwaves',
      frames: this.anims.generateFrameNumbers('pool', {
        frames: [0, 1]
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'adeline_party',
      frames: this.anims.generateFrameNumbers('adeline', {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'yogagirlyoga',
      frames: this.anims.generateFrameNumbers('yogagirl', {
        frames: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9]
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'jeanleft',
      frames: this.anims.generateFrameNumbers('jeanClaude', {
        start: 1,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jeanidle',
      frames: this.anims.generateFrameNumbers('jeanClaude', {
        frames: [0,4,5,6,7,6,7,6,7,6,7,6,7,6,7,6,5,4]
      }),
      frameRate: 10,
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

    this.anims.create({
      key: 'stripperup',
      frames: this.anims.generateFrameNumbers('stripper', {
        start: 11,
        end: 14
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'stripperleft',
      frames: this.anims.generateFrameNumbers('stripper', {
        start: 6,
        end: 9
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'stripperidle',
      frames: this.anims.generateFrameNumbers('stripper', {
        frames: [0,5,10]
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'carexplosion',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 11
      }),
      frameRate: 5,
      repeat: 0
    });

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

    this.anims.create({
      key: 'crackheadright',
      frames: this.anims.generateFrameNumbers('crackhead', {
        frames: [1, 2, 3, 2]
      }),
      frameRate: 4,
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
        start: 4,
        end: 7
      }),
      frameRate: 4,
      repeat: 0
    });

    this.anims.create({
      key: 'junkieright',
      frames: this.anims.generateFrameNumbers('junkie', {
        start: 0,
        end: 3
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
        frames: [4, 5, 5, 6, 6, 4]
      }),
      frameRate: 10,
      repeat: 0
    });

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

    this.anims.create({
      key: 'frat1right',
      frames: this.anims.generateFrameNumbers('fratboy1', {
        start: 1,
        end: 4
      }),
      frameRate: 5,
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
        frames: [5, 4]
      }),
      frameRate: 2,
      repeat: 0
    });

    this.anims.create({
      key: 'frat1jump',
      frames: this.anims.generateFrameNumbers('fratboy1', {
        frames: [6, 7, 8, 9, 10, 9, 8, 7]
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'frat2right',
      frames: this.anims.generateFrameNumbers('fratboy2', {
        start: 1,
        end: 2
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
        frames: [3, 0]
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'frat3right',
      frames: this.anims.generateFrameNumbers('fratboy3', {
        start: 1,
        end: 4
      }),
      frameRate: 5,
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
        end: 8
      }),
      frameRate: 6,
      repeat: 0
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
        frames: [5, 6, 7, 8, 9, 10, 0]
      }),
      frameRate: 6,
      repeat: 0
    });

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
    this.anims.create({
      key: 'bennett_walk',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [0, 1]
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_larry_special',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [5,7,7]
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_drink_monster',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [7,8]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_drink_hamms',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [7,9]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_drink_gatorade',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [7,10]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_eat_andycapps',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [7,11]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_drink_maxice',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [7,12]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'bennett_drink_liquor',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [7,13]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'bennettidle',
      frames: this.anims.generateFrameNumbers('bennett', {
        frames: [12, 13, 14]
      }),
      frameRate: 1,
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
      key: 'bennettdead',
      frames: this.anims.generateFrameNumbers('bennettattack', {
        frames: [5]
      }),
      frameRate: 1,
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

    this.anims.create({
      key: 'trevorright',
      frames: this.anims.generateFrameNumbers('trevor', {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'trevorrightfast',
      frames: this.anims.generateFrameNumbers('trevor', {
        start: 0,
        end: 3
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'trevoridle',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [10,10,14,15,16,17,16,15,14,11,11,14,15,16,17,16,15,14,12,12,14,15,16,17,16,15,14]
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'trevorslap',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [4, 5, 13, 5, 4, 5, 13, 5]
      }),
      frameRate: 3,
      repeat: 0
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

    this.anims.create({
      key: 'trevor_larry_special',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [21]
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'trevor_eat_andycapps',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [18]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'trevor_drink_maxice',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [19]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'trevor_drink_liquor',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [20]
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
      key: 'dive',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [9, 10, 11, 12, 13]
      }),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: 'kick',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [14, 15, 15]
      }),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: 'kickup',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [16, 17, 17]
      }),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_monster',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 18, 18, 0, 18, 18, 0, 18, 18, 0]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'larry_special',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 49,49]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_hamms',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 19, 19, 0, 19, 19, 0, 19, 19, 0]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_gatorade',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 20, 20, 0, 20, 20, 0, 20, 20, 0]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'eat_andycapps',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 45,46]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_maxice',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 47, 47]
      }),
      frameRate: 3,
      repeat: 0
    });

    this.anims.create({
      key: 'drink_liquor',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [0, 48, 48]
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
      key: 'rightwalk',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [27, 28, 29, 30, 31, 30, 29, 28]
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'newrightsprint',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [36, 37, 38, 39, 40, 41, 42, 43, 44]
      }),
      frameRate: 16,
      repeat: 0
    });

    this.anims.create({
      key: 'newrightrun',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [36, 37, 38, 39, 40, 41, 42, 43, 44]
      }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'meDead',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [25]
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'meDeadSkateboard',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [35]
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'rightswim',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [32,33,33]
      }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'alDead',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [8]
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'trevorDead',
      frames: this.anims.generateFrameNumbers('trevor', {
        frames: [9]
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'board_right',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [22, 23, 24, 23, 22, 21, 21, 21, 21, 21, 21, 21]
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'ollie_right',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [2, 4, 5, 5,5,5,5]
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: 'kickflip_right',
      frames: this.anims.generateFrameNumbers('me', {
        frames: [5, 6, 7, 8]
      }),
      frameRate: 8,
      repeat: -1
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
      key: 'al_drink_hamms',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [16,18]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'al_drink_monster',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [16,17]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'al_drink_gatorade',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [16,19]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'al_eat_andycapps',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [16,20]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'al_drink_maxice',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [16,21]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'al_drink_liquor',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [16,22]
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'al_larry_special',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [9,9,10,11,12,13,14,15,]
      }),
      frameRate: 4,
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
      key: 'alidle',
      frames: this.anims.generateFrameNumbers('al', {
        frames: [9,9,9,0,0,0,9,9,9,0,0,0,9,9,9,0,0,0,10,11,12,13,14,15,5,5,5,5,5,5]
      }),
      frameRate: 2,
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

    burchamPool = this.physics.add.sprite(BurchamPoolSpawnPoint.x + 16 + 60, BurchamPoolSpawnPoint.y + 16 + 40, 'pool')
    burchamPool.setOrigin(0, 0);
    burchamPool.anims.play('poolwaves', true);
    towel1 = this.add.image(BurchamPoolSpawnPoint.x + 50 + 64, BurchamPoolSpawnPoint.y + 220 + 64, 'towel1')
    towel2 = this.add.image(BurchamPoolSpawnPoint.x + 100 + 64, BurchamPoolSpawnPoint.y + 220 + 64, 'towel2')

    yogamat = this.add.image(gameState.YogaGirlSpawnPoint1.x, gameState.YogaGirlSpawnPoint1.y, 'yogamat');
    yogagirl = this.physics.add.sprite(gameState.YogaGirlSpawnPoint1.x, gameState.YogaGirlSpawnPoint1.y, 'yogagirl');
    yogagirl.setScale(.22)
    yogagirl.setSize(64, 64);
    yogagirl.setOffset(64, 64);
    yogagirl.body.immovable = true;
    yogamat.x = yogagirl.x;
    yogamat.y = yogagirl.y + 20;
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

    //spawning interactable objects

    //spawning car
    car = this.physics.add.sprite(this.CarSpawnPoint.x - 200, this.CarSpawnPoint.y, 'car4');

    //spawning flowers
    flowers = this.physics.add.sprite(gameState.altonBR.x - 16, gameState.altonBR.y + 16, 'flowers');
    flowers.setScale(.3);

    //spawning liquor
    liquor = this.physics.add.sprite(gameState.AdelineSpawnPoint.x + 32, gameState.AdelineSpawnPoint.y + 16, 'liquor');
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
    const world = map.createDynamicLayer("World", tileset1, 0, 0).setDepth(0);
    const world2 = map.createDynamicLayer("World2", tileset22, 0, 0);
    const cars = map.createStaticLayer("Cars", tileset3, 0, 0);

    //spawning npcs... recall NPC(scene, spawnPoint, texture, frame, type, left, right, up, down, idle, dialogue)
    bennett = new NPC(this, "bennett spawn point", "bennett", 0, "Bennett", "bennettleft", "bennettright", "bennettup", "bennettdown", "bennettidle", "bennett_run", potentialParty["Bennett"], 250, 125, 5000);
    al = new NPC(this, "alPath0", "al", 0, "Al", "alleft", "alright", "alleft", "alright", "alidle", "holdon", potentialParty["Al"], 250, 125, 250);
    joe = new NPC(this, "joe spawn point", "joe", 0, "Joe Bell", "joeleft", "joeright", "joeleft", "joeright", "joeright" , "punch", false, 250, 125, 1000);
    joe.body.setCircle(30);
    joe.body.setOffset(45, 55);
    jon = new NPC(this, "jon spawn point", "jon", 0, "Homeboy Jon", "jonleft", "jonright", "jonleft", "jonright", "jonright", "bitenoise", false, 250, 125, 1000);
    jon.body.setSize(120, 20);
    jon.body.setOffset(40, 150); //overriding scale given by NPC class
    james = new NPC(this, "james spawn point", "james", 0, "James", "jamesleft", "jamesright", "jamesup", "jamesdown", "jamesdown", "bitenoise", false, 250, 125, 1000);
    james.body.setCircle(180);
    james.body.setOffset(50, 100); //overriding scale given by NPC class
    oghomeboy = new NPC(this, "homeboy spawn point", "smoke", 0, "Original Homeboy", "smoke", "smoke", "smoke", "smoke","smoke", "bong", false, 250, 125, 1000);
    oghomeboy.body.immovable = true;
    oghomeboy.body.moves = false;
    trevor = new NPC(this, "trevor spawn point", "trevor", 0, "Jimmy", "trevorrightfast", "trevorrightfast", "trevorrightfast", "trevorrightfast", "trevoridle", "bong", potentialParty["Jimmy"], 250, 125, 100);
    trevor.body.setCircle(60);
    trevor.body.setOffset(60, 180);
    hausdorf = new NPC(this, "hausdorf spawn point", "hausdorf", 0, "hausdorf", "hausdorf", "hausdorf", "hausdorf", "hausdorf", "hausdorf", "bong", false, 250, 125, 1000);
    hausdorf.setDepth(hausdorf.y)
    stripper = new NPC(this, "stripper spawn point", "stripper", 0, "Stripper", "stripperleft", "stripperleft", "stripperup", "stripperdown", "stripperidle", "bong", false, 250, 125, 4000);
    stripper.body.setCircle(30);
    stripper.body.setOffset(25, 25);
    jeanClaude = new NPC(this, "jeanPath0", "jeanClaude", 0, "Jean Claude", "jeanleft", "jeanleft", "jeanleft", "jeanleft", "jeanidle", "bong", false, 250, 125, 1000/6);
    jeanClaude.body.setCircle(30);
    jeanClaude.body.setOffset(25, 25);

    //recall it goes (scene, spawn point, texture, position) and position should coincide with spawn point on path
    roadCar1 = new Car(this, "cwCarPath0", 4, 0);
    roadCar2 = new Car(this, "cwCarPath8", 6, 8);
    roadCar3 = new Car(this, "cwCarPath5", 7, 5);
    roadCar4 = new Car(this, "cwCarPath11", 8, 11);

    roadCar5 = new Car(this, "ccwCarPath7", 9, 7);
    roadCar6 = new Car(this, "ccwCarPath4", 10, 4);
    roadCar7 = new Car(this, "ccwCarPath9", 11, 9);
    roadCar8 = new Car(this, "ccwCarPath6", 12, 6);

    //recall it goes (scene, spawn point, position) and position should coincide with spawn point on path
    copCar1 = new CopCar(this, "cwCarPath1", 1);
    copCar2 = new CopCar(this, "cwCarPath10", 10);
    copCar1.anims.play('flashingLights', true);
    copCar2.anims.play('flashingLights', true);


    chasersGroup = this.physics.add.group()
    for (let i = 0; i < enemsForChasers.length; i++) {
      chasers[i] = chasersGroup.create(1200 + 100, 600 + 300, enemsForChasers[i][0]);
      chasers[i].disableBody(true, true);
      chasers[i].setScale(enemsForChasers[i][2])
      chasers[i].body.setCircle(enemsForChasers[i][3]);
      chasers[i].body.setOffset(enemsForChasers[i][4], enemsForChasers[i][5]);
    }

    //fratboys
    fratboys = this.physics.add.group()

    //crackhead = fratboys.create(gameState.fratboy1SpawnPoint.x - 100, gameState.fratboy1SpawnPoint.y - 2000, 'crackhead');
    ex_junkie = fratboys.create(gameState.fratboy1SpawnPoint.x - 100, gameState.fratboy1SpawnPoint.y + 200, 'ex_junkie');
    junkie = fratboys.create(gameState.fratboy1SpawnPoint.x + 100, gameState.fratboy1SpawnPoint.y - 200, 'junkie');
    fratboy1 = fratboys.create(gameState.fratboy1SpawnPoint.x, gameState.fratboy1SpawnPoint.y, 'fratboy1');
    fratboy2 = fratboys.create(gameState.fratboy2SpawnPoint.x, gameState.fratboy2SpawnPoint.y, 'fratboy2');
    fratboy3 = fratboys.create(gameState.fratboy3SpawnPoint.x, gameState.fratboy3SpawnPoint.y, 'fratboy3');
    fratboy4 = fratboys.create(gameState.fratboy4SpawnPoint.x, gameState.fratboy4SpawnPoint.y, 'fratboy4');
    fratboy5 = fratboys.create(gameState.fratboy4SpawnPoint.x + 120, gameState.fratboy4SpawnPoint.y + 200, 'fratboy5');

    fratboys.children.iterate(function(child) {
      child.setScale(.16);
      child.setCircle(40);
      child.setOffset(110, 80);
    });

    crackhead = new NPC(this, "crackhead spawn point", "crackhead", 0, "Melvin", "crackheadright", "crackheadright", "crackheadright", "crackheadright", "crackheadright", "punch", false);

    crackhead.setScale(.25);
    crackhead.setCircle(30);
    crackhead.setOffset(60, 60);

    //fratboy2
    fratboy2prime = fratboys.create(Fratboy2PrimeSpawnPoint.x, Fratboy2PrimeSpawnPoint.y, 'fratboy2prime');
    fratboy2prime.setScale(.14)
    fratboy2prime.body.setCircle(20);
    fratboy2prime.body.setOffset(60, 100);

    //spawning girls
    grls = this.physics.add.group();
    girl1 = grls.create(gameState.Girl1SpawnPoint.x, gameState.Girl1SpawnPoint.y, 'girl1');
    girl3 = grls.create(gameState.Girl3SpawnPoint.x, gameState.Girl3SpawnPoint.y, 'girl3');
    girl4 = grls.create(gameState.Girl4SpawnPoint.x, gameState.Girl4SpawnPoint.y, 'girl4');
    girl2 = grls.create(gameState.Girl2SpawnPoint.x, gameState.Girl2SpawnPoint.y, 'girl2');

    adeline = this.physics.add.sprite(gameState.AdelineSpawnPoint.x, gameState.AdelineSpawnPoint.y, 'adeline');
    adeline.setSize(120, 130);
    adeline.setOffset(0, 20);
    adeline.setScale(.16)
    adeline.body.immovable = true;
    adeline.anims.play('adeline_party', true)

    grls.children.iterate(function(child) {
      child.setScale(.2)
      child.setSize(50, 80);
      child.setOffset(0, 40);
    });

    girl1.setDepth(girl1.y);
    girl2.setDepth(girl2.y);
    girl3.setDepth(girl3.y);
    girl4.setDepth(girl4.y);
    adeline.setDepth(adeline.y);

    //spawn blnde
    blonde = grls.create(BlondeSpawnPoint.x, BlondeSpawnPoint.y, 'blonde');
    blonde.x = gameState.fratboy4SpawnPoint.x + 120
    blonde.y = gameState.fratboy4SpawnPoint.y + 220
    blonde.setScale(.25);
    blonde.setSize(1, 80);
    blonde.setOffset(30, 80);
    blonde.setDepth(blonde.y);

    //spawning player and setting properties
    //to start at level i and get skill at level i
    //levelObject["Mac"]=3; window.setTimeout(() => {skillCheck("Mac")}, 5000);
    //to spawn near mariott
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "near mariott")
    //to spawn near james
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "jamesPath0")
    //to spawn at jeanClaude starting point
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "jeanPath0")
    //to spawn at soccer game
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "jon spawn point")
    //gameState.PlayerSpawnPoint.y+=100
    //to spawn at pool area
    //gameState.PlayerSpawnPoint=BurchamPoolSpawnPoint
    //to spawn at fratboy5
    //gameState.PlayerSpawnPoint.x=gameState.fratboy4SpawnPoint.x+50
    //gameState.PlayerSpawnPoint.y=gameState.fratboy4SpawnPoint.y+50
    //to spawn at cwCarPath points
    //gameState.PlayerSpawnPoint = map.findObject("Objects", obj => obj.name === "cwCarPath8")
    //to spawn at high school roof
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
    //to spawn at fratboy2primestab
    //gameState.PlayerSpawnPoint.x=Fratboy2PrimeSpawnPoint.x
    //gameState.PlayerSpawnPoint.y=Fratboy2PrimeSpawnPoint.y-50

    me = this.physics.add.sprite(gameState.PlayerSpawnPoint.x, gameState.PlayerSpawnPoint.y, 'me');
    me.setScale(.17);
    //size and offset for me set in update function

    this.physics.add.overlap(roadCar1, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar2, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar3, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar4, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar5, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar6, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar7, me, this.getHitByCar, false, this);
    this.physics.add.overlap(roadCar8, me, this.getHitByCar, false, this);
    this.physics.add.overlap(copCar1, me, this.getHitByCar, false, this);
    this.physics.add.overlap(copCar2, me, this.getHitByCar, false, this);


    gameState.pointer = this.input.activePointer;

    this.input.on('pointerdown', function(pointer) {
      this.input.setDefaultCursor('url(assets/images/handPointerClosed.png), pointer');
    }, this);

    this.input.on('pointerup', function(pointer) {
      this.input.setDefaultCursor('url(assets/images/handPointer.png), pointer');
    }, this);

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

    //roadcar colliders
    this.physics.add.collider(roadCar1, ball);
    this.physics.add.collider(roadCar2, ball);
    this.physics.add.collider(roadCar3, ball);
    this.physics.add.collider(roadCar4, ball);
    this.physics.add.collider(roadCar5, ball);
    this.physics.add.collider(roadCar6, ball);
    this.physics.add.collider(roadCar7, ball);
    this.physics.add.collider(roadCar8, ball);
    this.physics.add.collider(copCar1, ball);
    this.physics.add.collider(copCar2, ball);

    //this.physics.add.collider(roadCar1, me);
    //this.physics.add.collider(roadCar2, me);
    //this.physics.add.collider(roadCar3, me);
    //this.physics.add.collider(roadCar4, me);
    //this.physics.add.collider(roadCar5, me);
    //this.physics.add.collider(roadCar6, me);
    //this.physics.add.collider(roadCar7, me);
    //this.physics.add.collider(roadCar8, me);
    //this.physics.add.collider(copCar1, me);
    //this.physics.add.collider(copCar2, me);


    //followers colliding
    this.physics.add.collider(trevor, al);
    this.physics.add.collider(trevor, jeanClaude);
    this.physics.add.collider(trevor, bennett);
    this.physics.add.collider(trevor, stripper);
    this.physics.add.collider(al, jeanClaude);
    this.physics.add.collider(al, bennett);
    this.physics.add.collider(al, stripper);
    this.physics.add.collider(jeanClaude, bennett);
    this.physics.add.collider(jeanClaude, stripper);
    this.physics.add.collider(bennett, stripper);

    //collisions with pool chairs
    this.physics.add.collider(me, goalieZone);
    this.physics.add.collider(me, canjam);
    this.physics.add.collider(me, yogagirl);
    this.physics.add.collider(me, adeline);
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
    this.physics.add.collider(me, customBuildingsBelow);
    this.physics.add.collider(me, above);
    this.physics.add.collider(me, world2);
    this.physics.add.collider(me, belowBottoms);
    this.physics.add.collider(me, cars);
    this.physics.add.collider(me, ball);
    this.physics.add.collider(me, volleyball);
    this.physics.add.collider(me, beachball);
    this.physics.add.collider(me, oghomeboy);
    //this.physics.add.collider(me, james);
    this.physics.add.collider(me, fratboys);

    //colliders for grls
    this.physics.add.collider(grls, grls);
    this.physics.add.collider(grls, me);
    this.physics.add.collider(grls, world);
    this.physics.add.collider(grls, world2);
    this.physics.add.collider(grls, belowBottoms);
    this.physics.add.collider(grls, cars);
    this.physics.add.collider(grls, trevor);
    this.physics.add.collider(grls, ball);
    this.physics.add.collider(grls, volleyball);

    //colliders for fratboys
    this.physics.add.collider(fratboys, fratboys);
    this.physics.add.collider(fratboys, me);
    this.physics.add.collider(fratboys, world);
    this.physics.add.collider(fratboys, world2);
    this.physics.add.collider(fratboys, belowBottoms);
    this.physics.add.collider(fratboys, cars);
    this.physics.add.collider(fratboys, trevor);
    this.physics.add.collider(fratboys, ball);
    this.physics.add.collider(fratboys, volleyball);

    //colliders for world
    this.physics.add.collider(oghomeboy, world);
    this.physics.add.collider(oghomeboy, world2);
    this.physics.add.collider(world, world);
    this.physics.add.collider(world2, world2);
    this.physics.add.collider(belowBottoms, ball);
    this.physics.add.collider(belowBottoms, volleyball);
    this.physics.add.collider(world, ball);
    this.physics.add.collider(world2, ball);
    this.physics.add.collider(world, volleyball);
    this.physics.add.collider(world2, volleyball);
    this.physics.add.collider(world, beachball);
    this.physics.add.collider(world2, beachball);
    this.physics.add.collider(belowBottoms, beachball);
    this.physics.add.collider(oghomeboy, ball);
    this.physics.add.collider(oghomeboy, volleyball);
    this.physics.add.collider(cars, ball);
    this.physics.add.collider(cars, volleyball);

    //colliders for bennett
    this.physics.add.collider(bennett, ball)
    this.physics.add.collider(bennett, volleyball)
    this.physics.add.collider(bennett, world)
    this.physics.add.collider(bennett, world2)
    this.physics.add.collider(bennett, belowBottoms)
    this.physics.add.collider(bennett, cars)
    this.physics.add.collider(bennett, jon)

    //colliders for stripper
    this.physics.add.collider(stripper, ball)
    this.physics.add.collider(stripper, volleyball)
    this.physics.add.collider(stripper, world)
    this.physics.add.collider(stripper, world2)
    this.physics.add.collider(stripper, belowBottoms)
    this.physics.add.collider(stripper, cars)
    this.physics.add.collider(stripper, jon)

    //colliders for jean claude
    this.physics.add.collider(jeanClaude, me)
    this.physics.add.collider(jeanClaude, world)
    this.physics.add.collider(jeanClaude, world2)
    this.physics.add.collider(jeanClaude, belowBottoms)
    this.physics.add.collider(jeanClaude, cars)

    //colliders for trevor
    this.physics.add.collider(trevor, ball)
    this.physics.add.collider(trevor, volleyball)
    this.physics.add.collider(trevor, world)
    this.physics.add.collider(trevor, world2)
    this.physics.add.collider(trevor, belowBottoms)
    this.physics.add.collider(trevor, cars)
    this.physics.add.collider(trevor, jon)

    //colliders for joe
    this.physics.add.collider(joe, ball)
    this.physics.add.collider(joe, volleyball)
    this.physics.add.collider(joe, world)
    this.physics.add.collider(joe, world2)
    this.physics.add.collider(joe, belowBottoms)
    this.physics.add.collider(joe, cars)
    this.physics.add.collider(joe, jon)

    //colliders for jon
    this.physics.add.collider(jon, ball)
    this.physics.add.collider(jon, volleyball)
    this.physics.add.collider(jon, world)
    this.physics.add.collider(jon, world2)
    this.physics.add.collider(jon, belowBottoms)
    this.physics.add.collider(jon, cars)

    //colliders for al
    this.physics.add.collider(al, world)
    this.physics.add.collider(al, world2)
    this.physics.add.collider(al, belowBottoms)
    this.physics.add.collider(al, cars)

    //colliders for james
    this.physics.add.collider(james, ball)
    this.physics.add.collider(james, volleyball)
    this.physics.add.collider(james, world)
    this.physics.add.collider(james, world2)
    this.physics.add.collider(james, belowBottoms)
    this.physics.add.collider(james, cars)
    this.physics.add.collider(james, jon)

    //colliders for car
    this.physics.add.collider(car, world)
    this.physics.add.collider(car, world2)
    this.physics.add.collider(car, belowBottoms)

    //colliders for chasersGroup
    this.physics.add.collider(chasersGroup, world)
    this.physics.add.collider(chasersGroup, world2)
    this.physics.add.collider(chasersGroup, belowBottoms)
    this.physics.add.collider(chasersGroup, cars)
    this.physics.add.collider(chasersGroup, ball)

    //setting world bounds and setting objects to collide with world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
    jeanClaude.setCollideWorldBounds(true);
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

    //camera1.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    gameState.camera1.startFollow(me, true);
    gameState.camera1.visible = false;



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
      numberOfItems = 0
      for (let i = 0; i < Object.keys(usable_items).length; i++) {
        numberOfItems += usable_items[Object.keys(usable_items)[i]]
      }
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
        zoom = .76
        if (bennett.following) {
          bennett.disableBody(true, true);
        }
        if (al.following) {
          al.disableBody(true, true);
        }
        if (trevor.following) {
          trevor.disableBody(true, true);
        }
      } else if (playerTexture === 'board' && !this.ollie && (me.body.velocity.x**2+ me.body.velocity.y**2>150**2)) {
        this.ollie = true;
        this.DialogueMenu.kickflipRotationDisplay.angle = 0;
      } else if (playerTexture === 1 && me.body.velocity.x**2+me.body.velocity.y**2<10**2) {
        playerTexture = 0
        car.enableBody(true, me.x, me.y, true, true);
        me.setTexture('me', 0)
        car.angle = me.angle
        gameState.carSound.stop();
        me.angle = 0;
        me.setScale(.16);
        me.body.setSize(70, 90);
        me.body.setOffset(60, 105);
        if (bennett.following) {
          bennett.enableBody(true, me.x + 30, me.y, true, true);
        }
        if (trevor.following) {
          trevor.enableBody(true, me.x, me.y + 60, true, true);
        }
        if (al.following) {
          al.enableBody(true, me.x - 20, me.y - 20, true, true);
        }
      } else if (darkWorld === 0 && distance(hausdorf, me) < 30 && worldTheme === 'light') {
        completeQuest('Robo-Trip');
        completeQuest('High School Roof');
        darkWorld = 1;
        worldTheme = 'dark';
        zoom = 1
      } else if (distance(liquor, me) < 40 && liquorGet === 0 && trevor.joinParameter) {
        liquor.disableBody(true, true);
        liquorItem = 5;
        usable_items["Liquor"] = liquorItem;
        liquorGet = 1;
        gameState.itemget.play()
        this.message.x = me.x;
        this.message.y = me.y;
        this.scene.scene.events.emit("Message", "You found some liquor", me.x, me.y);
      } else if (distance(flowers, me) < 40 && flowersGet === 0) {
        flowers.disableBody(true, true);
        flowersGet = 1;
        gameState.itemget.play()
        this.message.x = me.x - 200;
        this.message.y = me.y;
        items.push("Flowers")
        this.scene.scene.events.emit("Message", "You found some flowers", me.x, me.y);
      } else if (distance(phone, me) < 30 && phoneGet === 0) {
        phone.disableBody(true, true);
        items.push("Phone");
        this.message.x = me.x;
        this.message.y = me.y;
        this.scene.scene.events.emit("Message", "You found your phone", me.x, me.y);
        phoneGet = 1;
        //gameState.camera1.visible = true;
        gameState.itemget.play();
      } else if (distance(wallet, me) < 30 && walletGet === 0) {
        wallet.disableBody(true, true);
        items.push("Wallet");
        this.message.x = me.x;
        this.message.y = me.y;
        this.scene.scene.events.emit("Message", "You found your wallet", me.x, me.y);
        walletGet = 1;
        getTreeFitty();
        gameState.itemget.play()
      } else if (distance(keys, me) < 30 && keysGet === 0) {
        this.message.x = me.x;
        this.message.y = me.y;
        this.scene.scene.events.emit("Message", "You found your apartment and car keys", me.x, me.y);
        keys.disableBody(true, true);
        items.push("Keys");
        keysGet = 1;
        gameState.itemget.play()
      } else if (distance(me, gameState.gasStationEnter) < 30 && gasStation === 0) {
        scene_number = 3;
        gasStation = 1
      } else if (distance(me, volleyball) < 30 && kicking === false) {
        stamina -= 5;
        kicking = true;
        if (me.body.velocity.y < -50) {
          me.anims.play('kickup', true);
        } else {
          me.anims.play('kick', true);
        }
        window.setTimeout(() => {
          me.flipX = false;
          kicking = false
          volleyball.body.velocity.x += directionVector(me, volleyball)[0] * 40 * (1 + spriteSpeed(me) / 35);
          volleyball.body.velocity.y += directionVector(me, volleyball)[1] * 40 * (1 + spriteSpeed(me) / 35);
          gameState.ball1.play()
        }, 151);
        /*
        if (me.body.velocity.x<0){
          me.flipX = true;
          window.setTimeout(()=>{
            me.flipX = false;
          }, 151);
        }
        */
      } else if (distance(me, ball) < 30 && kicking === false) {
        stamina -= 5;
        kicking = true;
        if (me.body.velocity.y < -50) {
          me.anims.play('kickup', true);
        } else {
          me.anims.play('kick', true);
        }
        window.setTimeout(() => {
          kicking = false;
          me.flipX = false;
          ball.body.velocity.x += directionVector(me, ball)[0] * 25 * (1 + spriteSpeed(me) / 40);
          ball.body.velocity.y += directionVector(me, ball)[1] * 25 * (1 + spriteSpeed(me) / 40);
          gameState.ball1.play();
        }, 151);
        /*
        if (me.body.velocity.x<0){
          me.flipX = true;
          window.setTimeout(()=>{
            me.flipX = false;
          }, 151);
        }
        */
        //problem here if you go in apartment and then go in pool room, you warp to the wrong place when you change scenes
      } else if (distance(me,gameState.myApartment)<30 && keysGet === 0) {
        cantGetIn = 1;
      } else if (distance(me,gameState.myApartment)<30 && keysGet) {
        //me.x = gameState.PlayerSpawnPoint.x;
        //me.y = gameState.PlayerSpawnPoint.y;
        indoorZone = "MyApartment"
        scene_number = 'indoors'
        this.scene.switch("MyApartment");
      } else if (distance(me,gameState.trevorsApartment)<30 && !trevor.following) {
        //me.x = gameState.PlayerSpawnPoint.x;
        //me.y = gameState.PlayerSpawnPoint.y;
        this.openDialoguePage(28)
      } else if (distance(me,gameState.trevorsApartment)<30 && trevor.following) {
        //me.x = gameState.PlayerSpawnPoint.x;
        //me.y = gameState.PlayerSpawnPoint.y;
        indoorZone = "TrevorsApartment"
        scene_number = 'indoors'
        this.scene.switch("MyApartment");
      } else if (me.x > gameState.clubhouse731TL.x && me.x < gameState.clubhouse731BR.x && me.y > gameState.clubhouse731TL.y && me.y < gameState.clubhouse731BR.y) {
        indoorZone = 'clubhouse 731'
        scene_number = 'indoors'
        this.scene.switch("MyApartment");
        gameState.music.stop()
        zoom = 1;
      } else if (me.x > gameState.clubhousewoodsTL.x && me.x < gameState.clubhousewoodsBR.x && me.y > gameState.clubhousewoodsTL.y && me.y < gameState.clubhousewoodsBR.y) {
        indoorZone = 'clubhouse woods'
        gameState.music.stop()
        scene_number = 'indoors'
        this.scene.switch("MyApartment");
        zoom = 1;
      } else if (distance(me, ball) > 100 && distance(me, volleyball) > 100 && stamina >= 30 && diving === false && (playerTexture === 0 || playerTexture === 'race') && (me.body.velocity.x) ** 2 + (me.body.velocity.y) ** 2 > 10) {
        stamina -= 10;
        diving = true;
        speed *= 1.5
        me.anims.play('dive', true);
        window.setTimeout(() => {
          diving = false
          speed /= 1.5
        }, 500);
        /*
        if (me.body.velocity.x>0){
          me.flipX = true;
          window.setTimeout(()=>{
            me.flipX = false;
          }, 500);
        }
        */
      }
    }, this);

    this.keyObjD = this.input.keyboard.addKey('D'); // Get key object
    this.keyObjD.on('down', function(event) {
      if (playerTexture === 'board' && this.ollie) {
        stamina -= 5;
        this.kickflip = true;
        this.kickflipTimer+=1
        this.kickflipTimerRunning = true;
        //console.log(this.kickflipTimer)
      } else if (playerTexture === 0 && skateboardGet) {
        playerTexture = 'board';
        me.setVelocity(0,0);
        jamesToggleFollow = true;
      }
    }, this);

    this.keyObjD.on('up', function(event) {
      if (playerTexture === 'board' && this.ollie) {
        this.kickflipTimerRunning = false;
      }
    }, this);

    //pause Menu
    var keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    keyObjZ.on('down', function() {
      if (scene_number === 2) {
        scene_number = 1
      }
    });

    //pause Menu
    var keyObjX = this.input.keyboard.addKey('X'); // Get key object
    keyObjX.on('down', function() {
      if (scene_number === 2) {
        scene_number = 10
      }
    });

    //to end the race
    raceFinish = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    raceZoneBR = map.findObject("Objects", obj => obj.name === "abbott bottom right")
    raceFinished = raceFinish.create(raceZoneBR.x - 50, raceZoneBR.y, 20, 400).setOrigin(0, 0);

    this.physics.add.overlap(raceFinish, me, meWinRace, false, this);
    this.physics.add.overlap(raceFinish, bennett, bennettWinRace, false, this);
    //zone for the burcham pool
    enterPoolZones = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    poolZoneEnter1 = enterPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 64, BurchamPoolSpawnPoint.y + 64 + 10, 224 - 128, 288 - 128 + 6).setOrigin(0, 0);

    exitPoolZones = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    poolZoneExit1 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 32 + 32, BurchamPoolSpawnPoint.y + 42, 110, 2).setOrigin(0, 0);
    poolZoneExit2 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 32 + 32, BurchamPoolSpawnPoint.y + 16 + 32, 2, 190).setOrigin(0, 0);
    poolZoneExit3 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 32 + 32, BurchamPoolSpawnPoint.y + 16 + 224, 110, 2).setOrigin(0, 0);
    poolZoneExit4 = exitPoolZones.create(BurchamPoolSpawnPoint.x + 16 + 160 + 12, BurchamPoolSpawnPoint.y + 16 + 32, 2, 190).setOrigin(0, 0);

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

    this.physics.add.collider(trevor, exitPoolZones);
    this.physics.add.collider(al, exitPoolZones);
    this.physics.add.collider(bennett, exitPoolZones);
    this.physics.add.collider(jon, exitPoolZones);
    this.physics.add.collider(chasersGroup, exitPoolZones)
    this.physics.add.collider(chasersGroup, beachball)
    this.physics.add.collider(trevor, beachball);
    this.physics.add.collider(al, beachball);
    this.physics.add.collider(bennett, beachball);

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
    for (var i = 0; i < 1500; i++) { //it was 1800 for a long time. I scaled it back to 1500
      var xx = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var yy = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // creates a spawn zone at x,y. parameters are x, y, width, height
      var zonePoint = {x:xx, y:yy};
      if (distance(zonePoint,gameState.PlayerSpawnPoint)>400){
        spawns.create(xx, yy, 20, 20);
      }
    }
    this.physics.add.overlap(me, spawns, this.onMeetEnemy1, false, this);
    this.physics.add.overlap(me, chasersGroup, this.onMeetEnemy2, false, this);

    this.sys.events.on('wake', this.wake, this);
    //do this so that if you die without saving and press load game, you don't have 0 health.
    if (saveFileExists === false) {
      saveGame();
    }
    this.message = new OnScreenMessage(this, this.events, me.x, me.y);
    this.add.existing(this.message);

    gameState.questLocations = {
      'Hausdorffs?': map.findObject("Objects", obj => obj.name === "my apartment"),
      'Find Your Stuff': map.findObject("Objects", obj => obj.name === "phone spawn point"),
      'Robo-Trip': map.findObject("Objects", obj => obj.name === "hausdorf spawn point"),
      'Frat Boy Wants to Stab': map.findObject("Objects", obj => obj.name === "fratboy2prime spawn point"),
      'Jean Claude': map.findObject("Objects", obj => obj.name === "jeanPath0"),
      'Jean Claude?': map.findObject("Objects", obj => obj.name === "jeanPath0"),
      "Diamond Wants Some Coke": map.findObject("Objects", obj => obj.name === "girl4 spawn point"),
      "Adeline is pissed": map.findObject("Objects", obj => obj.name === "alton bottom right"),
      "Yoga girl needs blocks": map.findObject("Objects", obj => obj.name === "731 clubhouse entrance top left"),
      "Girls Wanna Play Volleyball": map.findObject("Objects", obj => obj.name === "volleyball spawn point"),
      "Becca Wants Some Smokes": map.findObject("Objects", obj => obj.name === "volleyball spawn point"),
      "Gotta Find My Keys": map.findObject("Objects", obj => obj.name === "keys spawn point"),
      "Gotta Find My Car": map.findObject("Objects", obj => obj.name === "car spawn point"),
      "Go to the Gas Station": map.findObject("Objects", obj => obj.name === "gas station enter"),
      'High School Roof': map.findObject("Objects", obj => obj.name === "hausdorf spawn point"),
      "Bets with Joe": map.findObject("Objects", obj => obj.name === "731 clubhouse entrance top left"),
      'Beat Bennett in a Race': map.findObject("Objects", obj => obj.name === "bennettPath0"),
      "Al wants some shit": map.findObject("Objects", obj => obj.name === "alPath0"),
      'Get Weed From OG Homeboy': map.findObject("Objects", obj => obj.name === "homeboy spawn point"),
      'Go Pro at Kick-The-Ball': map.findObject("Objects", obj => obj.name === "ball spawn point"),
      "Score Goals on Homeboy Jon": map.findObject("Objects", obj => obj.name === "volleyball spawn point"),
      "Crackhead wants some change": map.findObject("Objects", obj => obj.name === "crackhead spawn point"),
    }

    this.scene.launch('Navigator');
    this.DialogueMenu = this.scene.get("DialogueMenu");
  },

  update: function() {

    //dialogue for megaman game
    if (beatChill===1){
      beatChill = 2
      this.openDialoguePage(290);
    } else if (beatStag===1){
      beatStag = 2
      this.openDialoguePage(292);
    } else if (lostAtMegaman===1){
      lostAtMegaman = 2
      this.openDialoguePage(291);
    }
    //to play custom keyboard music
    if (playing && customMusicStart){
      customMusicStart = false
      customMusicPlaying = true
      gameState.music.stop()
    } else if (playing && customMusicPlaying){
      playbackCustomSong()
      }

    if (darkworldDialogue===1){
      this.openDialoguePage(705);
      darkworldDialogue=2;
      activeQuests['Hausdorffs?'] = `I had a strange encounter with a dark looking fella when I was robo-tripping. I felt like I was in another dimension or some kind of mirror world. Shit was fucked, he said Hausdorffs have been fucking with me? Aren't Hausdorffs those little fucked up guys in that video game? I need some rest.`

    } else if (darkworldDialogue===3){
      this.openDialoguePage(706);
      darkworldDialogue=4;
    } else if (darkworldDialogue===5){
      this.openDialoguePage(707);
      darkworldDialogue=6;
    }
    //quest locations for gps
    if (currentQuest === 'Jean Claude' || currentQuest === 'Jean Claude?') {
      gameState.questLocations['Jean Claude'] = {
        x: jeanClaude.x,
        y: jeanClaude.y
      }
      gameState.questLocations['Jean Claude?'] = {
        x: jeanClaude.x,
        y: jeanClaude.y
      }
    } else if (currentQuest === "Diamond Wants Some Coke") {
      if (trevor.following) {
        gameState.questLocations["Diamond Wants Some Coke"] = map.findObject("Objects", obj => obj.name === "girl4 spawn point")
      } else {
        gameState.questLocations["Diamond Wants Some Coke"] = {
          x: trevor.x,
          y: trevor.y
        }
      }
    } else if (currentQuest === "Girls Wanna Play Volleyball") {
      gameState.questLocations["Girls Wanna Play Volleyball"] = {
        x: volleyball.x,
        y: volleyball.y
      }
    } else if (currentQuest === "Becca Wants Some Smokes" && items.includes('Marlboro lights')) {
      gameState.questLocations["Becca Wants Some Smokes"] = map.findObject("Objects", obj => obj.name === "girl2 spawn point");
    } else if (currentQuest === 'Beat Bennett in a Race') {
      gameState.questLocations['Beat Bennett in a Race'] = {
        x: bennett.x,
        y: bennett.y
      }
    } else if (currentQuest === "Al wants some shit") {
      if (hamms < 4) {
        gameState.questLocations["Al wants some shit"] = map.findObject("Objects", obj => obj.name === "gas station enter");
      } else {
        gameState.questLocations["Al wants some shit"] = map.findObject("Objects", obj => obj.name === "homeboy spawn point");
      }

    } else if (currentQuest === 'Go Pro at Kick-The-Ball') {
      gameState.questLocations['Go Pro at Kick-The-Ball'] = {
        x: trevor.x,
        y: trevor.y
      }
    } else if (currentQuest === "Crackhead wants some change") {
      gameState.questLocations["Crackhead wants some change"] = {
        x: crackhead.x,
        y: crackhead.y
      }
    } else if (currentQuest === "Adeline is pissed" && items.includes('Flowers')) {
      gameState.questLocations["Adeline is pissed"] = map.findObject("Objects", obj => obj.name === "adeline spawn point");
    }

    //quest navigator pointer
    gameState.questLocation = gameState.questLocations[currentQuest]
    if ((me.x - gameState.questLocation.x) > 0) {
      gameState.questAngle = Math.atan((gameState.questLocation.y - me.y) / (gameState.questLocation.x - me.x)) * 180 / 3.1415
    } else if ((me.x - gameState.questLocation.x) < 0) {
      gameState.questAngle = Math.atan((gameState.questLocation.y - me.y) / (gameState.questLocation.x - me.x)) * 180 / 3.1415 + 180
    }
    //global time
    overworldClock += 1;

    if (!pause && chasersEnabled) {
      chaserClock += 1
    }
    //fratboys ai
    fratboys.children.iterate(function(child) {
      child.setDepth(child.y);
    });
    chasersGroup.children.iterate(function(child) {
      child.setDepth(child.y);
    });
    me.setDepth(me.y);
    yogagirl.setDepth(yogagirl.y);
    if (kicking && me.body.velocity.x < 0) {
      me.flipX = false
    } else if (kicking && me.body.velocity.x > 0) {
      me.flipX = true
    }
    if (diving && me.body.velocity.x < 0) {
      me.flipX = false
    } else if (diving && me.body.velocity.x > 0) {
      me.flipX = true
    }

    //getting hit by car
    if (this.gettingHitByCar && !diving) {
      this.gettingHitByCar = false;
      this.gettingLaidOutByCar = true;
      this.gettingLaidOutByCarFrame = Math.floor(Phaser.Math.FloatBetween(9, 13))
      this.gettingLaidOutByCarAngularSpeed = Math.floor(Phaser.Math.FloatBetween(-30, 30))
      this.gettingLaidOutByCarvelocity = [Math.floor(Phaser.Math.FloatBetween(-200, 200)), Math.floor(Phaser.Math.FloatBetween(-200, 200))]
      me.x += (Math.floor(Math.random() * 5) + 1) * (-1) ** Math.floor(Math.random() * 2)
      me.y += (Math.floor(Math.random() * 5) + 5) * (-1) ** Math.floor(Math.random() * 2)
    } else if (this.gettingLaidOutByCar) {
      window.setTimeout(() => {
        this.gettingUpFromCarHit = true
      }, 1000)
      window.setTimeout(() => {
        this.gettingUpFromCarHit = false
        this.gettingLaidOutByCar = false;
      }, 3000)
      window.setTimeout(() => {
        me.angle = 0;
      }, 3001)
    }

    if (this.gettingLaidOutByCar && !this.gettingUpFromCarHit) {
      me.angle += this.gettingLaidOutByCarAngularSpeed;
      if (playerTexture===0){
        me.setFrame(this.gettingLaidOutByCarFrame)
      }
      me.body.setVelocityX(this.gettingLaidOutByCarvelocity[0])
      me.body.setVelocityY(this.gettingLaidOutByCarvelocity[1])
      if (me.body.blocked.up || me.body.blocked.down || me.body.blocked.left || me.body.blocked.right) {
        this.gettingLaidOutByCar = false;
        gameState.bodyhit.play();
      }
    } else if (this.gettingLaidOutByCar && this.gettingUpFromCarHit) {
      if (playerTexture===0){
          me.setFrame(25);
      }
      me.angle = 0;
      me.body.setVelocityX(0)
      me.body.setVelocityY(0)
    }

    if (gas >= 12) {
      gas = 12
    }
    //dialogue with evan and anthony
    if (distance(me, gameState.anthonySpawnPoint) < 30 && anthonyFirstDialogue === 0) {
      anthonyFirstDialogue = 1
      this.openDialoguePage(6000)
      this.brown_rap.play()
    } else if (distance(me, gameState.evanSpawnPoint) < 30 && evanFirstDialogue === 0) {
      evanFirstDialogue = 1
      this.openDialoguePage(7000)
      activeQuests['Frat Boy Wants to Stab'] = 'Evan told me there is some frat guy with a knife waiting for me at the Burcham and Division intersection. Better not go until I got my crew together...'
    }
    if (numberOfFights === 1 && openFightDialogue === true) {
      openFightDialogue = false
      this.openDialoguePage(5000)
    } else if (numberOfFights === 4 && openFightDialogue === true) {
      openFightDialogue = false
      this.openDialoguePage(5001)
    } else if (numberOfFights === 7 && openFightDialogue === true) {
      openFightDialogue = false
      this.openDialoguePage(5003)
    }
    //stamina
    if (playerTexture === 0 && speed === 3 && me.body.velocity.x ** 2 + me.body.velocity.y ** 2 > 100 && pause === false) {
      stamina -= .02
    } else if (playerTexture === 0 && speed === 4 && me.body.velocity.x ** 2 + me.body.velocity.y ** 2 > 100 && pause === false) {
      stamina -= .05
    } else if (playerTexture === 'race' && speed === 4 && me.body.velocity.x ** 2 + me.body.velocity.y ** 2 > 100 && pause === false) {
      stamina -= .09
    } else if (playerTexture === 0 && speed === 1 || playerTexture === 0 && me.body.velocity.x ** 2 + me.body.velocity.y ** 2 < 100 ** 2 && pause === false) {
      stamina += .16
    }
    if (stamina <= 0) {
      stamina = 0
    } else if (stamina >= 100) {
      stamina = 100
    }
    if (stamina <= 5) {
      speed = 1
    }
    if (stamina <= 30 && playingOutOfBreath === false) {
      gameState.outOfBreath.play()
      playingOutOfBreath = true
    } else if (stamina >= 30 && playingOutOfBreath === true) {
      gameState.outOfBreath.stop()
      playingOutOfBreath = false
    }

    //new skill dialogue
    if (skillDialogue["Mac"][3]) {
      skillDialogue["Mac"][3] = false;
      this.openDialoguePage(1900)
    }
    //camera shaking from dialogue
    if (shakeTheWorld) {
      shakeTheWorld = false
      this.cameras.main.shake(2000);
    }
    //car crash
    if (playerTexture === 1 && !me.body.blocked.none && (me.body.velocity.x**2+me.body.velocity.y**2>900**2)) {
      pause = true
      speed = 1
      playerTexture = 0
      car.enableBody(true, me.x, me.y, true, true);
      me.setTexture('me', 0)
      car.angle = 0
      gameState.carSound.stop();
      me.angle = 0;
      me.setScale(.16);
      me.body.setSize(70, 90);
      me.body.setOffset(60, 105);
      hpObject["Mac"] = 1
      if (bennett.following) {
        bennett.enableBody(true, me.x + 30, me.y, true, true);
        hpObject["Bennett"] = 1
      }
      if (trevor.following) {
        trevor.enableBody(true, me.x, me.y + 60, true, true);
        hpObject["Jimmy"] = 1
      }
      if (al.following) {
        al.enableBody(true, me.x - 20, me.y - 20, true, true);
        hpObject["Al"] = 1
      }
      car.anims.play('carexplosion', false);
      this.cameras.main.shake(2200);
      window.setTimeout(() => {
        car.disableBody(true, true);
        carCrashDialogue = true;
      }, 2200);
      window.setTimeout(() => {
        car.enableBody(true, this.CarSpawnPoint.x, this.CarSpawnPoint.y, true, true);
      }, 2500);
      gameState.carCrash.play();
    }
    if (carCrashDialogue) {
      carCrashDialogue = false;
      this.openDialoguePage(1800)
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
    //ai for cop cars
    copCar1.animate()
    copCar1.soundSiren()
    followPath(copCar1, cwCarPath, 400)
    copCar2.animate()
    copCar2.soundSiren()
    followPath(copCar2, cwCarPath, 400)

    //ai for cars
    roadCar1.animate()
    roadCar1.honk()
    followPath(roadCar1, cwCarPath, 400)
    roadCar2.animate()
    roadCar2.honk()
    followPath(roadCar2, cwCarPath, 400)
    roadCar3.animate()
    roadCar3.honk()
    followPath(roadCar3, cwCarPath, 400)
    roadCar4.animate()
    roadCar4.honk()
    followPath(roadCar4, cwCarPath, 400)

    roadCar5.animate()
    roadCar5.honk()
    followPath(roadCar5, ccwCarPath, 400)
    roadCar6.animate()
    roadCar6.honk()
    followPath(roadCar6, ccwCarPath, 400)
    roadCar7.animate()
    roadCar7.honk()
    followPath(roadCar7, ccwCarPath, 400)
    roadCar8.animate()
    roadCar8.honk()
    followPath(roadCar8, ccwCarPath, 400)
    //ai for race with bennett
    if (raceBegin) {
      zoom = .76
      raceBegin = false;
      raceOngoing = true
      me.x = map.findObject("Objects", obj => obj.name === "bennettPath2").x - 2
      me.y = map.findObject("Objects", obj => obj.name === "bennettPath2").y + 50
      bennett.position = 2
      bennett.x = map.findObject("Objects", obj => obj.name === "bennettPath2").x - 2
      bennett.y = map.findObject("Objects", obj => obj.name === "bennettPath2").y
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
      bennett.position = 5;
      bennett.x = me.x + 200;
      raceOngoing = false;
      winRace = 0
      this.openDialoguePage(1700)
    } else if (winRace === 2 && raceOngoing) {
      this.cameras.main.fade(1000);
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      me.x = bennett.x
      bennett.position = 5;
      raceOngoing = false;
      winRace = 0
      this.openDialoguePage(1701)
    }
    if (wonRace === 1) {
      wonRace = 0
      playerTexture = 0
      this.openDialoguePage(37)
      completeQuest('Beat Bennett in a Race')
    } else if (wonRace === 2) {
      wonRace = 0
      playerTexture = 0
    }
    //this is supposed to change to random woods theme when in woods, but not sure how to initiate something only once on zone change... fix needed...
    if (changeThemeSong && overworldSong === 'woods' && !customMusicPlaying) {
      changeThemeSong = false;
      gameState.music.stop()
      gameState.marioWoods.stop()
      gameState.linkWoods.stop()
      gameState.trevorWoods.stop()
      let mscRnd = Math.floor(Math.random() * 3)
      if (mscRnd === 0) {
        gameState.marioWoods.play()
      } else if (mscRnd === 1) {
        gameState.linkWoods.play();
      } else if (mscRnd === 2) {
        gameState.trevorWoods.play();
      }
    } else if (changeThemeSong && overworldSong === 'theme' && !customMusicPlaying) {
      changeThemeSong = false;
      gameState.marioWoods.stop();
      gameState.linkWoods.stop();
      gameState.trevorWoods.stop();
      gameState.music.stop();
      if (!playing){
          gameState.music.play();
      }
    }
    //location settings for pool and volleyball court
    if (me.x > gameState.poolTL.x && me.y > gameState.poolTL.y && me.x < gameState.poolBR.x && me.y < gameState.poolBR.y) {
      nearPool = true
    } else {
      nearPool = false
    }
    if (me.x > gameState.volleyballTL.x && me.y > gameState.volleyballTL.y && me.x < gameState.volleyballBR.x && me.y < gameState.volleyballBR.y) {
      nearVolleyballCourt = true
    } else {
      nearVolleyballCourt = false
    }
    //setting location text, battle background and theme song based on location
    if (phoneGet) {
      if (me.x > gameState.burcham731TL.x && me.y > gameState.burcham731TL.y && me.x < gameState.burcham731BR.x && me.y < gameState.burcham731BR.y) {
        gameStateNav.location.setText("731 Burcham Apartments\nEast Lansing, Mi");
        if (nearPool) {
          battleBackgroundIndex = 11
        } else if (nearVolleyballCourt) {
          battleBackgroundIndex = 12
        } else {
          battleBackgroundIndex = 0
        }
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.burcham711TL.x && me.y > gameState.burcham711TL.y && me.x < gameState.burcham711BR.x && me.y < gameState.burcham711BR.y) {
        gameStateNav.location.setText("711 Burcham Apartments\nEast Lansing, Mi");
        battleBackgroundIndex = 13
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.burcham787TL.x && me.y > gameState.burcham787TL.y && me.x < gameState.burcham787BR.x && me.y < gameState.burcham787BR.y) {
        gameStateNav.location.setText("Burcham Place Apartments\nEast Lansing, Mi");
        battleBackgroundIndex = 15
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.burchamwoodsTL.x && me.y > gameState.burchamwoodsTL.y && me.x < gameState.burchamwoodsBR.x && me.y < gameState.burchamwoodsBR.y) {
        gameStateNav.location.setText("Burcham Woods\nEast Lansing, Mi");
        battleBackgroundIndex = 14
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.highschoolTL.x && me.y > gameState.highschoolTL.y && me.x < gameState.highschoolBR.x && me.y < gameState.highschoolBR.y) {
        gameStateNav.location.setText("East Lansing High School\nEast Lansing, Mi");
        battleBackgroundIndex = 9
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.churchTL.x && me.y > gameState.churchTL.y && me.x < gameState.churchBR.x && me.y < gameState.churchBR.y) {
        gameStateNav.location.setText("St. Thomas Aquinas School\nEast Lansing, Mi");
        battleBackgroundIndex = 4
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.westburchamroadTL.x && me.y > gameState.westburchamroadTL.y && me.x < gameState.westburchamroadBR.x && me.y < gameState.westburchamroadBR.y) {
        gameStateNav.location.setText("Burcham Road\nEast Lansing, Mi");
        battleBackgroundIndex = 8
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.eastburchamroadTL.x && me.y > gameState.eastburchamroadTL.y && me.x < gameState.eastburchamroadBR.x && me.y < gameState.eastburchamroadBR.y) {
        gameStateNav.location.setText("Burcham Road\nEast Lansing, Mi");
        battleBackgroundIndex = 5
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.abbottTL.x && me.y > gameState.abbottTL.y && me.x < gameState.abbottBR.x && me.y < gameState.abbottBR.y) {
        gameStateNav.location.setText("Abbott Road\nEast Lansing, Mi");
        battleBackgroundIndex = 3
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.saginawTL.x && me.y > gameState.saginawTL.y && me.x < gameState.saginawBR.x && me.y < gameState.saginawBR.y) {
        gameStateNav.location.setText("E Saginaw Road\nEast Lansing, Mi");
        battleBackgroundIndex = 1
        if (overworldSong !== 'theme') {
          changeThemeSong = true;
          overworldSong = 'theme';
        }
      } else if (me.x > gameState.altonTL.x && me.y > gameState.altonTL.y && me.x < gameState.altonBR.x && me.y < gameState.altonBR.y) {
        gameStateNav.location.setText("Alton Road\nEast Lansing, Mi");
        battleBackgroundIndex = 4
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
        battleBackgroundIndex = 10
        if (overworldSong !== 'woods') {
          overworldSong = 'woods';
          changeThemeSong = true;
        }
      } else if (me.x > gameState.marathonTL.x && me.y > gameState.marathonTL.y && me.x < gameState.marathonBR.x && me.y < gameState.marathonBR.y) {
        gameStateNav.location.setText("Marathon Gas Station\nEast Lansing, Mi")
        battleBackgroundIndex = 2
        if (overworldSong !== 'theme') {
          overworldSong = 'theme';
          changeThemeSong = true;
        }
      } else {
        gameStateNav.location.setText("               ???")
        battleBackgroundIndex = 7
      }
    }

    // so that it only says jimmy joins party once
    if (jimmyJoinParam && neverBeenPro) {
      neverBeenPro = false
      jimmyJoinParam = false;
      this.openDialoguePage(23)
    }
    //ai for poolchairs
    poolchairs.children.iterate(function(child) {
      child.body.velocity.x = 0
      child.body.velocity.x = 0
    });

    //run, walk, swim noise and swimming animation breaks and swimming size and offset
    if (ballInPool) {
      beachball.body.velocity.x /= 1.1;
      beachball.body.velocity.y /= 1.1;
    }
    if (inPool && swimNoisePlaying === false && !diving && !kicking) {
      diving = false;
      kicking = false;
      speed = 4;
      gameState.swimNoise.play()
      swimNoisePlaying = true
      me.body.setSize(70, 70);
      me.body.setOffset(60, 0);
    } else if (inPool === false && playerTexture === 0) { //added playertexture requirement to fix car glitch
      gameState.swimNoise.stop()
      swimNoisePlaying = false
      me.body.setSize(70, 90); //this sets the general size and offset for player(probably not the best way to organize but it is what it is)
      me.body.setOffset(60, 108);
    }

    if (speed === 1 && walkNoisePlaying === false && (me.body.velocity.x) ** 2 + (me.body.velocity.y) ** 2 > 40) {
      gameState.meWalkingSound.play()
      walkNoisePlaying = true
    } else if (speed > 1 || (me.body.velocity.x) ** 2 + (me.body.velocity.y) ** 2 === 0) {
      gameState.meWalkingSound.stop()
      walkNoisePlaying = false
    }
    if (speed > 1 && runNoisePlaying === false && (me.body.velocity.x) ** 2 + (me.body.velocity.y) ** 2 > 40) {
      gameState.meRunningSound.play()
      runNoisePlaying = true
    } else if (speed === 1 || (me.body.velocity.x) ** 2 + (me.body.velocity.y) ** 2 === 0) {
      gameState.meRunningSound.stop()
      runNoisePlaying = false
    }
    //cant get inside apartment
    if (cantGetIn === 1) {
      cantGetIn = 0
      this.openDialoguePage(1400)
    }
    //increase athletics (got rid of this feature... it messes up how you play kick-the-ball after 1.05)
    if (spriteSpeed(me) > 20 && scene_number === 2) {
      //athletics += .00001
    }
    //fail to buy weed
    if (buyFailed === 1) {
      this.openDialoguePage(85)
      buyFailed = 0
    }
    // boss battle
    if (bossType === 'dio' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    } else if (bossType === 'fratboy2prime' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
      completeQuest('Frat Boy Wants to Stab')
    } else if (bossType === 'darkboy' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
      activeQuests['Back to the Dark World'] = 'After I dosed some tussin, I wound up in some kind of dark version of East Lansing. And when I saw that tussin bottle, I swear it looked at first like some sort of gnome or some little fucker fucking with me. I gotta go back somehow and check it out. More tussin?'
    } else if (bossType === 'frank' && bossBattleParameter === 1) {
      this.scene.switch('BattleScene');
      bossBattleParameter = 0
    }
    //enable dev mode
    if (devMode1 + devMode2 + devMode3 >= 3) {
      //items.push("Jerky")
      devMode1 = 0
      devMode2 = 0
      devMode3 = 0
      keysGet = 1;
      jeanClaude.joinParameter = true;
      jeanClaudeFirstTalk = 3;
      stripper.joinParameter = true;
      trevor.joinParameter = true;
      al.joinParameter = true;
      bennett.joinParameter = true;
      trevor.following = true;
      al.following = true;
      bennett.following = true;
      jeanClaude.following = true;
      stripper.following = true;
      /*
      trevor.x = me.x + 30;
      trevor.y = me.y + 30;
      al.x = me.x + 30;
      al.y = me.y + 30;
      bennett.x = me.x + 30;
      bennett.y = me.y + 30;
      */
      potentialParty["Jimmy"] = true;
      potentialParty["Al"] = true;
      potentialParty["Bennett"] = true;
      specialObject["Mac"].push("Fuck Everybody Up (8)");
      brothersSeal = 1;
      brothersSealForSkateboarding = 1;
      money += 10;
      hamms += 5;
      monster += 5;
      maxice += 5;
      andycapps += 5;
      gatorade += 5;
      larrySpecial += 5;
      liquorItem +=5
      equipped["Mac"].accessory = "Sprinting Shoes"
      sprintingShoes("Mac", true)
      usable_items["Hamms"] += 5;
      usable_items["Monster"] += 5;
      usable_items["Gatorade"] += 5;
      usable_items["Larry Special"] = 5;
      usable_items["Andy Capp's Hot Fries"] = 5;
      usable_items["Labatt Max Ice"] = 5;
      usable_items["Liquor"] = 5;
      gameState.secret.play()
      for (itemz of ["Dio Band", "Brass Knuckles", "SP Booster", "HP Booster", "Camo Pants", "Camo Hoody", "Damage Booster", "Fubu Shirt", "Jorts", "Wife Beater", "Sprinting Shoes"]) {
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
      gameState.music.stop();
        darkWorld = 2
    } else if (darkWorld === 2) {
      darkWorld = 0
      window.setTimeout(()=>{
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.scene.switch("DarkWorld")
      }, 1000)
    }

    //gameover and new game
    if (newGame === true && gameOver === false) {
      this.openDialoguePage(9999)
      newGame = false;
    } else if (newGame === false && gameOver === true) {
      this.openDialoguePage(300)
      gameOver = false
    }



    //camera and cursors
    this.cameras.main.zoom = zoom;
    this.cursors = this.input.keyboard.createCursorKeys();

    //so car doesn't roll away
    car.body.velocity.x = 0;
    car.body.velocity.y = 0;

    //pondering and highness
    if (highness.toFixed(2) == 2 && highnessDialogue == 1) {
      this.openDialoguePage(140)
      highness = 1
    } else if (highness.toFixed(2) == 2.01 && highnessDialogue == 3) {
      this.openDialoguePage(141)
      highness = 1
    } else if (highness.toFixed(2) == 2.01 && highnessDialogue == 5) {
      this.openDialoguePage(144)
      highness = 1
    } else if (highness.toFixed(2) == 2.01 && highnessDialogue == 7) {
      this.openDialoguePage(147)
      highness = 1
    }

    //ai for chasers
    chasersGroup.children.iterate(function(child) {
      if (chasersEnabled) {
        let rr = Math.random() * 6 - 3
        if (distance(child, me) < 300 && !runaway) {
          chase(child, me, 4.5 + rr) //use 3 for laptop and 4.5 for desktop (I think because my macbook has faster refresh rate)
        }
      }
    });

    for (let i = 0; i < enemsForChasers.length; i++) {
      if (chasers[i].body.velocity.x > 5) {
        chasers[i].anims.play(enemsForChasers[i][1], true)
        chasers[i].flipX = false;
      } else if (chasers[i].body.velocity.x < 5) {
        chasers[i].anims.play(enemsForChasers[i][1], true)
        chasers[i].flipX = true;
      }
    }

    //ai for fratboy2prime
    if (distance(fratboy2prime, me) < 300 && worldTheme === 'light') {
      fratboy2prime.anims.play('fratboy2primestab', true)
    }
    if (distance(fratboy2prime, me) < 30 && fratboy2primedialogue === 0 && worldTheme === 'light') {
      fratboy2primedialogue = 1
      this.openDialoguePage(900)
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
      window.setTimeout(() => {
        girl2FirstDialogue = 0
      }, 1000);
    } else if (blocked === 1) {
      gameState.block.play();
      blocked = 0
    }

    //ai for jeanClaude
    if (jeanClaude.body.velocity.x > 1) {
      jeanClaude.flipX = true;
    }
    if (jeanClaude.body.velocity.x < -1) {
      jeanClaude.flipX = false;
    }
    if (!jeanClaude.following) {
      //jeanClaude.getUnstuck()
      //seemed to just be getting her stuck strangely enough...
      followPath(jeanClaude, jeanPath, 205)
      //stripper.randomWalk()
      jeanClaude.animate(2)
      if (distance(me, jeanClaude) < 30 && jeanClaudeFirstTalk === 0 && !items.includes("Jerky")) {
        gameState.bark.play()
        this.openDialoguePage(6100)
        activeQuests["Jean Claude"] = "I saw a dog running. I got close enough to see its tag said 'Jean Claude'. Maybe if I had some jerky or a dog treat or something I could get him to follow me."
        jeanClaudeFirstTalk = 1
      } else if (distance(me, jeanClaude) < 30 && items.includes("Jerky") && (jeanClaudeFirstTalk === 0 || jeanClaudeFirstTalk === 1)) {
        gameState.bark.play()
        this.openDialoguePage(6101)
        jeanClaude.joinParameter = true
        jeanClaudeFirstTalk = 2
      }
    } else if (jeanClaude.following && jeanClaudeFirstTalk === 2) {
      activeQuests["Jean Claude"] = "Ok so I got him to follow me... I wonder who he belongs to. Maybe I can find his owner."
      jeanClaudeFirstTalk = 3;
    } else if (jeanClaude.following && jeanClaudeFirstTalk === 3) {
      jeanClaude.follow(me, .8);
      jeanClaude.animate(2);
    }
    if (jeanClaude.following && distance(jeanClaude, stripper) < 100 && distance(me, stripper) < 30 && jeanClaudeFirstTalk === 3) {
      jeanClaudeFirstTalk = 4
    } else if (jeanClaudeFirstTalk === 4) {
      jeanClaudeFirstTalk = 5;
      this.openDialoguePage(6102)
      completeQuest("Jean Claude")
      completeQuest("Jean Claude?")
      stripper.joinParameter = true;
    } else if (jeanClaudeFirstTalk === 5) {
      jeanClaude.follow(stripper, .8);
      jeanClaude.animate(2);
    }

    //ai for stripper
    if (!stripper.following) {
      //stripper.getUnstuck()
      //seemed to just be getting her stuck strangely enough...
      followPath(stripper, stripperPath, 30)
      //stripper.randomWalk()
      stripper.animate(5)
      if (stripper.body.velocity.x > 3) {
        stripper.flipX = true;
      } else if (stripper.body.velocity.x < -3) {
        stripper.flipX = false;
      }
      if (distance(me, stripper) < 30 && stripperFirstTalk === 0) {
        gameState.cardiB.play()
        this.openDialoguePage(1600)
        activeQuests["Diamond Wants Some Coke"] = "Diamond needs some coke. Maybe she'll give you something good in return for some."
        activeQuests["Jean Claude?"] = "Diamond is looking for a 'Jean Claude'... is that like... her pimp? She wasn't very clear on that."
        stripperFirstTalk = 1
      } else if (distance(me, stripper) < 30 && stripperFirstTalk === 2 && items.includes("Gram of Coke")) {
        gameState.cardiB.play()
        stripperFirstTalk = 3
        this.openDialoguePage(1602)
        completeQuest("Diamond Wants Some Coke")
        equipment.push("Brass Knuckles")
        removeAll(items, "Gram of Coke")
      } else if (distance(me, stripper) > 200 && stripperFirstTalk === 1) {
        stripperFirstTalk = 2
      }
    } else if (stripper.following) {
      stripper.follow(me, .9);
      stripper.animate(5)
      if (stripper.body.velocity.x > 3) {
        stripper.flipX = true;
      } else if (stripper.body.velocity.x < -3) {
        stripper.flipX = false;
      }
    }
    if (stripperBanged) { //after you bang, she stops following
      followPath(stripper, stripperPath)
      jeanClaude.follow(stripper, .8)
    }


    //ai for yoga girl
    if (distance(me, yogagirl) < 30 && yogagirlFirstTalk === 0) {
      yogagirlFirstTalk = 1
      this.openDialoguePage(1500)
      if (!activeQuests["Yoga girl needs blocks"]) {
        activeQuests["Yoga girl needs blocks"] = "I was talking to this hot girl doing yoga. She was complaining about some stripper and asked if I had any yoga blocks. Maybe she'll give me something cool if I can find some."
      }
    } else if (distance(me, yogagirl) < 30 && yogagirlFirstTalk === 2 && items.includes("Yoga Blocks")) {
      yogagirlFirstTalk = 2
      this.openDialoguePage(1502)
      completeQuest("Yoga girl needs blocks")
      gameState.itemget.play()
      equipment.push("Gold Duck Tape")
      removeAll(items, "Yoga Blocks")
    } else if (distance(me, yogagirl) > 200 && yogagirlFirstTalk === 1) {
      yogagirlFirstTalk = 2
    }

    //ai for adeline
    if (distance(me, adeline) < 40 && adelineFirstTalk === 0 && trevor.joinParameter && girl2FirstDialogue >= 1) {
      gameState.adeline_idk.play();
      adelineFirstTalk = 1
      this.openDialoguePage(3500)
      if (!activeQuests["Adeline is pissed"]) {
        activeQuests["Adeline is pissed"] = "My lady friend Adeline is pissed because she heard me hitting on some girls by the pool. I should get her flowers or something... I think I saw some by the road at the Alton and Burcham intersection."
      }
    } else if (distance(me, adeline) < 30 && adelineFirstTalk === 2 && items.includes("Flowers")) {
      adelineFirstTalk = 2
      this.openDialoguePage(3502)
      completeQuest("Adeline is pissed")
      gameState.itemget.play()
      equipment.push("Camo Duck Tape")
      removeAll(items, "Flowers")
    } else if (distance(me, adeline) > 200 && adelineFirstTalk === 1) {
      adelineFirstTalk = 2
    }

    //dialogue ai for girl1 (Juanita)
    if (distance(me, girl1) < 10 && girl1FirstDialogue === 0 && distance(girl1, volleyball) > 300 && trevor.joinParameter) {
      gameState.hello.play()
      this.openDialoguePage(120)
      girl1FirstDialogue = 1
      activeQuests["Girls Wanna Play Volleyball"] = "Juanita wants me to get the volleyball so they can play. She said some crazy guy grabbed it and headed to the field behind 731 Burcham and St. Aquinas. Prolly Homeboy Jon, shiiit."
    } else if (distance(me, girl1) < 10 && distance(girl1, volleyball) < 300 && girl1FirstDialogue === 1 && trevor.joinParameter) {
      gameState.ooo.play()
      this.openDialoguePage(121)
      girl1FirstDialogue = 2
      completeQuest("Girls Wanna Play Volleyball")
    }
    //dialogue ai for girl4 (colleen)
    else if (distance(me, girl4) < 10 && girl4FirstDialogue === 0 && trevor.joinParameter && !items.includes("Gram of Coke")) {
      gameState.wutt.play()
      this.openDialoguePage(130)
      girl4FirstDialogue = 1
    } else if (distance(me, girl4) < 10 && girl4FirstDialogue === 2 && trevor.joinParameter) {
      gameState.wutt.play()
      this.openDialoguePage(136)
      girl4FirstDialogue = 4
    } else if (distance(me, girl4) > 50 && girl4FirstDialogue === 1) {
      girl4FirstDialogue = 0
    } else if (distance(me, girl4) > 50 && girl4FirstDialogue === 4) {
      girl4FirstDialogue = 2
    }
    //dialogue ai for girl2
    else if (distance(me, girl2) < 10 && girl2FirstDialogue === 0 && trevor.joinParameter) {
      gameState.heyy.play()
      this.openDialoguePage(98)
      girl2FirstDialogue = 1
      activeQuests["Becca Wants Some Smokes"] = "Becca seems drunk and asked me to get some smokes. She gave me about 3.50$. I can usually get some for free from Homeboy Jon. I wonder where he is..."
    } else if (distance(me, girl2) < 10 && girl2FirstDialogue === 1 && items.includes('Marlboro lights') && trevor.joinParameter) {
      //hamms -= 2
      this.openDialoguePage(110)
      girl2FirstDialogue = 2
      completeQuest("Becca Wants Some Smokes")
    }

    //ai for canjam
    if (time % 100 === 1) {
      canjam.anims.play('canjamplay', true)
    } else if (time % 50 === 1) {
      canjam.anims.play('canjamplay1', true)
    }

    //dialogue for pool party
    else if (firstPoolParty === 0 && distance(joe, girl1) < 800 && distance(jon, girl1) < 800 && distance(trevor, girl1) < 800 && distance(james, girl1) < 800) {
      this.openDialoguePage(60)
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
    } else if (trevor.joinParameter) {
      girl1.enableBody(true, gameState.Girl1SpawnPoint.x, gameState.Girl1SpawnPoint.y, true, true);
      girl3.enableBody(true, gameState.Girl3SpawnPoint.x, gameState.Girl3SpawnPoint.y, true, true);
      girl4.enableBody(true, gameState.Girl4SpawnPoint.x, gameState.Girl4SpawnPoint.y, true, true);
      girl2.enableBody(true, gameState.Girl2SpawnPoint.x, gameState.Girl2SpawnPoint.y, true, true);
      if (liquorGet === 0) {
        liquor.enableBody(true, liquor.x, liquor.y, true, true);
      }
      adeline.enableBody(true, adeline.x, adeline.y, true, true);
      yogagirl.disableBody(true, true);
      yogagirl.enableBody(true, gameState.YogaGirlSpawnPoint2.x, gameState.YogaGirlSpawnPoint2.y, true, true);
      yogamat.x = yogagirl.x;
      yogamat.y = yogagirl.y + 20;
    }

    //dialogue for finding phone and wallet
    if (phoneGet + walletGet === 2 && keysGet === 0) {
      phoneGet += 1;
      walletGet += 1;
      completeQuest('Find Your Stuff')
      activeQuests["Gotta Find My Keys"] = "I found my wallet and phone by the volleyball court, but I still have no idea where my keys are. I have a feeling I was in the woods last night. God damnit."
      window.setTimeout(() => {
        this.openDialoguePage(5)
      }, 800);
    }

    //dialogue for finding Keys
    if (phoneGet + walletGet + keysGet === 5) {
      completeQuest("Gotta Find My Keys")
      keysGet += 1;
      activeQuests["Gotta Find My Car"] = "I found my keys in the woods, but now I don't know where my car is. It must be close by, maybe there is a clearing somewhere around here I might have parked..."
      window.setTimeout(() => {
        this.openDialoguePage(6)
      }, 2000);
    }

    //dialogue for getting car first time
    if (playerTexture === 1 && firstTimeCarGet === 0) {
      this.openDialoguePage(7)
      firstTimeCarGet = 1
      completeQuest("Gotta Find My Car")
      activeQuests["Go to the Gas Station"] = "I found my car, hell yeah. I should go to the gas station and pick up some gatorades and monsters. I'm prolly almost out of gas too."
    }

    //we resume every frame... must be more efficient way... fix needed...
    if (pause) {
      this.physics.pause();
    } else {
      this.physics.resume()
    }

    if (scene_number === 1 && launchParameter === false) {
      pause = true;
      this.scene.launch('PauseMenu');
      launchParameter = true
    } else if (scene_number === 3 && launchParameter === false) {
      if (activeQuests["Go to the Gas Station"]) {
        completeQuest("Go to the Gas Station")
      }
      pause = true;
      this.scene.launch('GasStation');
      launchParameter = true
    } else if (scene_number === 10 && launchParameter === false) {
      pause = true;
      this.scene.launch('QuestLog');
      launchParameter = true
    } else if (scene_number === 99 && launchParameter === false) {
      pause = true;
      this.scene.launch('ControlsScene');
      launchParameter = true
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
    james.follow(me, .6)
    james.animate(40);
    //james.getUnstuck();

    if (playerTexture==='board' && jamesToggleFollow){
      james.joinParameter = true;
      james.following = true;
      jamesToggleFollow = false
    } else if (playerTexture!=='board' && jamesToggleFollow) {
      james.following = false;
      jamesToggleFollow = false;
      james.disableBody(true, true)
      james.enableBody(true, jamesPath[james.position].x+5, jamesPath[james.position].y+5, true, true);
    }

    if (playerTexture !== 'board'){
      followPath(james, jamesPath, 125)
    }


    if (distance(me, james) < 30 && jamesFirstTalk === 0) {
      this.openDialoguePage(40)
      jamesFirstTalk = 1;
      jamesGet = 'spoke';
      activeQuests['High School Roof'] = 'James said he saw some lights or aliens or something up on the high school roof. He is most likely just high as shit but I may as well get up there anyway.'
    } else if (distance(me, james) > 150 && jamesFirstTalk === 1) {
      jamesFirstTalk = 2
    } else if (distance(me, james) < 30 && jamesFirstTalk === 2 && playerTexture!='board' && !skateboardGet) {
      this.openDialoguePage(47)
      jamesFirstTalk = 3
    } else if (distance(me, james) > 150 && jamesFirstTalk === 3 && playerTexture!='board' && !skateboardGet) {
      jamesFirstTalk = 2
    }

    //ai for joe
    if (trevor.following) {
      joe.body.setCircle(60);
      joe.body.setOffset(60, 120);
      if (distance(joe, ball) > 300) {
        joe.disableBody(true, true)
        joe.enableBody(true, ball.x + Phaser.Math.FloatBetween(-150, 150), ball.y + Phaser.Math.FloatBetween(-100, 100), true, true);
      }
      joe.chase(ball, 2)
    }
    if (distance(joe, me) < 1000) {
      joe.animate();
      //joe.getUnstuck();
      if (!trevor.following) {
        followPath(joe, joePath, 75)
      }

      if (distance(me, joe) < 30 && joeFirstTalk === 0) {
        this.openDialoguePage(50)
        joeFirstTalk = 1;
        joeGet = 'spoke';
        activeQuests["Bets with Joe"] = "Joe wants to bet on pool. I should meet him in the leasing office at 731 Burcham."
      }
    }

    //ai for bennett
    bennett.follow(me, 1.4)
    bennett.animate()
    if (bennett.following === false) {
      followPath(bennett, bennettPath, 278)
      if (distance(me, bennett) < 600 && distance(me, bennett) > 580) {
        gameState.bennettSound.play()
      } else if (distance(me, bennett) > 600) {
        gameState.bennettSound.stop()
      }
      if (distance(me, bennett) < 30 && bennettFirstTalk === 0 && playerTexture === 0) {
        this.openDialoguePage(90)
        bennettFirstTalk = 1
        gameState.arnold_bennett.play()
        if (!activeQuests['Beat Bennett in a Race']) {
          activeQuests['Beat Bennett in a Race'] = 'I saw Bennett running along the road. If I can beat him in a race, maybe he will help me out. Remember if I always go full speed, I will run out of stamina real fast.'
        }

      } else if (distance(me, bennett) > 100) {
        bennettFirstTalk = 0
      }
    }
    //for bennett to join the party
    if (bennettGet === 1) {
      bennettGet = 2
      bennett.joinParameter = true;
      potentialParty["Bennett"] = true
    }


    //ai for al
    //al.getUnstuck();
    al.follow(me, 1.2);
    al.animate(3)
    if (!al.following) {
      followPath(al, alPath)
    }
    if (holdon === 1) {
      al.sound0.play();
      holdon = 0
    } else if (beatbox === 1) {
      gameState.beatbox.play();
      beatbox = 0
    } else if (gunTalk === 1) {
      this.openDialoguePage(35)
      const index = items.indexOf('Weed (2g)');
      if (index > -1) {
        items.splice(index, 1);
      }
      hamms -= 4
      gunTalk = 0
      completeQuest("Al wants some shit")
    } else if (distance(me, al) < 30 && alFirstTalk === 0 && al.joinParameter === false) {
      gameState.alSound.play()
      this.openDialoguePage(30)
      alFirstTalk = 1
      activeQuests["Al wants some shit"] = "I ran into Homeboy Al. He got this new airsoft gun and said I could fuck with it if I got him 4 beers (hamms) and 2g of weed. I can get beers from the gas station, but I should get my car first. Original homeboy usually has weed, I think he's usually in the woods."
    } else if (distance(me, al) > 300 && alFirstTalk === 1) {
      alFirstTalk = 0
    }

    if (alGet === 1) {
      alGet = 2;
      al.joinParameter = true;
      potentialParty["Al"] = true;
    }



    //ai for og homeboy
    if (distance(oghomeboy, me) < 1000) {
      oghomeboy.anims.play('smoke', true);
      if (distance(me, oghomeboy) < 30 && ogFirstTalk === 0) {
        gameState.bongSound.play()
        ogFirstTalk = 1
        this.openDialoguePage(80)
        activeQuests['Get Weed From OG Homeboy'] = 'I ran into OG homeboy in the woods. He said if I can beat his high score on his video game, I can get a discount on weed (2g for 10 bucks).'
      } else if (distance(me, oghomeboy) > 200) {
        ogFirstTalk = 0
      }
    }

    //ai for trevor
      if (distance(trevor, ball) > 400 && trevor.following === false) {
        trevor.disableBody(true, true)
        trevor.enableBody(true, ball.x + Phaser.Math.FloatBetween(-150, 150), ball.y + Phaser.Math.FloatBetween(-100, 100), true, true);
      }
      trevor.follow(me, 1)
      trevor.animate(5);
      if (trevor.body.velocity.x > 5) {
        trevor.flipX = false;
      }
      if (trevor.body.velocity.x < -5) {
        trevor.flipX = true;
      }

      //original value 1.4
      trevor.chase(ball, 1.45);
      //trevor.getUnstuck()
      //increases keepaway high score whenever not paused
      if (trevor.following === false && distance(me, ball) < 300 && distance(trevor, ball) > 30 && ((trevor.body.velocity.x) ** 2 + (trevor.body.velocity.y) ** 2 > 50)) {
        if (!pause) {
          keepaway += 1;
        }
        kickTheBallScoreDisplayed = true
      }
      if (distance(trevor, ball) < 30) {
        kickTheBallScoreDisplayed = false
        if (keepaway > keepawayHighScore) {
          keepawayHighScore = keepaway
        }
        if (keepaway > 100) {
          if (keepaway < 500) {
            this.DialogueMenu.scoreGotten.setText(`You got ${keepaway} points.`)
            this.DialogueMenu.scoreGottenDisplay.width = this.DialogueMenu.scoreGotten.width + 4;
            this.DialogueMenu.scoreGottenDisplayFront.width = this.DialogueMenu.scoreGotten.width;
          } else if (keepaway > 500 && keepaway < 1000) {
            this.DialogueMenu.scoreGotten.setText(`You got ${keepaway} points. YOU DON'T SUCK!`)
            this.DialogueMenu.scoreGottenDisplay.width = this.DialogueMenu.scoreGotten.width + 4;
            this.DialogueMenu.scoreGottenDisplayFront.width = this.DialogueMenu.scoreGotten.width;
          } else if (keepaway > 1000) {
            this.DialogueMenu.scoreGotten.setText(`You got ${keepaway} points. HOLY FUCK!`)
            this.DialogueMenu.scoreGottenDisplay.width = this.DialogueMenu.scoreGotten.width + 4;
            this.DialogueMenu.scoreGottenDisplayFront.width = this.DialogueMenu.scoreGotten.width;
          }
          showKickTheBallScore = true;
          //pause = true;
          window.setTimeout(() => {
            showKickTheBallScore = false;
            //pause = false;
          }, 3000);
        }
        if (keepaway > 100 && keepaway <= 300 && trevor.joinParameter === false) {
          this.openDialoguePage(25)
          if (!activeQuests['Go Pro at Kick-The-Ball'] && !completedQuests['Go Pro at Kick-The-Ball']) {
            activeQuests['Go Pro at Kick-The-Ball'] = 'Jimmy is real good at kick the ball. Keep the ball away from him for long enough and he might help you out.'
          }
        } else if (keepaway > 300 && trevor.joinParameter === false) {
          this.openDialoguePage(20)
          if (!activeQuests['Go Pro at Kick-The-Ball'] && !completedQuests['Go Pro at Kick-The-Ball']) {
            activeQuests['Go Pro at Kick-The-Ball'] = 'Jimmy is real good at kick the ball. Keep the ball away from him for long enough and he might help you out.'
          }
        } else if (keepaway > 500 && brothersSeal === 0 && neverBeenPro === true) {
          this.openDialoguePage(21)
        } else if (keepaway > 500 && brothersSeal === 0 && neverBeenPro === false) {
          this.openDialoguePage(24)
        } else if (keepaway > 1000 && brothersSeal === 1) {
          this.openDialoguePage(22)
        }
        keepaway = 0
      }
      if (keepaway === 500) {
        trevor.joinParameter = true;
        potentialParty["Jimmy"] = true;
        completeQuest('Go Pro at Kick-The-Ball');
      } else if (keepaway === 1000) {
        items.push("Brothers Seal")
        brothersSeal = 1
      }

    //ai for jon (soccer game) (football) (score goals)
    if (distance(net1, me) < 10000) {
      jon.animate()
      if (distance(me, jon) < 30 && jonFirstTalk === 0) {
        this.openDialoguePage(70)
        activeQuests["Score Goals on Homeboy Jon"] = 'I found homeboy Jon in the field behind 731. He said if I can score a goal on him he will give me smokes. If I score on his GOD MODE he might give me something real good.'
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
          this.openDialoguePage(72)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 1.1
          jonChaseX += 5 //makes him harder to score on
          jon.body.setSize(130, 20);
          jon.body.setOffset(35, 150); //makes him harder to score on
        } else if (volleyballScore === 2.1) {
          this.openDialoguePage(73)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 2.2
          jonChaseX += 5 //makes him harder to score on
          jon.body.setSize(140, 20);
          jon.body.setOffset(30, 150); //makes him harder to score on
        } else if (volleyballScore === 3.2) {
          this.openDialoguePage(74)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 3.3
          jonChaseX += 5 //makes him harder to score on
          jon.body.setSize(150, 20);
          jon.body.setOffset(25, 150); //makes him harder to score on
        } else if (volleyballScore === 4.3) {
          this.openDialoguePage(75)
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 4.4
          jonChaseX += 55 //makes him harder to score on
          jon.body.setSize(150, 20);
          jon.body.setOffset(25, 150); //makes him harder to score on
        } else if (volleyballScore === 5.4) {
          this.openDialoguePage(76)
          completeQuest("Score Goals on Homeboy Jon")
          jon.y = gameState.JonSpawnPoint.y - 60
          volleyballScore = 5.5
          jonChaseX -= 20 //makes him easier to score on
          jon.body.setSize(170, 20);
          jon.body.setOffset(15, 150); //makes him harder to score on
        } else if (volleyballScore === 6.5) {
          this.openDialoguePage(76)
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
          //getUnstuck(child)
          randomWalk(child)
        }
        if (distance(child, me) < 400 && child !== fratboy2prime && child !== fratboy5) {
          chase(child, me, 1.2)
        }
      }
    });

    //ai for crackhead
    crackhead.animate(5)
    if (crackhead.body.velocity.x > 5) {
      crackhead.flipX = false;
    }
    if (crackhead.body.velocity.x < -5) {
      crackhead.flipX = true;
    }
    if (!crackhead.following) {
      crackhead.randomWalk(1)
      if (distance(me, crackhead) < 30 && crackheadFirstTalk === 0) {
        if (!activeQuests["Crackhead wants some change"]) {
          activeQuests["Crackhead wants some change"] = 'That one crackhead wants some money. He says he needs 10 bucks. Maybe if I give it to him, he will help me out instead of attacking me all the time...'
        }
        gameState.iwantsomecrack.play()
        if (moneyToCrackhead >= 10 && crackheadFirstJoin) {
          completeQuest("Crackhead wants some change")
          crackheadJoin = true;
          crackheadFirstJoin = false;
          crackheadFirstTalk = 1
          this.openDialoguePage(2002)
          crackhead.joinParameter = true;
        } else {
          this.openDialoguePage(2000)
          crackheadFirstTalk = 1
        }
      } else if (distance(me, crackhead) > 50 && crackheadFirstTalk === 1) {
        crackheadFirstTalk = 0
      }
    } else if (crackhead.following) {
      crackhead.follow(me, 1)
    }


    //ai for junkie
    if (distance(junkie, me) < 1000) {
      if (junkie.body.velocity.x > 5) {
        junkie.anims.play('junkieright', true)
        junkie.flipX = false;
      }
      if (junkie.body.velocity.x < 5) {
        junkie.anims.play('junkieright', true)
        junkie.flipX = true;
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
        fratboy1.flipX = false;
      }
      if (fratboy1.body.velocity.x < 5) {
        fratboy1.anims.play('frat1right', true)
        fratboy1.flipX = true;
      }
      if (distance(me, fratboy1) < 30 && fratboy1FirstTalk === 0) {
        this.openDialoguePage(200)
        fratboy1FirstTalk = 1
      }
    }

    //ai for fratboy2
    if (distance(fratboy2, me) < 1000) {
      if (fratboy2.body.velocity.x > 5) {
        fratboy2.anims.play('frat2right', true)
        fratboy2.flipX = false;
      }
      if (fratboy2.body.velocity.x < 5) {
        fratboy2.anims.play('frat2right', true)
        fratboy2.flipX = true;
      }

      if (distance(me, fratboy2) < 30 && fratboy2FirstTalk === 0) {
        this.openDialoguePage(210)
        fratboy2FirstTalk = 1
      }
    }


    //ai for fratboy3
    if (distance(fratboy3, me) < 1000) {
      if (fratboy3.body.velocity.x > 5) {
        fratboy3.anims.play('frat3right', true)
        fratboy3.flipX = false;
      }
      if (fratboy3.body.velocity.x < 5) {
        fratboy3.anims.play('frat3right', true)
        fratboy3.flipX = true;
      }

      if (distance(me, fratboy3) < 30 && fratboy3FirstTalk === 0) {
        this.openDialoguePage(220)
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
        this.openDialoguePage(230)
        fratboy4FirstTalk = 1
      }
    }

    //ai for fratboy5
    if (distance(fratboy5, me) < 1000) {
      fratboy5.anims.play('frat5huhuh', true)
      if (distance(me, fratboy5) < 30 && fratboy5FirstTalk === 0) {
        this.openDialoguePage(1100)
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

    //player animations and controls
    if (!this.gettingLaidOutByCar && playerTexture!='board' && playerTexture!=1) {
      me.body.setVelocity(0);
    }

    //pointer controls

    if (playerTexture === 0 && inPool === false && !this.gettingLaidOutByCar) {
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
      if (this.cursors.left.isDown && !diving && !kicking) {
        me.flipX = true;
        if (speed === 1) {
          me.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          me.anims.play('newrightrun', true);
        } else if (speed > 3) {
          me.anims.play('newrightsprint', true);
        }
      } else if (this.cursors.right.isDown && !diving && !kicking) {
        me.flipX = false;
        if (speed === 1) {
          me.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          me.anims.play('newrightrun', true);
        } else if (speed > 3) {
          me.anims.play('newrightsprint', true);
        }
      }
      if (this.cursors.up.isDown && !(this.cursors.right.isDown) && !diving && !kicking) {
        me.flipX = true;
        if (speed === 1) {
          me.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          me.anims.play('newrightrun', true);
        } else if (speed > 3) {
          me.anims.play('newrightsprint', true);
        }
      } else if (this.cursors.down.isDown && !(this.cursors.left.isDown) && !diving && !kicking) {
        me.flipX = false;
        if (speed === 1) {
          me.anims.play('rightwalk', true);
        } else if (speed === 2 || speed === 3) {
          me.anims.play('newrightrun', true);
        } else if (speed > 3) {
          me.anims.play('newrightsprint', true);
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
        me.anims.play('rightswim', true);
        me.flipX = true;
      } else if (this.cursors.right.isDown) {
        me.anims.play('rightswim', true);
        me.flipX = false;
      }
      if (this.cursors.up.isDown && !(this.cursors.right.isDown)) {
        me.anims.play('rightswim', true);
        me.flipX = false;
      } else if (this.cursors.down.isDown && !(this.cursors.left.isDown)) {
        me.anims.play('rightswim', true);
        me.flipX = true;
      }
    }

    //skateboard texture
    if (playerTexture === 'board'){
      speed = 4;
    }
    if (playerTexture === 'board' && startSkateboardScene){
      jamesToggleFollow = true;
      stamina = 100;
      this.DialogueMenu.kickflipRotationDisplay.angle = 0;
      this.kickflipTimer = 0;
      this.ollieTimer = 0;
      startSkateboardScene = false;
      this.cameras.main.fadeOut(1000, 0, 0, 0)
      window.setTimeout(()=>{
        this.cameras.main.fadeIn(1000, 0, 0, 0)
      }, 1000)
      me.x = jeanPath[25].x;
      me.y = jeanPath[25].y;
      james.x = jeanPath[25].x+64;
      james.y = jeanPath[25].y;
      me.body.setVelocity(0,0);
    }
    if (!skateboardGet && playerTexture === 'board' && !(me.y>gameState.westburchamroadTL.y - 50 &&  me.y<gameState.eastburchamroadBR.y+50 && me.x>gameState.westburchamroadTL.x - 50 && me.x< gameState.eastburchamroadBR.x + 50)){
      this.DialogueMenu.kickflipRotationDisplay.angle = 0;
      this.kickflipTimer = 0;
      this.ollieTimer = 0;
      me.x = jeanPath[25].x;
      me.y = jeanPath[25].y;
      james.x = jeanPath[25].x+64;
      james.y = jeanPath[25].y;
      me.body.setVelocity(0,0);
      kickflipCounter = 0;
      this.openDialoguePage(48)
    }
    if (playerTexture === 'board' && stamina<=10 && !skateboardGet){
      playerTexture = 0;
      jamesToggleFollow = true;
      this.DialogueMenu.kickflipRotationDisplay.visible = false;
      kickflipScoreDisplayed = false;
      this.DialogueMenu.kickflipRotationDisplay.angle = 0;
      this.openDialoguePage(46)
      james.x = jamesPath[0].x;
      james.y = jamesPath[0].y;
      james.position = 0;
      this.ollie = false;
    }
    if (playerTexture === 'board' && !pause) {
      if (me.body.blocked.right || me.body.blocked.left || me.body.blocked.down || me.body.blocked.up){
        stamina -= 5;
        me.anims.play('meDeadSkateboard', true);
        this.kickflipCounter=0;
        kickflipScoreDisplayed = false;
        gameState.crashBoard.play();
        gameState.skateboard.stop()
        if (skateboardGet){
          playerTexture = 0;
          jamesToggleFollow = true;
          this.DialogueMenu.kickflipRotationDisplay.visible = false;
          kickflipScoreDisplayed = false;
          this.DialogueMenu.kickflipRotationDisplay.angle = 0;
        }
        me.setVelocity(0,0);
        pause = true;
        window.setTimeout(() => {
          pause = false
        }, 2000);
      }
      // player Horizontal movement
      if (me.body.velocity.x**2 + me.body.velocity.y**2>100 && !this.ollie && !this.playingSkateboard){
        gameState.skateboard.play();
        this.playingSkateboard = true;
      } if (this.ollie || (me.body.velocity.x**2 + me.body.velocity.y**2===0)){
        this.playingSkateboard = false;
        gameState.skateboard.stop()
      }
      if (this.cursors.left.isDown && !this.ollie) {
        me.body.setVelocityX(me.body.velocity.x-2*speed);
      } else if (this.cursors.right.isDown && !this.ollie) {
        me.body.setVelocityX(me.body.velocity.x+2*speed);
      }
      // player Vertical movement
      if (this.cursors.up.isDown && !this.ollie && Math.abs(me.body.velocity.x)>100) {
        me.body.setVelocityY(me.body.velocity.y-speed);
      } else if (this.cursors.down.isDown && !this.ollie&& Math.abs(me.body.velocity.x)>100) {
        me.body.setVelocityY(me.body.velocity.y+speed);
      }
      if (me.body.velocity.x>300){
        me.body.setVelocityX(300);
      } if (me.body.velocity.x<-300){
        me.body.setVelocityX(-300);
      } if (me.body.velocity.y>300){
        me.body.setVelocityY(300);
      } if (me.body.velocity.y<-300){
        me.body.setVelocityY(-300);
      }
      if (this.kickflipCounter===10 && !skateboardGet){
        this.openDialoguePage(45);
        this.kickflipCounter = 0;
        gameState.skateboard.stop()
        this.ollie = false;
      }
      if (this.kickflipCounter===20 && brothersSealForSkateboarding === 0){
        this.openDialoguePage(455);
        items.push("Brothers Seal (board)")
        brothersSealForSkateboarding = 1
        this.ollie = false;
      }
      //kickflip timer
      if (this.keyObjD.isDown && playerTexture === 'board' && this.ollie){
        this.kickflipTimer+=1;
      } else if (this.ollie && this.kickflipTimer>0){
        me.anims.stop()
      }
      //skateboarding animations
      if (!this.ollie && !this.kickflip && !pause) {
        if (me.body.velocity.x<0 && (this.cursors.left.isDown || this.cursors.up.isDown) && !this.ollie) {
          me.anims.play('board_right', true);
          me.flipX = true;
        } else if (me.body.velocity.x>0  && (this.cursors.right.isDown || this.cursors.down.isDown) && !this.ollie) {
          me.anims.play('board_right', true);
          me.flipX = false;
        } else if (me.body.velocity.x<0){
          me.setFrame(1);
          me.flipX = true;
          me.body.setVelocityX(me.body.velocity.x+1)
        } else if (me.body.velocity.x>0){
          me.setFrame(1);
          me.flipX = false;
          me.body.setVelocityX(me.body.velocity.x-1)
        } else {
          me.setFrame(1);
        }
      } else if (this.ollie && !this.kickflip && !pause) {
        this.ollieTimer += 1;
        if (this.ollieTimer < 35) {
          me.y -= 1;
        } else if (this.ollieTimer >= 35) {
          me.y += 1;
        }
        if (this.ollieTimer === 1){
          gameState.ollie_takeoff.play();
        }
        if (this.ollieTimer > 70) {
          this.ollie = false;
          this.ollieTimer = 0;
          gameState.ollie_land.play();
          me.anims.play('board_right', true);
        }
        if (this.cursors.left.isDown && !this.kickflip) {
          me.anims.play('ollie_right', true);
          me.flipX = true;
        } else if (this.cursors.right.isDown && !this.kickflip) {
          me.anims.play('ollie_right', true);
          me.flipX = false;
        }
      } else if (this.ollie && this.kickflip) {
        this.ollieTimer += 1;
        if (this.ollieTimer < 35) {
          me.y -= 1;
        } else if (this.ollieTimer >= 35) {
          me.y += 1;
        }
        if (this.ollieTimer < 70) {
          me.anims.play('kickflip_right', true);
        } else if (this.ollieTimer > 70) {
          gameState.ollie_land.play();
          window.setTimeout(()=>{
            //this.DialogueMenu.kickflipRotationDisplay.visible = false;
            this.DialogueMenu.kickflipRotationDisplay.angle = 0;
          }, 500)
          if (Math.abs(this.ollieTimer - this.kickflipTimer-10) < 2) {
            this.ollie = false;
            this.kickflip = false;
            this.kickflipTimer = 0;
            this.ollieTimer = 0;
            this.kickflipCounter+=2
            kickflipScoreDisplayed = true;
            me.anims.play('board_right', true);
            gameState.itemget.play();
          } else if (Math.abs(this.ollieTimer - this.kickflipTimer-40) < 4) {
            this.ollie = false;
            this.kickflip = false;
            this.kickflipTimer = 0;
            this.ollieTimer = 0;
            this.kickflipCounter+=1
            kickflipScoreDisplayed = true;
            me.anims.play('board_right', true);
            gameState.itemget.play();
          } else {
            this.ollie = false;
            this.kickflip = false;
            this.kickflipTimer = 0;
            this.ollieTimer = 0;
            this.kickflipCounter=0;
            kickflipScoreDisplayed = false;
            if (skateboardGet){
              playerTexture = 0;
              jamesToggleFollow = true;
              this.DialogueMenu.kickflipRotationDisplay.visible = false;
              kickflipScoreDisplayed = false;
              this.DialogueMenu.kickflipRotationDisplay.angle = 0;
            }
            me.anims.play('meDeadSkateboard', true);
            gameState.crashBoard.play()
            me.setVelocity(0,0);
            pause = true;
            window.setTimeout(() => {
              pause = false
            }, 2000);
          }
        }
      }
    }

    //player walking running animations

    // for when you get in the car (controls for car)
    else if (playerTexture === 1) {
      if (gas < 0) {
        gas = 0
      }

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

      if (this.keyObjD.isDown){ //apply the brakes when you press D
        me.body.setVelocityX(me.body.velocity.x*8/10)
        me.body.setVelocityY(me.body.velocity.y*8/10)
      }

      if (this.cursors.left.isDown && gas > 0) {
        gas -= .0009
          if (firstKeyDown==='left'){
            me.body.setVelocityX(me.body.velocity.x-7*speed);
          } else {
            me.body.setVelocityX(me.body.velocity.x-3*speed);
          }
      }
      if (this.cursors.right.isDown && gas > 0) {
        gas -= .0009
        if (firstKeyDown==='right'){
          me.body.setVelocityX(me.body.velocity.x+7*speed);
        } else {
          me.body.setVelocityX(me.body.velocity.x+3*speed);
        }
      }
      if (this.cursors.up.isDown && gas > 0) {
        gas -= .0009
        if (firstKeyDown==='up'){
          me.body.setVelocityY(me.body.velocity.y-7*speed);
        } else {
          me.body.setVelocityY(me.body.velocity.y-3*speed);
        }
      }
      if (this.cursors.down.isDown && gas > 0) {
        gas -= .0009
        if (firstKeyDown==='down'){
          me.body.setVelocityY(me.body.velocity.y+7*speed);
        } else {
          me.body.setVelocityY(me.body.velocity.y+3*speed);
        }
      }

      if (me.body.velocity.x>250*speed){
        me.body.setVelocityX(250*speed)
      } else if (me.body.velocity.x<-250*speed){
        me.body.setVelocityX(-250*speed)
      } else if (me.body.velocity.y>250*speed){
        me.body.setVelocityY(250*speed)
      } else if (me.body.velocity.y<-250*speed){
        me.body.setVelocityY(-250*speed)
      }

      //sets body angle and size depending on 4 different velocity conditions
      if (me.body.velocity.x < 0 && me.body.velocity.x**2>me.body.velocity.y**2){
        me.angle = 270;
        me.body.setSize(64, 32);
        me.body.setOffset(0, 16)
      } else if (me.body.velocity.x > 0 && me.body.velocity.x**2>me.body.velocity.y**2){
        me.angle = 90;
        me.body.setSize(64, 32);
        me.body.setOffset(0, 16)
      } else if (me.body.velocity.y < 0 && me.body.velocity.x**2<me.body.velocity.y**2){
        me.angle = 0;
        me.body.setSize(32, 64);
        me.body.setOffset(16, 0)
      } else if (me.body.velocity.y > 0 && me.body.velocity.x**2<me.body.velocity.y**2){
        me.angle = 180;
        me.body.setSize(32, 64);
        me.body.setOffset(16, 0)
      }



    } else if (playerTexture === 'race') {
      // player Horizontal movement
      if (this.cursors.left.isDown) {
        me.body.setVelocityX(-50 * speed * athletics);
      }
      //player walking running animations
      if (this.cursors.left.isDown) {
        if (speed > 2) {
          me.anims.play('newrightsprint', true);
          me.flipX = true;
        } else {
          me.flipX = true;
          me.anims.play('rightwalk', true);
        }
      }
      if (me.body.velocity.x === 0 && me.body.velocity.y === 0) {
        me.anims.play('turn', true)
        me.flipX = false;
      }
    }
    me.x = Math.round(me.x);
    me.y = Math.round(me.y);
  }
});
