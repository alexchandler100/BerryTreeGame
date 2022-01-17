let recordingTime = 0;
let keyboardVolume = 0.4;
let recording = false;
let playing = false;
let customMusicPlaying= false;
let playingTime = 0;
let gameState6 = {}
let timeTest = true
let timer = 0
let quantizing=false;

gameState6.keyObj = {}

gameState6.keys=['A','W','S','E','D','F','T','G','Y','H','U','J','K','O','L','P']
gameState6.sequences = {}
gameState6.sequences.piano = {}
gameState6.sequences.piano.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.piano[gameState6.keys[i]]=[]
}

gameState6.sequences.bass = {}
gameState6.sequences.bass.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.bass[gameState6.keys[i]]=[]
}

gameState6.sequences.guitar = {}
gameState6.sequences.guitar.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.guitar[gameState6.keys[i]]=[]
}

gameState6.sequences.choir = {}
gameState6.sequences.choir.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.choir[gameState6.keys[i]]=[]
}

gameState6.sequences.wurlitzer = {}
gameState6.sequences.wurlitzer.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.wurlitzer[gameState6.keys[i]]=[]
}

gameState6.sequences.strings = {}
gameState6.sequences.strings.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.strings[gameState6.keys[i]]=[]
}


gameState6.sequences.clav = {}
gameState6.sequences.clav.octave = [];
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.clav[gameState6.keys[i]]=[]
}

gameState6.sequences.drums = {}
for (let i=0;i<gameState6.keys.length;i++){
  gameState6.sequences.drums[gameState6.keys[i]]=[]
}

function stopRecording(){
  recording = false;
  recordingTime = 0;
  //quantize
  if (gameState6.instrument === 'piano' && quantizing) {
    for (const keyy of Object.keys(gameState6.sequences[gameState6.pianoType])) {
      if (keyy !== 'octave') {
        quantize(gameState6.sequences[gameState6.pianoType][keyy]);
      }
    }
  } else if (gameState6.instrument === 'drums' && quantizing) {
    for (const keyy of Object.keys(gameState6.sequences.drums)) {
      quantize(gameState6.sequences.drums[keyy]);
    }
  }
}

function record(){
  playing = false;
  playingTime = 0;
  if (gameState6.instrument==='piano'){
    gameState6.sequences[gameState6.pianoType].A = []
    gameState6.sequences[gameState6.pianoType].W = []
    gameState6.sequences[gameState6.pianoType].S = []
    gameState6.sequences[gameState6.pianoType].E = []
    gameState6.sequences[gameState6.pianoType].D = []
    gameState6.sequences[gameState6.pianoType].F = []
    gameState6.sequences[gameState6.pianoType].T = []
    gameState6.sequences[gameState6.pianoType].G = []
    gameState6.sequences[gameState6.pianoType].Y = []
    gameState6.sequences[gameState6.pianoType].H = []
    gameState6.sequences[gameState6.pianoType].U = []
    gameState6.sequences[gameState6.pianoType].J = []
    gameState6.sequences[gameState6.pianoType].K = []
    gameState6.sequences[gameState6.pianoType].O = []
    gameState6.sequences[gameState6.pianoType].L = []
    gameState6.sequences[gameState6.pianoType].P = []
  } else if (gameState6.instrument==='drums'){
    gameState6.sequences.drums.A = []
    gameState6.sequences.drums.W = []
    gameState6.sequences.drums.S = []
    gameState6.sequences.drums.E = []
    gameState6.sequences.drums.D = []
    gameState6.sequences.drums.F = []
    gameState6.sequences.drums.T = []
    gameState6.sequences.drums.G = []
    gameState6.sequences.drums.Y = []
    gameState6.sequences.drums.H = []
    gameState6.sequences.drums.U = []
    gameState6.sequences.drums.J = []
    gameState6.sequences.drums.K = []
    gameState6.sequences.drums.O = []
    gameState6.sequences.drums.L = []
    gameState6.sequences.drums.P = []
  }
  // 2 metronome clicks per second
  for (let i = 0; i < 20 ; i++) {
    window.setTimeout(() => {
      if (i === 4) {
        recording = true;
        playing = true;
      }
      if (i % 4 === 0 && (recording || i<4)) {
        gameState6.metronome1.play()
      } else if (recording || i<4) {
        gameState6.metronome2.play()
      }
    }, 500 * i);
  }
}

