//game start paramters
let gameOver = false;
let newGame = true;

//keyboard parameters
let keyboardGet = false;
let keyboardDialogue;

//dialogue parameters
let censored = true;
let censoredPageExists={};
let activeQuests = {
  'Find Your Stuff': 'You got all drunk last night and lost your keys, phone, and wallet. Seems like you probably left them somewhere at 731 Burcham Apartments.',
  'Robo-Trip': 'Today would be a real good day to get some tussin. I feel like I had some last night on the high school roof but never drank it. Maybe its still up there...',
}
let completedQuests = {
  'Wake Up': 'Well you did do one thing so far. Good job.',
}
let currentQuest = 'Find Your Stuff'

// it goes ['name', 'tiled object name for location']
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
let blondeTalk=false;
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
let joeGet='initial'
let jamesGet='initial'
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
let gasStation = 0;
let alFirstTalk = 0;
let darkworldDialogue = 0;
let jonChaseX = 20;
let gotYogaBlocks=false;

//boss battle parameters
let settingDepth = false;
let bossType;
let bossBattle = false;
let bossBattleParameter = 0;

//overworld parameters
let jamesToggleFollow = false;
let openKeyboard = false;
let customMusicStart = false;
let firstStrike = false;
let openingDialogue = false;
let pageForDialogue = 1;
let pointerScale = 1;
let overworldClock = 0;
let mohawkBounceTimer = 0;
let mohawkStartingYValue = 0;
let throwingMohawkTarget = []
let throwingMohawk = false
let fallingMohawk = false
let throwingAngle = 0
let firstStrikeDisplay = false
let showKickTheBallScore = false;
let chaserClock = 0;
let kickTheBallScoreDisplayed = false
let kicking = false;
let diving = false;
let runaway=false;
let pointerDirection = [0,0]
let pointerLocation = [0,0]
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
let equipment = []
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
let gas = 6;
let money = 0;
let phoneGet = 0;
let walletGet = 0;
let liquorGet = 0;
let flowersGet = 0;
let keysGet = 0;

//inventory parameters
let hamms = 2;
let monster = 0;
let maxice = 0;
let andycapps = 0;
let gatorade = 0;
let liquorItem = 0;
let larrySpecial = 0;

let randomEncounterRewards = {
  "Andy Capp's Hot Fries": .5,
  'Labatt Max Ice': .2,
  'Gatorade': .4,
  'Monster': .4,
  'Hamms': .4,
  'Larry Special': .2,
  'Wife Beater': .2,
  'SP Booster': .2,
  'HP Booster': .2,
  'Damage Booster': .2,
  'Fubu Shirt': .2,
  'Camo Pants': .2,
}
let items = [];
let itemEffects = {
  "Andy Capp's Hot Fries": "SP Max, HP +10",
  'Labatt Max Ice': "HP +60, SP +15",
  "Gatorade": "HP +60, \n stamina max",
  "Monster": "SP +10, cure \n status ailments",
  "Hamms": "HP +20 SP +5",
  "Larry Special": "HP max, SP max",
  "Liquor": "SP Max",
  "Gas": "makes your \n car work"
}
let all_usable_items = {
  "Andy Capp's Hot Fries": andycapps,
  'Labatt Max Ice': maxice,
  "Gatorade": gatorade,
  "Monster": monster,
  "Hamms": hamms,
  "Larry Special": larrySpecial,
  "Liquor": liquorItem
}
let all_usable_items_icons = {
  "Andy Capp's Hot Fries": "andycappsIcon",
  'Labatt Max Ice': "maxiceIcon",
  "Gatorade": "gatoradeIcon",
  "Monster": "monsterIcon",
  "Hamms": "hammsIcon",
  "Larry Special": "larrySpecialIcon",
  "Liquor": "liquorIcon"
}
let usable_items = {
  "Monster": monster,
  "Gatorade": gatorade,
  "Hamms": hamms
}
let numberOfItems = 0;
for (let i = 0; i < Object.keys(usable_items).length; i++) {
  numberOfItems += usable_items[Object.keys(usable_items)[i]]
}

