const pages = [
  {
    character: 'me',
    page: 9999,
    narrative: "Shiiiiiiiiiiiiiiiiiiit............",
    options: [{
        option: '.......',
        nextPage: 1
      },
    ]
  },

  {
    character: 'me',
    page: 1,
    narrative: "MAN I'm hungover, I need a gatorade and a monster REAL bad. Shiit... where the fuck is my wallet... My phone... MY KEYS??? Man what did I do yesterday? At least I got a few beers left... they're warm as shit though...",
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
    character: 'me',
    page: 2,
    narrative: `I just remember playing volleyball... I bet if I can keep that ball away from Jimmy for long enough, he'll help me out.`,
    options: [{
        option: 'Controls?',
        nextPage: 3
      },
    ]
  },

  {
    character: 'me',
    page: 3,
    narrative: 'PRESS U,I,O,P KEYS TO ADJUST SPEED, 1,2,...,9,0 KEYS TO ADJUST ZOOM. PRESS S TO GENERALLY INTERACT WITH STUFF. FOR EXAMPLE S WILL KICK THE BALL OR PICK UP ITEMS ON THE GROUND.',
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
    character: 'me',
    page: 4,
    narrative: 'PRESS Z TO ACCESS THE MENU AND CLICK THE EXIT BUTTON TO EXIT. EXAMINE MENU ITEMS BY HOVERING THE CURSOR OVER THEM. MENU ITEMS CAN BE USED BY DRAGGING AND DROPPING THEM INTO APPROPRIATE PLACES IN THE MENU. THE X KEY OPENS THE QUEST LOG.',
    options: [{
      option: 'More',
      nextPage: 8
    }, ]
  },

  {
    character: 'me',
    page: 8,
    narrative: 'PRESS DELETE IF THE BALL GETS STUCK, IT WILL RESPAWN IN ITS ORIGINAL LOCATION. IF YOU WANT A CHEAT CODE, JUST ASK MR. C.',
    options: [{
      option: 'WHAT ELSE??',
      nextPage: 9
    }, ]
  },

  {
    character: 'me',
    page: 9,
    narrative: 'WATCH YOUR STAMINA BAR! IF IT DROPS BELOW 30 PERCENT, YOUR PARTY DOES LESS DAMAGE AND LANDS LESS OFTEN IN BATTLE.',
    options: [{
      option: 'Right on',
      nextPage: undefined
    }, ]
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
    narrative: "Alright, got my wallet and my phone at least. Got about 3.50 in here. Plus now I can use GPS... not that I need to... I fucking live here. Now where the fuck are my keys at?",
    options: [{
        option: 'In the woods?',
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
      {
        option: 'Hell yeah',
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
      nextPage: undefined,
      aftermath: openQuestLog
    }, ]
  },

  {
    character: 'me',
    page: 20,
    narrative: "Jimmy: Damnnn that was tight dude you almost went pro.",
    options: [{
      option: 'Check this shit out',
      nextPage: undefined,
      aftermath: openQuestLog
    }, ]
  },

  {
    character: 'me',
    page: 21,
    narrative: "Jimmy: Damnnn you WENT PRO!!! Yo I'll help you out with fighting those frat dickheads. Damnn there's girls by the pool? The gate's locked but theres always that secret entrance on the west side of the fence.",
    options: [{
      option: 'Dude hell yeah',
      nextPage: undefined,
      aftermath: jimmyJoins
    }, ]
  },

  {
    character: 'me',
    page: 24,
    narrative: "Jimmy: Damnnn you went pro again. Right on. Gotta do more badass shit to get that Brother's Seal though that shit needs to be tight.",
    options: [{
      option: 'Shiiiit',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 23,
    narrative: "Jimmy joins your party. Use the pointer to click on Jimmy, he will follow you and help you fight. If you wish to part ways, just click again on Jimmy. If you get too far away, he will wander off...",
    options: [{
      option: 'Sweet',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 22,
    narrative: "Jimmy: Dude HOLY FUCK! That level of kick-the-ball skill has earned you the motha fucking Brother's Seal. Damnnn theres a pool party?",
    options: [{
      option: 'Hell yeah',
      nextPage: undefined
    }, ]
  },

  {
    character: 'me',
    page: 25,
    narrative: "Jimmy: Shiiiiit that wasn't great. You must be hungover, goddamn usually you kick ass at kick-the-ball.",
    options: [{
      option: 'God Damn it',
      nextPage: undefined,
    },
    {
      option: 'Kick-the-ball?',
      nextPage: 26,
    },]
  },

  {
    character: 'me',
    page: 26,
    narrative: "Jimmy: Do you have amnesia or some shit? Goddamn man this is kick-the-ball. Just try and keep the ball for awhile, do some cool stuff and you'll get points. Get enough points and you'll GO PRO or even get the BROTHER'S SEAL.",
    options: [{
      option: 'Right on',
      nextPage: undefined,
      aftermath: openQuestLog
    },
    {
      option: 'Okayyy!',
      nextPage: undefined,
      aftermath: openQuestLog
    },]
  },

  {
    character: 'me',
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
    character: 'me',
    page: 31,
    narrative: "Al: Listen man, gimme four beers and two grams of weed and you can fuck wit it fo awhile.",
    options: [{
      option: 'I got you man',
      nextPage: undefined,
      aftermath: alCheckhamms
    }]
  },

  {
    character: 'me',
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
    character: 'me',
    page: 33,
    narrative: "Al: Hit that shit then.",
    options: [{
      option: 'shiiit',
      nextPage: undefined,
      aftermath: getHigh
    }, ]
  },

  {
    character: 'me',
    page: 34,
    narrative: "Al: Man whats your fuckin problem today?",
    options: [{
      option: 'Just got some shit to do man',
      nextPage: undefined
    }, ]
  },

  {
    character: 'me',
    page: 35,
    narrative: "Al: Yoooo nice. Ima drink these beers. Instead of giving you dis gun, Ima roll wit ya. Heard these fratboys been fuckin wit you dawg I ain't cool wit dat.",
    options: [{
      option: 'Hell yeah',
      nextPage: 36,
      aftermath: gunGet
    }, ]
  },

  {
    character: 'me',
    page: 36,
    narrative: "Al joins your party. Use the pointer to click on Al, he will follow you and help you fight. If you wish to part ways, just click again on Al. If you get too far away, he will wander off...",
    options: [{
      option: 'Tight',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 37,
    narrative: "Bennett joins your party. Use the pointer to click on Bennett, he will follow you and help you fight. If you wish to part ways, just click again on Bennett. If you get too far away, he will wander off...",
    options: [{
      option: 'Tight',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 40,
    narrative: "James: Dude I swear to fucking god I saw some weird flashing lights over the high school. Fucking aliens n shit I bet...",
    options: [{
      option: 'Yo for real?',
      nextPage: 41
    }, ]
  },

  {
    character: 'me',
    page: 41,
    narrative: "James: Dude also I saw this GIGANTIC lady sitting on a bench outside WalMart just mowing down a box of corn dogs. I didn't get that good a look at it but like... were those still FROZEN??",
    options: [{
      option: 'DAMNNN',
      nextPage: 42
    }, ]
  },

  {
    character: 'me',
    page: 42,
    narrative: "James: Anyway dude, take these monsters I drank like 3 already. Yo by the way we should head to the clubhouse and play some pool. I'm down to make some bets.",
    options: [{
      option: 'Shiit alright, alright',
      nextPage: undefined,
      aftermath: getMonsters
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 60,
    narrative: "Jimmy: Dude this is BADASS. We need some liquor and weed though.",
    options: [{
      option: 'Fuck yeah I got it covered.',
      nextPage: undefined
    }, ]
  },

  {
    character: 'me',
    page: 70,
    narrative: "Homeboy Jon: I smoke the cigarettes, shit, its fun to do bad things.",
    options: [{
      option: 'Fuck yeah.',
      nextPage: 71
    }, ]
  },

  {
    character: 'me',
    page: 71,
    narrative: "Homeboy Jon: Arrhhghh yaahhh arrggg... score a goal and i'll give you these smokes... rrhhghh yaahhh arrggg... Stay out that goalie zone though! (press delete to respawn ball and s to kick)",
    options: [{
      option: 'Okayy',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 72,
    narrative: "Homeboy Jon: Damnnn rrg rrg yah... that didn't count... one more time... arggh yagg rrgggg",
    options: [{
      option: 'Hell yeah',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 73,
    narrative: "Homeboy Jon: Shiiit rgrg groll yah... good job... good job... take these smokes... you definitely can't score two more... ergh yagg errgggg",
    options: [{
      option: 'Watch me',
      nextPage: undefined,
      aftermath: getCigarettes
    }, ]
  },

  {
    character: 'me',
    page: 74,
    narrative: "Homeboy Jon: Rg Damn SHIT rrg fahh... Try that one more time I dare you... ARGHH YOGG GRRAG",
    options: [{
      option: 'Hell yeah',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 75,
    narrative: "Homeboy Jon: ARGGGH YOGGG... HOW DID YOU DO THAT... ALRIGHT THATS IT... GOD MODE... SCORE ONE MORE AND I'LL GIVE YOU SOMETHING AWESOME YAG YARRHG",
    options: [{
      option: 'Hell yeah',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 76,
    narrative: "Homeboy Jon: Damn man you're badass at kick-the-ball. You earned this, here you go take it. You can run fast as shit with these.",
    options: [{
      option: 'Sweeet',
      nextPage: undefined,
      aftermath: getJonItem
    }, ]
  },

  {
    character: 'me',
    page: 80,
    narrative: "Original Homeboy: Wanna smoke this bong? Yoo I got this video game it's pissing me off though man I can't beat it.",
    options: [{
        option: 'Gimme that bong.',
        nextPage: 81,
        aftermath: increaseHighnessDialogue
      },
      {
        option: "Let me buy some man.",
        nextPage: 82,
      },
      {
        option: "Lemme play that game.",
        nextPage: 86,
      },
    ]
  },

  {
    character: 'me',
    page: 81,
    narrative: "Hit that shiit.",
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
    character: 'me',
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
    character: 'me',
    page: 83,
    narrative: "Original Homeboy: Here you go man",
    options: [{
      option: 'Shiit',
      nextPage: undefined,
      aftermath: buyWeedRipoff
    }, ]
  },

  {
    character: 'me',
    page: 84,
    narrative: "Original Homeboy: Shit... maybe but first you gotta beat this high score on this video game I got man. I can't get past 70 its driving me fucking CRAZY DUDE...",
    options: [{
      option: 'tight',
      nextPage: undefined,
      aftermath: buyWeed
    }, ]
  },

  {
    character: 'me',
    page: 85,
    narrative: "Original Homeboy: Uhh looks like you haven't beat 65 points yet... Or maybe you don't have enough money. Somehow I can't tell the difference...",
    options: [{
      option: 'fuuuck',
      nextPage: undefined,
      aftermath: block
    }, ]
  },

  {
    character: 'me',
    page: 86,
    narrative: "Original Homeboy: I can't FUCKING get past 65 points. Use the left/right keys to move, press up to jump, and press down to smoke your bong and increase your speed.",
    options: [{
      option: 'shiiit hell yeah',
      nextPage: undefined,
      aftermath: adventured
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
    page: 98,
    narrative: 'Becca: Hey how did you get in here?',
    options: [{
        option: "Can't tell you",
        nextPage: 99
      },
      {
        option: 'Secret Entrance',
        nextPage: 99
      },
    ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 111,
    narrative: 'Becca: I like totally have a boyfriend.',
    options: [{
      option: 'Fuck',
      nextPage: 112
    }, ]
  },

  {
    character: 'me',
    page: 112,
    narrative: 'Becca: Anyway, you can like have this thing I found. Honestly I have no idea what it even is.',
    options: [{
        option: 'Sweeet',
        nextPage: undefined,
        aftermath: getHPBoost
      },
    ]
  },

  {
    character: 'me',
    page: 120,
    narrative: 'Juanita: Can you like get the volleyball? We want to play but like I saw some crazy guy running with it in the field behind St. Thomas Aquinas... just North of 731',
    options: [{
      option: 'Hell yeah.',
      nextPage: undefined,
      aftermath: openQuestLog
    }, ]
  },

  {
    character: 'me',
    page: 121,
    narrative: "Juanita: Thank you soo much for like bringing the ball. But we're like too drunk to play now.",
    options: [{
      option: 'No problem',
      nextPage: 122,
    }, ]
  },

  {
    character: 'me',
    page: 122,
    narrative: 'Juanita: Here, I found this at school, you might be able to use it for something.',
    options: [{
      option: 'Sweet thanks',
      nextPage: undefined,
      aftermath: getDamageBoost
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
    page: 131,
    narrative: 'Colleen: Woooooooooooooooooooooooooo OMG THANK YOU!!! Heeere do this coke.',
    options: [{
      option: 'Right on',
      nextPage: undefined,
      aftermath: cokeGet
    }, ]
  },

  {
    character: 'me',
    page: 132,
    narrative: 'Colleen: I have a boyfriend... and fuck you.',
    options: [{
      option: 'Damn',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 137,
    narrative: "Colleen: Yeah that's not gonna work again... come on!",
    options: [{
      option: 'Shiiiiit',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 142,
    narrative: 'What is so special about the number two? Why is it that both time and space come in discrete units? And why do the space units have different sizes for different objects??',
    options: [{
      option: 'Damnnnn',
      nextPage: 1422,
    }, ]
  },

  {
    character: 'me',
    page: 1422,
    narrative: 'Its almost like there was a creator that made this world but had no idea what they were doing and was just fucking around with shit trying to hack shit together to make it work...',
    options: [{
      option: 'Holy fuck',
      nextPage: undefined,
      aftermath: getHigh
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 148,
    narrative: 'You begin to consider the topology of your world. You discover you are living in a Hausforff space. Indeed, your space is discrete.',
    options: [{
      option: 'Woah...',
      nextPage: undefined,
      aftermath: getHigh
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 145,
    narrative: 'If your world were this complex, should it really be considered artificial? Did somebody program me?? Holy fuck... was it me??? You start to freak out a little bit.',
    options: [{
      option: 'HOLY FUCK!!!',
      nextPage: undefined,
      aftermath: getHigh
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 151,
    narrative: 'You study Al. He is different. As you continue to study, you discover he is exhibiting Brownian motion.',
    options: [{
      option: 'Is this some kind of fucking pun??',
      nextPage: 153,
    }, ]
  },

  {
    character: 'me',
    page: 153,
    narrative: 'Am I the only one here with free will? Are these my real friends? What the fuck is going on???',
    options: [{
      option: 'Jesus... FUCK!!!',
      nextPage: undefined,
      aftermath: getHigh
    }, ]
  },

  {
    character: 'me',
    page: 200,
    narrative: 'Fratboy1: Hey bro you think you are cool or something?',
    options: [{
      option: 'Fuck off',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 210,
    narrative: 'Fratboy2: Hey dude YO IM FUCKED UP IM GONNA KICK YOUR FUCKING ASS!!! WOOOOOO!!!',
    options: [{
      option: 'Bring it on bitch',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 220,
    narrative: 'Fratboy3: What are you looking at??',
    options: [{
      option: 'Shiiiit',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 230,
    narrative: 'Fratboy4: Alpha Phi Alpha biiotch I will fuck you UPPP!!!',
    options: [{
      option: 'You are a pussy',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 300,
    narrative: 'Game Over... You done goofed.',
    options: [{
      option: 'Load game',
      nextPage: undefined,
      aftermath: loadGame
    }, ],
  },

  {
    character: 'me',
    page: 401,
    narrative: `Shiiit you really fucked them up.`,
    options: [{
      option: 'Fuck yeah',
      nextPage: undefined,
      aftermath: levelCheck
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'meDark',
    page: 700,
    narrative: `Dark boy 2: Hey buddy, you seem like a cool guy and all, but since I've never seen you here in darkworld before, I just have to make sure about something before I let you go... Who do you worship?`,
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
    character: 'me',
    page: 701,
    narrative: `Dark boy 2: Who the fuck is that? Anyway, wrong answer pal, gonna have to stab you.`,
    options: [{
      option: 'shiiiit',
      nextPage: undefined,
      aftermath: getDead
    }, ]
  },

  {
    character: 'me',
    page: 702,
    narrative: `Dark boy 2: Thats cool... thats cool... *awkward silence* ... Anyway ... wrong answer... gonna have to stab you...`,
    options: [{
      option: 'cool man...',
      nextPage: undefined,
      aftermath: getDead
    }, ]
  },

  {
    character: 'me',
    page: 703,
    narrative: `Dark boy 2: Dude for real? You're lucky you said that actually because otherwise I'd prolly have to stab you and let you bleed out here on the temple roof. But since you're cool, I'll send you back on your way... after we play a GAME huhuhh...`,
    options: [{
      option: 'right on...',
      nextPage: undefined,
      aftermath: sendBack
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
    character: 'me',
    page: 900,
    narrative: `StabBoy: I will EAT your HEART until you DIE!`,
    options: [{
      option: 'shiiit...',
      nextPage: undefined,
      aftermath: stabBoyFight
    }, ]
  },

  {
    character: 'me',
    page: 1100,
    narrative: `Frank: Hey buddy, I'm Frank and this is my girlfriend Tammy. Sometimes... she just gets me so angry! Care to spar?`,
    options: [{
      option: 'Cool man...',
      nextPage: undefined,
      aftermath: frankFight
    }, ]
  },

  {
    character: 'me',
    page: 1200,
    narrative: `Dark Mysterious Voice: Greetings traveler. I am Dio, Dark Knight of Vanda. I've crossed into this dimension to fight for the Dark Mage. But this world is uninhabitable for me and my kind.`,
    options: [{
      option: 'Woah.',
      nextPage: 1201,
    }, ]
  },

  {
    character: 'me',
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
    character: 'me',
    page: 1202,
    narrative: `Dio: You are wise to hesitate. Without proper weapon or armor, you have no chance.`,
    options: [{
      option: '...',
      nextPage: undefined,
    }, ]
  },

  {
    character: 'me',
    page: 1210,
    narrative: `Dio: En garde!!!`,
    options: [{
      option: '...',
      nextPage: undefined,
      aftermath: dioFight
    }, ]
  },

  {
    character: 'meApt',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 1603,
    narrative: `Diamond: Holy fuckin shit thank you so much. Here take these brass knuckles. You can fuck people up with these, they're my boyfriend's they hurt super bad. He takes care of me though...`,
    options: [{
      option: 'Shiiit badass',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 1602,
    narrative: `Diamond: So did you get some coke or what?`,
    options: [{
      option: 'Yeah here you go',
      nextPage: 1603,
      aftermath: playItemGet
    },]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 1502,
    narrative: `River: Oh my god like thank you so much. Here, take this gold duck tape. I like found it over there near the woods. Namaste!!`,
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
    character: 'me',
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
    character: 'me',
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
    narrative: `Damnnnn that was fucking dumb... shiiiiit... (you're all fucked up, you should rest and recover... or at least drink some beers)`,
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
    page: 1900,
    narrative: `You have unlocked Mac's level 3 skill, "Fuck Everybody Up".`,
    options: [{
      option: 'Hell yeah',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 2002,
    narrative: `Melvin: My man, helpin a brotha out. Tell you what man I got yo back now.`,
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 3002,
    narrative: `2-Ball Pool: To score a point, in a single shot, a ball must be pocketed and the cue ball must hit both balls. You can score 3 points if you additionally pocket the other ball on the same shot. Good luck! `,
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 3007,
    narrative: `2-Ball Pool: So don't hit the damn balls too hard if you don't want weird stuff to happen.`,
    options: [{
      option: 'Got it',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
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
    character: 'me',
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
    character: 'me',
    page: 4011,
    narrative: `Alana: Shut up!!!`,
    options: [{
      option: 'You using these blocks?',
      nextPage: 4012,
    },]
  },

  {
    character: 'me',
    page: 4012,
    narrative: `Alana: Like yes like go away!!!`,
    options: [{
      option: 'Shiiit',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 3014,
    narrative: `Joe: Yo you ain't got 5 bucks shiiiit...`,
    options: [{
      option: 'Fuck',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 3015,
    narrative: `Joe: Goddamn that was badass. Alright man here you go.`,
    options: [{
      option: 'Tight',
      nextPage: undefined,
      aftermath: joeBorrow
    },]
  },

  {
    character: 'me',
    page: 3016,
    narrative: `Joe: Shiiit pay up haha.`,
    options: [{
      option: 'Shiiit',
      nextPage: undefined,
      aftermath: joeGive
    },]
  },
  {
    character: 'me',
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
    character: 'me',
    page: 3024,
    narrative: `James: You ain't got 3 bucks haha how'd you get so broke...`,
    options: [{
      option: 'God damn it',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 3025,
    narrative: `James: Yeahhh... that was pretty good. Here you go.`,
    options: [{
      option: 'Sweet',
      nextPage: undefined,
      aftermath: jamesBorrow
    },]
  },

  {
    character: 'me',
    page: 3026,
    narrative: `James: Haha pretty close but you owe me three bucks.`,
    options: [{
      option: 'Shiiit',
      nextPage: undefined,
      aftermath: jamesGive
    },]
  },

  {
    character: 'me',
    page: 3500,
    narrative: `Adeline: Mac, I heard you talking to those girls!! I am so pissed at you I am never talking to you ever again!!!`,
    options: [{
      option: 'Shiiit',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 3502,
    narrative: `Adeline: Aww you brought me flowers?? That is so nice, you are the best! Here, you can have this camo duck tape, I actually bought it for you but I was so mad I was gonna just throw it away...`,
    options: [{
      option: 'Hell yeah',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 4000,
    narrative: `You have picked up your Yamaha Motif 6. This is a powerful keyboard. You can access it through the 5th blue button in your menu. `,
    options: [{
      option: 'More',
      nextPage: 4001,
    }, {
      option: 'Got it',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 4001,
    narrative: `Keys on your keyboard A,W,S,E,D,F,T,G,Y,H,U,J,K,O,L,P correspond to the keys on the keyboard. Z lowers the octave and X raises the octave.`,
    options: [{
      option: 'Sweet',
      nextPage: undefined,
    }, {
      option: 'Hell Yeah',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 5000,
    narrative: `Man, I must have been a real dick last night or something. Random people are attacking me... that ain't good. I must have gone to a frat party or something.`,
    options: [{
      option: 'Sweet',
      nextPage: undefined,
    }, {
      option: 'Hell Yeah',
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
    narrative: `I guess that explains why that Ex Junkie is all pissed trying to stab us and stuff...`,
    options: [{
      option: 'Well Goddamn',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 6000,
    narrative: `Anthony: Yooooo wanna play some canjam?`,
    options: [{
      option: 'Maybe later man',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 6100,
    narrative: `Ruff Ruuffff`,
    options: [{
      option: 'Good Boy! Come here!',
      nextPage: undefined,
      aftermath: openQuestLog
    },]
  },

  {
    character: 'me',
    page: 6101,
    narrative: `Jean Claude: Rooof Rooooof!!! (Click on Jean Claude to show him the Jerky you have... hopefully he follows you!)`,
    options: [{
      option: 'Hell yeah',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 6102,
    narrative: `Diamond: OH MY GOD you brought my Jean Claude back to me!! How can I ever repay you?`,
    options: [{
      option: 'Hmmmmmmmmmmm',
      nextPage: 6103,
    },]
  },

  {
    character: 'me',
    page: 6103,
    narrative: `Diamond: Do you live around here?`,
    options: [{
      option: 'I do.',
      nextPage: 6104,
    },]
  },

  {
    character: 'me',
    page: 6104,
    narrative: `Click on Diamond if you want her to follow you.`,
    options: [{
      option: 'Right on',
      nextPage: undefined,
    },]
  },

  {
    character: 'me',
    page: 7000,
    narrative: `Evan: Yoo some frat dude was looking for you. Seemed pissed, pretty sure he had a knife. He said he'd be at Burcham Road and Division Avenue waiting.`,
    options: [{
      option: 'Right on man',
      nextPage: undefined,
      aftermath: openQuestLog
    },]
  },
]

//instance for dialogues like in codeacademy example
function initializePage(scene) {
  if (backgroundDisplayed===0){// create options list and background and saves them into gameState
    if (!gameState.options) {
      // create options list if it doesn't exist
      gameState.options = [];
    }
    // create narrative background if it doesn't exist
    gameState.narrative_background2 = scene.add.rectangle(-252 + me.x, -102 + me.y, 504, 189, 0xb39c0e);
    gameState.narrative_background2.setOrigin(0, 0);
    gameState.narrative_background = scene.add.rectangle(-250 + me.x, -100 + me.y, 500, 185, 0x000);
    gameState.narrative_background.setOrigin(0, 0);}
    backgroundDisplayed = 1
}

function destroyPage() {
  // wipe out narrative text and options
  if (gameState.narrative) {
    // destroy narrative if it exists
    gameState.narrative.destroy();
  }
  for (let option of gameState.options) {
    // destroy options if they exist
    option.optionBox.destroy();
    option.optionText.destroy();
  }
  pageDisplayed = 0
}

function destroyBackground() {
  // wipe out narrative text and options
  if (gameState.narrative_background && backgroundDisplayed===1) {
    // destroy narrative if it exists
    gameState.narrative_background.destroy()
  }
  if (gameState.narrative_background2 && backgroundDisplayed===1) {
    // destroy narrative if it exists
    gameState.narrative_background2.destroy()
  }
  backgroundDisplayed = 0
}

function displayPage(scene, page) {
  if (pageDisplayed === 0) {
    const narrativeStyle = {
      fill: '#ffffff',
      fontStyle: 'italic',
      fontSize: 12,
      align: 'center',
      wordWrap: {
        width: 430
      },
      lineSpacing: 8
    };
    // display general page character
    // & narrative here:
    pause = true
    gameState.narrative = scene.add.text(-215 + me.x, -85 + me.y, page.narrative, narrativeStyle);
    pageDisplayed = 1
    // for-loop creates different options
    // need the index i for spacing the boxes
    for (let i = 0; i < page.options.length; i++) {
      let option = page.options[i];
      // color in the option box
      const optionBox = scene.add.rectangle(-200 + me.x + i * 130, me.y, 110, 40, 0xb39c0e, 0)
      optionBox.strokeColor = 0xb39c0e;
      optionBox.strokeWeight = 2;
      optionBox.strokeAlpha = 1;
      optionBox.isStroked = true;
      optionBox.setOrigin(0, 0)
      // add in the option text
      const baseX = -200 + me.x + i * 130;
      const optionText = scene.add.text(baseX, me.y + 10, option.option, {
        fontSize: 12,
        fill: '#b39c0e',
        align: 'center',
        wordWrap: {
          width: 110
        }
      });
      const optionTextBounds = optionText.getBounds()
      // centering each option text
      optionText.setX(optionTextBounds.x + 55 - (optionTextBounds.width / 2));
      optionText.setY(optionTextBounds.y + 10 - (optionTextBounds.height / 2));
      // add in gameplay functionality for options here
      optionBox.setInteractive()
      optionBox.on('pointerup', function() {
        const newPage = this.option.nextPage;
        if (newPage !== undefined) {
          destroyPage();
          displayPage(scene, fetchPage(newPage));
          if (this.option.aftermath) {
            this.option.aftermath()
          }
          if (this.option.aftermath2) {
            this.option.aftermath2()
          }
        } else if (newPage === undefined) {
          destroyPage();
          destroyBackground();
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
}

function fetchPage(page) {
  zoom=2;
  return pages.find(function(e) {
    if (e.page == page) return e
  });
}

//instance for dialogues for darkworld
function initializePageDark(scene) {
  if (backgroundDisplayed===0){// create options list and background and saves them into gameState
    if (!gameStateDark.options) {
      // create options list if it doesn't exist
      gameStateDark.options = [];
    }
    // create narrative background if it doesn't exist
    gameStateDark.narrative_background = scene.add.rectangle(-250 + meDark.x, -100 + meDark.y, 500, 185, 0x000);
    gameStateDark.narrative_background.setOrigin(0, 0);}
    backgroundDisplayed = 1
}

function destroyPageDark() {
  // wipe out narrative text and options
  if (gameStateDark.narrative) {
    // destroy narrative if it exists
    gameStateDark.narrative.destroy();
  }
  for (let option of gameStateDark.options) {
    // destroy options if they exist
    option.optionBoxDark.destroy();
    option.optionTextDark.destroy();
  }
  pageDisplayed = 0
}

function destroyBackgroundDark() {
  // wipe out narrative text and options
  if (gameStateDark.narrative_background && backgroundDisplayed===1) {
    // destroy narrative if it exists
    gameStateDark.narrative_background.destroy()
  }
  backgroundDisplayed = 0
}

function displayPageDark(scene, page) {
  if (pageDisplayed === 0) {
    const narrativeStyle = {
      fill: '#ffffff',
      fontStyle: 'italic',
      fontSize: 12,
      align: 'center',
      wordWrap: {
        width: 430
      },
      lineSpacing: 8
    };
    // display general page character
    // & narrative here:
    pause = true
    gameStateDark.narrative = scene.add.text(-215 + meDark.x, -85 + meDark.y, page.narrative, narrativeStyle);
    pageDisplayed = 1
    // for-loop creates different options
    // need the index i for spacing the boxes
    for (let i = 0; i < page.options.length; i++) {
      let option = page.options[i];
      // color in the option box
      const optionBoxDark = scene.add.rectangle(-200 + meDark.x + i * 130, meDark.y, 110, 40, 0xb39c0e, 0)
      optionBoxDark.strokeColor = 0xb39c0e;
      optionBoxDark.strokeWeight = 2;
      optionBoxDark.strokeAlpha = 1;
      optionBoxDark.isStroked = true;
      optionBoxDark.setOrigin(0, 0)
      // add in the option text
      const baseXDark = -200 + meDark.x + i * 130;
      const optionTextDark = scene.add.text(baseXDark, meDark.y + 10, option.option, {
        fontSize: 12,
        fill: '#b39c0e',
        align: 'center',
        wordWrap: {
          width: 110
        }
      });
      const optionTextBoundsDark = optionTextDark.getBounds()
      // centering each option text
      optionTextDark.setX(optionTextBoundsDark.x + 55 - (optionTextBoundsDark.width / 2));
      optionTextDark.setY(optionTextBoundsDark.y + 10 - (optionTextBoundsDark.height / 2));
      // add in gameplay functionality for options here
      optionBoxDark.setInteractive()
      optionBoxDark.on('pointerup', function() {
        const newPage = this.option.nextPage;
        if (newPage !== undefined) {
          destroyPageDark();
          displayPageDark(scene, fetchPageDark(newPage));
          if (this.option.aftermath) {
            this.option.aftermath()
          }
          if (this.option.aftermath2) {
            this.option.aftermath2()
          }
        } else if (newPage === undefined) {
          destroyPageDark();
          destroyBackgroundDark();
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

      optionBoxDark.on('pointerover', function() {
        this.optionBoxDark.setStrokeStyle(2, 0xffe014, 1);
        this.optionTextDark.setColor('#ffe014');
      }, {
        optionBoxDark,
        optionTextDark
      });
      optionBoxDark.on('pointerout', function() {
        this.optionBoxDark.setStrokeStyle(1, 0xb38c03, 1);
        this.optionTextDark.setColor('#b39c0e');
      }, {
        optionBoxDark,
        optionTextDark
      });

      gameStateDark.options.push({
        optionBoxDark,
        optionTextDark
      });
    }
  }
}

function fetchPageDark(page) {
  zoom=2;
  return pages.find(function(e) {
    if (e.page == page) return e
  });
}

//instance for dialogues for Aptworld
function initializePageApt(scene) {
  if (backgroundDisplayed===0){// create options list and background and saves them into gameState
    if (!gameStateApt.options) {
      // create options list if it doesn't exist
      gameStateApt.options = [];
    }
    // create narrative background if it doesn't exist
    gameStateApt.narrative_background = scene.add.rectangle(-250 + meApt.x+40, -100 + meApt.y, 500, 185, 0x000);
    gameStateApt.narrative_background.setOrigin(0, 0);}
    backgroundDisplayed = 1
}

function destroyPageApt() {
  // wipe out narrative text and options
  if (gameStateApt.narrative) {
    // destroy narrative if it exists
    gameStateApt.narrative.destroy();
  }
  for (let option of gameStateApt.options) {
    // destroy options if they exist
    option.optionBoxApt.destroy();
    option.optionTextApt.destroy();
  }
  pageDisplayed = 0
}

function destroyBackgroundApt() {
  // wipe out narrative text and options
  if (gameStateApt.narrative_background && backgroundDisplayed===1) {
    // destroy narrative if it exists
    gameStateApt.narrative_background.destroy()
  }
  backgroundDisplayed = 0
}

function displayPageApt(scene, page) {
  if (pageDisplayed === 0) {
    const narrativeStyle = {
      fill: '#ffffff',
      fontStyle: 'italic',
      fontSize: 12,
      align: 'center',
      wordWrap: {
        width: 420
      },
      lineSpacing: 8
    };
    // display general page character
    // & narrative here:
    pause = true
    gameStateApt.narrative = scene.add.text(-215 + meApt.x+40, -85 + meApt.y, page.narrative, narrativeStyle);
    pageDisplayed = 1
    // for-loop creates different options
    // need the index i for spacing the boxes
    for (let i = 0; i < page.options.length; i++) {
      let option = page.options[i];
      // color in the option box
      const optionBoxApt = scene.add.rectangle(-200 + meApt.x+40 + i * 130, meApt.y, 110, 40, 0xb39c0e, 0)
      optionBoxApt.strokeColor = 0xb39c0e;
      optionBoxApt.strokeWeight = 2;
      optionBoxApt.strokeAlpha = 1;
      optionBoxApt.isStroked = true;
      optionBoxApt.setOrigin(0, 0)
      // add in the option text
      const baseXApt = -200 + meApt.x+40 + i * 130;
      const optionTextApt = scene.add.text(baseXApt, meApt.y + 10, option.option, {
        fontSize: 12,
        fill: '#b39c0e',
        align: 'center',
        wordWrap: {
          width: 110
        }
      });
      const optionTextBoundsApt = optionTextApt.getBounds()
      // centering each option text
      optionTextApt.setX(optionTextBoundsApt.x + 55 - (optionTextBoundsApt.width / 2));
      optionTextApt.setY(optionTextBoundsApt.y + 10 - (optionTextBoundsApt.height / 2));
      // add in gameplay functionality for options here
      optionBoxApt.setInteractive()
      optionBoxApt.on('pointerup', function() {
        const newPage = this.option.nextPage;
        if (newPage !== undefined) {
          destroyPageApt();
          displayPageApt(scene, fetchPageApt(newPage));
          if (this.option.aftermath) {
            this.option.aftermath()
          }
          if (this.option.aftermath2) {
            this.option.aftermath2()
          }
        } else if (newPage === undefined) {
          destroyPageApt();
          destroyBackgroundApt();
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

      optionBoxApt.on('pointerover', function() {
        this.optionBoxApt.setStrokeStyle(2, 0xffe014, 1);
        this.optionTextApt.setColor('#ffe014');
      }, {
        optionBoxApt,
        optionTextApt
      });
      optionBoxApt.on('pointerout', function() {
        this.optionBoxApt.setStrokeStyle(1, 0xb38c03, 1);
        this.optionTextApt.setColor('#b39c0e');
      }, {
        optionBoxApt,
        optionTextApt
      });

      gameStateApt.options.push({
        optionBoxApt,
        optionTextApt
      });
    }
  }
}

function fetchPageApt(page) {
  zoom=1;
  return pages.find(function(e) {
    if (e.page == page) return e
  });
}
