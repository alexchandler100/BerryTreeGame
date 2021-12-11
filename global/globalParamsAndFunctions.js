//keyboard parameters
let keyboardGet=false;
let keyboardDialogue;

//billiard parameters
let eightInPocket=false;
let nineInPocket=false;
let cueInPocket=false;
let _timerStart=false

//dialogue parameters
let carCrashDialogue=false;
let adventure = 0;
let gasAlert = 0;
let buyFailed = 0;
let pageDisplayed = 0; //supposed to fix issue with multiple pages displaying causing errors
let backgroundDisplayed = 0;
let fratboy2primedialogue = 0;
let newDarkDialogue = 0;
let darkboydialogue = 0;
let diodialogue = 0;
let screenText;
let highScoreText;
let damageText;
let moneyText;
let firstTimeCarGet = 0;
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
let volleyballScore=0;
let firstPoolParty = 0;
let ogFirstTalk = 0;
let gunTalk = 0
let jimmyJoinParam = false;
let neverBeenPro = true;
let ergh = 0;
let holdon = 0
let beatbox = 0;
let blocked = 0;
let newGame = true;
let moneyPlus = false;
let checkLevelDialogue = 0;
let girl1VolleyballDialogue = 0;
let girl2FirstDialogue = 0;
let girl3FirstDialogue = 0;
let girl4FirstDialogue = 0;
let crackheadFirstTalk = 0;
let moneyToCrackhead = 0;
let crackheadJoin=false;
let crackheadFirstJoin=true;
let highnessDialogue = 0;
let gasStation = 0;
let alFirstTalk = 0;
let darkworldDialogue = 0;
let jonChaseX = 20;
let skillDialogue={
  "Mac":{3:false, 5:false, 7: false},
  "Al":{3:false, 5:false, 7: false},
  "Jimmy":{3:false, 5:false, 7: false},
  "Bennett":{3:false, 5:false, 7: false}
}
//boss battle parameters
let bossType;
let bossBattle = false;
let bossBattleParameter = 0;
let dioEnabled=true

//overworld parameters
let indoorZone = ''
let shakeTheWorld=false;
let bennettGet=false;
let alGet=false;
let swimNoisePlaying=false;
let inPool=false;
let nearPool=false;
let nearVolleyballCourt=false;
let ballInPool=false;
let zoom = 2;
let speed = 1;
let keepaway = 0;
let keepawayHighScore = 0;
let playerTexture = 0;
let brothersSeal = 0;
let highness = 1;
let time = 0;
let pause = false;
let devMode1 = 0;
let devMode2 = 0;
let devMode3 = 0;
let athletics = 1;
let myAptDoor = 0;
let myAptDoorExit = 0;
let goInsideApt=0;
let backToLightWorld=0;
let cantGetIn=0;
let restart=false;
let loading=false;
let saveFileExists=false;
let scene_number = 2;
let equipment = []
let overworldSong='theme'
let changeThemeSong=false
let raceBegin=false;
let raceOngoing=false;
let winRace = 0;
let wonRace = 0;
let potentialParty = {"Al": false, "Jimmy": false, "Bennett": false};
let currentParty = {"Al": false, "Jimmy": false, "Bennett": false};

//battle parameters
let battleBackgroundIndex=0
let currentXY;
let actionIndex;
let enemyIndex;
let reward = 0;
let exp = 0;
let wonBattle = 0;
let chasers = [];
let chasersEnabled=false;
let chaserInitiateFight = 0;
let itemReward='';
let randomEncounterRewards={
  'Gatorade': .3,
  'Monster': .3,
  'Hamms': .3,
  'Larry Special': .2,
  'Wife Beater': .2,
  'SP Booster': .1,
  'HP Booster': .1,
  'Damage Booster': .1,
  'Fubu Shirt': .07,
  'Camo Pants': .07,
}

