//keyboard parameters
let keyboardGet = false;
let keyboardDialogue;

//dialogue parameters
let censored = true;
let censoredPageExists = {};
let activeQuests = {
  'Find Your Stuff': 'You got all drunk last night and lost your keys, phone, and wallet. Seems like you probably left them somewhere at 731 Burcham Apartments.',
  'Robo-Trip': 'Today would be a real good day to get some tussin. I feel like I had some last night on the high school roof but never drank it. Maybe its still up there...',
}
let completedQuests = {
  'Wake Up': 'Well you did do one thing so far. Good job.',
}
let currentQuest = 'Find Your Stuff'

//megaman parameters
let switchToNextWeapon = false;
let beatChill = 0;
let lostAtMegaman = 0;
let beatStag = 0;

//car parameters
let firstKeyDown = '';
let carCrashDialogue = false;
let gasAlert = 0;

//homeboy game parameters
let adventure = 0;

//skateboard parameters
let startSkateboardScene = false;
let skateboardGet = false;
let kickflipScoreDisplayed = false;


//dialogue parameters
let buyFailed = 0;
let pageDisplayed = 0; //supposed to fix issue with multiple pages displaying causing errors
let backgroundDisplayed = 0;
let stripperBanged = false;
let fratboy2primedialogue = 0;
let blondeTalk = false;
let newDarkDialogue = 0;
let darkboydialogue = 0;
let diodialogue = 0;
let screenText;
let highScoreText;
let damageText;
let moneyText;
let startMegaman = false;
let trevorAptFirstDialogue = 0;
let firstTimeCarGet = 0;
let larryFirstTalk = 0;
let drewFirstTalk = 0;
let jeanClaudeFirstTalk = 0;
let fratboy1FirstTalk = 0;
let fratboy2FirstTalk = 0;
let fratboy3FirstTalk = 0;
let fratboy4FirstTalk = 0;
let fratboy5FirstTalk = 0;
let jamesFirstTalk = 0;
let joeFirstTalk = 0;
let bennettFirstTalk = 0;
let jonFirstTalk = 0;
let yogagirlFirstTalk = 0;
let stripperFirstTalk = 0;
let adelineFirstTalk = 0;
let volleyballScore = 0;
let firstPoolParty = 0;
let ogFirstTalk = 0;
let gunTalk = 0
let joeGet = 'initial'
let jamesGet = 'initial'
let jimmyJoinParam = false;
let neverBeenPro = true;
let ergh = 0;
let holdon = 0
let beatbox = 0;
let blocked = 0;
let checkLevelDialogue = 0;
let evanFirstDialogue = 0;
let anthonyFirstDialogue = 0;
let girl1FirstDialogue = 0;
let girl2FirstDialogue = 0;
let girl3FirstDialogue = 0;
let girl4FirstDialogue = 0;
let crackheadFirstTalk = 0;
let moneyToCrackhead = 0;
let crackheadJoin = false;
let crackheadFirstJoin = true;
let highnessDialogue = 0;
let larryStoreOpen = false;
let drewStoreOpen = false;
let alFirstTalk = 0;
let darkworldDialogue = 0;
let jonChaseX = 20;
let gotYogaBlocks = false;

//boss battle parameters
let settingDepth = false;
let bossType;
let bossBattle = false;
let bossBattleParameter = 0;

//battle parameters
let numberOfPlayers = 1;
let battleBackgroundIndex = 0
let currentXY;
let actionIndex;
let enemyIndex;
let reward = 0;
let exp = 0;
let wonBattle = 0;
let chasers = [];
let chasersEnabled = false;
let chaserInitiateFight = 0;
let itemReward = '';
let mohawkBounceTimer = 0;
let mohawkStartingYValue = 0;
let throwingMohawkTarget = []
let throwingMohawk = false
let fallingMohawk = false
let throwingAngle = 0
let firstStrikeDisplay = false

//overworld parameters
let jamesToggleFollow = false;
let openKeyboard = false;
let customMusicStart = false;
let firstStrike = false;
let openingDialogue = false;
let pageForDialogue = 1;
let pointerScale = 1;
let overworldClock = 0;
let showKickTheBallScore = false;
let chaserClock = 0;
let kickTheBallScoreDisplayed = false
let kicking = false;
let diving = false;
let runaway = false;
let pointerDirection = [0, 0]
let pointerLocation = [0, 0]
let pointerSet = false
let numberOfFights = 0;
let openFightDialogue = false;
let playingOutOfBreath = false;
let stamina = 31;
let launchParameter = false; //this just makes sure the gas station scene isn't launched every tween (only once)
let indoorZone = ''
let shakeTheWorld = false;
let bennettGet = false;
let alGet = false;
let swimNoisePlaying = false;
let walkNoisePlaying = false;
let runNoisePlaying = false;
let inPool = false;
let nearPool = false;
let nearVolleyballCourt = false;
let ballInPool = false;
let zoom = 2;
let speed = 1;
let keepaway = 0;
let keepawayHighScore = 0;
let playerTexture = 0;
let brothersSeal = 0;
let brothersSealForSkateboarding = 0;
let highness = 1;
let time = 0;
let pause = false;
let devMode1 = 0;
let devMode2 = 0;
let devMode3 = 0;
let doitS = 0;
let athletics = 1;
let cantGetIn = 0;
let saveFileExists = true;
let scene_number = 2;
let overworldSong = 'theme'
let changeThemeSong = false
let raceBegin = false;
let raceOngoing = false;
let winRace = 0;
let wonRace = 0;

//dark world/ light world parameters
let sentBack = 0;
let worldTheme = 'light'
let darkWorld = 0;
let hausdorfTexture = 0;

//special item parameters
let items = [];
let gas = 6;
let money = 0;
let charStyle = 5;
let phoneGet = 0;
let walletGet = 0;
let liquorGet = 0;
let flowersGet = 0;
let keysGet = 0;

//to use items
function useItem(object, player) {
  let obj = inventory[object];
  let guy = party[player];
  if (obj['numberOwned'] >= 1) {
    obj['numberOwned'] -= 1
    //
    if (obj['sp'] === 'max') {
      guy['sp'] = guy['maxSP']
    } else {
      guy['sp'] = Math.min(guy['sp'] + obj['sp'], guy['maxSP'])
    }
    if (obj['hp'] === 'max') {
      guy['hp'] = guy['maxHP']
    } else {
      guy['hp'] = Math.min(guy['hp'] + obj['hp'], guy['maxHP'])
    }
    if (obj['stamina'] === 'max') {
      stamina = 100
    } else {
      stamina += obj['stamina'] //there is no cap for stamina
    }
    if ((obj['status_ailments'] === 'cure all')) {
      guy['bleeding'] = 0;
      guy['blind'] = 0;
    }
    if ((obj['attack_up'] > 0)) {
      guy['attackUp'] *= (1 + obj['attack_up'])
      console.log(`before calling function, ${guy} has ${guy['attackUpTurns']} attack up turns`)
      if (guy['attackUpTurns'] === 0 || !guy['attackUpTurns']) {
        guy['attackUpTurns'] = 3
      } else {
        guy['attackUpTurns'] = 2 //not sure exactly how to handle this case (stacking) (fix needed)
      }
      console.log(`${guy} has ${guy['attackUpTurns']} turns left of attackUp`)
      console.log(`${guy} currently ${guy['attackUp']}-times attack power`)
    }
    if ((obj['defense_up'] > 0)) {
      guy['defenseUp'] *= (1 - obj['defense_up'])
      console.log(`before calling function, ${guy} has ${guy['defenseUpTurns']} defense up turns`)
      if (guy['defenseUpTurns'] === 0 || !guy['defenseUpTurns']) {
        guy['defenseUpTurns'] = 3
      } else {
        guy['defenseUpTurns'] = 2 //not sure exactly how to handle this case (stacking) (fix needed)
      }
      console.log(`${guy} has ${guy['defenseUpTurns']} turns left of defenseUp`)
      console.log(`${guy} currently takes ${guy['defenseUp']}-times damage`)
    }
  }
}