//to use items
function useItem(object, player) {
  if (object === "Monster") {
    if (usable_items["Monster"] >= 1) {
      monster -= 1
      usable_items["Monster"] -= 1
      spObject[player] += 10
      if (spObject[player] >= maxSPObject[player]) {
        spObject[player] = maxSPObject[player]
      }
      bleedingObject[player]=0;
      blindObject[player]=0;
    }
  } else if (object === "Gatorade") {
    if (usable_items["Gatorade"] >= 1) {
      gatorade -= 1
      usable_items["Gatorade"] -= 1
      hpObject[player] += 60
      stamina = 100
      if (hpObject[player] >= maxHPObject[player]) {
        hpObject[player] = maxHPObject[player]
      }
    }
  } else if (object === "Hamms") {
    if (usable_items["Hamms"] >= 1) {
      hamms -= 1
      usable_items["Hamms"] -= 1
      hpObject[player] += 20
      if (hpObject[player] >= maxHPObject[player]) {
        hpObject[player] = maxHPObject[player]
      }
      spObject[player] += 5
      if (spObject[player] >= maxSPObject[player]) {
        spObject[player] = maxSPObject[player]
      }
    }
  } else if (object === "Liquor") {
    if (usable_items["Liquor"] >= 1) {
      liquorItem -= 1
      usable_items["Liquor"] -= 1
      spObject[player] = maxSPObject[player]
    }
  } else if (object === "Andy Capp's Hot Fries") {
    if (usable_items["Andy Capp's Hot Fries"] >= 1) {
      andycapps -= 1
      usable_items["Andy Capp's Hot Fries"] -= 1
      spObject[player] = maxSPObject[player]
      hpObject[player] += 10
      if (hpObject[player] >= maxHPObject[player]) {
        hpObject[player] = maxHPObject[player]
      }
    }
  } else if (object === "Labatt Max Ice") {
    if (usable_items["Labatt Max Ice"] >= 1) {
      maxice -= 1
      usable_items["Labatt Max Ice"] -= 1
      hpObject[player] += 50
      if (hpObject[player] >= maxHPObject[player]) {
        hpObject[player] = maxHPObject[player]
      }
      spObject[player] += 15
      if (spObject[player] >= maxSPObject[player]) {
        spObject[player] = maxSPObject[player]
      }
    }
  } else if (object === "Larry Special") {
    if (usable_items["Larry Special"] >= 1) {
      //console.log(`I have one larry special`)
      larrySpecial -= 1
      usable_items["Larry Special"] -= 1
      hpObject[player] = maxHPObject[player]
      spObject[player] = maxSPObject[player]
    }
  }
}

function getBeer() { //bennett gives you beer
  hamms += 1
  usable_items["Hamms"] += 1
  gameState.itemget.play()
}

function getMonsters() { //james gives you monster
  monster += 2
  usable_items["Monster"] += 2
  gameState.itemget.play()
}

function get10Monsters() { //james gives you monster
  monster += 10
  usable_items["Monster"] += 10
  gameState.itemget.play()
}

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


// it goes [name, right anim, scale, circle size, offsetX, offsetY]
//fix needed so chasers do not interact poorly with "above" layer of map
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
  'me': .77,
  'trevor': .67,
  'al': .5 * 1.4,
  'james': .4 * 1.4,
  'jon': .55 * 1.4,
  'joe': .55 * 1.4,
  'bennett': .4 * 1.4,
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
  'me': .55 * 1.4,
  'al': .175,
  'james': .12,
  'jon': .175,
  'joe': .2,
  'bennett': .14,
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
  'trevor': .13,
  'smoke': .41,
  'hausdorf': .4,
  'stripper': .3,
  'jeanClaude': .25
}