function quantize(sequence,strength=.125){
  //create list of true components in sequence
  let componentBeginners = [];
  let componentEnders = [];
  let listOfComponents = [];
  //making lists of beginnings and endings of true components
  for (let i=0;i<sequence.length;i++){
    if ((sequence[i] && i===0) || (sequence[i] && !sequence[i-1])){
      componentBeginners.push(i)
    }
    if (sequence[i] && !(sequence[i+1])){
      componentEnders.push(i)
    }
  }
  //making list of true components
  for (let i=0;i<componentBeginners.length;i++){
    let component = []
    for (let r=componentBeginners[i];r<componentEnders[i]+1;r++){
      component.push(r)
    }
    listOfComponents.push(component)
  }
  //quantizing each true component rounding down if closer to lower end up otherwise
  for (let i=0;i<listOfComponents.length;i++){
    for (let j=0;j<listOfComponents[i];j++){
      sequence[listOfComponents[i][j]]=false;
    }
    if (listOfComponents[i][0]%15<=7){
      for (let j=0;j<listOfComponents[i];j++){
        sequence[listOfComponents[i][j]-i%15]=true;
      }
    } else {
      for (let j=0;j<listOfComponents[i];j++){
        sequence[listOfComponents[i][j]+15-i%15]=true;
      }
    }
  }
}