let animObject = {
  "Dio": ['diofloat', 'dioslash'],
  "Frat Boy 1": ['frat1right', 'frat1attack'],
  "Frat Boy 2": ['frat2right', 'frat2attack'],
  "Frat Boy 3": ['frat3right', 'frat3attack'],
  "Frat Boy 4": ['frat4right', 'frat4attack'],
  "Crackhead": ['crackheadright', 'crackheadattack'],
  "Junkie": ['junkieright', 'junkieattack'],
  "Ex Junkie": ['ex_junkieright', 'ex_junkieattack'],
  'StabBoy 2': ['fratboy2primewalk', 'fratboy2primestab'],
  'Dark Boy 2': ['darkboy2walk','darkboy2walk'],
  'Frank': ['frat5huhuh','frat5huhuh'],
}

let sfxObject = {
  "Dio": "slash",
  "Frat Boy 1": "bodyhit",
  "Frat Boy 2": "spray",
  "Frat Boy 3": "bodyhit",
  "Frat Boy 4": "bodyhit",
  "Crackhead": "bitenoise",
  "Junkie": "stabnoise",
  "Ex Junkie": "stabnoise",
  'StabBoy 2': "stabnoise",
  'Dark Boy 2': "bodyhit",
  'Frank': "bodyhit"
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
let gameOver = false;

const enemsForChasers = [
  ['crackhead', 'crackheadright', 'crackheadleft', .13, 60, 80, 80],
  ['ex_junkie', 'ex_junkieright', 'ex_junkieleft', .2, 60, 80, 80],
  ['junkie', 'junkieright', 'junkieleft', .2, 60, 80, 80],
  ['fratboy1', 'frat1right', 'frat1left', .16, 60, 80, 80],
  ['fratboy2', 'frat2right', 'frat2left', .15, 60, 80, 80],
  ['fratboy3', 'frat3right', 'frat3left', .17, 60, 80, 80],
  ['fratboy4', 'frat4right', 'frat4left', .14, 60, 80, 80],
]
const battleScale = {
  'dio': 1.5,
  'me': .55 * 1.4,
  'al': .5 * 1.4,
  'james': .4 * 1.4,
  'jon': .55 * 1.4,
  'joe': .55 * 1.4,
  'bennett': .4 * 1.4,
  'girl1': 1.2 * 1.4,
  'girl2': 1.2 * 1.4,
  'girl3': 1.2 * 1.4,
  'girl4': 1.2 * 1.4,
  'crackhead': .4*1.4,
  'ex_junkie': .63*1.4,
  'junkie': .63*1.4,
  'fratboy1': .55 * 1.4,
  'fratboy2': .5 * 1.4,
  'fratboy3': .59 * 1.4,
  'fratboy4': .45 * 1.4,
  'trevor': .48 * 1.4,
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
  'crackhead': .4*1.4,
  'ex_junkie': .63*1.4,
  'junkie': .63*1.4,
  'fratboy1': .55 * 1.4,
  'fratboy2': .5 * 1.4,
  'fratboy3': .59 * 1.4,
  'fratboy4': .45 * 1.4,
  'trevor': .13,
  'smoke': .41,
  'hausdorf': .4,
  'stripper': .3,
}

const sizeAndOffset = {
  'al': {size: [64, 128], offset: [60, 64]},
  'bennett': {size: [64, 64], offset: [60, 100]},
  'joe': {size: [64, 64], offset: [60, 100]},
  'jon': {size: [64, 64], offset: [60, 100]}, //changed to circle though
  'james': {size: [64, 64], offset: [60, 100]}, //changed to circle though
  'trevor': {size: [64, 64], offset: [60, 100]}, //changed to circle though
  'smoke': {size: [64, 64], offset: [60, 100]},
  'hausdorf': {size: [64, 64], offset: [60, 100]},
  'stripper': {size: [64, 64], offset: [60, 100]},
}

//character stats
let specialObject={
  'Mac': ["Muay Thai Combo (3)"],
  'Al': ["Blast Errbody (5)"],
  'Jimmy': ["Double Smack (4)"],
  'Bennett': ["Dirty Combo (7)"]
}

let defendOn = {
  'Mac': false,
  'Al': false,
  'Jimmy': false,
  'Bennett': false,
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

//dark world/ light world parameters
let sentBack = 0;
let worldTheme = 'light'
let darkWorld = 0;
let hausdorfTexture = 0;

//item parameters
let gas = 4;
let phoneGet = 0;
let walletGet = 0;
let liquorGet = 0;
let keysGet = 0;
let doitS = 0;
let money = 0;
let hamms = 2;
let monster = 0;
let gatorade = 0;
let liquorItem = 0;
let larrySpecial = 0;
let items = [];
let itemEffects = {"Monster": "SP +10", "Gatorade": "HP +60", "Hamms": "HP +20 SP +5", "Larry Special": "HP max SP max", "Liquor": "fucks you up"}
let all_usable_items = {"Monster":monster, "Gatorade": gatorade, "Hamms": hamms, "Larry Special": larrySpecial,"Liquor": liquorItem}
let all_usable_items_icons = {"Monster":"monsterIcon", "Gatorade": "gatoradeIcon", "Hamms": "hammsIcon", "Larry Special": "larrySpecialIcon", "Liquor": "liquorIcon"}
let usable_items = {"Monster":monster, "Gatorade": gatorade, "Hamms": hamms}
let numberOfItems = 0;
for (let i=0; i<Object.keys(usable_items).length;i++){
  numberOfItems+=usable_items[Object.keys(usable_items)[i]]
}
let players = ["Mac","Al","Jimmy"];
let playerColors = {"Mac": 0x0e7d4e, "Al": 0xbe2016, "Jimmy": 0x0d2175}

let equipmentTypes={
  "Camo T-Shirt": "Mac_upper",
  "Jeans": "Mac_lower",
  "Blue Shirt": "Jimmy_upper",
  "Snowpants": "Jimmy_lower",
  "Red Shirt": "Al_upper",
  "Red Sweatpants": "Al_lower",
  "SP Booster": "accessory",
  "HP Booster": "accessory",
  "Damage Booster": "accessory",
  "Camo Hoody": "Mac_upper",
  "Camo Pants": "Mac_lower",
  "Fubu Shirt": "Al_upper",
  "Jorts": "Jimmy_lower",
  "Wife Beater": "Mac_upper",
  "Brass Knuckles": "accessory",
  "Sprinting Shoes": "accessory"
}
let equipmentList={
  "Camo T-Shirt": camoTshirt,
  "Jeans": jeans,
  "Blue Shirt": blueShirt,
  "Snowpants": snowpants,
  "Red Shirt": redShirt,
  "Red Sweatpants": redSweatpants,
  "SP Booster": spBooster,
  "HP Booster": hpBooster,
  "Damage Booster": damageBooster,
  "Camo Hoody": camoHoody,
  "Camo Pants": camoPants,
  "Fubu Shirt": fubuShirt,
  "Jorts": jorts,
  "Wife Beater": wifeBeater,
  "Brass Knuckles": brassKnuckles,
  "Sprinting Shoes": sprintingShoes,
}
let equipmentDescriptions={
  "Camo T-Shirt": {type: "Mac Body", def: 2, effect: "None", color: '#068c1b'},
  "Jeans": {type: "Mac Legs", def: 1, effect: "None", color: '#068c1b'},
  "Blue Shirt": {type: "Jimmy Body", def: 3, effect: "None", color: '#0f15a1'},
  "Snowpants": {type: "Jimmy Legs", def: 1, effect: "None", color: '#0f15a1'},
  "Red Shirt": {type: "Al Body", def: 3, effect: "None", color: '#cb0000'},
  "Red Sweatpants": {type: "Al Legs", def: 2, effect: "None", color: '#cb0000'},
  "SP Booster": {type: "Accessory", def: 0, effect: "Max SP +4", color: '#fff'},
  "HP Booster": {type: "Accessory", def: 0, effect: "Max HP +20", color: '#fff'},
  "Damage Booster": {type: "Accessory", def: 0, effect: "Damage +4", color: '#fff'},
  "Camo Hoody": {type: "Mac Body", def: 20, effect: "None", color: '#068c1b'},
  "Camo Pants": {type: "Mac Legs", def: 10, effect: "None", color: '#068c1b'},
  "Fubu Shirt": {type: "Al Body", def: 12, effect: "None", color: '#cb0000'},
  "Jorts": {type: "Jimmy Legs", def: 15, effect: "None", color: '#0f15a1'},
  "Wife Beater": {type: "Mac Body", def: 1, effect: "Damage +5", color: '#068c1b'},
  "Brass Knuckles": {type: "Accessory", def: 0, effect: "Damage +15", color: '#fff'},
  "Sprinting Shoes": {type: "Accessory", def: 0, effect: "Athletics +.3", color: '#fff'},
}
//bool=true means we are equipping. Otherwise we are unequipping
function giveCrackhead1(){
  if (money>=1){
    money-=1;
    moneyToCrackhead+=1;
  }
}
function sprintingShoes(player,bool){
  if (bool===true){
    athletics+=.3
  }
  else {
    athletics-=.3
  }
}
function brassKnuckles(player,bool){
  if (bool===true){
    damageObject[player]+=15
  }
  else {
    damageObject[player]-=15
  }
}
function camoTshirt(player,bool){
  if (bool===true){
    defenseObject[player]+=2
  }
  else {
    defenseObject[player]-=2
  }
}
function jeans(player,bool){
  if (bool===true){
    defenseObject[player]+=1
  }
  else {
    defenseObject[player]-=1
  }
}
function blueShirt(player,bool){
  if (bool===true){
    defenseObject[player]+=3
  }
  else {
    defenseObject[player]-=3
  }
}
function snowpants(player,bool){
  if (bool===true){
    defenseObject[player]+=1
  }
  else {
    defenseObject[player]-=1
  }
}
function redShirt(player,bool){
  if (bool===true){
    defenseObject[player]+=3
  }
  else {
    defenseObject[player]-=3
  }
}
function redSweatpants(player,bool){
  if (bool===true){
    defenseObject[player]+=2
  }
  else {
    defenseObject[player]-=2
  }
}
function spBooster(player,bool){
  if (bool===true){
    maxSPObject[player]+=4
  }
  else {
    maxSPObject[player]-=4
  }
}
function hpBooster(player,bool){
  if (bool===true){
    maxHPObject[player]+=20
  }
  else {
    maxHPObject[player]-=20
  }
}
function damageBooster(player,bool){
  if (bool===true){
    damageObject[player]+=4
  }
  else {
    damageObject[player]-=4
  }
}
function camoHoody(player,bool){
  if (bool===true){
    defenseObject[player]+=20
  }
  else {
    defenseObject[player]-=20
  }
}
function camoPants(player,bool){
  if (bool===true){
    defenseObject[player]+=10
  }
  else {
    defenseObject[player]-=10
  }
}
function fubuShirt(player,bool){
  if (bool===true){
    defenseObject[player]+=12
  }
  else {
    defenseObject[player]-=12
  }
}
function jorts(player,bool){
  if (bool===true){
    defenseObject[player]+=15
  }
  else {
    defenseObject[player]-=15
  }
}
function wifeBeater(player,bool){
  if (bool===true){
    defenseObject[player]+=1
    damageObject[player]+=5
  }
  else {
    defenseObject[player]-=1
    damageObject[player]-=5
  }
}

let equipped={
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
  }
}

//custom functions
function saveGame(){
  saveFileExists=true;
  var file = {
      fratboy2primedialogue:fratboy2primedialogue,
      newDarkDialogue:newDarkDialogue,
      darkboydialogue:darkboydialogue,
      firstTimeCarGet:firstTimeCarGet,
      fratboy1FirstTalk:fratboy1FirstTalk,
      fratboy2FirstTalk:fratboy2FirstTalk,
      fratboy3FirstTalk:fratboy3FirstTalk,
      fratboy4FirstTalk:fratboy4FirstTalk,
      fratboy5FirstTalk:fratboy5FirstTalk,
      jamesFirstTalk:jamesFirstTalk,
      joeFirstTalk:joeFirstTalk,
      bennettFirstTalk:bennettFirstTalk,
      jonFirstTalk:jonFirstTalk,
      firstPoolParty:firstPoolParty,
      ogFirstTalk:ogFirstTalk,
      gunTalk:gunTalk,
      newGame:newGame,
      girl1VolleyballDialogue:girl1VolleyballDialogue,
      girl2FirstDialogue:girl2FirstDialogue,
      girl3FirstDialogue:girl3FirstDialogue,
      girl4FirstDialogue:girl4FirstDialogue,
      highnessDialogue:highnessDialogue,
      alFirstTalk:alFirstTalk,
      darkworldDialogue:darkworldDialogue,
      scene_number:scene_number,
      chaserInitiateFight:chaserInitiateFight,
      maxSPObject:maxSPObject,
      spObject:spObject,
      critObject:critObject,
      defenseObject:defenseObject,
      hpObject:hpObject,
      maxHPObject:maxHPObject,
      expObject:expObject,
      levelObject:levelObject,
      damageObject:damageObject,
      sentBack:sentBack,
      worldTheme:worldTheme,
      darkWorld:darkWorld,
      keepawayHighScore:keepawayHighScore,
      playerTexture:playerTexture,
      brothersSeal:brothersSeal,
      wentPro:trevor.joinParameter,
      highness:highness,
      gas:gas,
      items:items,
      phoneGet:phoneGet,
      walletGet:walletGet,
      keysGet:keysGet,
      alGet:al.joinParameter,
      bennettGet:bennett.joinParameter,
      money:money,
      hamms:hamms,
      monster:monster,
      gatorade:gatorade,
      equipment: equipment,
      trevorfollowing: trevor.following,
      alfollowing: al.following,
      bennettfollowing: bennett.following,
      potentialParty: potentialParty,
  };
  localStorage.setItem('saveFile',JSON.stringify(file));
}

function loadGame (){
  loading=true;
  restart=true;
}

function loadGame2 (){
  if (saveFileExists){
    var file = JSON.parse(localStorage.getItem('saveFile'));
    fratboy2primedialogue=file.fratboy2primedialogue
    newDarkDialogue=file.newDarkDialogue
    darkboydialogue=file.darkboydialogue
    firstTimeCarGet=file.firstTimeCarGet
    fratboy1FirstTalk=file.fratboy1FirstTalk
    fratboy2FirstTalk=file.fratboy2FirstTalk
    fratboy3FirstTalk=file.fratboy3FirstTalk
    fratboy4FirstTalk=file.fratboy4FirstTalk
    fratboy5FirstTalk=file.fratboy5FirstTalk
    jamesFirstTalk=file.jamesFirstTalk
    joeFirstTalk=file.joeFirstTalk
    bennettFirstTalk=file.bennettFirstTalk
    jonFirstTalk=file.jonFirstTalk
    firstPoolParty=file.firstPoolParty
    ogFirstTalk=file.ogFirstTalk
    gunTalk=file.gunTalk
    newGame=file.newGame
    girl1VolleyballDialogue=file.girl1VolleyballDialogue
    girl2FirstDialogue=file.girl2FirstDialogue
    girl3FirstDialogue=file.girl3FirstDialogue
    girl4FirstDialogue=file.girl4FirstDialogue
    highnessDialogue=file.highnessDialogue
    alFirstTalk=file.alFirstTalk
    darkworldDialogue=file.darkworldDialogue
    scene_number=file.scene_number
    chaserInitiateFight=file.chaserInitiateFight
    maxSPObject=file.maxSPObject
    spObject=file.spObject
    critObject=file.critObject
    defenseObject=file.defenseObject
    hpObject=file.hpObject
    maxHPObject=file.maxHPObject
    expObject=file.expObject
    levelObject=file.levelObject
    damageObject=file.damageObject
    sentBack=file.sentBack
    worldTheme=file.worldTheme
    darkWorld=file.darkWorld
    keepawayHighScore=file.keepawayHighScore
    playerTexture=file.playerTexture
    brothersSeal=file.brothersSeal
    trevor.joinParameter=file.wentPro
    highness=file.highness
    gas=file.gas
    items=file.items
    phoneGet=file.phoneGet
    walletGet=file.walletGet
    keysGet=file.keysGet
    al.joinParameter=file.alGet
    bennett.joinParameter=file.bennettGet
    money=file.money
    hamms=file.hamms
    monster=file.monster
    gatorade=file.gatorade
    usable_items["Monster"]=file.monster
    usable_items["Gatorade"]=file.gatorade
    usable_items["Hamms"]=file.hamms
    equipment=file.equipment
    trevor.following=file.trevorfollowing
    al.following=file.alfollowing
    bennett.following=file.bennettfollowing
    potentialParty=file.potentialParty
  }
}

function sleep(){
  hpObject["Mac"]=maxHPObject["Mac"];
  hpObject["Jimmy"]=maxHPObject["Jimmy"];
  hpObject["Al"]=maxHPObject["Al"];
  hpObject["Bennett"]=maxHPObject["Bennett"];
  spObject["Mac"]=maxSPObject["Mac"];
  spObject["Jimmy"]=maxSPObject["Jimmy"];
  spObject["Al"]=maxSPObject["Al"];
  spObject["Bennett"]=maxSPObject["Bennett"];
  console.log("You feel refreshed")
}

function scoreGoal(){
  volleyballScore+=1
  volleyball.disableBody(true, true)
  volleyball.enableBody(true, gameState.VolleyballSpawnPoint.x-32, gameState.VolleyballSpawnPoint.y-250, true, true);
  console.log(volleyballScore)
}

function goInDoor(){
  myAptDoor=1
  indoorZone="myApartment"
}

function goInPool(){
  inPool=true
}

function joeTimerStart(){
  if (money>=2){
    _timerStart=true;
    resetTime=true;
    joeBets=true
    twoballscore = 0;
  } else {
    joeNotEnoughToBet=true
  }
}

function jamesTimerStart(){
  if (money>=1){
    _timerStart=true;
    resetTime=true;
    jamesBets=true
    twoballscore = 0;
  } else {
    jamesNotEnoughToBet=true
  }
}

function goInPocketCue(){
  cueInPocket=true
}

function goInPocketEight(){
  eightInPocket=true
}

function goInPocketNine(){
  nineInPocket=true
}

function exitPool(){
  inPool=false
}

function ballGoInPool(){
  ballInPool=true
}

function ballExitPool(){
  ballInPool=false
}

function exitApt(){
  myAptDoorExit=1
}

function onMeetEnemy1(player, zone) {
  if (worldTheme === 'light' && playerTexture === 0 && inPool === false) {
    chasersEnabled=true;
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
    if (set1.size === 2) {chasersIndexArray.push(ss)}
    if (set2.size === 3) {chasersIndexArray.push(tt)}
    if (set3.size === 4 && trevor.joinParameter) {chasersIndexArray.push(pp)}
    if (set4.size === 5 && al.joinParameter) {chasersIndexArray.push(qq)}
    //let chasersGuys=[]
    for (const i of chasersIndexArray) {
      let theta = Math.random() * 2 * 3.1415;
      //I need to make these only exist during the chasing and then destroy to optimize memory usage (fix needed...)
      chasers[i].enableBody(true, me.x + 200 * Math.cos(theta), me.y + 200 * Math.sin(theta), true, true);
      //chasersGuys[i]=chasersGroup.create(me.x + 200 * Math.cos(theta), me.y + 200 * Math.sin(theta), enemsForChasers[i][0]);
    }
    window.setTimeout(() => {
      for (const i of chasersIndexArray) {
        //chasers[i].destroy()
        chasers[i].disableBody(true, true);
        chasersEnabled=false;
        //chasersGuys[i].destroy()
      }
    }, 10000);
  }
}

function onMeetEnemy2() {
  if (worldTheme === 'light' && playerTexture === 0) {
    //this.cameras.main.flash(1000)
    gameState.swimNoise.stop();
    gameState.music.stop();
    gameState.marioWoods.stop();
    gameState.linkWoods.stop();
    gameState.trevorWoods.stop();
    gameState.battleSongIndex = Math.floor(Math.random() * 9);
    if (gameState.battleSongIndex === 0) {gameState.battlesong1.play()}
    else if (gameState.battleSongIndex === 1) {gameState.battlesong2.play()}
    else if (gameState.battleSongIndex === 2) {gameState.battlesong3.play()}
    else if (gameState.battleSongIndex === 3) {gameState.battlesong4.play()}
    else if (gameState.battleSongIndex === 4) {gameState.battlesong5.play()}
    else if (gameState.battleSongIndex === 5) {gameState.battlesong6.play()}
    else if (gameState.battleSongIndex === 6) {gameState.battlesong7.play()}
    else if (gameState.battleSongIndex === 7) {gameState.battlesong8.play()}
    else if (gameState.battleSongIndex === 8) {gameState.battlesong9.play()}
    this.scene.switch('BattleScene');
    chaserInitiateFight = 0;
    for (let i = 0; i < chasers.length; i++) {chasers[i].disableBody(true, true)}
  }
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
  money -=2;
  gameState.block.play()
}

//to initiate joe giving you 10 bucks
function jamesBorrow() {
  money += 5;
  gameState.itemget.play();
}

//to initiate joe giving you 10 bucks
function jamesGive() {
  money -=1;
  gameState.block.play()
}

function applyRailEnglish() {
  railEnglish=true
}

function hitTopRail(){
  _hitTopRail=true
}
function hitTopRailRight(){
  _hitTopRailRight=true
}
function hitBottomRail(){
  _hitBottomRail=true
}
function hitBottomRailRight(){
  _hitBottomRailRight=true
}
function hitLeftRail(){
  _hitLeftRail=true
}
function hitRightRail(){
  _hitRightRail=true
}

//direction vector
function directionVector(obj1,obj2){
  return [(obj2.x-obj1.x)/distance(obj1,obj2),(obj2.y-obj1.y)/distance(obj1,obj2)]
}

//direction vector
function spriteSpeed(obj){
  return Math.sqrt(obj.body.velocity.x**2+obj.body.velocity.y**2)
}

//to buy from homeboy
function buyWeed() {
  if (money >= 10 && highScore>40) {
    money -= 10;
    items.push('Weed (2g)')
    gameState.itemget.play();
  } else {
    buyFailed = 1
  }
}

function shaken() {
  shakeTheWorld=true
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

//to use items
function useItem(object, player) {
  if (object === "Monster") {
    if (monster >= 1) {
      monster -= 1
      usable_items["Monster"] -= 1
      spObject[player] += 10
      if (spObject[player] >= maxSPObject[player]) {
        spObject[player] = maxSPObject[player]
      }
    }
  } else if (object === "Gatorade") {
    if (gatorade >= 1) {
      gatorade -= 1
      usable_items["Gatorade"] -= 1
      hpObject[player] += 60
      if (hpObject[player] >= maxHPObject[player]) {
        hpObject[player] = maxHPObject[player]
      }
    }
  } else if (object === "Hamms") {
    if (hamms >= 1) {
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
  }
    else if (object === "Liquor") {
      if (liquorItem >= 1) {
        liquorItem -= 1
        usable_items["Liquor"] -= 1
        spObject[player] = maxSPObject[player]
      }
  }
  else if (object === "Larry Special") {
    if (larrySpecial >= 1) {
      larrySpecial -= 1
      usable_items["Larry Special"] -= 1
      hpObject[player] = maxHPObject[player]
      spObject[player] = maxSPObject[player]
    }
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
  raceBegin=true;
}

function meWinRace() {
  if (raceOngoing){
      winRace=1;
  }
}

function bennettWinRace() {
  if (raceOngoing){
      winRace=2;
  }
}

function endRaceWin() {
  wonRace=1;
  bennettGet=1
  gameState.itemget.play()
}

function endRaceLoss() {
  wonRace=2;
}

function getDead() { //to initiate gameover
  gameOver = true;
}

function sendBack() { //call this after talking with darkboy to initiate fight and then send back to lightworld
  bossBattle = true
  bossBattleParameter = 1
  gameStateDark.music.stop()
  gameState.spooky.play()
  bossType = 'darkboy'
  darkworldDialogue = 1
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

function getBeer() { //bennett gives you beer
  hamms += 1
  usable_items["Hamms"]+=1
  gameState.itemget.play()
}

function getMonsters() { //james gives you monster
  monster += 2
  usable_items["Monster"]+=2
  gameState.itemget.play()
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

function skillCheck(player){
  if (player==="Mac" && levelObject["Mac"]===3){
    specialObject["Mac"].push("Fuck Everybody Up (8)")
    skillDialogue["Mac"][3]=true
  }
}

function getHigh() { //increases highness when you smoke weed
  highness = 3;
  time = 0;
  gameState.bongSound.play()
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

function getJonItem() { //jon gives you sprinting shoes
  gameState.itemget.play();
  equipment.push("Sprinting Shoes");
}

function alCheckhamms() { //al checks if you have hamms and weed, if so, he joins your party
  if (hamms >= 4 && items.includes("Weed (2g)")) {
    gunTalk = 1
  }
  beatbox = 1
}

function colleenCheck20() { //al checks if you have hamms and weed, if so, he joins your party
  if (money >= 20) {
    cokeGet()
    money-=20
  }
}

function jimmyJoins() { //if you go pro for the first time jimmy joins your party
  if (jimmyJoinParam===false) {
    jimmyJoinParam=true
  }
}

function gunGet() { //al joins your party (still called gunget because he used to just give you a gun)
  alGet = 1
  gameState.itemget.play()
}

function cokeGet() { //al joins your party (still called gunget because he used to just give you a gun)
  gameState.itemget.play()
  items.push("Gram of Coke")
  girl4FirstDialogue=4
}

//this removes all instances of obj from the array arr
function removeAll(arr,obj){
  for (var i=0;i<arr.length;i++){
    if (arr[i]===obj){
      arr.splice(i,1)
    }
  }
}

//this removes first instance of obj from the array arr
function removeFirst(arr,obj){
  for (var i=0;i<arr.length;i++){
    if (arr[i]===obj){
      arr.splice(i,1)
      break
    }
  }
}

function getBrassKnuckles() { //al joins your party (still called gunget because he used to just give you a gun)
  gameState.itemget.play()
  equipment.push("Brass Knuckles")
  removeAll(items,"Gram of Coke")
}

function getHPBoost(){
  equipment.push("HP Booster");
  gameState.itemget.play();
}

function getDamageBoost(){
  equipment.push("Damage Booster");
  gameState.itemget.play();
}
