class EquipmentItem {
  constructor(name, type, bleed, blind, defense) {
    this.name = name;
    this.type = type;
    this.bleed = bleed;
    this.blind = blind;
    this.defense = defense;
  }
}

var Outfit = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  //character is a playable character, head, body, accessory1, accessory2 are all EquipmentItem objects
  initialize: function Outfit(character, head, body, accessory1, accessory2) {
    Phaser.GameObjects.Container.call(this, scene, character);
    this.character = character
    this.body = body;
    this.head = head;
    this.accessory1 = accessory1;
    this.accessory2 = accessory2;
  },
  equip: function(type, piece) { //e.g. type = 'body', piece = 'Camo T-Shirt'
    this.type.equipped = false
    this.type = piece
    this.type.equipped = true
  },
});

class InventoryItem {
  constuctor(name, hp, sp, stamina, blind, bleed){
    this.name = name;
    this.hp = hp;
    this.sp = sp;
    this.stamina = stamina;
    this.blind = blind;
    this.bleed = bleed;
  }
}

var Inventory = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  //inventoryDict is a dictionary with keys: item names and values: quantity held
  initialize: function Inventory(x,y, inventoryDict) {
    Phaser.GameObjects.Container.call(this, x,y, inventoryDict);
    this.inventoryList = inventoryList
  },
});

class SpecialInventoryItem {
  constuctor(name, description){
    this.name = name;
    this.description = description;
  }
}

var SpecialInventory = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  //specialInventoryDict is a list of special items held
  initialize: function SpecialInventory(x,y, specialInventoryList) {
    Phaser.GameObjects.Container.call(this, x,y, specialInventoryList);
    this.inventoryList = specialInventoryList
  },
});

class PartyMember {
  constructor(name, inParty, maxHP, hp, maxSP, sp, bleeding, blinded, outfit) {
    this.name = name;
    this.inParty = inParty;
    this.maxHP = maxHP;
    this.hp = hp;
    this.maxSP = maxSP;
    this.sp = sp;
    this.bleeding = bleeding;
    this.blinded = blinded;
    this.outfit = outfit
  }
}