function getBeer() { //bennett gives you beer
  inventory["Hamms"]['numberOwned'] += 1
  gameState.itemget.play()
}

function getMonsters() { //james gives you monster
  inventory["Monster"]['numberOwned'] += 2
  gameState.itemget.play()
}

function get10Monsters() { //james gives you monster
  inventory["Monster"]['numberOwned'] += 10
  gameState.itemget.play()
}

//character parameters (should all be incorporated in larger objects built from csv files.... fix needed)

let animObject = {
  "Dio": ['diofloat', 'dioslash'],
  "Chad": ['frat1jump', 'frat1attack'],
  "Dylan": ['frat2right', 'frat2attack'],
  "Cam": ['frat3right', 'frat3attack'],
  "Jackson": ['frat4right', 'frat4attack'],
  "Melvin": ['crackheadright', 'crackheadattack'],
  "Derek": ['junkieright', 'junkieattack'],
  "Bill": ['ex_junkieright', 'ex_junkieattack'],
  'StabBoy 2': ['fratboy2primewalk', 'fratboy2primestab'],
  'DB': ['darkboy2walk', 'darkboy2attack'],
  'Frank': ['frat5huhuh', 'frat5huhuh'],
}
let sfxObject = {
  "Dio": "slash",
  "Chad": "bodyhit",
  "Dylan": "spray",
  "Cam": "throw",
  "Jackson": "shatter",
  "Melvin": "bitenoise",
  "Derek": "stabnoise",
  "Bill": "stabnoise",
  'StabBoy 2': "stabnoise",
  'Frank': "bodyhit",
  "DB": "bitenoise",
}
let rr = 0;
let ss = 0;
let tt = 0;
let pp = 0;
let qq = 0;
let set1 = new Set([]);
let set2 = new Set([]);
let set3 = new Set([]);
let set4 = new Set([]);
// it goes [name, right anim, scale, circle size, offsetX, offsetY] ... (fix needed so chasers do not interact poorly with "above" layer of map)
const enemsForChasers = [
  ['crackhead', 'crackheadright', .25, 30, 60, 60],
  ['ex_junkie', 'ex_junkieright', .2, 60, 80, 125],
  ['junkie', 'junkieright', .2, 60, 80, 125],
  ['fratboy1', 'frat1right', .16, 60, 80, 125],
  ['fratboy2', 'frat2right', .15, 60, 80, 125],
  ['fratboy3', 'frat3right', .17, 60, 80, 125],
  ['fratboy4', 'frat4right', .14, 60, 80, 125],
]
const battleScale = {
  'Mac': .77,
  'Jimmy': .67,
  'Al': .7,
  'james': .4 * 1.4,
  'jon': .55 * 1.4,
  'joe': .55 * 1.4,
  'Bennett': .4 * 1.4,
  'girl1': 1.2 * 1.4,
  'girl2': 1.2 * 1.4,
  'girl3': 1.2 * 1.4,
  'girl4': 1.2 * 1.4,
  'crackhead': 1,
  'ex_junkie': .63 * 1.4,
  'junkie': .63 * 1.4,
  'fratboy1': .55 * 1.4,
  'fratboy2': .5 * 1.4,
  'fratboy3': .59 * 1.4,
  'fratboy4': .45 * 1.4,
  'dio': 1.5,
}
const overworldScale = {
  'dio': 1.5,
  'Mac': .55 * 1.4,
  'Al': .175,
  'james': .12,
  'jon': .175,
  'joe': .2,
  'Bennett': .14,
  'girl1': 1.2 * 1.4,
  'girl2': 1.2 * 1.4,
  'girl3': 1.2 * 1.4,
  'girl4': 1.2 * 1.4,
  'crackhead': .4 * 1.4,
  'ex_junkie': .63 * 1.4,
  'junkie': .63 * 1.4,
  'fratboy1': .55 * 1.4,
  'fratboy2': .5 * 1.4,
  'fratboy3': .59 * 1.4,
  'fratboy4': .45 * 1.4,
  'Jimmy': .13,
  'smoke': .41,
  'hausdorf': .4,
  'stripper': .3,
  'jeanClaude': .25,
  'larry': .17,
  'drew': .19,
  'umboy': .20,
  'umgirl': .14,
}
const sizeAndOffset = {
  'Al': {
    size: [64, 128],
    offset: [60, 64]
  },
  'Bennett': {
    size: [64, 64],
    offset: [60, 100]
  },
  'joe': {
    size: [64, 64],
    offset: [60, 100]
  },
  'jon': {
    size: [64, 64],
    offset: [60, 100]
  }, //changed to circle though
  'james': {
    size: [64, 64],
    offset: [60, 100]
  }, //changed to circle though
  'Jimmy': {
    size: [64, 64],
    offset: [60, 100]
  }, //changed to circle though
  'smoke': {
    size: [64, 64],
    offset: [60, 100]
  },
  'hausdorf': {
    size: [64, 64],
    offset: [60, 100]
  },
  'stripper': {
    size: [64, 64],
    offset: [60, 100]
  },
  'jeanClaude': {
    size: [64, 64],
    offset: [60, 100]
  },
  'crackhead': {
    size: [64, 64],
    offset: [60, 100]
  },
  'larry': {
    size: [64, 128],
    offset: [60, 64]
  },
  'drew': {
    size: [64, 128],
    offset: [60, 64]
  },
  'umboy': {
    size: [64, 128],
    offset: [60, 64]
  },
  'umgirl': {
    size: [64, 128],
    offset: [60, 64]
  },
}
let playerColors = {
  'Mac': 0x0e7d4e,
  'Al': 0xbe2016,
  'Jimmy': 0x0d2175,
  'Bennett': 0xfa7800,
  'all': 0xffffff
}
let playerColorsEquip = {
  'Mac': '#068c1b',
  'Al': '#cb0000',
  'Jimmy': '#0f15a1',
  'Bennett': '#fa7800',
  'all': '#ffffff'
}
let equipped = {
  'Mac': {
    upper: "Camo T-Shirt",
    lower: "Jeans",
    accessory: "",
    accessory2: "",
  },
  'Jimmy': {
    upper: "Blue Shirt",
    lower: "Brown Pants",
    accessory: "",
    accessory2: "",
  },
  'Al': {
    upper: "Red Shirt",
    lower: "Red Sweatpants",
    accessory: "",
    accessory2: "",
  },
  'Bennett': {
    upper: "Running Shirt",
    lower: "Running Shorts",
    accessory: "",
    accessory2: "",
  }
}

