function generateRandomEquipment() {

  let name = ''
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
  let type = types[Object.keys(types)[typeDraw]]
  //determining the exact equipment base
  let baseDraw = getRandomInt(type.length)
  let base = type[baseDraw]

  let prefixes = {
    'def': ['Iron', 'Hearty', 'Durable', 'Remarkable'],
    'style': ['Swag', 'Stylish', 'Shiny', 'Dope'],
    'athletics': ['Sporting', `Active`, `Agile`, `Dry-Fit`],
    'neverMiss': ['Accurate', `Marksman's`, `Precise`, `Exact`],
    'firstStrike': ['Fast', `Quick`, `Sprightly`, `Nimble`],

  }
  let postfixes = {
    'preventBleeding': ['of Hardness', `the Uncut`, `of Invinciblity`, `of Kevlar`],
    'preventBlindness': ['the All-Seeing', `of the Vigilent`, `of Sight`, `of Seeing`],
    'damagePlus':['of the Hardened', 'of the Brutal', 'of the Savage', 'of the Vicious'],
    'maxSPPlus':['of Intelligence', 'of the Glinty', `of the Mage`, `of the Magical`],
    'maxHPPlus':['of the Gritty', 'of the Enduring', `of Constancy`, `of Lasting`],
  }

  // slots
  let slots = 0
  let rareDraw = Phaser.Math.FloatBetween(0, 1);
  if (.1 < rareDraw < .5) {
    slots = 1
  } else if (rareDraw < .1) {
    slots = 2
  }

  let prefix='';
  let postfix='';
  let stat1='';
  let stat2='';
  let effect = '';

  if (slots===1){
    let typeOfAddon = getRandomInt(1)
    if (typeOfAddon===0){
      let statistics = Object.keys(prefixes)
      let stat1 = statistics[getRandomInt(statistics.length)]
      let pres = prefixes[stat1]
      prefix = pres[getRandomInt(pres.length)]
      effect = stat1
    } else if (typeOfAddon===1){
      let statistics = Object.keys(postfixes)
      let stat2 = statistics[getRandomInt(statistics.length)]
      let posts = postfixes[stat2]
      postfix = posts[getRandomInt(posts.length)]
    }
  } else if (slots===2){
    let statistics = Object.keys(prefixes)
    let stat1 = statistics[getRandomInt(statistics.length)]
    let pres = prefixes[stat1]
    prefix = pres[getRandomInt(pres.length)]
    let statistics = Object.keys(postfixes)
    let stat2 = statistics[getRandomInt(statistics.length)]
    let posts = postfixes[stat2]
    postfix = posts[getRandomInt(posts.length)]
  }
  name = prefix+' '+base+' '+postfix

  //building the list of effects
  let maxStrengths = {
    'def': 15,
    'style': 15,
    'damagePlus':15,
    'maxSPPlus':10,
    'maxHPPlus':20,
    'athletics': 15, //divide by 10 in the end
  }

  let activeEffects=[]

  if (maxStrengths[stat1]){
    if (effect.length>0){
      effect+='\n'
    }
    strength1=getRandomInt(maxStrengths[stat1])
    effect+=describeEffect(stat1, strength1)
    activeEffects.push([stat1,strength1])
  } else if (stat1){
    if (effect.length>0){
      effect+='\n'
    }
    strength1=10
    effect+=describeEffect(stat1, 0)
    activeEffects.push([stat1,true])
  }
  if (maxStrengths[stat2]){
    if (effect.length>0){
      effect+='\n'
    }
    strength2 = getRandomInt(maxStrengths[stat2])
    effect+=describeEffect(stat2, strength2)
    activeEffects.push([stat2,strength2])
  } else if (stat2){
    if (effect.length>0){
      effect+='\n'
    }
    strength2 = 10
    effect+=describeEffect(stat2, 0)
    activeEffects.push([stat2,true])
  }

//push 10 random pieces to the console
let pieces=[]
for (let i=0;i<10;i++){
  console.log(generateRandomEquipment())
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
  value = 10 + strength1 + strength2

  new_equipment = {
    'name': name,
    'type': type,
    'numberOwned': 1,
    'equipped': 0,
    'character': character,
    'randomEncounterRewards': 0,
    'value': value,
    'effect': effect,
    'def': 0,
    'style': 0,
    'damagePlus': 0,
    'maxSPPlus': 0,
    'maxHPPlus': 0,
    'neverMiss': 0,
    'firstStrike': 0,
    'preventBleeding': 0,
    'preventBlindness': 0,
    'athletics': 0,
  }

  for (let i=0;i<activeEffects.length;i++){
    new_equipment[activeEffects[i][0]]=activeEffects[i][1]
  }
  return new_equipment
}