const sizeAndOffset = {
  'al': {
    size: [64, 128],
    offset: [60, 64]
  },
  'bennett': {
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
  'trevor': {
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
}

//character stats
let specialObject = {
  'Mac': ["Muay Thai Combo (3)"],
  'Al': ["Blast Errbody (5)"],
  'Jimmy': ["Double Smack (4)"],
  'Bennett': ["Dirty Combo (7)"]
}

let bleedProofObject = {
  'Mac': false,
  'Al': false,
  'Jimmy': false,
  'Bennett': false,
}

let neverMissObject = {
  'Mac': false,
  'Al': false,
  'Jimmy': false,
  'Bennett': false,
}

let blindProofObject = {
  'Mac': false,
  'Al': false,
  'Jimmy': false,
  'Bennett': false,
}

let defendOn = {
  'Mac': false,
  'Al': false,
  'Jimmy': false,
  'Bennett': false,
}

// the number is the number of turns left being blind
let blindObject = {
  'Mac': 0,
  'Al': 0,
  'Jimmy': 0,
  'Bennett': 0,
}

let bleedingObject = {
  'Mac': 0,
  'Al': 0,
  'Jimmy': 0,
  'Bennett': 0,
}

let maxSPObject = {
  'Mac': 8,
  'Al': 11,
  'Jimmy': 9,
  'Bennett': 12,
}

let spObject = {
  'Mac': 8,
  'Al': 11,
  'Jimmy': 9,
  'Bennett': 12,
}

let critObject = {
  'Mac': 10,
  'Al': 12,
  'Jimmy': 10,
  'Bennett': 13,
}

let defenseObject = {
  'Mac': 3,
  'Al': 4,
  'Jimmy': 5,
  'Bennett': 0,
}

let hpObject = {
  'Mac': 75,
  'Al': 80,
  'Jimmy': 60,
  'Bennett': 65,
};

let maxHPObject = {
  'Mac': 75,
  'Al': 100,
  'Jimmy': 60,
  'Bennett': 65,
};

let expObject = {
  'Mac': 0,
  'Al': 0,
  'Jimmy': 0,
  'Bennett': 0,
};

let levelObject = {
  'Mac': 1,
  'Al': 1,
  'Jimmy': 1,
  'Bennett': 1,
};

let damageObject = {
  'Mac': 35,
  'Al': 40,
  'Jimmy': 25,
  'Bennett': 45,
};

let potentialParty = {
  "Al": false,
  "Jimmy": false,
  "Bennett": false
};
let currentParty = {
  "Al": false,
  "Jimmy": false,
  "Bennett": false
};

let skillDialogue = {
  "Mac": {
    3: false,
    5: false,
    7: false
  },
  "Al": {
    3: false,
    5: false,
    7: false
  },
  "Jimmy": {
    3: false,
    5: false,
    7: false
  },
  "Bennett": {
    3: false,
    5: false,
    7: false
  }
}

let players = ["Mac", "Al", "Jimmy"];
let playerColors = {
  "Mac": 0x0e7d4e,
  "Al": 0xbe2016,
  "Jimmy": 0x0d2175
}

let equipmentTypes = {
  "Camo T-Shirt": "Mac_upper",
  "Jeans": "Mac_lower",
  "Blue Shirt": "Jimmy_upper",
  "Snowpants": "Jimmy_lower",
  "Red Shirt": "Al_upper",
  "Red Sweatpants": "Al_lower",
  "Running Shirt": "Bennett_upper",
  "Running Shorts": "Bennett_lower",
  "SP Booster": "accessory",
  "HP Booster": "accessory",
  "Damage Booster": "accessory",
  "Camo Hoody": "Mac_upper",
  "Camo Pants": "Mac_lower",
  "Fubu Shirt": "Al_upper",
  "Jorts": "Jimmy_lower",
  "Wife Beater": "Mac_upper",
  "Brass Knuckles": "accessory",
  "Sprinting Shoes": "accessory",
  "Camo Duck Tape": "accessory",
  "Gold Duck Tape": "accessory",
  "Dio Band": "accessory"
}

let equipmentList = {
  "Camo T-Shirt": camoTshirt,
  "Jeans": jeans,
  "Blue Shirt": blueShirt,
  "Snowpants": snowpants,
  "Red Shirt": redShirt,
  "Red Sweatpants": redSweatpants,
  "Running Shirt": runningShirt,
  "Running Shorts": runningShorts,
  "SP Booster": spBooster,
  "HP Booster": hpBooster,
  "Damage Booster": damageBooster,
  "Camo Hoody": camoHoody,
  "Camo Pants": camoPants,
  "Fubu Shirt": fubuShirt,
  "Jorts": jorts,
  "Wife Beater": wifeBeater,
  "Brass Knuckles": brassKnuckles,
  "Gold Duck Tape": goldDuckTape,
  "Camo Duck Tape": camoDuckTape,
  "Dio Band": dioBand,
  "Sprinting Shoes": sprintingShoes,
}

function sprintingShoes(player, bool) {
  if (bool === true) {
    firstStrike = true;
    athletics += .35005
  } else {
    firstStrike = false;
    athletics -= .35005
  }
}

function brassKnuckles(player, bool) {
  if (bool === true) {
    damageObject[player] += 15
  } else {
    damageObject[player] -= 15
  }
}

function goldDuckTape(player, bool) {
  if (bool === true) {
    bleedProofObject[player]=true
  } else {
    bleedProofObject[player]=false
  }
}

function dioBand(player, bool) {
  if (bool === true) {
    damageObject[player] += 25
    bleedProofObject[player]=true
    blindProofObject[player]=true
    damageObject[player] += 30
  } else {
    damageObject[player] -= 25
    bleedProofObject[player]=false
    blindProofObject[player]=false
    damageObject[player] -= 30
  }
}

function camoDuckTape(player, bool) {
  if (bool === true) {
    blindProofObject[player]=true
  } else {
    blindProofObject[player]=false
  }
}

function camoTshirt(player, bool) {
  if (bool === true) {
    defenseObject[player] += 2
  } else {
    defenseObject[player] -= 2
  }
}

function jeans(player, bool) {
  if (bool === true) {
    defenseObject[player] += 1
  } else {
    defenseObject[player] -= 1
  }
}

function blueShirt(player, bool) {
  if (bool === true) {
    defenseObject[player] += 3
  } else {
    defenseObject[player] -= 3
  }
}

function snowpants(player, bool) {
  if (bool === true) {
    defenseObject[player] += 1
  } else {
    defenseObject[player] -= 1
  }
}

function redShirt(player, bool) {
  if (bool === true) {
    defenseObject[player] += 3
  } else {
    defenseObject[player] -= 3
  }
}

function runningShirt(player, bool) {
  if (bool === true) {
    defenseObject[player] += 5
  } else {
    defenseObject[player] -= 5
  }
}

function runningShorts(player, bool) {
  if (bool === true) {
    defenseObject[player] += 3
  } else {
    defenseObject[player] -= 3
  }
}

function redSweatpants(player, bool) {
  if (bool === true) {
    defenseObject[player] += 2
  } else {
    defenseObject[player] -= 2
  }
}

function spBooster(player, bool) {
  if (bool === true) {
    maxSPObject[player] += 4
  } else {
    maxSPObject[player] -= 4
  }
}

function hpBooster(player, bool) {
  if (bool === true) {
    maxHPObject[player] += 20
  } else {
    maxHPObject[player] -= 20
  }
}

function damageBooster(player, bool) {
  if (bool === true) {
    neverMissObject[player]=true
    damageObject[player] += 4
  } else {
    neverMissObject[player]=false
    damageObject[player] -= 4
  }
}

function camoHoody(player, bool) {
  if (bool === true) {
    defenseObject[player] += 20
  } else {
    defenseObject[player] -= 20
  }
}

function camoPants(player, bool) {
  if (bool === true) {
    defenseObject[player] += 10
  } else {
    defenseObject[player] -= 10
  }
}

function fubuShirt(player, bool) {
  if (bool === true) {
    defenseObject[player] += 12
  } else {
    defenseObject[player] -= 12
  }
}

function jorts(player, bool) {
  if (bool === true) {
    defenseObject[player] += 15
  } else {
    defenseObject[player] -= 15
  }
}

function wifeBeater(player, bool) {
  if (bool === true) {
    defenseObject[player] += 1
    damageObject[player] += 5
  } else {
    defenseObject[player] -= 1
    damageObject[player] -= 5
  }
}

let equipmentDescriptions = {
  "Running Shirt": {
    type: "Bennett Body",
    def: 5,
    effect: "None",
    color: '#fa7800'
  },
  "Running Shorts": {
    type: "Bennett Legs",
    def: 3,
    effect: "None",
    color: '#fa7800'
  },
  "Camo T-Shirt": {
    type: "Mac Body",
    def: 2,
    effect: "None",
    color: '#068c1b'
  },
  "Jeans": {
    type: "Mac Legs",
    def: 1,
    effect: "None",
    color: '#068c1b'
  },
  "Blue Shirt": {
    type: "Jimmy Body",
    def: 3,
    effect: "None",
    color: '#0f15a1'
  },
  "Snowpants": {
    type: "Jimmy Legs",
    def: 1,
    effect: "None",
    color: '#0f15a1'
  },
  "Red Shirt": {
    type: "Al Body",
    def: 3,
    effect: "None",
    color: '#cb0000'
  },
  "Red Sweatpants": {
    type: "Al Legs",
    def: 2,
    effect: "None",
    color: '#cb0000'
  },
  "SP Booster": {
    type: "Accessory",
    def: 0,
    effect: "Max SP +4",
    color: '#fff'
  },
  "HP Booster": {
    type: "Accessory",
    def: 0,
    effect: "Max HP +20",
    color: '#fff'
  },
  "Damage Booster": {
    type: "Accessory",
    def: 0,
    effect: "Damage +4, NEVER MISS",
    color: '#fff'
  },
  "Camo Hoody": {
    type: "Mac Body",
    def: 20,
    effect: "None",
    color: '#068c1b'
  },
  "Camo Pants": {
    type: "Mac Legs",
    def: 10,
    effect: "None",
    color: '#068c1b'
  },
  "Fubu Shirt": {
    type: "Al Body",
    def: 12,
    effect: "None",
    color: '#cb0000'
  },
  "Jorts": {
    type: "Jimmy Legs",
    def: 15,
    effect: "None",
    color: '#0f15a1'
  },
  "Wife Beater": {
    type: "Mac Body",
    def: 1,
    effect: "Damage +5",
    color: '#068c1b'
  },
  "Brass Knuckles": {
    type: "Accessory",
    def: 0,
    effect: "Damage +15",
    color: '#fff'
  },
  "Gold Duck Tape": {
    type: "Accessory",
    def: 0,
    effect: "Prevents Bleeding",
    color: '#fff'
  },
  "Dio Band": {
    type: "Accessory",
    def: 30,
    effect: "An Unholy Relic. \nPrevents Bleeding, \nPrevents Blindness \nDamage + 25",
    color: '#fff'
  },
  "Camo Duck Tape": {
    type: "Accessory",
    def: 0,
    effect: "Prevents Blindness",
    color: '#fff'
  },
  "Sprinting Shoes": {
    type: "Accessory",
    def: 0,
    effect: "Athletics +.35 \nFirst Strike",
    color: '#fff'
  },
}

let equipped = {
  "Mac": {
    upper: "Camo T-Shirt",
    lower: "Jeans",
    accessory: "",
  },
  "Jimmy": {
    upper: "Blue Shirt",
    lower: "Snowpants",
    accessory: "",
  },
  "Al": {
    upper: "Red Shirt",
    lower: "Red Sweatpants",
    accessory: "",
  },
  "Bennett": {
    upper: "Running Shirt",
    lower: "Running Shorts",
    accessory: "",
  }
}

function saveGame() {
  saveFileExists = true;
  var file = {
    activeQuests:activeQuests,
    completedQuests:completedQuests,
    currentQuest:currentQuest,
    beatStag:beatStag,
    skateboardGet:skateboardGet,
    stripperBanged:stripperBanged,
    fratboy2primedialogue:fratboy2primedialogue,
    newDarkDialogue:newDarkDialogue,
    darkboydialogue:darkboydialogue,
    diodialogue:diodialogue,
    trevorAptFirstDialogue:trevorAptFirstDialogue,
    firstTimeCarGet:firstTimeCarGet,
    jeanClaudeFirstTalk:jeanClaudeFirstTalk,
    jamesFirstTalk:jamesFirstTalk,
    jonFirstTalk:jonFirstTalk,
    yogagirlFirstTalk:yogagirlFirstTalk,
    stripperFirstTalk:stripperFirstTalk,
    adelineFirstTalk:adelineFirstTalk,
    volleyballScore:volleyballScore,
    firstPoolParty:firstPoolParty,
    ogFirstTalk:ogFirstTalk,
    gunTalk:gunTalk,
    joeGet:joeGet,
    jamesGet:jamesGet,
    jimmyJoinParam:jimmyJoinParam,
    neverBeenPro:neverBeenPro,
    checkLevelDialogue:checkLevelDialogue,
    evanFirstDialogue:evanFirstDialogue,
    anthonyFirstDialogue:anthonyFirstDialogue,
    girl1FirstDialogue:girl1FirstDialogue,
    girl2FirstDialogue:girl2FirstDialogue,
    girl3FirstDialogue:girl3FirstDialogue,
    girl4FirstDialogue:girl4FirstDialogue,
    crackheadFirstTalk:crackheadFirstTalk,
    moneyToCrackhead:moneyToCrackhead,
    crackheadJoin:crackheadJoin,
    crackheadFirstJoin:crackheadFirstJoin,
    highnessDialogue:highnessDialogue,
    alFirstTalk:alFirstTalk,
    darkworldDialogue:darkworldDialogue,
    jonChaseX:jonChaseX,
    gotYogaBlocks:gotYogaBlocks,
    firstStrike:firstStrike,
    pointerScale:pointerScale,
    numberOfFights:numberOfFights,
    bennettGet:bennettGet,
    alGet:alGet,
    keepawayHighScore:keepawayHighScore,
    playerTexture:playerTexture,
    brothersSeal:brothersSeal,
    brothersSealForSkateboarding:brothersSealForSkateboarding,
    athletics:athletics,
    scene_number:scene_number,
    equipment:equipment,
    worldTheme:worldTheme,
    gas:gas,
    phoneGet:phoneGet,
    walletGet:walletGet,
    liquorGet:liquorGet,
    flowersGet:flowersGet,
    keysGet:keysGet,
    doitS:doitS,
    money:money,
    hamms:hamms,
    monster:monster,
    maxice:maxice,
    andycapps:andycapps,
    gatorade:gatorade,
    liquorItem:liquorItem,
    larrySpecial:larrySpecial,
    numberOfPlayers:numberOfPlayers,
    specialObject:specialObject,
    bleedProofObject:bleedProofObject,
    neverMissObject:neverMissObject,
    blindProofObject:blindProofObject,
    blindObject:blindObject,
    bleedingObject:bleedingObject,
    maxSPObject:maxSPObject,
    spObject:spObject,
    critObject:critObject,
    defenseObject:defenseObject,
    hpObject:hpObject,
    maxHPObject:maxHPObject,
    expObject:expObject,
    levelObject:levelObject,
    damageObject:damageObject,
    potentialParty:potentialParty,
    currentParty:currentParty,
    skillDialogue:skillDialogue,
    items:items,
    all_usable_items:all_usable_items,
    usable_items:usable_items,
    numberOfItems:numberOfItems,
    players:players,
    equipped:equipped,
  };
  localStorage.setItem('saveFile', JSON.stringify(file));
}

function loadGame2() {
  if (saveFileExists) {
    var file = JSON.parse(localStorage.getItem('saveFile'));
    activeQuests = file.activeQuests
    completedQuests = file.completedQuests
    currentQuest = file.currentQuest
    beatStag = file.beatStag
    skateboardGet = file.skateboardGet
    stripperBanged = file.stripperBanged
    fratboy2primedialogue = file.fratboy2primedialogue
    newDarkDialogue = file.newDarkDialogue
    darkboydialogue = file.darkboydialogue
    diodialogue = file.diodialogue
    trevorAptFirstDialogue = file.trevorAptFirstDialogue
    firstTimeCarGet = file.firstTimeCarGet
    jeanClaudeFirstTalk = file.jeanClaudeFirstTalk
    jamesFirstTalk = file.jamesFirstTalk
    jonFirstTalk = file.jonFirstTalk
    yogagirlFirstTalk = file.yogagirlFirstTalk
    stripperFirstTalk = file.stripperFirstTalk
    adelineFirstTalk = file.adelineFirstTalk
    volleyballScore = file.volleyballScore
    firstPoolParty = file.firstPoolParty
    ogFirstTalk = file.ogFirstTalk
    gunTalk = file.gunTalk
    joeGet = file.joeGet
    jamesGet = file.jamesGet
    jimmyJoinParam = file.jimmyJoinParam
    neverBeenPro = file.neverBeenPro
    checkLevelDialogue = file.checkLevelDialogue
    evanFirstDialogue = file.evanFirstDialogue
    anthonyFirstDialogue = file.anthonyFirstDialogue
    girl1FirstDialogue = file.girl1FirstDialogue
    girl2FirstDialogue = file.girl2FirstDialogue
    girl3FirstDialogue = file.girl3FirstDialogue
    girl4FirstDialogue = file.girl4FirstDialogue
    crackheadFirstTalk = file.crackheadFirstTalk
    moneyToCrackhead = file.moneyToCrackhead
    crackheadJoin = file.crackheadJoin
    crackheadFirstJoin = file.crackheadFirstJoin
    highnessDialogue = file.highnessDialogue
    alFirstTalk = file.alFirstTalk
    darkworldDialogue = file.darkworldDialogue
    jonChaseX = file.jonChaseX
    gotYogaBlocks = file.gotYogaBlocks
    firstStrike = file.firstStrike
    pointerScale = file.pointerScale
    numberOfFights = file.numberOfFights
    bennettGet = file.bennettGet
    alGet = file.alGet
    keepawayHighScore = file.keepawayHighScore
    playerTexture = file.playerTexture
    brothersSeal = file.brothersSeal
    brothersSealForSkateboarding = file.brothersSealForSkateboarding
    athletics = file.athletics
    scene_number = file.scene_number
    equipment = file.equipment
    worldTheme = file.worldTheme
    gas = file.gas
    phoneGet = file.phoneGet
    walletGet = file.walletGet
    liquorGet = file.liquorGet
    flowersGet = file.flowersGet
    keysGet = file.keysGet
    doitS = file.doitS
    money = file.money
    hamms = file.hamms
    monster = file.monster
    maxice = file.maxice
    andycapps = file.andycapps
    gatorade = file.gatorade
    liquorItem = file.liquorItem
    larrySpecial = file.larrySpecial
    numberOfPlayers = file.numberOfPlayers
    specialObject = file.specialObject
    bleedProofObject = file.bleedProofObject
    neverMissObject = file.neverMissObject
    blindProofObject = file.blindProofObject
    blindObject = file.blindObject
    bleedingObject = file.bleedingObject
    maxSPObject = file.maxSPObject
    spObject = file.spObject
    critObject = file.critObject
    defenseObject = file.defenseObject
    hpObject = file.hpObject
    maxHPObject = file.maxHPObject
    expObject = file.expObject
    levelObject = file.levelObject
    damageObject = file.damageObject
    potentialParty = file.potentialParty
    currentParty = file.currentParty
    skillDialogue = file.skillDialogue
    items = file.items
    all_usable_items = file.all_usable_items
    usable_items = file.usable_items
    numberOfItems = file.numberOfItems
    players = file.players
    equipped = file.equipped
  }
}

function openControls(){
  scene_number=99
}

function jimmyEnhanced(){
  damageObject["Jimmy"] += 5;
  hpObject["Jimmy"] += 20;
  maxHPObject["Jimmy"] += 20;
  gameState.itemget.play()
}

function playbackCustomSong(){
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

function openKeyboardNow(){
  openKeyboard = true;
}
//use this to complete a quest
function completeQuest(title) {
  completedQuests[title]=activeQuests[title]
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
  hpObject["Mac"] = maxHPObject["Mac"];
  hpObject["Jimmy"] = maxHPObject["Jimmy"];
  hpObject["Al"] = maxHPObject["Al"];
  hpObject["Bennett"] = maxHPObject["Bennett"];
  spObject["Mac"] = maxSPObject["Mac"];
  spObject["Jimmy"] = maxSPObject["Jimmy"];
  spObject["Al"] = maxSPObject["Al"];
  spObject["Bennett"] = maxSPObject["Bennett"];
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

function openQuestLog(){
  scene_number=10
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
  if (distance(obj1,obj2)===0){
    return [(obj2.x - obj1.x) / .01, (obj2.y - obj1.y) / .01]
  } else {
    return [(obj2.x - obj1.x) / distance(obj1,obj2), (obj2.y - obj1.y) / distance(obj1,obj2)]
  }
}

function followPath (unit, path, speed=50){
  if (distance(unit,path[unit.position])<20 && !unit.changeDirection){
    //console.log(unit.type)
    if (unit.type==="Jean Claude"){
    }
    unit.position+=1
    unit.changeDirection=true
  } else if (distance(unit,path[unit.position])>25 && unit.changeDirection){
    unit.changeDirection=false
  }
  if (unit.position === path.length){
    unit.position=0
  }
  unit.body.setVelocityX(directionVector(unit,path[unit.position])[0]*speed)
  unit.body.setVelocityY(directionVector(unit,path[unit.position])[1]*speed)
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

function shaken() {
  shakeTheWorld = true
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
  playerTexture='board'
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
  hpObject["Mac"] = 1;
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
  maxSPObject['Mac'] += 1;
  gameState.itemget.play()
  skillCheck("Mac")
}

function getOneSPAl() { //level up increase SP
  maxSPObject['Al'] += 1;
  gameState.itemget.play()
}

function getOneSPJimmy() { //level up increase SP
  maxSPObject['Jimmy'] += 1;
  gameState.itemget.play()
}

function getOneSPBennett() { //level up increase SP
  maxSPObject['Bennett'] += 1;
  gameState.itemget.play()
}

function getThreeHPMac() { //level up increase HP
  maxHPObject['Mac'] += 3;
  gameState.itemget.play()
  skillCheck("Mac")
}

function getThreeHPAl() { //level up increase HP
  maxHPObject['Al'] += 3;
  gameState.itemget.play()
}

function getThreeHPJimmy() { //level up increase HP
  maxHPObject['Jimmy'] += 3;
  gameState.itemget.play()
}

function getThreeHPBennett() { //level up increase HP
  maxHPObject['Bennett'] += 3;
  gameState.itemget.play()
}

function getOneDamageMac() { //level up increase damage
  damageObject['Mac'] += 2;
  gameState.itemget.play()
  skillCheck("Mac")
}


function getOneDamageAl() { //level up increase damage
  damageObject['Al'] += 2;
  gameState.itemget.play()
}

function getOneDamageJimmy() { //level up increase damage
  damageObject['Jimmy'] += 2;
  gameState.itemget.play()
}

function getOneDamageBennett() { //level up increase damage
  damageObject['Bennett'] += 2;
  gameState.itemget.play()
}

function skillCheck(player) {
  if (player === "Mac" && levelObject["Mac"] === 3) {
    specialObject["Mac"].push("Fuck Everybody Up (8)")
    skillDialogue["Mac"][3] = true
  }
}

function getHigh() { //increases highness when you smoke weed
  highness = 3;
  time = 0;
  gameState.bongSound.play()
}

function playMegaman() { //computes distance between two things
  gameState.bongSound.play()
  window.setTimeout(()=>{
    startMegaman = true;
  },3000);

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
  if (!pause){
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
  equipment.push("Sprinting Shoes");
}

function alCheckhamms() { //al checks if you have hamms and weed, if so, he joins your party
  if (hamms >= 4 && items.includes("Weed (2g)")) {
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
  equipment.push("HP Booster");
  gameState.itemget.play();
}

function getDamageBoost() {
  equipment.push("Damage Booster");
  gameState.itemget.play();
}

function playItemGet() {
  gameState.itemget.play();
}

//building inventory from the file inventory_items.json
let jsonInventoryData={}
  $(function() {
    //var people = [];
    $.getJSON('data/json-files/inventory_items.json', function(data) {
      //for each input (i,f), i is a csv column like "name", "sp" etc, and f is an object with keys 0,1,2,3 values column entries
      $.each(data, function(i, f) {
        name=f['name']
        jsonInventoryData[name] = f
      });
    });
  });

window.setTimeout(()=>{
  console.log(jsonInventoryData)
},200)