let joinParams = {'Jimmy': false, 'Al': false, 'Bennett': false}

//equipment parameters (should all be incorporated in a larger object built from csv files)

function equip(piece, player) {
  equipment[piece]['equipped'] += 1
  if (equipment[piece]['def'] > 0) {
    party[player]['def'] += equipment[piece]['def']
  }
  if (equipment[piece]['damagePlus'] > 0) {
    party[player]['damage'] += equipment[piece]['damagePlus']
  }
  if (equipment[piece]['maxSPPlus'] > 0) {
    party[player]['maxSP'] += equipment[piece]['maxSPPlus']
  }
  if (equipment[piece]['maxHPPlus'] > 0) {
    party[player]['maxHP'] += equipment[piece]['maxHPPlus']
  }
  if (equipment[piece]['athletics'] !== 0) {
    athletics += equipment[piece]['athletics']
  }
  if (equipment[piece]['style'] > 0) {
    charStyle += equipment[piece]['style']
  }
  if (equipment[piece]['firstStrike'] === 'true') {
    firstStrike = true;
  }
  if (equipment[piece]['neverMiss'] === 'true') {
    party[player]['neverMiss'] = true
  }
  if (equipment[piece]['preventBleeding'] === 'true') {
    party[player]['bleedProof'] = true
  }
  if (equipment[piece]['preventBlindness'] === 'true') {
    party[player]['blindProof'] = true
  }
}

function unequip(piece, player) { //problem: if I equip two pieces with nevermiss and then unequip one, it gives nevermiss false (test this) (fix... make nevermiss a number and anything >0 gives nevermiss)
  equipment[piece]['equipped'] -= 1
  if (equipment[piece]['def'] > 0) {
    party[player]['def'] -= equipment[piece]['def']
  }
  if (equipment[piece]['damagePlus'] > 0) {
    party[player]['damage'] -= equipment[piece]['damagePlus']
  }
  if (equipment[piece]['maxSPPlus'] > 0) {
    party[player]['maxSP'] -= equipment[piece]['maxSPPlus']
  }
  if (equipment[piece]['maxHPPlus'] > 0) {
    party[player]['maxHP'] -= equipment[piece]['maxHPPlus']
  }
  if (equipment[piece]['athletics'] > 0) {
    athletics -= equipment[piece]['athletics']
  }
  if (equipment[piece]['style'] > 0) {
    charStyle -= equipment[piece]['style']
  }
  if (equipment[piece]['firstStrike'] === 'true') {
    firstStrike = false;
  }
  if (equipment[piece]['neverMiss'] === 'true') {
    party[player]['neverMiss'] = false
  }
  if (equipment[piece]['preventBleeding'] === 'true') {
    party[player]['bleedProof'] = false
  }
  if (equipment[piece]['preventBlindness'] === 'true') {
    party[player]['blindProof'] = false
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function openControls() {
  scene_number = 99
}

function jimmyEnhanced() {
  party['Jimmy']['damage'] += 5;
  party['Jimmy']['hp'] += 20;
  party['Jimmy']['maxHP'] += 20;
  gameState.itemget.play()
}

function playbackCustomSong() {
  //playing the piano
  for (const keyy of Object.keys(gameState6.sequences.piano)) {
    let i = Object.keys(gameState6.sequences.piano).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.piano[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.piano[keyy][playingTime] && !gameState6.sequences.piano[keyy][playingTime - 1])) {
      gameState6.pianomiddleC[i].setDetune(1200 * gameState6.sequences.piano.octave[playingTime] + 100 * i - 100);
      gameState6.pianomiddleC[i].play();
    } else if (!gameState6.sequences.piano[keyy][playingTime]) {
      if (gameState6.sequences.piano[keyy][playingTime - 1]) {
        gameState6.pianomiddleC[i].stop();
      }
    }
  }
  //playing the bass
  for (const keyy of Object.keys(gameState6.sequences.bass)) {
    let i = Object.keys(gameState6.sequences.bass).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.bass[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.bass[keyy][playingTime] && !gameState6.sequences.bass[keyy][playingTime - 1])) {
      gameState6.bassmiddleC[i].setDetune(1200 * gameState6.sequences.bass.octave[playingTime] + 100 * i - 100);
      gameState6.bassmiddleC[i].play();
    } else if (!gameState6.sequences.bass[keyy][playingTime]) {
      if (gameState6.sequences.bass[keyy][playingTime - 1]) {
        gameState6.bassmiddleC[i].stop();
      }
    }
  }
  //playing the clav
  for (const keyy of Object.keys(gameState6.sequences.clav)) {
    let i = Object.keys(gameState6.sequences.clav).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.clav[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.clav[keyy][playingTime] && !gameState6.sequences.clav[keyy][playingTime - 1])) {
      gameState6.clavmiddleC[i].setDetune(1200 * gameState6.sequences.clav.octave[playingTime] + 100 * i - 100);
      gameState6.clavmiddleC[i].play();
    } else if (!gameState6.sequences.clav[keyy][playingTime]) {
      if (gameState6.sequences.clav[keyy][playingTime - 1]) {
        gameState6.clavmiddleC[i].stop();
      }
    }
  }

  //playing the strings
  for (const keyy of Object.keys(gameState6.sequences.strings)) {
    let i = Object.keys(gameState6.sequences.strings).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.strings[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.strings[keyy][playingTime] && !gameState6.sequences.strings[keyy][playingTime - 1])) {
      gameState6.stringsmiddleC[i].setDetune(1200 * gameState6.sequences.strings.octave[playingTime] + 100 * i - 100);
      gameState6.stringsmiddleC[i].play();
    } else if (!gameState6.sequences.strings[keyy][playingTime]) {
      if (gameState6.sequences.strings[keyy][playingTime - 1]) {
        gameState6.stringsmiddleC[i].stop();
      }
    }
  }
  //playing the wurlitzer
  for (const keyy of Object.keys(gameState6.sequences.wurlitzer)) {
    let i = Object.keys(gameState6.sequences.wurlitzer).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.wurlitzer[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.wurlitzer[keyy][playingTime] && !gameState6.sequences.wurlitzer[keyy][playingTime - 1])) {
      gameState6.wurlitzermiddleC[i].setDetune(1200 * gameState6.sequences.wurlitzer.octave[playingTime] + 100 * i - 100);
      gameState6.wurlitzermiddleC[i].play();
    } else if (!gameState6.sequences.wurlitzer[keyy][playingTime]) {
      if (gameState6.sequences.wurlitzer[keyy][playingTime - 1]) {
        gameState6.wurlitzermiddleC[i].stop();
      }
    }
  }
  //playing the choir
  for (const keyy of Object.keys(gameState6.sequences.choir)) {
    let i = Object.keys(gameState6.sequences.choir).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.choir[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.choir[keyy][playingTime] && !gameState6.sequences.choir[keyy][playingTime - 1])) {
      gameState6.choirmiddleC[i].setDetune(1200 * gameState6.sequences.choir.octave[playingTime] + 100 * i - 100);
      gameState6.choirmiddleC[i].play();
    } else if (!gameState6.sequences.choir[keyy][playingTime]) {
      if (gameState6.sequences.choir[keyy][playingTime - 1]) {
        gameState6.choirmiddleC[i].stop();
      }
    }
  }
  //playing the guitar
  for (const keyy of Object.keys(gameState6.sequences.guitar)) {
    let i = Object.keys(gameState6.sequences.guitar).findIndex((keyIndex) => {
      return keyIndex === keyy
    })
    if ((gameState6.sequences.guitar[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.guitar[keyy][playingTime] && !gameState6.sequences.guitar[keyy][playingTime - 1])) {
      gameState6.guitarmiddleC[i].setDetune(1200 * gameState6.sequences.guitar.octave[playingTime] + 100 * i - 100);
      gameState6.guitarmiddleC[i].play();
    } else if (!gameState6.sequences.guitar[keyy][playingTime]) {
      if (gameState6.sequences.guitar[keyy][playingTime - 1]) {
        gameState6.guitarmiddleC[i].stop();
      }
    }
  }
  //playing the drums
  for (const keyy of Object.keys(gameState6.sequences.drums)) {
    if ((gameState6.sequences.drums[keyy][playingTime] && playingTime === 0) || (gameState6.sequences.drums[keyy][playingTime] && !gameState6.sequences.drums[keyy][playingTime - 1])) {
      gameState6.drums[keyy].play();
    }
  }
  //incrementing time and looping at 480
  playingTime += 1;
  if (playingTime === 480) {
    playingTime = 0
  }
}