var Keyboard = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "Keyboard"
    });
  },
  init: function(data) {
    //sumn
  },
  onKeyInput: function(event) {
    if (event.code === "Backspace") {
      if (playing) {
        playing = false;
        playingTime=0;
        stopRecording();
      } else {
        playing = true;
      }
    }
  },
  preload: function() {
    this.load.audio('metronome1', 'assets/metronome1.wav');
    this.load.audio('metronome2', 'assets/metronome2.wav');
    this.load.audio('hiphopdrums1', 'assets/hiphopdrums1.wav');
    this.load.audio('middleC', 'assets/piano_middle_c.wav');
    this.load.audio('wurlmiddleC', 'assets/wurlitzer_middle_c.wav');
    this.load.audio('bassmiddleC', 'assets/bass_middle_c.wav');
    this.load.audio('choirmiddleC', 'assets/choir_middle_c.wav');
    this.load.audio('clavmiddleC', 'assets/clav_middle_c.wav');
    this.load.audio('guitarmiddleC', 'assets/guitar_middle_c.wav');
    this.load.audio('stringsmiddleC', 'assets/strings_middle_c.wav');
    this.load.audio('hihat1', 'assets/hihat1.wav');
    this.load.audio('openhihat1', 'assets/openhihat1.wav');
    this.load.audio('hihat2', 'assets/hihat2.wav');
    this.load.audio('kick1', 'assets/kick1.wav');
    this.load.audio('kick2', 'assets/kick2.wav');
    this.load.audio('shaker1', 'assets/shaker1.wav');
    this.load.audio('shaker2', 'assets/shaker2.wav');
    this.load.audio('snare1', 'assets/snare1.wav');
    this.load.audio('snare2', 'assets/snare2.wav');
    this.load.audio('tambourine1', 'assets/tambourine1.wav');
    this.load.audio('megamantom', 'assets/megamantom.wav');
    this.load.image('motif6', 'assets/motif6big.png')
  },
  create: function() {
    //background and border
    this.border = this.add.rectangle(0,0, 1200, 600, 0xb39c0e).setOrigin(0,0);
    this.background = this.add.rectangle(4, 4, 1196, 596, 0x000).setOrigin(0,0);
    //to use backspace and such from onKeyInput method
    this.input.keyboard.on("keydown", this.onKeyInput, this);
    //for recording

    //trying to get rid of delay but nothing works
    //console.log(Phaser.Sound)
    //const sound = this.sound as Phaser.Sound.HTML5AudioSoundManager
    //sound.audioPlayDelay = 0.1
    //sound.loopEndOffset = 0.05
    //Phaser.Sound.HTML5AudioSoundManager.audioPlayDelay = 0
    //Phaser.Sound.HTML5AudioSoundManager.loopEndOffset = 50
    gameState6.pianoType = 'piano'
    let backgroundPlaying = false;
    gameState6.instrument = 'piano'
    this.scene.sleep('LightWorld')
    gameState.music.stop()
    gameState.marioWoods.stop()
    gameState.linkWoods.stop()
    gameState.trevorWoods.stop()
    gameState6.octave = 0;
    motif6 = this.add.image(100, 100, 'motif6').setOrigin(0, 0).setDepth(1);

    //exit button
    gameState6.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff).setDepth(1);
    gameState6.exit_button.setInteractive()
    gameState6.exit_button.on('pointerup', function() {
      playing = false;
      launchParameter=false;
      scene_number = 'indoors';
      this.scene.stop();
      if (musRnd === 0) {
        gameStateApt.indoors0.play()
      } else if (musRnd === 1) {
        gameStateApt.indoors1.play()
      } else if (musRnd === 2) {
        gameStateApt.indoors2.play()
      } else if (musRnd === 3) {
        gameStateApt.indoors3.play()
      }
      pause = false;
    }, this);
    exitText = this.add.text(1080 - 7, 70 - 14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //set to music button
    gameState6.set_button = this.add.rectangle(20, 70, 100, 20, 0xfff).setOrigin(0,0);
    gameState6.set_button.setInteractive()
    gameState6.set_button.on('pointerup', function() {
      customMusicStart = true;
      playing = true;
      launchParameter=false;
      scene_number = 'indoors';
      this.scene.stop();
      if (musRnd === 0) {
        gameStateApt.indoors0.play()
      } else if (musRnd === 1) {
        gameStateApt.indoors1.play()
      } else if (musRnd === 2) {
        gameStateApt.indoors2.play()
      } else if (musRnd === 3) {
        gameStateApt.indoors3.play()
      }
      pause = false;
    }, this)
    setText = this.add.text(20, 70, 'Set as overworld theme', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);
    gameState6.set_button.width = setText.width

    //unset to music button (same as exit button actually)
    gameState6.unset_button = this.add.rectangle(20, 20, 100, 20, 0xfff).setOrigin(0,0);
    gameState6.unset_button.setInteractive()
    gameState6.unset_button.on('pointerup', function() {
      playing = false;
      launchParameter=false;
      scene_number = 'indoors';
      this.scene.stop();
      if (musRnd === 0) {
        gameStateApt.indoors0.play()
      } else if (musRnd === 1) {
        gameStateApt.indoors1.play()
      } else if (musRnd === 2) {
        gameStateApt.indoors2.play()
      } else if (musRnd === 3) {
        gameStateApt.indoors3.play()
      }
      pause = false;
    }, this)
    unsetText = this.add.text(20, 20, 'Delete as overworld theme', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);
    gameState6.unset_button.width = unsetText.width

    gameState6.pianomiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.pianomiddleC[i] = this.sound.add('middleC', {
        volume: keyboardVolume
      });
      gameState6.pianomiddleC[i].setDetune(100 * i);
    }

    gameState6.bassmiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.bassmiddleC[i] = this.sound.add('bassmiddleC', {
        volume: keyboardVolume
      });
      gameState6.bassmiddleC[i].setDetune(100 * i);
    }

    gameState6.stringsmiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.stringsmiddleC[i] = this.sound.add('stringsmiddleC', {
        volume: keyboardVolume
      });
      gameState6.stringsmiddleC[i].setDetune(100 * i);
    }

    gameState6.clavmiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.clavmiddleC[i] = this.sound.add('clavmiddleC', {
        volume: keyboardVolume
      });
      gameState6.clavmiddleC[i].setDetune(100 * i);
    }

    gameState6.choirmiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.choirmiddleC[i] = this.sound.add('choirmiddleC', {
        volume: keyboardVolume
      });
      gameState6.choirmiddleC[i].setDetune(100 * i);
    }

    gameState6.guitarmiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.guitarmiddleC[i] = this.sound.add('guitarmiddleC', {
        volume: keyboardVolume
      });
      gameState6.guitarmiddleC[i].setDetune(100 * i);
    }

    gameState6.wurlitzermiddleC = {}
    for (let i = 0; i < 16; i++) {
      gameState6.wurlitzermiddleC[i] = this.sound.add('wurlmiddleC', {
        volume: keyboardVolume
      });
      gameState6.wurlitzermiddleC[i].setDetune(100 * i);
    }

    gameState6.metronome1=this.sound.add('metronome1');
    gameState6.metronome2=this.sound.add('metronome2');

    gameState6.drums = {}
    gameState6.drums.A=this.sound.add('kick1', {
      volume: keyboardVolume
    });
    gameState6.drums.W=this.sound.add('kick2', {
      volume: keyboardVolume
    });
    gameState6.drums.S=this.sound.add('snare1', {
      volume: keyboardVolume
    });
    gameState6.drums.E=this.sound.add('snare2', {
      volume: keyboardVolume
    });
    gameState6.drums.D=this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    gameState6.drums.D.setDetune(-1200);
    gameState6.drums.F=this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    gameState6.drums.F.setDetune(-600);
    gameState6.drums.T=this.sound.add('hihat1', {
      volume: keyboardVolume
    });
    gameState6.drums.G=this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    gameState6.drums.Y=this.sound.add('hihat2', {
      volume: keyboardVolume
    });
    gameState6.drums.H=this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    gameState6.drums.H.setDetune(600);
    gameState6.drums.U=this.sound.add('openhihat1', {
      volume: keyboardVolume
    });
    gameState6.drums.J=this.sound.add('shaker1', {
      volume: keyboardVolume
    });
    gameState6.drums.K=this.sound.add('shaker2', {
      volume: keyboardVolume
    });
    gameState6.drums.O=this.sound.add('tambourine1', {
      volume: keyboardVolume
    });

    //piano button
    gameState6.piano_button = this.add.rectangle(500, 30, 95, 20, 0xfff).setDepth(1);
    gameState6.piano_button.setInteractive()
    gameState6.piano_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'piano') {
        gameState6.pianoType = 'piano'
        gameState6.middleC = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('middleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    pianoText = this.add.text(500 - 35, 30 - 14, 'piano', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //choir button
    gameState6.choir_button = this.add.rectangle(500, 60, 95, 20, 0xfff).setDepth(1);
    gameState6.choir_button.setInteractive()
    gameState6.choir_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'choir') {
        gameState6.pianoType = 'choir'
        gameState6.middleC = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('choirmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    choirText = this.add.text(500 - 35, 60 - 14, 'choir', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //drums button
    gameState6.drums_button = this.add.rectangle(605, 30, 95, 20, 0xfff).setDepth(1);
    gameState6.drums_button.setInteractive();
    gameState6.drums_button.on('pointerup', function() {
      gameState6.instrument = 'drums'
    }, this);
    drumsText = this.add.text(600 - 30, 30 - 14, 'drums', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //strings button
    gameState6.strings_button = this.add.rectangle(620, 60, 115, 20, 0xfff).setDepth(1);
    gameState6.strings_button.setInteractive()
    gameState6.strings_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'strings') {
        gameState6.pianoType = 'strings'
        gameState6.middleC = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('stringsmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    stringsText = this.add.text(605 - 35, 60 - 14, 'strings', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //wurlitzer button
    gameState6.wurl_button = this.add.rectangle(740, 30, 150, 20, 0xfff).setDepth(1);
    gameState6.wurl_button.setInteractive()
    gameState6.wurl_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'wurlitzer') {
        gameState6.pianoType = 'wurlitzer'
        gameState6.middleC = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('wurlmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    wurlText = this.add.text(710 - 35, 30 - 14, 'wurlitzer', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //guitar button
    gameState6.guitar_button = this.add.rectangle(745, 60, 100, 20, 0xfff).setDepth(1);
    gameState6.guitar_button.setInteractive()
    gameState6.guitar_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'guitar') {
        gameState6.pianoType = 'guitar'
        gameState6.middleC = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('guitarmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    guitarText = this.add.text(735 - 35, 60 - 14, 'guitar', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //bass button
    gameState6.bass_button = this.add.rectangle(870, 30, 90, 20, 0xfff).setDepth(1);
    gameState6.bass_button.setInteractive()
    gameState6.bass_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'bass') {
        gameState6.pianoType = 'bass'
        gameState6.middleC = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('bassmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    bassText = this.add.text(870 - 35, 30 - 14, 'bass', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //clav button
    gameState6.clav_button = this.add.rectangle(855, 60, 90, 20, 0xfff).setDepth(1);
    gameState6.clav_button.setInteractive()
    gameState6.clav_button.on('pointerup', function() {
      gameState6.instrument = 'piano'
      if (gameState6.pianoType !== 'clav') {
        gameState6.pianoType = 'clav'
        gameState6.middleC = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC100.setDetune(100);
        gameState6.middleC200 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC200.setDetune(200);
        gameState6.middleC300 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC300.setDetune(300);
        gameState6.middleC400 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC400.setDetune(400);
        gameState6.middleC500 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC500.setDetune(500);
        gameState6.middleC600 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC600.setDetune(600);
        gameState6.middleC700 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC700.setDetune(700);
        gameState6.middleC800 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC800.setDetune(800);
        gameState6.middleC900 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC900.setDetune(900);
        gameState6.middleC1000 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1000.setDetune(1000);
        gameState6.middleC1100 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1100.setDetune(1100);
        gameState6.middleC1200 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1200.setDetune(1200);
        gameState6.middleC1300 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1300.setDetune(1300);
        gameState6.middleC1400 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1400.setDetune(1400);
        gameState6.middleC1500 = this.sound.add('clavmiddleC', {
          volume: keyboardVolume
        });
        gameState6.middleC1500.setDetune(1500);
      }
    }, this);
    clavText = this.add.text(855 - 35, 60 - 14, 'clavi', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);


    //background button
    gameState6.background_button = this.add.rectangle(250, 530, 180, 20, 0xfff).setDepth(1);
    gameState6.background_button.setInteractive();
    gameState6.background_button.on('pointerup', function() {
      if (backgroundPlaying === true) {
        backgroundPlaying = false;
        hiphopdrums1.stop()
      } else if (backgroundPlaying === false) {
        backgroundPlaying = true;
        hiphopdrums1.play();
      }
    }, this);

    backgroundText = this.add.text(250 - 70, 530 - 14, 'background', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //record button
    gameState6.record_button = this.add.rectangle(650, 530, 120, 20, 0xfff).setDepth(1);
    gameState6.record_button.setInteractive();
    gameState6.record_button.on('pointerup', function() {
      record()
    }, this);

    recordText = this.add.text(650 - 40, 530 - 14, 'record', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //play button
    gameState6.play_button = this.add.rectangle(780, 530, 100, 20, 0xfff).setDepth(1);
    gameState6.play_button.setInteractive();
    gameState6.play_button.on('pointerup', function() {
      playing = true;
    }, this);

    playText = this.add.text(780 - 30, 530 - 14, 'play', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //stop button
    gameState6.stop_button = this.add.rectangle(890, 530, 100, 20, 0xfff).setDepth(1);
    gameState6.stop_button.setInteractive();
    gameState6.stop_button.on('pointerup', function() {
      playing = false;
      playingTime=0;
      stopRecording();
    }, this);

    stopText = this.add.text(890 - 30, 530 - 14, 'stop', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //quantize button
    gameState6.quantize_button = this.add.rectangle(680, 570, 140, 20, 0xfff).setDepth(1);
    gameState6.quantize_button.setInteractive();
    gameState6.quantize_button.on('pointerup', function() {
      if (quantizing){
        quantizing=false
        quantizeOnOffText.setText('Off')
      } else{
        quantizing=true
        quantizeOnOffText.setText('On')
      }

    }, this);

    quantizeText = this.add.text(700 - 80, 570 - 14, 'quantize', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    quantizeOnOffText = this.add.text(840 - 70, 570 - 14, 'Off', {
      fontSize: '25px',
      fill: '#fff'
    }).setDepth(1);

    //drum sounds
    hiphopdrums1 = this.sound.add('hiphopdrums1', {
      volume: keyboardVolume
    });
    hiphopdrums1.loop = true;
    megamantom1 = this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    megamantom1.setDetune(600);
    megamantom2 = this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    megamantom3 = this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    megamantom3.setDetune(-600);
    megamantom4 = this.sound.add('megamantom', {
      volume: keyboardVolume
    });
    megamantom4.setDetune(-1200);
    kick1 = this.sound.add('kick1', {
      volume: keyboardVolume
    });
    kick2 = this.sound.add('kick2', {
      volume: keyboardVolume
    });
    hihat1 = this.sound.add('hihat1', {
      volume: keyboardVolume
    });
    hihat2 = this.sound.add('hihat2', {
      volume: keyboardVolume
    });
    openhihat1 = this.sound.add('openhihat1', {
      volume: keyboardVolume
    });
    tambourine1 = this.sound.add('tambourine1', {
      volume: keyboardVolume
    });
    shaker1 = this.sound.add('shaker1', {
      volume: keyboardVolume
    });
    shaker2 = this.sound.add('shaker2', {
      volume: keyboardVolume
    });
    snare1 = this.sound.add('snare1', {
      volume: keyboardVolume
    });
    snare2 = this.sound.add('snare2', {
      volume: keyboardVolume
    });
    //setting pitches. all generated from gameState6.middleC
    gameState6.middleC = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC100 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC100.setDetune(100);
    gameState6.middleC200 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC200.setDetune(200);
    gameState6.middleC300 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC300.setDetune(300);
    gameState6.middleC400 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC400.setDetune(400);
    gameState6.middleC500 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC500.setDetune(500);
    gameState6.middleC600 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC600.setDetune(600);
    gameState6.middleC700 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC700.setDetune(700);
    gameState6.middleC800 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC800.setDetune(800);
    gameState6.middleC900 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC900.setDetune(900);
    gameState6.middleC1000 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC1000.setDetune(1000);
    gameState6.middleC1100 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC1100.setDetune(1100);
    gameState6.middleC1200 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC1200.setDetune(1200);
    gameState6.middleC1300 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC1300.setDetune(1300);
    gameState6.middleC1400 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC1400.setDetune(1400);
    gameState6.middleC1500 = this.sound.add('middleC', {
      volume: keyboardVolume
    });
    gameState6.middleC1500.setDetune(1500);

    //gameState6.octave controls
    gameState6.keyObj.Z = this.input.keyboard.addKey('Z')
    gameState6.keyObj.Z.on('up', function(event) {
      gameState6.octave -= 1
    });

    gameState6.keyObj.X = this.input.keyboard.addKey('X')
    gameState6.keyObj.X.on('up', function(event) {
      gameState6.octave += 1
    });

    //indicators for keys
    gameState.keyCircleA = this.add.circle(590, 430, 3).setDepth(1);
    gameState.keyCircleA.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleA.visible = false;

    gameState.keyCircleW = this.add.circle(590 + 7, 390, 3).setDepth(1);
    gameState.keyCircleW.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleW.visible = false;

    gameState.keyCircleS = this.add.circle(590 + 22, 430, 3).setDepth(1);
    gameState.keyCircleS.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleS.visible = false;

    gameState.keyCircleE = this.add.circle(590 + 35, 390, 3).setDepth(1);
    gameState.keyCircleE.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleE.visible = false;

    gameState.keyCircleD = this.add.circle(590 + 44, 430, 3).setDepth(1);
    gameState.keyCircleD.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleD.visible = false;

    gameState.keyCircleF = this.add.circle(590 + 66, 430, 3).setDepth(1);
    gameState.keyCircleF.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleF.visible = false;

    gameState.keyCircleT = this.add.circle(590 + 73, 390, 3).setDepth(1);
    gameState.keyCircleT.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleT.visible = false;

    gameState.keyCircleG = this.add.circle(590 + 88, 430, 3).setDepth(1);
    gameState.keyCircleG.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleG.visible = false;

    gameState.keyCircleY = this.add.circle(590 + 99, 390, 3).setDepth(1);
    gameState.keyCircleY.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleY.visible = false;

    gameState.keyCircleH = this.add.circle(590 + 110, 430, 3).setDepth(1);
    gameState.keyCircleH.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleH.visible = false;

    gameState.keyCircleU = this.add.circle(590 + 123, 390, 3).setDepth(1);
    gameState.keyCircleU.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleU.visible = false;

    gameState.keyCircleJ = this.add.circle(590 + 132, 430, 3).setDepth(1);
    gameState.keyCircleJ.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleJ.visible = false;

    gameState.keyCircleK = this.add.circle(590 + 152, 430, 3).setDepth(1);
    gameState.keyCircleK.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleK.visible = false;

    gameState.keyCircleO = this.add.circle(590 + 159, 390, 3).setDepth(1);
    gameState.keyCircleO.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleO.visible = false;

    gameState.keyCircleL = this.add.circle(590 + 174, 430, 3).setDepth(1);
    gameState.keyCircleL.setStrokeStyle(2, 0x1a65ac);
    gameState.keyCircleL.visible = false;

    gameState.keyCircleP = this.add.circle(590 + 189, 390, 3).setDepth(1);
    gameState.keyCircleP.setStrokeStyle(2, 0xffffff);
    gameState.keyCircleP.visible = false;
    //assigning keys to pitches
    gameState6.keyObj.A = this.input.keyboard.addKey('A')
    gameState6.keyObj.A.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC.setDetune(1200 * gameState6.octave);
        gameState6.middleC.play();
      } else if (gameState6.instrument === 'drums') {
        kick1.play()
      }
      gameState.keyCircleA.x = 590 + 152 * gameState6.octave;
      gameState.keyCircleA.visible = true;
    }, this);
    gameState6.keyObj.A.on('up', function(event) {
      gameState6.middleC.stop();
      kick1.stop()
      gameState.keyCircleA.visible = false;
    }, this);

    gameState6.keyObj.W = this.input.keyboard.addKey('W')
    gameState6.keyObj.W.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC100.setDetune(100 + 1200 * gameState6.octave);
        gameState6.middleC100.play();
      } else if (gameState6.instrument === 'drums') {
        kick2.play();
      }
      gameState.keyCircleW.x = 590 + 7 + 152 * gameState6.octave;
      gameState.keyCircleW.visible = true;
    });
    gameState6.keyObj.W.on('up', function(event) {
      gameState6.middleC100.stop();
      kick2.stop();
      gameState.keyCircleW.visible = false;
    });

    gameState6.keyObj.S = this.input.keyboard.addKey('S')
    gameState6.keyObj.S.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC200.setDetune(200 + 1200 * gameState6.octave);
        gameState6.middleC200.play()
      } else if (gameState6.instrument === 'drums') {
        snare1.play();
      }
      gameState.keyCircleS.x = 590 + 22 + 152 * gameState6.octave;
      gameState.keyCircleS.visible = true;
    }, this);
    gameState6.keyObj.S.on('up', function(event) {
      gameState6.middleC200.stop();
      snare1.stop();
      gameState.keyCircleS.visible = false
    }, this);

    gameState6.keyObj.E = this.input.keyboard.addKey('E')
    gameState6.keyObj.E.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC300.setDetune(300 + 1200 * gameState6.octave);
        gameState6.middleC300.play();
      } else if (gameState6.instrument === 'drums') {
        snare2.play();
      }
      gameState.keyCircleE.x = 590 + 35 + 152 * gameState6.octave;
      gameState.keyCircleE.visible = true;
    });
    gameState6.keyObj.E.on('up', function(event) {
      gameState6.middleC300.stop();
      snare2.stop()
      gameState.keyCircleE.visible = false;
    });

    gameState6.keyObj.D = this.input.keyboard.addKey('D')
    gameState6.keyObj.D.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC400.setDetune(400 + 1200 * gameState6.octave);
        gameState6.middleC400.play();
      } else if (gameState6.instrument === 'drums') {
        megamantom4.play()
      }
      gameState.keyCircleD.x = 590 + 44 + 152 * gameState6.octave;
      gameState.keyCircleD.visible = true;
    }, this);
    gameState6.keyObj.D.on('up', function(event) {
      gameState6.middleC400.stop()
      gameState.keyCircleD.visible = false;
    }, this);

    gameState6.keyObj.F = this.input.keyboard.addKey('F')
    gameState6.keyObj.F.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC500.setDetune(500 + 1200 * gameState6.octave);
        gameState6.middleC500.play();
      } else if (gameState6.instrument === 'drums') {
        megamantom3.play();
      }
      gameState.keyCircleF.x = 590 + 66 + 152 * gameState6.octave;
      gameState.keyCircleF.visible = true;
    });
    gameState6.keyObj.F.on('up', function(event) {
      gameState6.middleC500.stop();
      gameState.keyCircleF.visible = false;
    });

    gameState6.keyObj.T = this.input.keyboard.addKey('T')
    gameState6.keyObj.T.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC600.setDetune(600 + 1200 * gameState6.octave);
        gameState6.middleC600.play();
      } else if (gameState6.instrument === 'drums') {
        openhihat1.stop();
        hihat1.play();
      }
      gameState.keyCircleT.x = 590 + 73 + 152 * gameState6.octave;
      gameState.keyCircleT.visible = true;
    });
    gameState6.keyObj.T.on('up', function(event) {
      gameState6.middleC600.stop();
      gameState.keyCircleT.visible = false;
    });

    gameState6.keyObj.G = this.input.keyboard.addKey('G')
    gameState6.keyObj.G.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC700.setDetune(700 + 1200 * gameState6.octave);
        gameState6.middleC700.play()
      } else if (gameState6.instrument === 'drums') {
        megamantom2.play();
      }
      gameState.keyCircleG.x = 590 + 88 + 152 * gameState6.octave;
      gameState.keyCircleG.visible = true;
    });
    gameState6.keyObj.G.on('up', function(event) {
      gameState6.middleC700.stop();
      gameState.keyCircleG.visible = false;
    });

    gameState6.keyObj.Y = this.input.keyboard.addKey('Y')
    gameState6.keyObj.Y.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC800.setDetune(800 + 1200 * gameState6.octave);
        gameState6.middleC800.play();
      } else if (gameState6.instrument === 'drums') {
        openhihat1.stop();
        hihat2.play();
      }
      gameState.keyCircleY.x = 590 + 99 + 152 * gameState6.octave;
      gameState.keyCircleY.visible = true;
    });
    gameState6.keyObj.Y.on('up', function(event) {
      gameState6.middleC800.stop();
      gameState.keyCircleY.visible = false;
    });

    gameState6.keyObj.H = this.input.keyboard.addKey('H')
    gameState6.keyObj.H.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC900.setDetune(900 + 1200 * gameState6.octave);
        gameState6.middleC900.play();
      } else if (gameState6.instrument === 'drums') {
        megamantom1.play();
      }
      gameState.keyCircleH.x = 590 + 110 + 152 * gameState6.octave;
      gameState.keyCircleH.visible = true;
    });
    gameState6.keyObj.H.on('up', function(event) {
      gameState6.middleC900.stop();
      gameState.keyCircleH.visible = false;
    });

    gameState6.keyObj.U = this.input.keyboard.addKey('U')
    gameState6.keyObj.U.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC1000.setDetune(1000 + 1200 * gameState6.octave);
        gameState6.middleC1000.play();
      } else if (gameState6.instrument === 'drums') {
        openhihat1.play();
      }
      gameState.keyCircleU.x = 590 + 123 + 152 * gameState6.octave;
      gameState.keyCircleU.visible = true;
    });
    gameState6.keyObj.U.on('up', function(event) {
      gameState6.middleC1000.stop();
      gameState.keyCircleU.visible = false;
    });

    gameState6.keyObj.J = this.input.keyboard.addKey('J')
    gameState6.keyObj.J.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC1100.setDetune(1100 + 1200 * gameState6.octave);
        gameState6.middleC1100.play()
      } else if (gameState6.instrument === 'drums') {
        shaker1.play();
      }
      gameState.keyCircleJ.x = 590 + 132 + 152 * gameState6.octave;
      gameState.keyCircleJ.visible = true;
    });
    gameState6.keyObj.J.on('up', function(event) {
      gameState6.middleC1100.stop();
      gameState.keyCircleJ.visible = false;
    });

    gameState6.keyObj.K = this.input.keyboard.addKey('K')
    gameState6.keyObj.K.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC1200.setDetune(1200 + 1200 * gameState6.octave);
        gameState6.middleC1200.play();
      } else if (gameState6.instrument === 'drums') {
        shaker2.play();
      }
      gameState.keyCircleK.x = 590 + 152 + 152 * gameState6.octave;
      gameState.keyCircleK.visible = true;
    });
    gameState6.keyObj.K.on('up', function(event) {
      gameState6.middleC1200.stop();
      gameState.keyCircleK.visible = false;
    });

    gameState6.keyObj.O = this.input.keyboard.addKey('O')
    gameState6.keyObj.O.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC1300.setDetune(1300 + 1200 * gameState6.octave);
        gameState6.middleC1300.play();
      } else if (gameState6.instrument === 'drums') {
        tambourine1.play();
      }
      gameState.keyCircleO.x = 590 + 159 + 152 * gameState6.octave;
      gameState.keyCircleO.visible = true;
    });
    gameState6.keyObj.O.on('up', function(event) {
      gameState6.middleC1300.stop();
      gameState.keyCircleO.visible = false;
    });

    gameState6.keyObj.L = this.input.keyboard.addKey('L')
    gameState6.keyObj.L.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC1400.setDetune(1400 + 1200 * gameState6.octave);
        gameState6.middleC1400.play();
      } else if (gameState6.instrument === 'drums') {}
      gameState.keyCircleL.x = 590 + 174 + 152 * gameState6.octave;
      gameState.keyCircleL.visible = true;
    });
    gameState6.keyObj.L.on('up', function(event) {
      gameState6.middleC1400.stop();
      gameState.keyCircleL.visible = false;
    });

    gameState6.keyObj.P = this.input.keyboard.addKey('P')
    gameState6.keyObj.P.on('down', function(event) {
      if (gameState6.instrument === 'piano') {
        gameState6.middleC1500.setDetune(1500 + 1200 * gameState6.octave);
        gameState6.middleC1500.play();
      } else if (gameState6.instrument === 'drums') {}
      gameState.keyCircleP.x = 590 + 189 + 152 * gameState6.octave;
      gameState.keyCircleP.visible = true;
    });
    gameState6.keyObj.P.on('up', function(event) {
      gameState6.middleC1500.stop();
      gameState.keyCircleP.visible = false;
    });

    //recording button
    gameState6.keyObj.R = this.input.keyboard.addKey('R')
    gameState6.keyObj.R.on('up', function(event) {
      if (!recording){
          record()
      }
    });
    this.scene.bringToTop();
  },
  update: function() {
    //runs 60 times per second
    if (playing) {
      playbackCustomSong()
    }

    if (recording) {
      //for piano
      if (gameState6.instrument === 'piano') {
        //record octave information
        gameState6.sequences[gameState6.pianoType].octave.push(JSON.parse(JSON.stringify(gameState6.octave)))
        //now record key down information
        for (const keyy of Object.keys(gameState6.sequences[gameState6.pianoType])) {
          //console.log(keyy)
          if (keyy !== 'octave') {
            gameState6.sequences[gameState6.pianoType][keyy].push(gameState6.keyObj[keyy].isDown)
          }
        }
      } else if (gameState6.instrument === 'drums') {
        //now record key down information
        for (const keyy of Object.keys(gameState6.sequences.drums)) {
          gameState6.sequences.drums[keyy].push(gameState6.keyObj[keyy].isDown)
        }
      }
      recordingTime += 1;
      if (recordingTime >= 480) {
        stopRecording();
      }
    }
    //change menus
    if (scene_number === 2) {
      this.scene.stop();
      hiphopdrums1.stop();
      this.scene.run("LightWorld");
    }
  }
});
