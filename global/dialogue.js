const gameStateDialogue = {};

var DialogueMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "DialogueMenu"
    });
    this.giveMeSkateboard = false;
    this.iconScaleFrame={
      'me': [1.1,0],
      'trevor': [.75,0],
      'al': [1,0],
      'god': [1,0],
      'james': [1,0],
      'joe': [1.2,0],
      'jon': [1.1,0],
      'bennett': [1.2,0],
      'stripper': [1.9,1],
      'crackhead': [1.3,0],
      'yogagirl': [1.3,9],
      'blonde': [1.9,0],
      'girl2': [1.3,0],
      'girl1': [1.3,0],
      'girl3': [1.3,0],
      'girl4': [1.3,0],
      'adeline': [1,0],
      'evanAnthony': [.45,0],
      'jeanClaude': [1,0],
      'smoke': [2.5,0],
      'fratboy1': [1,0],
      'fratboy2': [1,0],
      'fratboy3': [1,0],
      'fratboy4': [1,0],
      'fratboy5': [1,0],
      'darkboy2': [.85,0],
      'dio': [1.3,0],
      'fratboy2prime': [1,0],
    }
  },
  init: function(data) {
    //sumn
  },
  preload: function() {
    this.load.image('board_front', "assets/board_front.png");
    this.load.image('evanAnthony', "assets/evanAnthony.png");
    this.load.image('god', "assets/god.png");
    this.load.image('macFace', "assets/MacFace.png");
    this.load.image('alFace', "assets/AlFace.png");
    this.load.image('jimmyFace', "assets/JimmyFace.png");
    this.load.image("camoBorder",'assets/camoBorder.png')
  },
  fetchPage: function(page) {
    return this.pages.find(function(e) {
      if (e.page == page) return e
    });
  },

  keepSkateboard: function () {
    skateboardGet = true;
    playerTexture = 0;
  },

  //instance for dialogues like in codeacademy example
  initializePage: function (scene) {
    if (backgroundDisplayed===0){// create options list and background and saves them into gameState
      if (!gameState.options) {
        // create options list if it doesn't exist
        gameState.options = [];
      }
      // create narrative background if it doesn't exist
      let thickness2 = 35;
      let thickness = 15;
      gameState.transparent = scene.add.rectangle(0,0, 1200, 600, 0x000).setOrigin(0, 0);
      gameState.transparent.alpha = .6;
      //gameState.narrative_background2 = scene.add.rectangle(200-thickness2, 100-thickness2, 800+2*thickness2, 400+2*thickness2, 0xb39c0e).setOrigin(0, 0);
      gameState.narrative_background = scene.add.rectangle(200-thickness, 100-thickness, 800+2*thickness, 400+2*thickness, 0x000).setOrigin(0, 0);
      gameState.camoBorder = scene.add.image(175,75,'camoBorder').setOrigin(0,0);
      backgroundDisplayed = 1
  }
},

  destroyPage: function () {
    // wipe out narrative text and options
    if (gameState.narrative) {
      // destroy narrative if it exists
      gameState.narrative.destroy();
    } if (gameState.headshot) {
      // destroy narrative if it exists
      gameState.headshot.destroy();
      gameState.headshotBackground.destroy()
    }
    for (let option of gameState.options) {
      // destroy options if they exist
      option.optionBox.destroy();
      option.optionText.destroy();
    }
    pageDisplayed = 0
  },

  destroyBackground: function () {   // wipe out narrative text and options
    if (gameState.narrative_background && backgroundDisplayed===1) {    // destroy narrative if it exists
      gameState.narrative_background.destroy()
      gameState.transparent.destroy();
      //gameState.narrative_background2.destroy()
      gameState.camoBorder.destroy();
      if (gameState.phoneBackground){
        if (gameState.camera1.visible){
          this.phoneBackground.visible = false
          gameState.camera1.visible = false
          this.gpsPointer.visible = false;
        } else {
          this.phoneBackground.visible = true
          gameState.camera1.visible = true;
          this.gpsPointer.visible = true;
        }
      }
    }
    backgroundDisplayed = 0
  },

  displayPage: function (scene, page) {
    if (pageDisplayed === 0) {
      const narrativeStyle = {
        fill: '#ffffff',
        fontStyle: 'italic',
        fontSize: 24,
        align: 'left',
        wordWrap: {
          width: 500
        },
        lineSpacing: 8
      };
      // display general page character
      // & narrative here:
      pause = true
      const faceX = 875;
      const faceY = 225;
      const faceScale = 1.5;


      gameState.headshotBackground = scene.add.rectangle(faceX-93, faceY-100, 93*2, 100*2, 0x000, 0).setOrigin(0,0);
      gameState.headshotBackground.strokeColor = 0xffffff;
      gameState.headshotBackground.fillColor = 0x6f6f6f;
      gameState.headshotBackground.fillAlpha = .25;
      gameState.headshotBackground.strokeWeight = 2;
      gameState.headshotBackground.strokeAlpha = 1;
      gameState.headshotBackground.isStroked = true;
      gameState.headshotBackground.isFilled = true;

      gameState.headshot = scene.add.image(faceX,faceY,page.character).setScale(this.iconScaleFrame[page.character][0]).setFrame(this.iconScaleFrame[page.character][1])

      /*
      if (page.character==="Mac"){
        gameState.headshot = scene.add.image(faceX,faceY,page.character).setScale(faceScale)
        gameState.headshotBackground.visible = true;
      } else if (page.character==="Jimmy"){
        gameState.headshot = scene.add.image(faceX,faceY,'jimmyFace').setScale(faceScale)
        gameState.headshotBackground.visible = true;

      } else if (page.character==="Al"){
        gameState.headshot = scene.add.image(faceX,faceY,'alFace').setScale(faceScale)
        gameState.headshotBackground.visible = true;
      }
      */

      gameState.narrative = scene.add.text(250, 150, page.narrative, narrativeStyle);
      pageDisplayed = 1
      // for-loop creates different options
      // need the index i for spacing the boxes
      gameState.textYValue={};
      gameState.textHeights={};
      for (let i = 0; i < page.options.length; i++) {
        let option = page.options[i];
        // color in the option box
        const baseX = 750;
        if (i===0){
          gameState.textYValue[i] = 350;
        } else{
          gameState.textYValue[i] = gameState.textYValue[i-1] + gameState.textHeights[i-1] + 27
        }
        const boxHeight = 25
        const boxWidth = 200

        // add in the option text

        const optionText = scene.add.text(baseX, gameState.textYValue[i] , option.option, {
          fontSize: 20,
          fill: '#b39c0e',
          align: 'center',
          wordWrap: {
            width: 237
          }
        }).setOrigin(0,0);

        optionText.x = baseX - 12 + (93*2+80-optionText.width)/2

        gameState.textHeights[i] = optionText.height

        const optionBox = scene.add.rectangle(optionText.x-10, optionText.y-10, optionText.width+28, optionText.height+20, 0xb39c0e, 0);
        optionBox.strokeColor = 0xb39c0e;
        optionBox.strokeWeight = 2;
        optionBox.strokeAlpha = 1;
        optionBox.isStroked = true;
        optionBox.setOrigin(0, 0)


        //const optionTextBounds = optionText.getBounds()
        // centering each option text
        //optionText.setX(optionTextBounds.x + 55 - (optionTextBounds.width / 2));
        //optionText.setY(optionTextBounds.y + 10 - (optionTextBounds.height / 2));
        // add in gameplay functionality for options here
        optionBox.setInteractive()
        optionBox.on('pointerup', function() {
          let newPage = this.option.nextPage;
          console.log(`switching to page ${newPage}`)
          if (censoredPageExists[newPage]){
            newPage = newPage + 1000000
            console.log(`censored page exists so now switching to page ${newPage}`)
          }
          if (newPage !== undefined) {
            //console.log(scene)
            scene.destroyPage();
            scene.displayPage(scene, scene.fetchPage(newPage));
            if (this.option.aftermath) {
              this.option.aftermath()
            }
            if (this.option.aftermath2) {
              this.option.aftermath2()
            }
          } else if (newPage === undefined) {
            scene.destroyPage();
            scene.destroyBackground();
            pause = false;
            if (this.option.aftermath) {
              this.option.aftermath()
            }
            if (this.option.aftermath2) {
              this.option.aftermath2()
            }
          }
        }, {
          option
        });

        optionBox.on('pointerover', function() {
          this.optionBox.setStrokeStyle(2, 0xffe014, 1);
          this.optionText.setColor('#ffe014');
        }, {
          optionBox,
          optionText
        });
        optionBox.on('pointerout', function() {
          this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
          this.optionText.setColor('#b39c0e');
        }, {
          optionBox,
          optionText
        });

        gameState.options.push({
          optionBox,
          optionText
        });
      }
    }
  },

  create: function() {
    censoredPageExists[9999]=true
    censoredPageExists[1]=true
    censoredPageExists[5]=true
    censoredPageExists[20]=true
    censoredPageExists[21]=true
    censoredPageExists[25]=true
    censoredPageExists[26]=true
    censoredPageExists[29]=true
    censoredPageExists[290]=true
    censoredPageExists[291]=true
    censoredPageExists[30]=true
    censoredPageExists[31]=true
    censoredPageExists[1400]=true
    censoredPageExists[1601]=true
    censoredPageExists[1603]=true
    censoredPageExists[1800]=true
    censoredPageExists[3014]=true
    censoredPageExists[3026]=true
    censoredPageExists[5000]=true
    censoredPageExists[50]=true
    censoredPageExists[401]=true
    this.pages = [
      {
        character: 'god',
        page: 9999,
        narrative: "Shiiiiiiiiiiiiiiiiiiit............",
        options: [{
            option: 'Goddamnit....',
            nextPage: 1
          },
        ]
      },

      {
        character: 'god',
        page: 9999+1000000,
        narrative: "Arrggggg............",
        options: [{
            option: '....',
            nextPage: 1
          },
        ]
      },

      {
        character: 'god',
        page: 1,
        narrative: "MAN I'm hungover, I need a gatorade and a fucking monster. Shiit... where the fuck is my wallet... My phone... MY KEYS??? Man what did I do yesterday? At least I got a few beers left... they're warm as shit though...",
        options: [{
            option: 'Try to remember',
            nextPage: 2
          },
          {
            option: 'Whatever',
            nextPage: undefined
          },
        ]
      },

      {
        character: 'god',
        page: 1+1000000,
        narrative: "I don't feel good AT ALL, I definitely need a gatorade and a monster. Wait... where is my wallet... My phone... MY KEYS??? Man what did I do yesterday? Guess I lost my keys and just slept outside...",
        options: [{
            option: 'Try to remember',
            nextPage: 2
          },
          {
            option: 'Whatever',
            nextPage: undefined
          },
        ]
      },

      {
        character: 'god',
        page: 2,
        narrative: `I just remember playing volleyball... I better ask someone. Jimmy is right over there... I bet if I can keep that ball away from him for long enough, he'll help me out.`,
        options: [{
            option: 'Controls?',
            nextPage: 3
          },
        ]
      },

      {
        character: 'god',
        page: 3,
        narrative: 'PRESS U,I,O,P KEYS TO ADJUST SPEED, 1,2,...,9,0 KEYS TO ADJUST ZOOM. PRESS S TO GENERALLY INTERACT WITH STUFF. FOR EXAMPLE S WILL DIVE ROLL, KICK THE BALL, OR PICK UP ITEMS ON THE GROUND.',
        options: [{
            option: 'More',
            nextPage: 4
          },
          {
            option: 'Yeah I know',
            nextPage: undefined
          },
        ]
      },

      {
        character: 'god',
        page: 4,
        narrative: 'PRESS Z TO ACCESS THE MENU AND PRESS Z AGAIN TO EXIT. EXAMINE MENU ITEMS BY HOVERING THE CURSOR OVER THEM. MENU ITEMS CAN BE USED BY DRAGGING AND DROPPING THEM INTO APPROPRIATE PLACES IN THE MENU. THE X KEY OPENS AND CLOSES THE QUEST LOG.',
        options: [{
          option: 'More',
          nextPage: 8
        }, ]
      },

      {
        character: 'god',
        page: 8,
        narrative: 'PRESS DELETE IF THE BALL GETS STUCK, IT WILL RESPAWN IN ITS ORIGINAL LOCATION. IF YOU WANT A CHEAT CODE, JUST ASK MR. C.',
        options: [{
          option: 'WHAT ELSE??',
          nextPage: 9
        }, ]
      },

      {
        character: 'god',
        page: 9,
        narrative: 'WATCH YOUR STAMINA BAR! IF IT DROPS BELOW 30 PERCENT, YOUR PARTY DOES LESS DAMAGE AND LANDS LESS OFTEN IN BATTLE.',
        options: [{
          option: 'Right on',
          nextPage: undefined
        },
        {
          option: "Tips?",
          nextPage: 5007,
        },]
      },

      {
        character: 'me',
        page: 10,
        narrative: 'Ill just see whats up with Jimmy.',
        options: [{
            option: 'Tight',
            nextPage: undefined
          },
          {
            option: 'Right on',
            nextPage: undefined
          },
        ]
      },

      {
        character: 'me',
        page: 5,
        narrative: "Alright, got my wallet and my phone at least. Got about 3.50 in here. Plus now I can use GPS (click the phone icon to toggle GPS). Now where the fuck are my keys at?",
        options: [{
            option: 'In the woods?',
            nextPage: 8888,
          },
        ]
      },

      {
        character: 'me',
        page: 5+1000000,
        narrative: "Alright, got my wallet and my phone at least. Got about 3.50 in here. Plus now I can use GPS (click the phone icon to toggle GPS). Now where are my keys at?",
        options: [{
            option: 'In the woods?',
            nextPage: 8888,
          },
        ]
      },

      {
        character: 'god',
        page: 8888,
        narrative: "(To use your gps, just click on a quest in your quest log to activate that quest. If you open your GPS by clicking on the phone icon, it will point you in the direction needed for that quest.)",
        options: [{
            option: 'Damnnnnnnn!!!',
            nextPage: undefined,
            aftermath: openQuestLog
          },
        ]
      },

      {
        character: 'me',
        page: 6,
        narrative: "Parked my car somewhere by the woods I think... maybe behind 711 Burcham.",
        options: [{
            option: 'Right on',
            nextPage: undefined,
            aftermath: openQuestLog
          },
        ]
      },

      {
        character: 'me',
        page: 7,
        narrative: "Tight, I better head up to the gas station and get some shit. Better not crash though... (go to the Mobile station at Abbott and E. Saginaw.)",
        options: [{
          option: 'Lets go.',
          nextPage: 777,
        }, ]
      },

      {
        character: 'god',
        page: 777,
        narrative: "Use the buttons U,I,O,P to control magnitude of acceleration (U is slowest, P is fastest). Press a directional key to accelerate that direction. Press D to apply the brakes.",
        options: [{
          option: 'What else...',
          nextPage: 778,
        }, ]
      },

      {
        character: 'god',
        page: 778,
        narrative: "Press S to exit the car once stopped. Be careful when turning, its easy to crash. Note you do not need to keep holding a direction once at full speed. Use your brakes and control your acceleration wisely. Crashing totally fucking sucks. If you crash at full speed, your car will be totaled.",
        options: [{
          option: 'Ok goddamn',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'trevor',
        page: 20,
        narrative: "Jimmy: Damnnn that was tight dude you almost WENT PRO at Kick-The-Ball.\n (you need 500 points)",
        options: [{
          option: 'Check this shit out',
          nextPage: undefined,
          aftermath: openQuestLog
        },
        {
          option: 'Kick-the-ball?',
          nextPage: 26,
        },
        {
          option: 'Hint?',
          nextPage: 27,
        },]
      },

      {
        character: 'trevor',
        page: 20+1000000,
        narrative: "Jimmy: That was tight dude you almost WENT PRO at Kick-The-Ball.\n (you need 500 points)",
        options: [{
          option: 'Check this out',
          nextPage: undefined,
          aftermath: openQuestLog
        },
        {
          option: 'Kick-the-ball?',
          nextPage: 26,
        },
        {
          option: 'Hint?',
          nextPage: 27,
        },]
      },

      {
        character: 'trevor',
        page: 21,
        narrative: "Jimmy: Damnnn you WENT PRO at kick-the-ball!!! Yo I'll help you out with fighting those frat dickheads. Damnn there's girls by the pool? The gate's locked but theres always that secret entrance on the west side of the fence.",
        options: [{
          option: 'Dude hell yeah',
          nextPage: undefined,
          aftermath: jimmyJoins
        }, ]
      },

      {
        character: 'trevor',
        page: 21+1000000,
        narrative: "Jimmy: Niiiice you WENT PRO at kick-the-ball!!! Yo I'll help you out with fighting those frat boys. Woah there's girls by the pool? The gate's locked but theres always that secret entrance on the west side of the fence.",
        options: [{
          option: 'Sweet',
          nextPage: undefined,
          aftermath: jimmyJoins
        }, ]
      },

      {
        character: 'trevor',
        page: 22,
        narrative: "Jimmy: Dude HOLY FUCK! That level of kick-the-ball skill has earned you the motha fucking BROTHER'S SEAL. Damnnn theres a pool party?",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined
        }, ]
      },


      {
        character: 'god',
        page: 23,
        narrative: "Jimmy joins your party. Use the pointer to click on Jimmy, he will follow you and help you fight. If you wish to part ways, just click again on Jimmy. If you get too far away, he will wander off...",
        options: [{
          option: 'Sweet',
          nextPage: undefined,
        }, ]
      },



      {
        character: 'trevor',
        page: 24,
        narrative: "Jimmy: Damnnn you went pro again. Right on. Gotta do more badass shit to get that BROTHER'S SEAL though that shit needs to be tight (you need 1000 points)",
        options: [{
          option: 'Shiiiit',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'trevor',
        page: 25,
        narrative: "Jimmy: Shiiiiit that wasn't great. You must be hungover, goddamn usually you kick ass at kick-the-ball (you need at least 500 points)",
        options: [{
          option: 'God Damn it',
          nextPage: undefined,
        },
        {
          option: 'Kick-the-ball?',
          nextPage: 26,
        },
        {
          option: 'Hint?',
          nextPage: 27,
        },]
      },

      {
        character: 'trevor',
        page: 25+1000000,
        narrative: "Jimmy: Well... that wasn't great. You must be hungover, usually you're awesome at at kick-the-ball (you need at least 500 points)",
        options: [{
          option: 'Okayy',
          nextPage: undefined,
        },
        {
          option: 'Kick-the-ball?',
          nextPage: 26,
        },
        {
          option: 'Hint?',
          nextPage: 27,
        },]
      },

      {
        character: 'trevor',
        page: 26,
        narrative: "Jimmy: Do you have amnesia or some shit? Goddamn man this is kick-the-ball. Just try and keep the ball for awhile, do some cool stuff and you'll get points. Get enough points and you'll GO PRO or even get the BROTHER'S SEAL. (Press delete/backspace to respawn the ball)",
        options: [{
          option: 'Right on',
          nextPage: undefined,
          aftermath: openQuestLog
        },
        {
          option: 'Okayyy',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },

      {
        character: 'trevor',
        page: 26+1000000,
        narrative: "Jimmy: Do you have amnesia or something? This is kick-the-ball. Just try and keep the ball for awhile, do some cool stuff and you'll get points. Get enough points and you'll GO PRO or even get the BROTHER'S SEAL. (Press delete/backspace to respawn the ball)",
        options: [{
          option: 'Right on',
          nextPage: undefined,
          aftermath: openQuestLog
        },
        {
          option: 'Okayyy',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },

      {
        character: 'god',
        page: 27,
        narrative: "Find a wide open space. The road is good, just watch for cars... Run with the ball away from Jimmy until he is just about to catch up. Then change directions by 90 degrees with the ball. Jimmy is not great at changing directions while chasing you. Repeat. Press delete/backspace to respawn the ball.",
        options: [{
          option: 'tight',
          nextPage: undefined,
        }]
      },

      {
        character: 'me',
        page: 28,
        narrative: "I can't be just breaking into Jimmy's place...",
        options: [{
          option: 'right',
          nextPage: undefined,
        }]
      },

      {
        character: 'trevor',
        page: 29,
        narrative: "Jimmy: Yo I can't beat this fucking boss. Wanna smoke this joint and give it a try? (Press S to shoot and D to slide. You can even perform an air dash with D.)",
        options: [{
          option: 'Fer sherrr',
          nextPage: undefined,
          aftermath: playMegaman
        },
        {
          option: 'Nahh',
          nextPage: undefined,
        }]
      },

      {
        character: 'trevor',
        page: 29+1000000,
        narrative: "Jimmy: Yo I can't beat this boss. Wanna give it a try? (Press S to shoot and D to slide. You can even perform an air dash with D.)",
        options: [{
          option: 'Fer sherrr',
          nextPage: undefined,
          aftermath: playMegaman
        },
        {
          option: 'Nahh',
          nextPage: undefined,
        }]
      },

      {
        character: 'trevor',
        page: 299,
        narrative: "Jimmy: Damnnnn you beat penguin? Yo this guy is hard as fuck though. Wanna try? Yo you can switch weapons if you press the BACKSPACE button. Pretty sure ice kills this guy but he's still hard as fuck.",
        options: [{
          option: 'Fer sherrr',
          nextPage: undefined,
          aftermath: playMegaman
        },
        {
          option: 'Nahh',
          nextPage: undefined,
        }]
      },

      {
        character: 'me',
        page: 290,
        narrative: "Shiiiit I'm too high... I had to go outside. At least I beat that guy. I should go back at some point and see whats next.",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },]
      },

      {
        character: 'me',
        page: 290+1000000,
        narrative: "For some reason I had to go outside. At least I beat that guy. I should go back at some point and see whats next.",
        options: [{
          option: 'Yeahh',
          nextPage: undefined,
        },]
      },

      {
        character: 'me',
        page: 291,
        narrative: "Goddamn I'm way too high... I had to go outside. That boss was fucking hard. I should go back at some point and try again.",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },]
      },

      {
        character: 'me',
        page: 291+1000000,
        narrative: "Whew... for some reason I had to go outside. That boss was hard. I should go back at some point and try again.",
        options: [{
          option: 'Okayy',
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 292,
        narrative: "Without the distraction of unbeaten bosses, Jimmy has grown stronger. Jimmy gets +20 HP and +5 Damage (permanent)",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
          aftermath: jimmyEnhanced
        },]
      },

      {
        character: 'al',
        page: 30,
        narrative: "Al: Hey man, I got this airsoft gun, you wanna fuck wit it?",
        options: [{
            option: 'Yeah dude',
            nextPage: 31
          },
          {
            option: 'Not now dude',
            nextPage: 32
          },
        ]
      },

      {
        character: 'al',
        page: 30+1000000,
        narrative: "Al: Hey man, I got this airsoft gun, you wanna mess wit it?",
        options: [{
            option: 'Yeah dude',
            nextPage: 31
          },
          {
            option: 'Not now dude',
            nextPage: 32
          },
        ]
      },

      {
        character: 'al',
        page: 31,
        narrative: "Al: Listen man, gimme four beers and two grams of weed and you can fuck wit it fo awhile.",
        options: [{
          option: 'I got you man',
          nextPage: undefined,
          aftermath: alCheckhamms
        }]
      },

      {
        character: 'al',
        page: 31+1000000,
        narrative: "Al: Listen man, gimme four beers and two grams of weed and you can mess wit it fo awhile.",
        options: [{
          option: 'I got you man',
          nextPage: undefined,
          aftermath: alCheckhamms
        }]
      },

      {
        character: 'al',
        page: 32,
        narrative: "Al: You wanna hit this joint?",
        options: [{
            option: 'Yeah man',
            nextPage: 33,
            aftermath: increaseHighnessDialogue
          },
          {
            option: "I'm good",
            nextPage: 34,
            aftermath: holdOn
          },
        ]
      },

      {
        character: 'al',
        page: 33,
        narrative: "Al: Hit that shit then.",
        options: [{
          option: 'shiiit',
          nextPage: undefined,
          aftermath: getHigh
        }, ]
      },

      {
        character: 'al',
        page: 34,
        narrative: "Al: Man whats your fuckin problem today?",
        options: [{
          option: 'Just got some shit to do man',
          nextPage: undefined
        }, ]
      },

      {
        character: 'al',
        page: 35,
        narrative: "Al: Yoooo nice. Ima drink these beers. Instead of giving you dis gun, Ima roll wit ya. Heard these fratboys been fuckin wit you dawg I ain't cool wit dat.",
        options: [{
          option: 'Hell yeah',
          nextPage: 36,
          aftermath: gunGet
        }, ]
      },

      {
        character: 'god',
        page: 36,
        narrative: "Al joins your party. Use the pointer to click on Al, he will follow you and help you fight. If you wish to part ways, just click again on Al. If you get too far away, he will wander off...",
        options: [{
          option: 'Tight',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'god',
        page: 37,
        narrative: "Bennett joins your party. Use the pointer to click on Bennett, he will follow you and help you fight. If you wish to part ways, just click again on Bennett. If you get too far away, he will wander off...",
        options: [{
          option: 'Tight',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'james',
        page: 40,
        narrative: "James: Dude I swear to fucking god I saw some weird flashing lights over the high school. Fucking aliens n shit I bet...",
        options: [{
          option: 'Yo for real?',
          nextPage: 41
        }, ]
      },

      {
        character: 'james',
        page: 41,
        narrative: "James: Dude also I saw this GIGANTIC lady sitting on a bench outside WalMart just mowing down a box of corn dogs. I didn't get that good a look at it but like... were those still FROZEN??",
        options: [{
          option: 'DAMNNN',
          nextPage: 42
        }, {
          option: 'Lemme fuck with that board',
          nextPage: 43
        }, ]
      },

      {
        character: 'james',
        page: 42,
        narrative: "James: Anyway dude, take these monsters I drank like 3 already. Yo by the way we should head to the clubhouse and play some pool. I'm down to make some bets.",
        options: [{
          option: 'Shiit alright, alright',
          nextPage: undefined,
          aftermath: getMonsters
        }, ]
      },

      {
        character: 'james',
        page: 43,
        narrative: "James: You want this extra board? Alright but lets make a bet. And lets head over to Burcham Road. If you land 10 kickflips in a row, I'll give you 10 monsters. Doubleflips count as 2 kickflips. But if you fall down or crash into something you're back down to 0.",
        options: [{
          option: 'Fuck Yeah',
          nextPage: 44,
        }, ]
      },

      {
        character: 'god',
        page: 44,
        narrative: "USE THE DIRECTIONAL KEYS TO START MOVING. ONCE YOU ARE GOING FAST ENOUGH, PRESS S TO OLLIE. AFTER YOU OLLIE, HOLD D TO ROTATE YOUR BOARD. TIME IT SO THAT YOUR BOARD IS FACING THE RIGHT DIRECTION WHEN YOU LAND. LEAVE BURCHAM ROAD AND YOU LOSE. DOUBLEFLIPS ARE HARDER TO LAND.",
        options: [{
          option: 'right on',
          nextPage: undefined,
          aftermath: getSkateboard
        }, ]
      },

      {
        character: 'james',
        page: 45,
        narrative: "James: Damnnn that was awesome. Alright here you go.",
        options: [{
          option: 'Fuck Yeah',
          nextPage: 49,
          aftermath: get10Monsters
        }, ]
      },

      {
        character: 'god',
        page: 455,
        narrative: "You've reached 20 flips in a row... HOLY FUCK!!! You got the BROTHER'S SEAL. Thought it was just for kick-the-ball? Nope.",
        options: [{
          option: 'Fuck Yeah',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'james',
        page: 46,
        narrative: "James: Damnnn you got fucked up haah too bad.",
        options: [{
          option: 'Goddamnit',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'james',
        page: 47,
        narrative: "James: .....",
        options: [{
          option: 'Lemme fuck with that board',
          nextPage: 43
        }, {
          option: 'Shiiiit',
          nextPage: undefined
        },]
      },

      {
        character: 'james',
        page: 48,
        narrative: "James: Gotta stay on Burcham road.",
        options: [{
          option: 'Goddamnit',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'james',
        page: 49,
        narrative: "James: Here you can go ahead and hang onto this extra board. Sucks having to carry it around.",
        options: [{
          option: `Fuckin A, right on man`,
          nextPage: 499,
          aftermath: this.keepSkateboard
        }, ]
      },

      {
        character: 'god',
        page: 499,
        narrative: "Press D to ride your board. While you're on it, nobody will attack you.",
        options: [{
          option: `Tight`,
          nextPage: undefined,
        }, ]
      },



      {
        character: 'joe',
        page: 50,
        narrative: "Joe: What's up dude? Wanna play some pool?",
        options: [{
            option: "Hell yeah.",
            nextPage: 51
          },
          {
            option: "Shiiit.",
            nextPage: undefined
          },
        ]
      },

      {
        character: 'joe',
        page: 50+1000000,
        narrative: "Joe: What's up dude? Wanna play some pool?",
        options: [{
            option: "Yeahh.",
            nextPage: 51
          },
          {
            option: "Okayyy.",
            nextPage: undefined
          },
        ]
      },

      {
        character: 'joe',
        page: 51,
        narrative: "Joe: Alright dude, lets head over to the clubhouse. Feel like making some bets?",
        options: [{
            option: "Fuck yeah.",
            nextPage: 52,
          },
          {
            option: "Nah.",
            nextPage: undefined
          },
        ]
      },

      {
        character: 'god',
        page: 52,
        narrative: "(The clubhouse/leasing office is just northeast of your apartment, in between 731 Burcham and Burcham Woods.)",
        options: [{
            option: "Sweet.",
            nextPage: undefined,
            aftermath: openQuestLog
          },
        ]
      },

      {
        character: 'trevor',
        page: 60,
        narrative: "Jimmy: Dude this is BADASS. We need some liquor and weed though.",
        options: [{
          option: 'Fuck yeah I got it covered.',
          nextPage: undefined
        }, ]
      },

      {
        character: 'jon',
        page: 70,
        narrative: "Homeboy Jon: I smoke the cigarettes, shit, its fun to do bad things.",
        options: [{
          option: 'Fuck yeah.',
          nextPage: 71
        }, ]
      },

      {
        character: 'jon',
        page: 71,
        narrative: "Homeboy Jon: Arrhhghh yaahhh arrggg... score a goal and i'll give you these smokes... rrhhghh yaahhh arrggg... Stay out that goalie zone though. (press delete to respawn ball and s to kick)",
        options: [{
          option: 'Okayy',
          nextPage: undefined,
        },
        {
          option: 'Hint?',
          nextPage: 77,
        }, ]
      },

      {
        character: 'jon',
        page: 72,
        narrative: "Homeboy Jon: Damnnn rrg rrg yah... that didn't count... one more time... arggh yagg rrgggg",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },
        {
          option: 'Hint?',
          nextPage: 77,
        }, ]
      },

      {
        character: 'jon',
        page: 73,
        narrative: "Homeboy Jon: Shiiit rgrg groll yah... good job... good job... take these smokes... you definitely can't score two more... ergh yagg errgggg",
        options: [{
          option: 'Watch me',
          nextPage: undefined,
          aftermath: getCigarettes
        }, ]
      },

      {
        character: 'jon',
        page: 74,
        narrative: "Homeboy Jon: Rg Damn SHIT rrg fahh... Try that one more time I dare you... ARGHH YOGG GRRAG",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        }, {
          option: 'Hint?',
          nextPage: 77,
        }, ]
      },

      {
        character: 'jon',
        page: 75,
        narrative: "Homeboy Jon: ARGGGH YOGGG... HOW DID YOU DO THAT... ALRIGHT THATS IT... GOD MODE... SCORE ONE MORE AND I'LL GIVE YOU SOMETHING AWESOME YAG YARRHG",
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },
        {
          option: 'Hint?',
          nextPage: 77,
        }, ]
      },

      {
        character: 'jon',
        page: 76,
        narrative: "Homeboy Jon: Damn man you're badass at kick-the-ball. Yrrgg rggg grrrg, here you go take these sprinting shoes. You can run fast as shit with these.",
        options: [{
          option: 'Sweeet',
          nextPage: undefined,
          aftermath: getJonItem
        }, ]
      },

      {
        character: 'god',
        page: 77,
        narrative: "Run toward the goal with the ball. As soon as you get close to the goalie zone, press S to kick. Just a split second after you press S, hold left or right to shoot the ball at an angle. Straight on shot probably won't work.",
        options: [{
          option: 'Okayy',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'smoke',
        page: 80,
        narrative: "Original Homeboy: Wanna smoke this bong? Yoo I got this video game it's pissing me off though man I can't beat it.",
        options: [{
            option: 'Gimme that bong.',
            nextPage: 81,
            aftermath: increaseHighnessDialogue
          },
          {
            option: "Lemme buy some.",
            nextPage: 82,
          },
          {
            option: "Lemme play that game.",
            nextPage: 86,
          },
        ]
      },

      {
        character: 'smoke',
        page: 81,
        narrative: "Original Homeboy: Hit that shiit.",
        options: [{
            option: 'Gimme that',
            nextPage: undefined,
            aftermath: getHigh
          },
          {
            option: "Nah I'm good",
            nextPage: undefined,
          },
        ]
      },

      {
        character: 'smoke',
        page: 82,
        narrative: "Original Homeboy: 20 bucks a gram",
        options: [{
            option: 'Fuck yeah',
            nextPage: 83,
          },
          {
            option: "2 grams for 10",
            nextPage: 84,
          },
        ]
      },

      {
        character: 'smoke',
        page: 83,
        narrative: "Original Homeboy: Here you go man",
        options: [{
          option: 'Shiit',
          nextPage: undefined,
          aftermath: buyWeedRipoff
        }, ]
      },

      {
        character: 'smoke',
        page: 84,
        narrative: "Original Homeboy: Shit... maybe but first you gotta beat this high score on this video game I got man. I can't get past 65 its driving me fucking CRAZY DUDE...",
        options: [{
          option: 'tight',
          nextPage: undefined,
          aftermath: buyWeed
        }, ]
      },

      {
        character: 'smoke',
        page: 85,
        narrative: "Original Homeboy: Uhh looks like you haven't beat 65 points yet... Or maybe you don't have enough money. Somehow I can't tell the difference...",
        options: [{
          option: 'fuuuck',
          nextPage: undefined,
          aftermath: block
        }, ]
      },

      {
        character: 'smoke',
        page: 86,
        narrative: "Original Homeboy: I got this game called 'Hausdorff Fuckery' whatever the fuck that means. I can't FUCKING get past 65 points. Use the left/right keys to move, press up to jump, and press down to smoke your bong and increase your speed.",
        options: [{
          option: 'shiiit hell yeah',
          nextPage: undefined,
          aftermath: adventured
        }, ]
      },

      {
        character: 'bennett',
        page: 90,
        narrative: "Bennett: Broooo we must race! Beat me in a race to Burcham and Abbott and I'll help you out.",
        options: [{
          option: 'OKAYYY',
          nextPage: undefined,
          aftermath: startRace,
        },
        {
          option: 'YEAAHHHH',
          nextPage: undefined,
          aftermath: startRace,
        },
        {
          option: 'Nah dude',
          nextPage: undefined,
        },]
      },

      {
        character: 'girl2',
        page: 98,
        narrative: 'Becca: Hey how did you get in here?',
        options: [{
            option: "Shiiiit",
            nextPage: 99
          },
          {
            option: 'Secret Entrance',
            nextPage: 99
          },
        ]
      },

      {
        character: 'girl2',
        page: 99,
        narrative: 'Becca: So like could you like get us some cigarettes?',
        options: [{
            option: "You shouldn't be smoking",
            nextPage: undefined,
            aftermath: upErgh
          },
          {
            option: "That'll be about 3.50",
            nextPage: undefined,
            aftermath: getTreeFitty
          },
        ]
      },

      {
        character: 'girl2',
        page: 110,
        narrative: 'Becca: Oh my god like thank you so much for bringing us cigarettes.',
        options: [{
            option: 'Anytime',
            nextPage: 112,
          },
          {
            option: 'wanna bang?',
            nextPage: 111,
            aftermath: block
          },
        ]
      },

      {
        character: 'girl2',
        page: 111,
        narrative: 'Becca: I like totally have a boyfriend.',
        options: [{
          option: 'Fuck',
          nextPage: 112
        }, ]
      },

      {
        character: 'girl2',
        page: 112,
        narrative: 'Becca: Anyway, you can like have this thing I found. Honestly I have no idea what it even is.',
        options: [{
            option: 'Sweeet.',
            nextPage: undefined,
            aftermath: getHPBoost
          },
        ]
      },

      {
        character: 'girl1',
        page: 120,
        narrative: 'Juanita: Can you like get the volleyball? We want to play but like I saw some crazy guy running with it in the field behind St. Thomas Aquinas... just North of 731',
        options: [{
          option: 'Yeah I got you.',
          nextPage: undefined,
          aftermath: openQuestLog
        }, ]
      },

      {
        character: 'girl1',
        page: 121,
        narrative: "Juanita: Thank you soo much for like bringing the ball. But we're like too drunk to play now.",
        options: [{
          option: 'No problem',
          nextPage: 122,
        }, ]
      },

      {
        character: 'girl1',
        page: 122,
        narrative: 'Juanita: Here, I found this at school, you might be able to use it for something.',
        options: [{
          option: 'Sweet thanks',
          nextPage: undefined,
          aftermath: getDamageBoost
        }, ]
      },

      {
        character: 'girl4',
        page: 130,
        narrative: 'Colleen: Wooooooooooo.',
        options: [
          {
            option: 'Wooooo',
            nextPage: 133
          },
        {
          option: 'Wanna bang?',
          nextPage: 132,
          aftermath: block
        },
        ]
      },

      {
        character: 'girl4',
        page: 131,
        narrative: 'Colleen: Woooooooooooooooooooooooooo OMG THANK YOU!!! Heeere do this coke.',
        options: [{
          option: 'Right on',
          nextPage: undefined,
          aftermath: cokeGet
        }, ]
      },

      {
        character: 'girl4',
        page: 132,
        narrative: 'Colleen: I have a boyfriend... and fuck you.',
        options: [{
          option: 'Damn',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'girl4',
        page: 133,
        narrative: 'Colleen: WOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!',
        options: [{
          option: 'Okayyyy',
          nextPage: 134,
        },
        {
          option: 'Wanna bang?',
          nextPage: 132,
          aftermath: block
        }, ]
      },

      {
        character: 'girl4',
        page: 134,
        narrative: 'Colleen: Whattttt?',
        options: [{
          option: 'Bang??',
          nextPage: undefined,
          aftermath: block
        },
        {
          option: 'Yeahhhhh!',
          nextPage: 135,
        },]
      },

      {
        character: 'girl4',
        page: 135,
        narrative: 'Colleen: Okaayyyyy!!',
        options: [{
          option: "Let's bang!",
          nextPage: 132,
          aftermath: block
        },
        {
          option: 'Nice boobs',
          nextPage: 131,
        },]
      },

      {
        character: 'girl4',
        page: 136,
        narrative: 'Colleen: So... let me guess... you want more coke...',
        options: [{
          option: 'Nice boobs',
          nextPage: 137,
          aftermath: block
        },
        {
          option: 'Uhh yeah',
          nextPage: 138,
        },]
      },

      {
        character: 'girl4',
        page: 137,
        narrative: "Colleen: Yeah that's not gonna work again... come on!",
        options: [{
          option: 'Shiiiiit',
          nextPage: undefined,
        },]
      },

      {
        character: 'girl4',
        page: 138,
        narrative: 'Colleen: Ok that will be 20 bucks.',
        options: [{
          option: 'Hell no',
          nextPage: undefined,
        },
        {
          option: 'Shiit ok',
          nextPage: undefined,
          aftermath: colleenCheck20
        },]
      },

      {
        character: 'god',
        page: 140,
        narrative: 'You begin wondering deeply about the laws of your own reality. Why should it be the case that beings may only move in two independent directions?',
        options: [{
            option: 'Woah',
            nextPage: 142,
            aftermath: increaseHighnessDialogue,
            aftermath2: playSecret
          },
          {
            option: 'Whatever',
            nextPage: undefined,
          },
        ]
      },

      {
        character: 'god',
        page: 142,
        narrative: 'What is so special about the number two? Why is it that both time and space come in discrete units? And why do the space units have different sizes for different objects??',
        options: [{
          option: 'Damnnnn',
          nextPage: 1422,
        }, ]
      },

      {
        character: 'god',
        page: 1422,
        narrative: 'Its almost like there was a creator that made this world but had no idea what they were doing and was just fucking around with shit trying to hack shit together to make it work...',
        options: [{
          option: 'Holy fuck',
          nextPage: undefined,
          aftermath: getHigh
        }, ]
      },

      {
        character: 'god',
        page: 144,
        narrative: 'How could one tell they were in a simulation? Would there be some telltale signs?',
        options: [{
            option: 'Hmmm...',
            nextPage: 146,
            aftermath: increaseHighnessDialogue,
            aftermath2: playSecret
          },
          {
            option: 'Who cares...',
            nextPage: undefined,
          },
        ]
      },

      {
        character: 'god',
        page: 146,
        narrative: 'If I really were in something like a video game, maybe there would be some easter eggs. It would only make sense for such things to be imprinted in the very laws of this world.',
        options: [{
            option: 'Think about it more...',
            nextPage: 148,
          },
          {
            option: 'Nevermind...',
            nextPage: 148,
          },
        ]
      },

      {
        character: 'god',
        page: 148,
        narrative: 'You begin to consider the topology of your world. You discover you are living in a Hausforff space. Indeed, your space is discrete.',
        options: [{
          option: 'Woah...',
          nextPage: undefined,
          aftermath: getHigh
        }, ]
      },

      {
        character: 'god',
        page: 141,
        narrative: 'You consider how you would create and define the laws and physical constants of the world if you had that power. ',
        options: [{
            option: 'Hmmm...',
            nextPage: 143,
            aftermath2: playSecret
          },
          {
            option: 'Nevermind.',
            nextPage: undefined,
          },
        ]
      },

      {
        character: 'god',
        page: 143,
        narrative: 'If you used AI to create beings, would those beings be able to wonder about the physical nature of their world? Would it be possible for them to determine that they were indeed in an artifical world created by you?',
        options: [{
            option: 'holy fuck',
            nextPage: 145,
            aftermath: increaseHighnessDialogue
          },
          {
            option: "Honestly I don't care",
            nextPage: undefined,
            aftermath: increaseHighnessDialogue
          },
        ]
      },

      {
        character: 'god',
        page: 145,
        narrative: 'If your world were this complex, should it really be considered artificial? Did somebody program me?? Holy fuck... was it me??? You start to freak out a little bit.',
        options: [{
          option: 'HOLY FUCK!!!',
          nextPage: undefined,
          aftermath: getHigh
        }, ]
      },

      {
        character: 'god',
        page: 147,
        narrative: 'You begin to precisely study the world around you. You observe the way Trevor, Joe, and Jon chase the ball.',
        options: [{
          option: 'Interesting...',
          nextPage: 149,
          aftermath: increaseHighnessDialogue,
          aftermath2: playSecret
        }, ]
      },

      {
        character: 'god',
        page: 149,
        narrative: 'You find you are able to write down precise formulas for the trajectories of their motion... The movements of everthing in the world around you are... determined by formulas... ',
        options: [{
            option: 'Wait what the fuck?',
            nextPage: 151,
          },
          {
            option: 'This is getting boring...',
            nextPage: undefined,
          },
        ]
      },

      {
        character: 'god',
        page: 151,
        narrative: 'You study Al. He is different. As you continue to study, you discover he is exhibiting Brownian motion.',
        options: [{
          option: 'Is this some kind of fucking pun??',
          nextPage: 153,
        }, ]
      },

      {
        character: 'god',
        page: 153,
        narrative: 'Am I the only one here with free will? Are these my real friends? What the fuck is going on???',
        options: [{
          option: 'Jesus... FUCK!!!',
          nextPage: undefined,
          aftermath: getHigh
        }, ]
      },

      {
        character: 'fratboy1',
        page: 200,
        narrative: 'Chad: Hey bro you think you are cool or something?',
        options: [{
          option: 'Fuck off',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'fratboy2',
        page: 210,
        narrative: 'Dylan: Hey dude YO IM FUCKED UP IM GONNA KICK YOUR FUCKING ASS!!! WOOOOOO!!!',
        options: [{
          option: 'Bring it on bitch',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'fratboy3',
        page: 220,
        narrative: 'Cam: What are you looking at??',
        options: [{
          option: 'Shiiiit',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'fratboy4',
        page: 230,
        narrative: 'Jackson: Alpha Phi Alpha biiotch I will fuck you UPPP!!!',
        options: [{
          option: 'You are a pussy',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'god',
        page: 300,
        narrative: 'Game Over... You done goofed.',
        options: [{
          option: 'Load game',
          nextPage: undefined,
          aftermath: loadGame2
        }, ],
      },

      {
        character: 'god',
        page: 401,
        narrative: `Shiiit you really fucked them up.`,
        options: [{
          option: 'Fuck yeah',
          nextPage: undefined,
          aftermath: levelCheck
        }, ]
      },

      {
        character: 'god',
        page: 401+1000000,
        narrative: `Good job...`,
        options: [{
          option: '...',
          nextPage: undefined,
          aftermath: levelCheck
        }, ]
      },

      {
        character: 'god',
        page: 600,
        narrative: `You may choose between further increasing SP by 1, HP by 3, or damage by 2.`,
        options: [{
            option: 'SP',
            nextPage: undefined,
            aftermath: getOneSPMac
          },
          {
            option: 'HP',
            nextPage: undefined,
            aftermath: getThreeHPMac
          },
          {
            option: 'damage',
            nextPage: undefined,
            aftermath: getOneDamageMac
          },
        ]
      },

      {
        character: 'god',
        page: 601,
        narrative: `You may choose between further increasing SP 1, HP another 3, or damage by 1.`,
        options: [{
            option: 'SP',
            nextPage: undefined,
            aftermath: getOneSPAl
          },
          {
            option: 'HP',
            nextPage: undefined,
            aftermath: getThreeHPAl
          },
          {
            option: 'damage',
            nextPage: undefined,
            aftermath: getOneDamageAl
          },
        ]
      },


      {
        character: 'god',
        page: 602,
        narrative: `You may choose between further increasing SP 1, HP by 3, or damage by 1.`,
        options: [{
            option: 'SP',
            nextPage: undefined,
            aftermath: getOneSPJimmy
          },
          {
            option: 'HP',
            nextPage: undefined,
            aftermath: getThreeHPJimmy
          },
          {
            option: 'damage',
            nextPage: undefined,
            aftermath: getOneDamageJimmy
          },
        ]
      },

      {
        character: 'darkboy2',
        page: 700,
        narrative: `DB: Hausdorffs been fucking with you huh? I've never seen you here in darkworld before, I just have to make sure about something before I let you go... Who do you worship?`,
        options: [{
            option: 'Jesus',
            nextPage: 701,
          },
          {
            option: 'Satan',
            nextPage: 702,
          },
          {
            option: 'Dio',
            nextPage: 703,
          },
        ]
      },

      {
        character: 'darkboy2',
        page: 701,
        narrative: `DB: Who the fuck is that? Anyway, wrong answer pal, gonna have to stab you.`,
        options: [{
          option: 'shiiiit',
          nextPage: undefined,
          aftermath: getDead
        }, ]
      },

      {
        character: 'darkboy2',
        page: 702,
        narrative: `DB: Thats cool... thats cool... *awkward silence* ... Anyway ... wrong answer... gonna have to stab you...`,
        options: [{
          option: 'cool man...',
          nextPage: undefined,
          aftermath: getDead
        }, ]
      },

      {
        character: 'darkboy2',
        page: 703,
        narrative: `DB: Dude for real? You're lucky you said that actually because otherwise I'd prolly have to stab you and let you bleed out here on the temple roof. But since you're cool, I'll send you back on your way... after we play a GAME huhuhh...`,
        options: [{
          option: 'right on...',
          nextPage: undefined,
          aftermath: fightDarkboy
        }, ]
      },

      {
        character: 'me',
        page: 704,
        narrative: `That was fucked... I better not get in a fight right now... I need to rest or something. What the fuck was that shit?`,
        options: [{
          option: 'Goddamn',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'me',
        page: 705,
        narrative: `Was that a dream? Was I hallucinating? What the fuck was that shit about? I better sleep it off.`,
        options: [{
          option: 'Goddamn',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'dio',
        page: 706,
        narrative: `Thank you traveler. I bestow you with this magical band. It is an ancient relic of unimaginable power.`,
        options: [{
          option: 'Goddamn',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'me',
        page: 707,
        narrative: `Was that real? Guess I had the wrong answer...`,
        options: [{
          option: '...',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'me',
        page: 800,
        narrative: `What the shit? I'm not sure if I'm feelin weird off that tussin or if I have literally warped to another dimension...`,
        options: [{
          option: 'shiiit...',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'fratboy2prime',
        page: 900,
        narrative: `StabBoy: I will EAT your HEART until you DIE!`,
        options: [{
          option: 'shiiit...',
          nextPage: undefined,
          aftermath: stabBoyFight
        }, ]
      },

      {
        character: 'fratboy5',
        page: 1100,
        narrative: `Frank: Hey buddy, I'm Frank and this is my girlfriend Tammy. Sometimes... she just gets me so angry! Care to spar?`,
        options: [{
          option: 'Cool man...',
          nextPage: undefined,
          aftermath: frankFight
        }, ]
      },

      {
        character: 'dio',
        page: 1200,
        narrative: `Dark Mysterious Voice: Greetings traveler. I am Dio, Dark Knight of Vanda. I've crossed into this dimension to fight for the Dark Mage. But this world is uninhabitable for me and my kind.`,
        options: [{
          option: 'Woah.',
          nextPage: 1201,
        }, ]
      },

      {
        character: 'dio',
        page: 1201,
        narrative: `Dio: I must return to my own world. Before I go, though, I would like to challenge your strongest knight. Will you accept my challenge? You will enter combat against me?`,
        options: [{
          option: 'Hell yeah',
          nextPage: 1210,
        },
        {
          option: 'No fucking way dude.',
          nextPage: 1202,
        }, ]
      },

      {
        character: 'dio',
        page: 1202,
        narrative: `Dio: You are wise to hesitate. Without proper weapon or armor, you have no chance.`,
        options: [{
          option: '...',
          nextPage: undefined,
        }, ]
      },

      {
        character: 'dio',
        page: 1210,
        narrative: `Dio: En garde!!!`,
        options: [{
          option: '...',
          nextPage: undefined,
          aftermath: dioFight
        }, ]
      },

      {
        character: 'me',
        page: 1300,
        narrative: `Would you like to rest in your bed?`,
        options: [{
          option: 'Yes',
          nextPage: undefined,
          aftermath: sleep
        },
        {
          option: 'No',
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 1400,
        narrative: `Trying to go in your apartment but... seems as if you ain't got no motha fuckin keys... shiiiiiit.`,
        options: [{
          option: 'Fuck',
          nextPage: undefined,
        },
        {
          option: 'God Dammit!!',
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 1400+1000000,
        narrative: `Trying to go in your apartment but... seems as if you have no keys.`,
        options: [{
          option: 'Aw man',
          nextPage: undefined,
        },
        {
          option: 'Oh well',
          nextPage: undefined,
        },]
      },

      {
        character: 'stripper',
        page: 1600,
        narrative: `Diamond: Jean Claude?? JEAN CLAUDE??? Have you seen my Jean Claude??`,
        options: [{
          option: `Who?`,
          nextPage: 1601,
        },
        {
          option: "Um nope",
          nextPage: 1601,
        },]
      },

      {
        character: 'stripper',
        page: 1601,
        narrative: `Diamond: Fuck... Hey do you know where I could get some coke?`,
        options: [
        {
          option: 'Uhh possibly',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },

      {
        character: 'stripper',
        page: 1601+1000000,
        narrative: `Diamond: Aww... Hey do you know where I could get some coke?`,
        options: [
        {
          option: 'Uhh possibly',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },

      {
        character: 'stripper',
        page: 1603,
        narrative: `Diamond: Holy fuckin shit thank you so much. Here take these brass knuckles. You can fuck people up with these, they're my boyfriend's they hurt super bad. He takes care of me though...`,
        options: [{
          option: 'Shiiit badass',
          nextPage: undefined,
        },]
      },

      {
        character: 'stripper',
        page: 1603+1000000,
        narrative: `Diamond: Oh my God thank you so much. Here take these brass knuckles. You can mess people up with these, they're my boyfriend's they hurt super bad. He takes care of me though...`,
        options: [{
          option: 'Right on...',
          nextPage: undefined,
        },]
      },

      {
        character: 'stripper',
        page: 1602,
        narrative: `Diamond: So did you get some coke or what?`,
        options: [{
          option: 'Yeah here you go',
          nextPage: 1603,
          aftermath: playItemGet
        },]
      },

      {
        character: 'yogagirl',
        page: 1500,
        narrative: `River: Why is there a stripper just like randomly walking around?`,
        options: [{
          option: 'hmmmm',
          nextPage: 1501,
        },
        {
          option: 'where??',
          nextPage: 1501,
        },]
      },

      {
        character: 'yogagirl',
        page: 1501,
        narrative: `River: Idk like anyway I'm like doing yoga. But if you could like find me some yoga blocks, that would be like super awesome... Namaste.`,
        options: [{
          option: 'Shiiit',
          nextPage: undefined,
          aftermath: openQuestLog
        },
        {
          option: 'Right on',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },

      {
        character: 'yogagirl',
        page: 1502,
        narrative: `River: Oh my god like thank you so much. Here, take this gold duck tape. I like found it over there near the woods. Namaste.`,
        options: [{
          option: 'Okayy',
          nextPage: undefined,
        },
        {
          option: 'Right on',
          nextPage: undefined,
        },]
      },

      {
        character: 'bennett',
        page: 1700,
        narrative: `Bennett: Damnn how'd you get so fast? God damn it alright I guess I'll help you out bro. I'm gonna kick these frat fucks in the dick!!!!`,
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
          aftermath: endRaceWin
        },
        {
          option: 'Right on',
          nextPage: undefined,
          aftermath: endRaceWin
        },]
      },

      {
        character: 'bennett',
        page: 1701,
        narrative: `Bennett: Good try bro. I heard homeboy Jon got some sprinting shoes maybe you can borrow them HAHAH... saw him dicking around behind St. Thomas Aquinas. Also if you just run a lot, your athletics will get better.`,
        options: [{
          option: 'Shiiiiit',
          nextPage: undefined,
          aftermath: endRaceLoss
        },
        {
          option: 'Whatever bro',
          nextPage: undefined,
          aftermath: endRaceLoss
        },]
      },

      {
        character: 'me',
        page: 1800,
        narrative: `Damnnnn that was fucking dumb... shiiiiit... (you're all fucked up, you should rest and recover... or at least drink some beers). You can get your car again where you originally found it.`,
        options: [{
          option: 'Shiiiiit',
          nextPage: undefined,
          aftermath: shaken,
        },
        {
          option: 'Whatever',
          nextPage: undefined,
          aftermath: shaken,
        },]
      },

      {
        character: 'me',
        page: 1800+1000000,
        narrative: `That was dumb... shiiiiit... (you're all messed up, you should rest and recover... or at least drink some beers). You can get your car again where you originally found it.`,
        options: [{
          option: 'Ughhh',
          nextPage: undefined,
          aftermath: shaken,
        },
        {
          option: 'Whatever',
          nextPage: undefined,
          aftermath: shaken,
        },]
      },

      {
        character: 'god',
        page: 1900,
        narrative: `You have unlocked Mac's level 3 skill, "Fuck Everybody Up".`,
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },]
      },

      {
        character: 'crackhead',
        page: 2000,
        narrative: `Melvin: Hey man you got any change?`,
        options: [{
          option: 'Nah man',
          nextPage: 2001,
        },
        {
          option: `yeah here's 1$`,
          nextPage: undefined,
          aftermath: giveCrackhead1
        },]
      },

      {
        character: 'crackhead',
        page: 2001,
        narrative: `Melvin: Shiiiit there's a ATM right over there man. Alls I needs is 10 bucks mann.`,
        options: [{
          option: 'Sorry man',
          nextPage: undefined,
        },
        {
          option: `Alright alright`,
          nextPage: undefined,
        },]
      },

      {
        character: 'crackhead',
        page: 2002,
        narrative: `Melvin: My man, helpin a brotha out. Tell you what man I got yo back now. (Melvin Joins your party... well kind of... click on Melvin to follow you)`,
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },
        {
          option: `Tight`,
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 3000,
        narrative: `2-Ball Pool: Grab the pool stick with the pointer and drag. The cue ball will be hit in the direction connecting the pool cue to the cue ball. Press delete to respawn the balls.`,
        options: [{
          option: 'More',
          nextPage: 3001,
        },
        {
          option: `Alright alright`,
          nextPage: undefined,
        },]
      },
      {
        character: 'god',
        page: 3001,
        narrative: `2-Ball Pool: The ball is hit at a speed proportional to the length of the aiming line which appears when you begin dragging the cue stick.`,
        options: [{
          option: 'What are the rules?',
          nextPage: 3002,
        },
        {
          option: `OK OK I GOT IT`,
          nextPage: undefined,
        },]
      },
      {
        character: 'god',
        page: 3002,
        narrative: `2-Ball Pool: To score a point, in a single shot, a ball must be pocketed and the cue ball must hit both balls. You can score 2 points if you additionally pocket the other ball on the same shot. Good luck! `,
        options: [{
          option: 'What about English?',
          nextPage: 3003,
        },
        {
          option: `Shiiiit`,
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 3003,
        narrative: `2-Ball Pool: You can apply english with the keys A,W,S,D. A gives left, W gives top, S gives bottom, D gives right. Just hold the key while you shoot to apply the english.`,
        options: [{
          option: 'Got it',
          nextPage: undefined,
        },
        {
          option: `Is there more?`,
          nextPage: 3004,
        },]
      },

      {
        character: 'god',
        page: 3004,
        narrative: `2-Ball Pool: You can even control the strength of your english. Press the z key to set the strength to weak, press x for medium, and c for strong.`,
        options: [{
          option: 'Impressive',
          nextPage: undefined,
        },
        {
          option: `Any other tips?`,
          nextPage: 3005,
        },]
      },

      {
        character: 'god',
        page: 3005,
        narrative: `2-Ball Pool: Keep in mind that both time and space are quantized! The size of the balls are not so big compared to the size of the space quanta, and similarly, the speeds at which they travel are not huge compared to the time quanta.`,
        options: [{
          option: 'so....',
          nextPage: 3006,
        },
        {
          option: `Nevermind`,
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 3006,
        narrative: `2-Ball Pool: This means that if you hit the ball too hard, weird stuff might happen, like the ball could travel past a rail before the rail has a chance to hit it!.`,
        options: [{
          option: 'uh....',
          nextPage: 3007,
        },
        {
          option: `Nevermind`,
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 3007,
        narrative: `2-Ball Pool: So don't hit the damn balls too hard if you don't want weird stuff to happen.`,
        options: [{
          option: 'Got it',
          nextPage: undefined,
        },]
      },

      {
        character: 'joe',
        page: 3010,
        narrative: `Joe: Yo I bet you 10 bucks you can't get 4 points in under 2 minutes. If you lose you gotta pay me 5.`,
        options: [{
          option: 'Nah man',
          nextPage: undefined,
        },
        {
          option: `I'll take that action`,
          nextPage: undefined,
          aftermath: joeTimerStart
        },]
      },

      {
        character: 'blonde',
        page: 4010,
        narrative: `Alana: You never called me you asshole. Whatever like I have a boyfriend now and he's in a frat.`,
        options: [{
          option: 'Shiiit',
          nextPage: undefined,
        },
        {
          option: `Lol where's he at?`,
          nextPage: 4011,
        },]
      },

      {
        character: 'blonde',
        page: 4011,
        narrative: `Alana: Shut up!!!`,
        options: [{
          option: 'You using these blocks?',
          nextPage: 4012,
        },]
      },

      {
        character: 'blonde',
        page: 4012,
        narrative: `Alana: Like yes like go away!!!`,
        options: [{
          option: 'Shiiit',
          nextPage: undefined,
        },]
      },

      {
        character: 'joe',
        page: 3014,
        narrative: `Joe: Yo you ain't got 5 bucks shiiiit...`,
        options: [{
          option: 'Fuck',
          nextPage: undefined,
        },]
      },

      {
        character: 'joe',
        page: 3014+1000000,
        narrative: `Joe: Yo you ain't got 5 bucks...`,
        options: [{
          option: 'Ughh..',
          nextPage: undefined,
        },]
      },

      {
        character: 'joe',
        page: 3015,
        narrative: `Joe: Goddamn that was badass. Alright man here you go.`,
        options: [{
          option: 'Tight',
          nextPage: undefined,
          aftermath: joeBorrow
        },]
      },

      {
        character: 'joe',
        page: 3016,
        narrative: `Joe: Shiiit pay up haha.`,
        options: [{
          option: 'Shiiit',
          nextPage: undefined,
          aftermath: joeGive
        },]
      },

      {
        character: 'joe',
        page: 3016+1000000,
        narrative: `Joe: Pay up haha.`,
        options: [{
          option: 'Okayy',
          nextPage: undefined,
          aftermath: joeGive
        },]
      },

      {
        character: 'james',
        page: 3020,
        narrative: `James: Yo if you can get 3 points in 3 minutes, I'll give you 5 bucks. Otherwise you give me 3. Deal?`,
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
          aftermath: jamesTimerStart
        },
        {
          option: `In a minute`,
          nextPage: undefined,
        },]
      },

      {
        character: 'james',
        page: 3024,
        narrative: `James: You ain't got 3 bucks haha how'd you get so broke...`,
        options: [{
          option: 'God damn it',
          nextPage: undefined,
        },]
      },

      {
        character: 'james',
        page: 3025,
        narrative: `James: Yeahhh... that was pretty good. Here you go.`,
        options: [{
          option: 'Sweet',
          nextPage: undefined,
          aftermath: jamesBorrow
        },]
      },

      {
        character: 'james',
        page: 3026,
        narrative: `James: Haha pretty close but you owe me three bucks.`,
        options: [{
          option: "Fuckin' A",
          nextPage: undefined,
          aftermath: jamesGive
        },]
      },

      {
        character: 'james',
        page: 3026+1000000,
        narrative: `James: Haha pretty close but you owe me three bucks.`,
        options: [{
          option: "Okayy",
          nextPage: undefined,
          aftermath: jamesGive
        },]
      },

      {
        character: 'adeline',
        page: 3500,
        narrative: `Adeline: Mac, I heard you talking to those girls!! I am so pissed at you I am never talking to you ever again!!!`,
        options: [{
          option: 'Goddamnit',
          nextPage: undefined,
        },]
      },

      {
        character: 'adeline',
        page: 3502,
        narrative: `Adeline: Aww you brought me flowers?? That is so nice, you are the best! Here, you can have this camo duck tape, I actually bought it for you but I was so mad I was gonna just throw it away...`,
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },]
      },

      {
        character: 'god',
        page: 4000,
        narrative: `This is your Yamaha Motif 6. This is a powerful keyboard.`,
        options: [{
          option: 'More',
          nextPage: 4001,
        }, {
          option: 'Got it',
          nextPage: undefined,
        },
        {
          option: 'Play',
          nextPage: undefined,
          aftermath: openKeyboardNow
        },]
      },

      {
        character: 'god',
        page: 4001,
        narrative: `Keys on your keyboard A,W,S,E,D,F,T,G,Y,H,U,J,K,O,L,P correspond to the keys on the keyboard. Z lowers the octave and X raises the octave.`,
        options: [{
          option: 'Sweet',
          nextPage: undefined,
        }, {
          option: 'Hell Yeah',
          nextPage: undefined,
        },{
          option: 'Play',
          nextPage: undefined,
          aftermath: openKeyboard
        },]
      },

      {
        character: 'me',
        page: 5000,
        narrative: `Man, random people are attacking me... that ain't good. I must have gone to a frat party or something last night. I always end up getting in fights with those dickheads.`,
        options: [{
          option: "Fuckin' A, Man",
          nextPage: undefined,
        },
        {
          option: "Tips?",
          nextPage: 5007,
        },]
      },

      {
        character: 'me',
        page: 5000+1000000,
        narrative: `Man, random people are attacking me... that ain't good. I must have gone to a frat party or something last night. I always end up getting in fights with those guys.`,
        options: [{
          option: "Yeahh...",
          nextPage: undefined,
        },
        {
          option: "Tips?",
          nextPage: 5007,
        },]
      },

      {
        character: 'god',
        page: 5007,
        narrative: `Make sure to heal yourself outside of battle, as using items takes a turn in battle. `,
        options: [{
          option: "Right On",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5008,
        },]
      },

      {
        character: 'god',
        page: 5008,
        narrative: `Special attacks never miss.`,
        options: [{
          option: "Hell Yeah",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5009,
        },]
      },

      {
        character: 'god',
        page: 5009,
        narrative: `Don't forget to equip any helpful items you may have found along the way.`,
        options: [{
          option: "Obviously",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5010,
        },]
      },

      {
        character: 'god',
        page: 5010,
        narrative: `If you are low on stamina, you will miss more often. Drink a gatorade to restore your stamina.`,
        options: [{
          option: "True",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5011,
        },]
      },

      {
        character: 'god',
        page: 5011,
        narrative: `You want to take out the most dangerous enemies first. Luckily these are typically the ones with the lowest HP.`,
        options: [{
          option: "Okayyy",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5012,
        },]
      },

      {
        character: 'god',
        page: 5012,
        narrative: `You can outrun enemies on the overworld map by waiting until they are close to you, and cutting a corner. Once you cut a corner, you can tire them out by running circles around them. They will eventually give up.`,
        options: [{
          option: "Shiiiit",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5013,
        },]
      },

      {
        character: 'god',
        page: 5013,
        narrative: `That's all for now...`,
        options: [{
          option: "Goddamnit",
          nextPage: undefined,
        },
        {
          option: "More",
          nextPage: 5014,
        },]
      },

      {
        character: 'god',
        page: 5014,
        narrative: `Are you fucking kidding me?`,
        options: [{
          option: "Whatever",
          nextPage: undefined,
        },]
      },

      {
        character: 'me',
        page: 5001,
        narrative: `Oh shit I do remember trying to pick up that PT Cruiser with Jimmy and Homeboy Jon last night behind that halfway house, and that fat old dickhead started chasing us.`,
        options: [{
          option: 'Hmmm',
          nextPage: 5002,
        },]
      },

      {
        character: 'me',
        page: 5002,
        narrative: `I guess that explains why that junkie is all pissed trying to stab us and stuff...`,
        options: [{
          option: 'Well Goddamn',
          nextPage: undefined,
        },
        {
          option: "Tips?",
          nextPage: 5007,
        },]
      },

      {
        character: 'me',
        page: 5003,
        narrative: `I need to get the drop on these guys\n(If they catch you while they are chasing, they get first strike...)`,
        options: [{
          option: 'Good Idea',
          nextPage: undefined,
        },
        {
          option: "Tips?",
          nextPage: 5007,
        },]
      },

      {
        character: 'evanAnthony',
        page: 6000,
        narrative: `Anthony: Yooooo wanna play some canjam?`,
        options: [{
          option: 'Maybe later man',
          nextPage: undefined,
        },]
      },

      {
        character: 'jeanClaude',
        page: 6100,
        narrative: `Ruff Ruuffff`,
        options: [{
          option: 'Good Boy! Come here!',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },

      {
        character: 'jeanClaude',
        page: 6101,
        narrative: `Jean Claude: Rooof Rooooof!!! (Click on Jean Claude to show him the Jerky you have... hopefully he follows you!)`,
        options: [{
          option: 'Hell yeah',
          nextPage: undefined,
        },]
      },

      {
        character: 'stripper',
        page: 6102,
        narrative: `Diamond: OH MY GOD you brought my Jean Claude back to me!! How can I ever repay you?`,
        options: [{
          option: 'Hmmmmmmmmmmm',
          nextPage: 6103,
        },]
      },

      {
        character: 'stripper',
        page: 6103,
        narrative: `Diamond: Do you live around here?`,
        options: [{
          option: 'I do.',
          nextPage: 6104,
        },]
      },

      {
        character: 'god',
        page: 6104,
        narrative: `Click on Diamond if you want her to follow you.`,
        options: [{
          option: 'Right on',
          nextPage: undefined,
        },]
      },

      {
        character: 'evanAnthony',
        page: 7000,
        narrative: `Evan: Yoo some frat dude was looking for you. Seemed pissed, pretty sure he had a knife. He said he'd be at Burcham Road and Division Avenue waiting.`,
        options: [{
          option: 'Right on man',
          nextPage: undefined,
          aftermath: openQuestLog
        },]
      },
    ]

    this.bannerBack = this.add.rectangle(0, 0, 1200, 600, 0x000).setOrigin(0,0).setDepth(1);
    window.setTimeout(() => {
      this.tweens.add({
          targets: this.bannerBack,
          duration: 3000,
          alpha: 0
      });
    }, 1000);
    this.timer = 0;

    this.kickTheBallDisplay = this.add.text(50, 550, ``, {
      fontSize: '20px',
      fill: '#fff',
      align: 'right',
    });

    this.scoreGottenDisplay = this.add.rectangle(250-2, 30-2, 704, 54, 0xb39c0e).setOrigin(0);
    this.scoreGottenDisplayFront = this.add.rectangle(250, 30, 700, 50, 0x000000).setOrigin(0);
    this.scoreGotten = this.add.text(250, 30+10, ``, {
      fontSize: '40px',
      fill: '#fff',
      align: 'center',
    });

    this.kickflipDisplay = this.add.text(50, 550, ``, {
      fontSize: '20px',
      fill: '#fff',
      align: 'right',
    });

    this.kickflipRotationDisplay = this.add.image(150, 500, `board_front`);
    this.kickflipRotationDisplay.setScale(1.5)
    this.kickflipRotationDisplay.visible = false;

    this.scene.bringToTop();
    this.LightWorld = this.scene.get("LightWorld");
  },
  update: function() {

    if (playerTexture === 'board' && this.LightWorld.kickflipTimer>0 && this.LightWorld.kickflipTimerRunning){
      this.kickflipRotationDisplay.visible = true;
      this.kickflipRotationDisplay.angle += 720/60;
    }

    if (showKickTheBallScore){
      this.scoreGotten.visible = true;
      this.scoreGottenDisplay.visible = true;
      this.scoreGottenDisplayFront.visible = true;
  } else {
    this.scoreGotten.visible = false;
    this.scoreGottenDisplay.visible = false;
    this.scoreGottenDisplayFront.visible = false;
    }
    if (kickTheBallScoreDisplayed){
      this.kickTheBallDisplay.visible = true;
      if (keepaway > keepawayHighScore) {
        this.kickTheBallDisplay.setText(`Kick-The-Ball: ${keepaway} \nHigh Score: ${keepaway}`);
      } else {
        this.kickTheBallDisplay.setText(`Kick-The-Ball: ${keepaway} \nHigh Score: ${keepawayHighScore}`);
      }
    } else {
      this.kickTheBallDisplay.visible = false;
    }
    if (kickflipScoreDisplayed){
      this.kickflipDisplay.visible = true;
      this.kickflipDisplay.setText(`Kickflips: ${this.LightWorld.kickflipCounter}`);
    } else {
      this.kickflipDisplay.visible = false;
    }

    this.timer+=1;
    if (openingDialogue){
      openingDialogue = false
      this.initializePage(this);
      if (censored){
        if (censoredPageExists[pageForDialogue]){
          pageForDialogue = pageForDialogue+1000000
        }
      }
      let thePage = this.fetchPage(pageForDialogue);
      this.displayPage(this, thePage);
    }
    //for level dialogue (problem with jimmy and al receiving level up at the same time... fix needed)
    //only allows level up to level 30... may need to fix structure to allow arbitrarily high
    if (checkLevelDialogue === 1) {
      zoom = 2
      for (let i = 1; i < 30; i++) {
        if (expObject['Mac'] >= 100 * 3 ** (i - 1) && levelObject['Mac'] === i) {
          levelObject['Mac'] += 1;
          this.initializePage(this)
          let page = {
            character: 'god',
            page: 500,
            narrative: `Damnnnn, Mac has progressed to level ${levelObject['Mac']}. Mac's HP has increased by 15, SP has increased by 5, and damage has increased by 5.`,
            options: [{
              option: 'tight',
              nextPage: 600,
            }, ]
          }
          this.displayPage(this, page)
          maxHPObject['Mac'] += 15;
          damageObject['Mac'] += 5;
          maxSPObject['Mac'] += 5;
          hpObject['Mac'] = maxHPObject['Mac'];
          spObject['Mac'] = maxSPObject['Mac']
        } else if (expObject['Al'] >= 100 * 3 ** (i - 1) && levelObject['Al'] === i) {
          levelObject['Al'] += 1;
          this.initializePage(this)
          let page = {
            character: 'god',
            page: 501,
            narrative: `Good shit man, Al has progressed to level ${levelObject['Al']}. Al's HP has increased by 15, SP has increased by 5, and damage has increased by 5.`,
            options: [{
              option: 'tight',
              nextPage: 601,
            }, ]
          }
          this.displayPage(this, page)
          maxHPObject['Al'] += 15;
          damageObject['Al'] += 5;
          maxSPObject['Mac'] += 5
          hpObject['Al'] = maxHPObject['Al'];
          spObject['Al'] = maxSPObject['Al']
        } else if (expObject['Jimmy'] >= 100 * 3 ** (i - 1) && levelObject['Jimmy'] === i) {
          levelObject['Jimmy'] += 1;
          this.initializePage(this)
          let page = {
            character: 'god',
            page: 502,
            narrative: `Good shit man, Jimmy has progressed to level ${levelObject['Jimmy']}. Jimmy's HP has increased by 15, SP has increased by 5, and damage has increased by 5.`,
            options: [{
              option: 'sweet',
              nextPage: 602,
            }, ]
          }
          this.displayPage(this, page)
          maxHPObject['Jimmy'] += 15;
          maxSPObject['Jimmy'] += 5;
          damageObject['Jimmy'] += 5
          hpObject['Jimmy'] = maxHPObject['Jimmy'];
          spObject['Jimmy'] = maxSPObject['Jimmy']
        } else if (expObject['Bennett'] >= 100 * 3 ** (i - 1) && levelObject['Bennett'] === i) {
          levelObject['Bennett'] += 1;
          this.initializePage(this)
          let page = {
            character: 'god',
            page: 502,
            narrative: `Good shit man, Bennett has progressed to level ${levelObject['Bennett']}. Bennett's HP has increased by 15, SP has increased by 5, and damage has increased by 5.`,
            options: [{
              option: 'sweet',
              nextPage: 602,
            }, ]
          }
          this.displayPage(this, page)
          maxHPObject['Bennett'] += 15;
          maxSPObject['Bennett'] += 5;
          damageObject['Bennett'] += 5
          hpObject['Bennett'] = maxHPObject['Bennett'];
          spObject['Bennett'] = maxSPObject['Bennett']
        } else {
          openFightDialogue = true;
        }
      }
      checkLevelDialogue = 0
    }

    //for experience dialogue
    if (wonBattle === 1) {
      this.initializePage(this)
      let page = {
        character: 'god',
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
      this.displayPage(this, page)
      wonBattle = 0;
      exp = 0;
      reward = 0;
      itemReward = '';
    }
  }
});