function openKeyboardNow() {
  openKeyboard = true;
}
//use this to complete a quest
function completeQuest(title) {
  completedQuests[title] = activeQuests[title]
  delete activeQuests[title]
}
//bool=true means we are equipping. Otherwise we are unequipping
function giveCrackhead1() {
  if (money >= 1) {
    money -= 1;
    moneyToCrackhead += 1;
  }
}




function sleep() {
  party['Mac']['hp'] = party['Mac']['maxHP'];
  party['Jimmy']['hp'] = party['Jimmy']['maxHP'];
  party['Al']['hp'] = party['Al']['maxHP'];
  party['Bennett']['hp'] = party['Bennett']['maxHP'];
  party['Mac']['sp'] = party['Mac']['maxSP'];
  party['Jimmy']['sp'] = party['Jimmy']['maxSP'];
  party['Al']['sp'] = party['Al']['maxSP'];
  party['Bennett']['sp'] = party['Bennett']['maxSP'];
}

function scoreGoal() {
  volleyballScore += 1
  volleyball.disableBody(true, true)
  volleyball.enableBody(true, gameState.VolleyballSpawnPoint.x - 32, gameState.VolleyballSpawnPoint.y - 250, true, true);
}


function goInPool() {
  inPool = true
}

function joeTimerStart() {
  if (money >= 5) {
    _timerStart = true;
    resetTime = true;
    joeBets = true
    twoballscore = 0;
  } else {
    joeNotEnoughToBet = true
  }
}

function jamesTimerStart() {
  if (money >= 3) {
    _timerStart = true;
    resetTime = true;
    jamesBets = true
    twoballscore = 0;
  } else {
    jamesNotEnoughToBet = true
  }
}

function goInPocketCue() {
  cueInPocket = true
}

function goInPocketEight() {
  eightInPocket = true
}

function goInPocketNine() {
  nineInPocket = true
}

function openQuestLog() {
  scene_number = 10
}

function exitPool() {
  inPool = false
}

function ballGoInPool() {
  ballInPool = true
}

function ballExitPool() {
  ballInPool = false
}



//play the zelda secret noise
function playSecret() {
  gameState.secret.play()
}

//to initiate level up dialogue
function levelCheck() {
  checkLevelDialogue = 1
}

//to initiate joe giving you 10 bucks
function joeBorrow() {
  money += 10;
  gameState.itemget.play();
}

//to initiate joe giving you 10 bucks
function joeGive() {
  money -= 5;
  gameState.block.play()
}

//to initiate joe giving you 10 bucks
function jamesBorrow() {
  money += 5;
  gameState.itemget.play();
}

//to initiate joe giving you 10 bucks
function jamesGive() {
  money -= 3;
  gameState.block.play()
}

function applyRailEnglish() {
  railEnglish = true
}

function hitTopRail() {
  _hitTopRail = true
}

function hitTopRailRight() {
  _hitTopRailRight = true
}

function hitBottomRail() {
  _hitBottomRail = true
}

function hitBottomRailRight() {
  _hitBottomRailRight = true
}

function hitLeftRail() {
  _hitLeftRail = true
}

function hitRightRail() {
  _hitRightRail = true
}

//direction vector
function directionVector(obj1, obj2) {
  if (distance(obj1, obj2) === 0) {
    return [(obj2.x - obj1.x) / .01, (obj2.y - obj1.y) / .01]
  } else {
    return [(obj2.x - obj1.x) / distance(obj1, obj2), (obj2.y - obj1.y) / distance(obj1, obj2)]
  }
}

function walkWith(follower, followee) {
  follower.body.setVelocityX(followee.body.velocity.x)
  follower.body.setVelocityY(followee.body.velocity.y)
  if (followee.body.velocity.x > followee.body.velocity.y) {
    follower.x = followee.x + 15;
    follower.y = followee.y + 3;
  } else {
    follower.x = followee.x + 3;
    follower.y = followee.y + 15;
  }
}

function followPath(unit, path, speed = 50) {
  if (distance(unit, path[unit.position]) < 20 && !unit.changeDirection) {
    //console.log(unit.type)
    if (unit.type === "Jean Claude") {}
    unit.position += 1
    unit.changeDirection = true
  } else if (distance(unit, path[unit.position]) > 25 && unit.changeDirection) {
    unit.changeDirection = false
  }
  if (unit.position === path.length) {
    unit.position = 0
  }
  unit.body.setVelocityX(directionVector(unit, path[unit.position])[0] * speed)
  unit.body.setVelocityY(directionVector(unit, path[unit.position])[1] * speed)
}

//direction vector
function spriteSpeed(obj) {
  return Math.sqrt(obj.body.velocity.x ** 2 + obj.body.velocity.y ** 2)
}

//to buy from homeboy
function buyWeed() {
  if (money >= 10 && highScore > 65) {
    money -= 10;
    items.push('Weed (2g)')
    gameState.itemget.play();
    completeQuest('Get Weed From OG Homeboy')
  } else {
    buyFailed = 1
  }
}

//to buy from homeboy (bad deal)
function buyWeedRipoff() {
  if (money >= 20) {
    money -= 20;
    items.push('Weed (1g)')
    gameState.itemget.play();
  } else {
    buyFailed = 1
  }
}

function shaken() {
  shakeTheWorld = true
}



//any ball should have this function called on it in update
function beABall(obj) {
  if (velocityDiff(me, obj) > 15 && distance(me, obj) < 15 && distance(me, obj) > 13) {
    gameState.ball1.play()
  }

  obj.body.velocity.x = Math.floor(obj.body.velocity.x / 2) * 2
  obj.body.velocity.y = Math.floor(obj.body.velocity.y / 2) * 2

  if (obj.body.velocity.x > 0) {
    obj.body.velocity.x -= 2
  }
  if (obj.body.velocity.x < 0) {
    obj.body.velocity.x += 2
  }
  if (obj.body.velocity.y > 0) {
    obj.body.velocity.y -= 2
  }
  if (obj.body.velocity.y < 0) {
    obj.body.velocity.y += 2
  }
  if (obj.body.velocity.x > 500) {
    obj.body.setVelocityX(499)
  }
  if (obj.body.velocity.x < -500) {
    obj.body.setVelocityX(-499)
  }
  if (obj.body.velocity.y > 500) {
    obj.body.setVelocityY(499)
  }
  if (obj.body.velocity.y < -500) {
    obj.body.setVelocityY(-499)
  }
}

//call this on an npc in update to have them randomly walk
function randomWalk(npc, strength = 1) {
  npc.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
  npc.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);

  if (npc.body.velocity.x > 50 || npc.body.velocity.x < -50 || npc.body.velocity.y > 50 || npc.body.velocity.y < -50) {
    npc.body.velocity.x = 0;
    npc.body.velocity.y = 0;
  }
}

//to prevent npcs from getting stuck against walls (not sure if it works well... fix needed)
function getUnstuck(npc, strength = 1) {
  if (npc.body.blocked.up) {
    npc.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
    npc.body.velocity.y -= strength
  }
  if (npc.body.blocked.down) {
    npc.body.velocity.x += Phaser.Math.FloatBetween(-strength, strength);
    npc.body.velocity.y += strength
  }
  if (npc.body.blocked.left) {
    npc.body.velocity.x += strength
    npc.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);
  }
  if (npc.body.blocked.right) {
    npc.body.velocity.x -= strength
    npc.body.velocity.y += Phaser.Math.FloatBetween(-strength, strength);
  }
}

//to progress in the highness dialogue as you smoke with different npcs... this part needs to be redesigned so you cant
//keep smoking with the same npc. Also it should give you some benefit besides shaking and running fast for awhile.
function getSkateboard() {
  playerTexture = 'board'
  startSkateboardScene = true;
}

function increaseHighnessDialogue() {
  highnessDialogue += 1
}

function holdOn() { //to make al say holdon
  holdon = 1
}

function upErgh() { //to make girl say ergh
  ergh = 1
}

function block() { //play zelda block noise
  blocked = 1
}

function adventured() { //play zelda block noise
  adventure = 1
}

function startRace() {
  raceBegin = true;
}

function meWinRace() {
  if (raceOngoing) {
    winRace = 1;
  }
}

function bennettWinRace() {
  if (raceOngoing) {
    winRace = 2;
  }
}

function endRaceWin() {
  wonRace = 1;
  bennettGet = 1
  gameState.itemget.play()
}

function endRaceLoss() {
  wonRace = 2;
}

function getDead() { //to initiate gameover
  //set health to 1 so you keep living in lightworld
  party['Mac']['hp'] = 1;
  gameStateDark.music.stop();
  gameState.spooky.stop();
  gameState.holyDiver.stop();
  gameState.music.play();
  worldTheme = 'light';
  darkworldDialogue = 5
}

function fightDarkboy() { //call this after talking with darkboy to initiate fight and then send back to lightworld
  bossBattle = true
  bossBattleParameter = 1
  gameStateDark.music.stop()
  gameState.spooky.play()
  bossType = 'darkboy'
  //darkworldDialogue = 1
}

function stabBoyFight() { //initiate stabboy fight
  bossBattle = true
  bossBattleParameter = 1
  gameState.music.stop();
  gameState.spooky.play()
  bossType = 'fratboy2prime'
}

function frankFight() { //initiate frank fight
  bossBattle = true
  bossBattleParameter = 1
  gameState.music.stop();
  gameState.spooky.play()
  bossType = 'frank'
}

function dioFight() { //initiate dio fight
  bossBattle = true
  bossBattleParameter = 1
  gameStateDark.music.stop()
  gameState.holyDiver.play()
  bossType = 'dio'
}

function getCigarettes() { //jon gives you cigarettes
  items.push('Marlboro lights')
  gameState.itemget.play()
}

function getTreeFitty() { //girl gives you 3.50 for beer
  money += 3.50
  gameState.itemget.play()
}

function getOneSPMac() { //level up increase SP
  party['Mac']['maxSP'] += 1;
  gameState.itemget.play()
  skillCheck('Mac')
}

function getOneSPAl() { //level up increase SP
  party['Al']['maxSP'] += 1;
  gameState.itemget.play()
}

function getOneSPJimmy() { //level up increase SP
  party['Jimmy']['maxSP'] += 1;
  gameState.itemget.play()
}

function getOneSPBennett() { //level up increase SP
  party['Bennett']['maxSP'] += 1;
  gameState.itemget.play()
}

function getThreeHPMac() { //level up increase HP
  party['Mac']['maxHP'] += 3;
  gameState.itemget.play()
  skillCheck('Mac')
}

function getThreeHPAl() { //level up increase HP
  party['Al']['maxHP'] += 3;
  gameState.itemget.play()
}

function getThreeHPJimmy() { //level up increase HP
  party['Jimmy']['maxHP'] += 3;
  gameState.itemget.play()
}

function getThreeHPBennett() { //level up increase HP
  party['Bennett']['maxHP'] += 3;
  gameState.itemget.play()
}

function getOneDamageMac() { //level up increase damage
  party['Mac']['damage'] += 2;
  gameState.itemget.play()
  skillCheck('Mac')
}


function getOneDamageAl() { //level up increase damage
  party['Al']['damage'] += 2;
  gameState.itemget.play()
}

function getOneDamageJimmy() { //level up increase damage
  party['Jimmy']['damage'] += 2;
  gameState.itemget.play()
}

function getOneDamageBennett() { //level up increase damage
  party['Bennett']['damage'] += 2;
  gameState.itemget.play()
}

function skillCheck(player) {
  if (player === 'Mac' && party['Mac']['level'] === 3) {
    party['Mac']['special'].push("Fuck Everybody Up (8)")
    party['Mac']['skillDialogue'][3] = true
  }
}

function getHigh() { //increases highness when you smoke weed
  highness = 3;
  time = 0;
  gameState.bongSound.play()
}

function playMegaman() { //computes distance between two things
  gameState.bongSound.play()
  window.setTimeout(() => {
    startMegaman = true;
  }, 3000);

}

function distance(thing1, thing2) { //computes distance between two things
  return Math.sqrt((thing1.x - thing2.x) ** 2 + (thing1.y - thing2.y) ** 2)
}

function velocityDiff(thing1, thing2) { //computes the difference in velocity between two things
  return Math.sqrt((thing1.body.velocity.x - thing2.body.velocity.x) ** 2 + (thing1.body.velocity.y - thing2.body.velocity.y) ** 2)
}

function chasex(thing1, thing2, strength = 1.2, offset = 0) { //makes thing1 chase thing2 with strength and offset
  if (thing1.x > thing2.x + offset) {
    if (thing1.body.velocity.x > 0) {
      thing1.body.velocity.x = 0
    }
    thing1.body.velocity.x -= strength
  }
  if (thing1.x < thing2.x - offset) {
    if (thing1.body.velocity.x < 0) {
      thing1.body.velocity.x = 0
    }
    thing1.body.velocity.x += strength
  }
}

function chase(thing1, thing2, strength = 1.2, offset = 0) { //makes thing1 chase thing2 with strength and offset
  if (!pause) {
    if (thing1.x > thing2.x + offset) {
      if (thing1.body.velocity.x > 0) {
        thing1.body.velocity.x = 0
      }
      thing1.body.velocity.x -= strength
    }
    if (thing1.x < thing2.x - offset) {
      if (thing1.body.velocity.x < 0) {
        thing1.body.velocity.x = 0
      }
      thing1.body.velocity.x += strength
    }
    if (thing1.y > thing2.y + offset) {
      if (thing1.body.velocity.y > 0) {
        thing1.body.velocity.y = 0
      }
      thing1.body.velocity.y -= strength
    }
    if (thing1.y < thing2.y - offset) {
      if (thing1.body.velocity.y < 0) {
        thing1.body.velocity.y = 0
      }
      thing1.body.velocity.y += strength
    }
  }
}

function getJonItem() { //jon gives you sprinting shoes
  gameState.itemget.play();
  equipment["Sprinting Shoes"]['numberOwned'] += 1
}

function alCheckhamms() { //al checks if you have hamms and weed, if so, he joins your party
  if (inventory['Hamms']['numberOwned'] >= 4 && items.includes("Weed (2g)")) {
    gunTalk = 1
  }
  beatbox = 1
  openQuestLog()
}

function colleenCheck20() { //al checks if you have hamms and weed, if so, he joins your party
  if (money >= 20) {
    cokeGet()
    money -= 20
  }
}

function jimmyJoins() { //if you go pro for the first time jimmy joins your party
  if (jimmyJoinParam === false) {
    jimmyJoinParam = true
  }
}

function gunGet() { //al joins your party (still called gunget because he used to just give you a gun)
  alGet = 1
  gameState.itemget.play()
}

function cokeGet() { //al joins your party (still called gunget because he used to just give you a gun)
  gameState.itemget.play()
  items.push("Gram of Coke")
  girl4FirstDialogue = 4
}

//this removes all instances of obj from the array arr
function removeAll(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === obj) {
      arr.splice(i, 1)
    }
  }
}

//this removes first instance of obj from the array arr
function removeFirst(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === obj) {
      arr.splice(i, 1)
      break
    }
  }
}

function getHPBoost() {
  equipment["HP Booster"]['numberOwned'] += 1
  gameState.itemget.play();
}

function getDamageBoost() {
  equipment["Damage Booster"]['numberOwned'] += 1
  gameState.itemget.play();
}

function playItemGet() {
  gameState.itemget.play();
}

function openLarryStore() {
  scene_number = 98;
}

function openDrewStore() {
  scene_number = 97;
}





//building the list of effects
let maxStrengths = {
  'style': 15,
  'damagePlus': 15,
  'maxSPPlus': 10,
  'maxHPPlus': 20,
  'athletics': 15, //divide by 10 in the end
}

function describeEffect(stat, strength) {
  effects = {
    'style': 'Style',
    'damagePlus': 'Damage',
    'maxSPPlus': 'Max SP',
    'maxHPPlus': 'Max SP',
    'neverMiss': 'Never miss',
    'firstStrike': 'First strike',
    'preventBleeding': 'Prevents Bleeding',
    'preventBlindness': 'Prevents Blindness',
    'athletics': 'Athletics',
  }
  if (maxStrengths[stat]) {
    return effects[stat] + ' +' + String(strength)
  } else {
    return effects[stat]
  }

}

function generateRandomEquipment() {
  //base
  let types = {
    'Mac_upper': ['T-Shirt', 'Wife Beater'],
    'Mac_lower': ['Shorts', 'Track Pants'],
    'Jimmy_upper': ['Shirt', 'Sweatshirt'],
    'Jimmy_lower': ['Jorts', 'Snowpants'],
    'Al_upper': ['Button-Up', 'Hoody'],
    'Al_lower': ['Sweatpants', 'JNCO Jeans'],
    'Bennett_upper': ['Tank Top', 'Spandex Shirt'],
    'Bennett_lower': ['Running Shorts', 'Spandex Swimsuit'],
    'accessory': ['Chain', 'Ring', 'Belt', 'Hat', 'Shoes'],
  }

  //determining equipment type
  let typeDraw = getRandomInt(Object.keys(types).length)
  let type = Object.keys(types)[typeDraw]
  //determining the exact equipment base
  let baseDraw = getRandomInt(types[type].length)
  let base = types[type][baseDraw]
  console.log(`typeDraw ${typeDraw}`)
  console.log(`type ${type}`)
  console.log(`baseDraw ${baseDraw}`)
  console.log(`base ${base}`)

  let prefixes = {
    'style': ['Swag', 'Stylish', 'Shiny', 'Dope'],
    'athletics': ['Sporting', `Active`, `Agile`, `Dry-Fit`],
    'neverMiss': ['Accurate', `Marksman's`, `Precise`, `Exact`],
    'firstStrike': ['Fast', `Quick`, `Sprightly`, `Nimble`],

  }
  let postfixes = {
    'preventBleeding': ['of Carbon-Fiber', `the Uncut`, `of Invinciblity`, `of Kevlar`],
    'preventBlindness': ['the All-Seeing', `of the Vigilent`, `of Sight`, `of Seeing`],
    'damagePlus': ['of Ferocity', 'of the Brutal', 'of the Savage', 'of the Vicious'],
    'maxSPPlus': ['of Competence', 'of the Skilled', `of Speciality`, `of the Expert`],
    'maxHPPlus': ['of the Healthy', 'of the Enduring', `of Constancy`, `of Lasting Health`],
  }

  // slots
  let slots = 0;
  let rareDraw = getRandomInt(10);
  console.log(rareDraw)
  if (rareDraw === 0) {
    slots = 2
  } else if (rareDraw < 5) {
    slots = 1
  }
  console.log(`slots ${slots}`)

  let prefix = '';
  let postfix = '';
  let stat1 = '';
  let stat2 = '';
  let effect = '';

  if (slots === 1) {
    console.log(`1 slot`);
    let typeOfAddon = getRandomInt(2);
    if (typeOfAddon === 0) {
      let statistics = Object.keys(prefixes);
      stat1 = statistics[getRandomInt(statistics.length)];
      let pres = prefixes[stat1];
      prefix = pres[getRandomInt(pres.length)];
    } else if (typeOfAddon === 1) {
      let statistics = Object.keys(postfixes);
      stat2 = statistics[getRandomInt(statistics.length)];
      let posts = postfixes[stat2];
      postfix = posts[getRandomInt(posts.length)];
    }
  } else if (slots === 2) {
    console.log(`2 slots`)
    let prestatistics = Object.keys(prefixes)
    stat1 = prestatistics[getRandomInt(prestatistics.length)]
    let pres = prefixes[stat1]
    prefix = pres[getRandomInt(pres.length)]
    let poststatistics = Object.keys(postfixes)
    stat2 = poststatistics[getRandomInt(poststatistics.length)]
    let posts = postfixes[stat2]
    postfix = posts[getRandomInt(posts.length)]
  }
  console.log(`stat1 and stat2`, stat1, stat2)
  //building the name of the piece
  let name = base;
  if (prefix.length > 0) {
    name = prefix + ' ' + name
  }
  if (postfix.length > 0) {
    name = name + ' ' + postfix
  }

  let activeEffects = []
  let strength1 = 0;
  let strength2 = 0;
  let value = 1
  if (maxStrengths[stat1]) {
    strength1 = getRandomInt(maxStrengths[stat1]) + 1
    value += strength1;
    if (stat1 === 'athletics') { //need to scale and round athletics
      strength1 = strength1 / 40
      strength1 = Math.round(strength1 * 100) / 100
    }
    effect += describeEffect(stat1, strength1)
    activeEffects.push([stat1, strength1])
  } else if (stat1) {
    strength1 = 10
    value += strength1;
    effect += describeEffect(stat1, 0)
    activeEffects.push([stat1, true])
  }
  if (maxStrengths[stat2]) {
    if (effect.length > 0) {
      effect += '\n        '
    }
    strength2 = getRandomInt(maxStrengths[stat2]) + 1
    value += strength2;
    if (stat2 === 'athletics') { //need to scale and round athletics
      strength2 = strength2 / 40
      strength2 = Math.round(strength2 * 100) / 100
    }
    effect += describeEffect(stat2, strength2)
    activeEffects.push([stat2, strength2])
  } else if (stat2) {
    if (effect.length > 0) {
      effect += '\n        '
    }
    strength2 = 10
    value += strength2;
    effect += describeEffect(stat2, 0)
    activeEffects.push([stat2, true])
  }

  let chars = {
    'Mac_upper': 'Mac',
    'Mac_lower': 'Mac',
    'Jimmy_upper': 'Jimmy',
    'Jimmy_lower': 'Jimmy',
    'Al_upper': 'Al',
    'Al_lower': 'Al',
    'Bennett_upper': 'Bennett',
    'Bennett_lower': 'Bennett',
    'accessory': 'all',
  }
  character = chars[type]

  let piece_def = getRandomInt((party['Mac']['level'] + 5) * 2)
  value += piece_def

  if (effect === '') {
    effect = 'none'
  }

  new_equipment = {
    'name': name,
    'type': type,
    'numberOwned': 1,
    'equipped': 0,
    'character': character,
    'randomEncounterRewards': 0,
    'value': value,
    'effect': effect,
    'def': piece_def,
    'style': 0,
    'damagePlus': 0,
    'maxSPPlus': 0,
    'maxHPPlus': 0,
    'neverMiss': false,
    'firstStrike': false,
    'preventBleeding': false,
    'preventBlindness': false,
    'athletics': 0,
  }
  //if we add more attributes we should change this to
  //new_equipment = equipment['Camo T-Shirt']
  //then change values
  //this way any new stats are also in the object and we can just make changes in the csv file
  //new_equipment['name'] = name;
  //new_equipment['type'] = type;
  //new_equipment['numberOwned'] = numberOwned;
  //new_equipment['equipped'] = 0;
  //new_equipment['character'] = character;
  //new_equipment['randomEncounterRewards'] = 0;
  //new_equipment['value'] = value;
  //new_equipment['effect'] = effect;
  //new_equipment['def'] = piece_def;

  for (let i = 0; i < activeEffects.length; i++) {
    let stati = activeEffects[i][0]
    let strengthi = activeEffects[i][1]
    new_equipment[stati] = strengthi
  }
  return new_equipment
}

/*
window.setTimeout(()=>{
  //push 10 random pieces to the console
  let pieces=[]
  for (let i=0;i<10;i++){
    pieces.push(generateRandomEquipment())
    console.log(pieces[i])
    equipment[pieces[i]['name']]=pieces[i]
  }
}, 500)
*/

function loadState(){
  console.log('loading')
  if (localStorage.getItem('inventory') !== null && continueGame) {
    console.log(`Save State Found`);
    overworldParams = JSON.parse(localStorage.getItem('overworldParams'))
    //set all params
    money = overworldParams["money"]
    trevorAptFirstDialogue = overworldParams["trevorAptFirstDialogue"]
    gas = overworldParams["gas"]
    carCrashDialogue = overworldParams["carCrashDialogue"]
    skateboardGet = overworldParams["skateboardGet"]
    stripperBanged = overworldParams["stripperBanged"]
    fratboy2primedialogue = overworldParams["fratboy2primedialogue"]
    blondeTalk = overworldParams["blondeTalk"]
    newDarkDialogue = overworldParams["newDarkDialogue"]
    darkboydialogue = overworldParams["darkboydialogue"]
    diodialogue = overworldParams["diodialogue"]
    trevorAptFirstDialogue = overworldParams["trevorAptFirstDialogue"]
    firstTimeCarGet = overworldParams["firstTimeCarGet"]
    larryFirstTalk = overworldParams["larryFirstTalk"]
    drewFirstTalk = overworldParams["drewFirstTalk"]
    jeanClaudeFirstTalk = overworldParams["jeanClaudeFirstTalk"]
    fratboy1FirstTalk = overworldParams["fratboy1FirstTalk"]
    fratboy2FirstTalk = overworldParams["fratboy2FirstTalk"]
    fratboy3FirstTalk = overworldParams["fratboy3FirstTalk"]
    fratboy4FirstTalk = overworldParams["fratboy4FirstTalk"]
    fratboy5FirstTalk = overworldParams["fratboy5FirstTalk"]
    jamesFirstTalk = overworldParams["jamesFirstTalk"]
    joeFirstTalk = overworldParams["joeFirstTalk"]
    bennettFirstTalk = overworldParams["bennettFirstTalk"]
    jonFirstTalk = overworldParams["jonFirstTalk"]
    yogagirlFirstTalk = overworldParams["yogagirlFirstTalk"]
    stripperFirstTalk = overworldParams["stripperFirstTalk"]
    adelineFirstTalk = overworldParams["adelineFirstTalk"]
    volleyballScore = overworldParams["volleyballScore"]
    firstPoolParty = overworldParams["firstPoolParty"]
    ogFirstTalk = overworldParams["ogFirstTalk"]
    gunTalk = overworldParams["gunTalk"]
    joeGet = overworldParams["joeGet"]
    jamesGet = overworldParams["jamesGet"]
    jimmyJoinParam = overworldParams["jimmyJoinParam"]
    neverBeenPro = overworldParams["neverBeenPro"]
    evanFirstDialogue = overworldParams["evanFirstDialogue"]
    anthonyFirstDialogue = overworldParams["anthonyFirstDialogue"]
    girl1FirstDialogue = overworldParams["girl1FirstDialogue"]
    girl2FirstDialogue = overworldParams["girl2FirstDialogue"]
    girl3FirstDialogue = overworldParams["girl3FirstDialogue"]
    girl4FirstDialogue = overworldParams["girl4FirstDialogue"]
    crackheadFirstTalk = overworldParams["crackheadFirstTalk"]
    moneyToCrackhead = overworldParams["moneyToCrackhead"]
    crackheadJoin = overworldParams["crackheadJoin"]
    crackheadFirstJoin = overworldParams["crackheadFirstJoin"]
    highnessDialogue = overworldParams["highnessDialogue"]
    larryStoreOpen = overworldParams["larryStoreOpen"]
    drewStoreOpen = overworldParams["drewStoreOpen"]
    alFirstTalk = overworldParams["alFirstTalk"]
    darkworldDialogue = overworldParams["darkworldDialogue"]
    gotYogaBlocks = overworldParams["gotYogaBlocks"]
    numberOfPlayers = overworldParams["numberOfPlayers"]
    firstStrike = overworldParams["firstStrike"]
    pageForDialogue = overworldParams["pageForDialogue"]
    overworldClock = overworldParams["overworldClock"]
    numberOfFights = overworldParams["numberOfFights"]
    bennettGet = overworldParams["bennettGet"]
    alGet = overworldParams["alGet"]
    speed = overworldParams["speed"]
    brothersSeal = overworldParams["brothersSeal"]
    brothersSealForSkateboarding = overworldParams["brothersSealForSkateboarding"]
    time = overworldParams["time"]
    athletics = overworldParams["athletics"]
    items = overworldParams["items"]
    charStyle = overworldParams["charStyle"]
    //phoneGet = overworldParams["phoneGet"]
    walletGet = overworldParams["walletGet"]
    liquorGet = overworldParams["liquorGet"]
    flowersGet = overworldParams["flowersGet"]
    keysGet = overworldParams["keysGet"]
    //parsing JSON for equipped, joinParams, inventory
    equipped = JSON.parse(localStorage.getItem('equipped'))
    joinParams = JSON.parse(localStorage.getItem('joinParams'))
    inventory = JSON.parse(localStorage.getItem('inventory'))
  } else {
    //building inventory from the file inventory_items.json
    $(function() {
      //var people = [];
      $.getJSON('data/json-files/inventory_items.json', function(data) {
        //for each input (i,f), i is a csv column like "name", "sp" etc, and f is an object with keys 0,1,2,3 values column entries
        $.each(data, function(i, f) {
          name = f['name']
          inventory[name] = f
        });
      });
    });
  }
  //see if party file exists
  if (localStorage.getItem('party') !== null && continueGame) {
    console.log(`Save State Found For Party`);
    party = JSON.parse(localStorage.getItem('party'))
  } else {
    //building character-stats from the file character-stats.json
    $(function() {
      //var people = [];
      $.getJSON('data/json-files/character-stats.json', function(data) {
        //for each input (i,f), i is a csv column like "name", "sp" etc, and f is an object with keys 0,1,2,3 values column entries
        $.each(data, function(i, f) {
          name = f['name']
          party[name] = f
        });
      });
    });
  }
  //see if equipment file exists
  if (localStorage.getItem('equipment') !== null && continueGame) {
    console.log(`Save State Found For Equipment`);
    equipment = JSON.parse(localStorage.getItem('equipment'))
  } else {
    //building character-stats from the file equipment.json
    $(function() {
      //var people = [];
      $.getJSON('data/json-files/equipment.json', function(data) {
        //for each input (i,f), i is a csv column like "name", "sp" etc, and f is an object with keys 0,1,2,3 values column entries
        $.each(data, function(i, f) {
          name = f['name']
          equipment[name] = f
        });
      });
    });
  }

  //if no local storage is found, we will need to use the json files which need manual parsing for correct format
  if (localStorage.getItem('equipment') !== null && continueGame) {
    console.log(`manual parse not needed`);
  } else {
    window.setTimeout(() => {
      //console.log(inventory)
      for (let i = 0; i < Object.keys(inventory).length; i++) {
        key1 = Object.keys(inventory)[i]
        for (let j = 0; j < Object.keys(inventory[key1]).length; j++) {
          key2 = Object.keys(inventory[key1])[j]
          if (parseInt(inventory[key1][key2])) {
            inventory[key1][key2] = parseInt(inventory[key1][key2])
          } else if (parseFloat(inventory[key1][key2])) {
            inventory[key1][key2] = parseFloat(inventory[key1][key2])
          } else if (inventory[key1][key2] === '0') {
            inventory[key1][key2] = 0;
          }
        }
      }
      let numberOfItems = 0;
      for (let i = 0; i < Object.keys(inventory).length; i++) {
        key = Object.keys(inventory)[i]
        numberOfItems += inventory[key]['numberOwned']
        //console.log(key, inventory[key]["hp"], inventory[key]["sp"], inventory[key]["randomEncounterRewards"])
      }
    }, 200)

    window.setTimeout(() => {
      for (let i = 0; i < Object.keys(party).length; i++) {
        key1 = Object.keys(party)[i]
        for (let j = 0; j < Object.keys(party[key1]).length; j++) {
          key2 = Object.keys(party[key1])[j]
          if (parseInt(party[key1][key2])) {
            party[key1][key2] = parseInt(party[key1][key2])
          } else if (parseFloat(party[key1][key2])) {
            party[key1][key2] = parseFloat(party[key1][key2])
          } else if (party[key1][key2] === '0') {
            party[key1][key2] = 0;
          } else if (String(party[key1][key2]).toLowerCase() == "true") {
            party[key1][key2] = true
          } else if (String(party[key1][key2]).toLowerCase() == "false") {
            party[key1][key2] = false
          }
          // to handle column entries which are dictionaries or lists
          else if (String(party[key1][key2]).includes("{") || String(party[key1][key2]).includes("[")) {
            let json = party[key1][key2];
            //console.log(json)
            let obj = JSON.parse(json);
            party[key1][key2] = obj
          }
        }
      }
      //console.log(party['Mac']['special'][0])
    }, 200)


    window.setTimeout(() => {
      for (let i = 0; i < Object.keys(equipment).length; i++) {
        key1 = Object.keys(equipment)[i]
        for (let j = 0; j < Object.keys(equipment[key1]).length; j++) {
          key2 = Object.keys(equipment[key1])[j]
          if (parseInt(equipment[key1][key2])) {
            equipment[key1][key2] = parseInt(equipment[key1][key2])
          } else if (parseFloat(equipment[key1][key2])) {
            equipment[key1][key2] = parseFloat(equipment[key1][key2])
          } else if (equipment[key1][key2] === '0') {
            equipment[key1][key2] = 0;
          } else if (String(equipment[key1][key2]).toLowerCase() == "true") {
            equipment[key1][key2] = true
          } else if (String(equipment[key1][key2]).toLowerCase() == "false") {
            equipment[key1][key2] = false
          }
        }
      }
    }, 250)
  }
}
