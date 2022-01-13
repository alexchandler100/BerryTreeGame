const gameStateBattle = {
  t: 0,
  u: 0,
  x: 0,
  ij: 0,
  alph: 'abcdefghijklmnopqrstuvwxyz',
  switch: -1
}
let enemySelected = false;

let currentHero = 'Mac'

var Message = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  initialize: function Message(scene, events) {
    Phaser.GameObjects.Container.call(this, scene, 175, 50);
    var graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-150, -25, 300, 50);
    graphics.fillRect(-150, -25, 300, 50);
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
    this.text.setOrigin(0.5);
    events.on("Message", this.showMessage, this);
    // number displayed above target head when attacked
    this.damageText = new Phaser.GameObjects.Text(scene, 50, 50, "", {
      color: '#ffffff',
      align: 'center',
      fontSize: 15,
      wordWrap: {
        width: 280,
        useAdvancedWrap: true
      }
    });
    this.add(this.damageText);
    this.damageText.setOrigin(0.5);
    gameStateBattle.damageText = this.damageText;
    events.on("damageIndicator", this.showDamage, this);
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
  showDamage: function(tuple) {
    this.damageText.x = tuple[1] - 200
    this.damageText.y = tuple[2] - 100
    this.damageText.setText(`${tuple[0]}`);
    this.visible = true;
    if (this.hideEvent)
      this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.hideDamage,
      callbackScope: this
    });
  },
  hideDamage: function() {
    this.hideEvent = null;
    this.visible = false;
  }
});

var MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,
  initialize: function MenuItem(x, y, text, scene) {
    Phaser.GameObjects.Text.call(this, scene, x, y, text, {
      color: "#ffffff",
      align: "left",
      fontSize: 30
    });
  },
  select: function() {
    this.setColor("#b39c0e");
  },
  deselect: function() {
    this.setColor("#ffffff");
  },
  unitKilled: function() {
    this.active = false;
    window.setTimeout(() => {
      this.visible = false;
    }, 3000);
  }
});

var Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  initialize: function Menu(x, y, scene, heroes) {
    Phaser.GameObjects.Container.call(this, scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.x = x;
    this.y = y;
    this.selected = false;
  },
  addMenuItem: function(unit) {
    var menuItem = new MenuItem(0, this.menuItems.length * 30, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  },
  // menu navigation
  moveSelectionUp: function() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex--;
      if (this.menuItemIndex < 0)
        this.menuItemIndex = this.menuItems.length - 1;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
    console.log(this.menuItems[this.menuItemIndex])
  },
  moveSelectionDown: function() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length)
        this.menuItemIndex = 0;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
    console.log(this.menuItems[this.menuItemIndex])
  },
  // select the menu as a whole and highlight the choosen element
  select: function(index) {
    if (!index)
      index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length)
        this.menuItemIndex = 0;
      if (this.menuItemIndex == index)
        return;
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  },
  // deselect this menu
  deselect: function() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  },
  confirm: function() {
    // when the player confirms his slection, do the action
  },
  // clear menu and remove all menu items
  clear: function() {
    for (var i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },
  // recreate the menu items
  remap: function(units) {
    this.clear();
    for (var i = 0; i < units.length; i++) {
      //shouldnt this be in the remap function for heroes menu?
      var unit = units[i];
      let menuText = ''
      if (unit.type === 'Mac') {
        menuText += 'Mac    '
      } else if (unit.type === 'Al') {
        menuText += 'Al     '
      } else if (unit.type === 'Jimmy') {
        menuText += 'Jimmy  '
      } else if (unit.type === 'Bennett') {
        menuText += 'Bennett'
      } else if (unit.type === 'Chad') {
        menuText += 'Chad         '
      } else if (unit.type === 'Melvin') {
        menuText += 'Melvin       '
      } else if (unit.type === 'Dylan') {
        menuText += 'Dylan        '
      } else if (unit.type === 'Cam') {
        menuText += 'Cam          '
      } else if (unit.type === 'Jackson') {
        menuText += 'Jackson      '
      } else if (unit.type === 'Bill') {
        menuText += 'Bill         '
      } else if (unit.type === 'Derek') {
        menuText += 'Kevin        '
      } else {
        menuText += unit.type
      }
      menuText += ` HP(${unit.hp})`
      if (spObject[unit.type]) {
        menuText += ` SP(${spObject[unit.type]})`
      }
      unit.setMenuItem(this.addMenuItem(menuText));
    }
    this.menuItemIndex = 0;
  },
});

var HeroesMenu = new Phaser.Class({
  Extends: Menu,
  initialize: function HeroesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  }
});

var ActionsMenu = new Phaser.Class({
  Extends: Menu,
  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem('Attack');
    this.addMenuItem('Defend');
    this.addMenuItem('Special');
    numberOfItems = 0
    for (let i = 0; i < Object.keys(usable_items).length; i++) {
      numberOfItems += usable_items[Object.keys(usable_items)[i]]
    }
    if (numberOfItems > 0) {
      this.addMenuItem('Items');
    }
  },
  confirm: function() {
    actionIndex = this.menuItemIndex;
    this.scene.events.emit('SelectedAction');
  },
  itemRemap: function() {
    this.clear();
    for (let i = 0; i < Object.keys(usable_items).length; i++) {
      if (usable_items[Object.keys(usable_items)[i]] > 0) {
        this.addMenuItem(Object.keys(usable_items)[i]);
      }
    }
    //this.addMenuItem("Monster");
    //this.addMenuItem("Hamms");
    this.menuItemIndex = 0;
  },
  specialRemap: function() {
    this.clear();
    for (let i = 0; i < specialObject[currentHero].length; i++) {
      this.addMenuItem(specialObject[currentHero][i]);
    }
    this.menuItemIndex = 0;
  },
  actionsRemap: function() {
    this.clear();
    this.addMenuItem('Attack');
    this.addMenuItem('Defend');
    this.addMenuItem('Special');
    numberOfItems = 0
    for (let i = 0; i < Object.keys(usable_items).length; i++) {
      numberOfItems += usable_items[Object.keys(usable_items)[i]]
    }
    if (numberOfItems > 0) {
      this.addMenuItem('Items');
    }
    this.menuItemIndex = 0;
  }
});

var EnemiesMenu = new Phaser.Class({
  Extends: Menu,
  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm: function() {
    enemyIndex = this.menuItemIndex;
    this.scene.events.emit("Enemy", this.menuItemIndex);
  }
});

var Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,
  initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
    this.runaway = false;
    this.running = false;
  },
  run: function(){
    if (this.runaway){
      this.x-=5
    }
  },
  // we will use this to notify the menu item when the unit is dead
  setMenuItem: function(item) {
    this.menuItem = item;
  },
  // attack the target unit
  attack: function(target) {
    gameStateBattle.rnd = Math.floor(Math.random() * 10);
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    let extra_damage;
    let dd;
    console.log(`gameStateBattle.rnd: ${gameStateBattle.rnd}`)
    // decrease chance of landing if stamina is low
    if (stamina <= 30 && Object.keys(hpObject).includes(this.type)) {
      gameStateBattle.rnd -= 2
    }
    //since blinding is OP, we are decreasing gameStateBattle.rnd so fratboy2 is less likely to land (may have to adjust the value)
    if (this.type === "Dylan") {
      gameStateBattle.rnd -= 3
    }
    //to decrease likeliness to land hit if blinded
    if (blindObject[this.type]) {
      gameStateBattle.rnd = Math.floor(gameStateBattle.rnd / 3)
      console.log('this hero is blind')
    }
    if (gameStateBattle.rnd >= 9) {
      extra_damage = Math.ceil(this.damage / 2)
    } else {
      extra_damage = Math.ceil(Math.random() * this.damage / 4) - Math.floor(this.damage / 8)
    }
    //this makes it so that if you have the never miss property, you do not miss even if you roll 0
    if (gameStateBattle.rnd <= 0 && !neverMissObject[this.type]) {
      dd = 0;
    } else if (defenseObject[target.type]) {
      dd = this.damage - defenseObject[target.type] + extra_damage;
    } else {
      dd = this.damage + extra_damage;
    }
    if (target.living) {
      let d = Math.max(0, dd);
      if (blindObject[this.type]) {
        d = Math.floor(d / 2)
      }
      if (stamina <= 30 && Object.keys(hpObject).includes(this.type)) {
        d = Math.floor(d * .75)
      }
      if (Object.keys(hpObject).includes(target.type)) {
        d = Math.floor(d * (1.35) ** (numberOfPlayers))
      }
      target.takeDamage(d);
      window.setTimeout(() => { //this is what actually applies damage
      //if the attacker is fratboy2, and the attack hits, the target is blinded
      if (this.type === "Dylan" && d > 0) {
        if (!blindProofObject[target.type]) {
          blindObject[target.type] = 2
        }
      }
      if ((this.type === "Bill" || this.type === "Derek") && d > 0) {
        if (!bleedProofObject[target.type]) {
          bleedingObject[target.type] = 3
        }
      }
      if (gameStateBattle.rnd >= 9) {
        this.scene.events.emit("Message", "Critical hit! ");
      } else if (gameStateBattle.rnd <= 0 && !neverMissObject[this.type]) {
        this.scene.events.emit("Message", this.type + " tries to attack " + target.type + " but fucks it up and misses");
      } else {
        this.scene.events.emit("Message", this.type + " attacks " + target.type);
      }
      //movement of damageIndicator depents on t and u so we reset because by now they have become large
      gameStateBattle.t = 0;
      gameStateBattle.u = 0;
      gameStateBattle.damageText.scaleX = 2;
      gameStateBattle.damageText.scaleY = 2;
      //tells the little numbers floating above targets head what to display when hit
      this.scene.events.emit("damageIndicator", [target.displayDamage(d), target.x, target.y]);
      }, 1500);
    }
  },
  attackAnim: function(target) {
    //perhaps I should be using this instead of the current method
  },
  defend: function() {
    this.scene.events.emit("Message", this.type + " defends ");
    defendOn[this.type] = true;
  },
  special: function(target) {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    let extra_damage = 0
    gameStateBattle.rnd = 0
    let dd = 0
    if (critObject[this.type]) {
      gameStateBattle.rnd = Math.floor(Math.random() * critObject[this.type])
    } else {
      gameStateBattle.rnd = Math.floor(Math.random() * 10)
    }
    if (blindObject[this.type]) {
      gameStateBattle.rnd = Math.floor(gameStateBattle.rnd / 3)
    }
    if (gameStateBattle.rnd >= 9) {
      extra_damage = Math.ceil(this.damage / 2)
    } else {
      extra_damage = Math.ceil(Math.random() * this.damage / 4) - Math.floor(this.damage / 8)
    }
    if (target.living && defenseObject[target.type]) {
      dd = this.damage - defenseObject[target.type] + extra_damage
    } else {
      dd = this.damage + extra_damage
    }
    let d = Math.max(0, dd) * 1.5
    if (blindObject[this.type]) {
      d = Math.floor(d / 2)
      console.log('this hero is blind')
    }
    let dam;
    if (target.living) {
      //specifically for Mac special attack
        if (this.type === 'Mac') {
          d *= 1.2
          dam = Math.round(d)
          target.takeDamage(dam);
          if (gameStateBattle.rnd >= 9) {
            this.scene.events.emit("Message", "Critical hit! " + this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          } else {
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          }
        }
        //specifically for Al special attack
        else if (this.type === 'Al') {
          dam = Math.round(d / 3)
          target.takeDamage(dam);
          if (gameStateBattle.rnd >= 9) {
            this.scene.events.emit("Message", "Critical hit! " + this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          } else {
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          }
        }
        //specifically for Jimmy special attack
        else if (this.type === 'Jimmy') {
          dam = Math.round(d / 2)
          target.takeDamage(dam);
          if (gameStateBattle.rnd >= 9) {
            this.scene.events.emit("Message", "Critical hit! " + this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          } else {
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          }
        } else if (this.type === 'Bennett') {
          dam = Math.round(d * 2)
          target.takeDamage(dam);
          if (gameStateBattle.rnd >= 9) {
            this.scene.events.emit("Message", "Critical hit! " + this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          } else {
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + `${dam}` + " damage");
          }
        }
        //movement of damageIndicator depents on t and u so we reset because by now they have become large
        window.setTimeout(() => {
        gameStateBattle.t = 0;
        gameStateBattle.u = 0;
        gameStateBattle.damageText.scaleX = 2;
        gameStateBattle.damageText.scaleY = 2;
        this.scene.events.emit("damageIndicator", [dam, target.x, target.y]);
      }, 1500);


    }
  },

  gatorade: function() {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    if (gatorade >= 1) {
      if (this.type === "Mac") {
        gameStateBattle.me.flipX = false;
        gameStateBattle.me.anims.play('drink_gatorade', true);
        window.setTimeout(() => {
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 2999);
      } else if (this.type === "Jimmy") {
        gameStateBattle.trevor.flipX = false;
        gameStateBattle.trevor.anims.play('trevor_drink_gatorade', true);
        window.setTimeout(() => {
          gameStateBattle.trevor.anims.play('trevorright', true);
          gameStateBattle.trevor.flipX = true;
        }, 2999);
      }
      gameState.drinkGatorade.play()
      this.scene.events.emit("Message", this.type + " drinks a gatorade to recover 60 HP");
      gatorade -= 1
      usable_items["Gatorade"] -= 1;
      this.hp += 60
      hpObject[this.type] += 60
      if (this.hp >= maxHPObject[this.type]) {
        this.hp = maxHPObject[this.type]
        hpObject[this.type] = maxHPObject[this.type]
      }
    } else {
      this.scene.events.emit("Message", "Shiiit you ain't got any of that shit you done goofed.");
    }
  },

  monster: function() {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    if (monster >= 1) {
      if (this.type === "Mac") {
        gameStateBattle.me.flipX = false;
        gameStateBattle.me.anims.play('drink_monster', true);
        window.setTimeout(() => {
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 2999);
      } else if (this.type === "Jimmy") {
        gameStateBattle.trevor.anims.play('trevor_drink_monster', true);
        gameStateBattle.trevor.flipX = false;
        window.setTimeout(() => {
          gameStateBattle.trevor.anims.play('trevorright', true);
          gameStateBattle.trevor.flipX = true;
        }, 2999);
      }
      gameState.drinkCan.play()
      this.scene.events.emit("Message", this.type + " drinks a monster to recover 10 SP");
      //why not use the useitem function here? (fix needed)
      monster -= 1
      usable_items["Monster"] -= 1;
      spObject[this.type] += 10
      bleedingObject[player]=0;
      blindObject[player]=0;
      if (spObject[this.type] >= maxSPObject[this.type]) {
        spObject[this.type] = maxSPObject[this.type]
      }
    } else {
      this.scene.events.emit("Message", "Shiiit you ain't got any of that shit you done goofed.");
    }
  },

  maxice: function() {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    if (maxice >= 1) {
      if (this.type === "Mac") {
        gameStateBattle.me.flipX = false;
        gameStateBattle.me.anims.play('drink_monster', true);
        window.setTimeout(() => {
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 2999);
      } else if (this.type === "Jimmy") {
        gameStateBattle.trevor.anims.play('trevor_drink_monster', true);
        gameStateBattle.trevor.flipX = false;
        window.setTimeout(() => {
          gameStateBattle.trevor.anims.play('trevorright', true);
          gameStateBattle.trevor.flipX = true;
        }, 2999);
      }
      gameState.drinkCan.play()
      this.scene.events.emit("Message", this.type + " drinks a Max Ice to recover 50 HP and 15 SP");
      maxice -= 1
      usable_items["Labatt Max Ice"] -= 1;
      spObject[this.type] += 15
      hpObject[this.type] += 50
      this.hp += 50
      if (spObject[this.type] >= maxSPObject[this.type]) {
        spObject[this.type] = maxSPObject[this.type]
      }
      if (hpObject[this.type] >= maxHPObject[this.type]) {
        hpObject[this.type] = maxHPObject[this.type]
        this.hp = maxHPObject[this.type]
      }
    } else {
      this.scene.events.emit("Message", "Shiiit you ain't got any of that shit you done goofed.");
    }
  },

  larrySpecial: function() {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    if (larrySpecial >= 1) {
      larrySpecial -= 1
      usable_items["Larry Special"] -= 1
      this.hp = maxHPObject[this.type]
      hpObject[this.type] = maxHPObject[this.type]
      spObject[this.type] = maxSPObject[this.type]
    } else {
      this.scene.events.emit("Message", "Shiiit you ain't got any of that shit you done goofed.");
    }
  },

  liquor: function() {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    if (liquorItem >= 1) {
      liquorItem -= 1
      usable_items["Liquor"] -= 1
      spObject[this.type] = maxSPObject[this.type]
    } else {
      this.scene.events.emit("Message", "Shiiit you ain't got any of that shit you done goofed.");
    }
  },

  hamms: function() {
    if (defendOn[this.type]) {
      defendOn[this.type] = false
    }
    if (hamms >= 1) {
      if (this.type === "Mac") {
        gameStateBattle.me.flipX = false;
        gameStateBattle.me.anims.play('drink_hamms', true);
        window.setTimeout(() => {
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 2999);
      } else if (this.type === "Jimmy") {
        gameStateBattle.trevor.anims.play('trevor_drink_hamms', true);
        gameStateBattle.trevor.flipX = false;
        window.setTimeout(() => {
          gameStateBattle.trevor.anims.play('trevorright', true);
          gameStateBattle.trevor.flipX = true;
        }, 2999);
      }
      gameState.drinkCan.play()
      this.scene.events.emit("Message", this.type + " drinks a hamms to recover 20 HP and 5 SP");
      hamms -= 1
      usable_items["Hamms"] -= 1;
      spObject[this.type] += 5
      hpObject[this.type] += 20
      this.hp += 20
      if (spObject[this.type] >= maxSPObject[this.type]) {
        spObject[this.type] = maxSPObject[this.type]
      }
      if (hpObject[this.type] >= maxHPObject[this.type]) {
        hpObject[this.type] = maxHPObject[this.type]
        this.hp = maxHPObject[this.type]
      }
    } else {
      this.scene.events.emit("Message", "Shiiit you ain't got any of that shit you done goofed.");
    }
  },

  takeDamage: function(damage) {
    if (defendOn[this.type]) {
      damage /= 2;
      damage = Math.round(damage);
    }
    if (defenseObject[this.type]) {
      damage -= defenseObject[this.type];
      damage = Math.round(damage);
      damage = Math.max(0, damage);
    }
    this.hp -= damage;
    if (hpObject[this.type]) {
      hpObject[this.type] -= damage;
      if (hpObject[this.type] < 0) {
        hpObject[this.type] = 0
      }
    }
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.menuItem = null;
      this.living = false;
      window.setTimeout(() => {
      if (this.type==="Mac"){
        gameStateBattle.me.anims.play('meDead',true)
        gameStateBattle.me.flipX = false;
      } else if (this.type==="Al"){
        gameStateBattle.al.anims.play('alDead',true)
      } else if (this.type==="Jimmy"){
        gameStateBattle.trevor.anims.play('trevorDead',true)
        gameStateBattle.trevor.flipX = false;
      } else if (this.type==="Cam" || this.type==="Dylan" || this.type==="Chad" ||this.type==="Jackson" ||this.type==="Derek" ||this.type==="Bill" || this.type==="Melvin" ){
        this.runaway = true
      }
        }, 3000);
    }
  },

  displayDamage: function(damage) {
    if (defendOn[this.type]) {
      damage /= 2;
      damage = Math.round(damage);
    }
    if (defenseObject[this.type]) {
      damage -= defenseObject[this.type];
      damage = Math.round(damage);
      damage = Math.max(0, damage)
    }
    return Math.round(damage)
  }
});

var Enemy = new Phaser.Class({
  Extends: Unit,
  initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.setScale(battleScale[texture]);
  }
});

var PlayerCharacter = new Phaser.Class({
  Extends: Unit,
  initialize: function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.setScale(battleScale[texture]);
  }
});

var BattleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BattleScene() {
    Phaser.Scene.call(this, {
      key: 'BattleScene'
    });
    this.billBackWalk = false
  },
  preload: function() {
    gameStateBattle.images = ['assets/burcham_battle.png', 'assets/battle_abbott_bigapple.png', 'assets/battle_abbott_mobile.png',
      'assets/battle_abbott_postoffice.png', 'assets/battle_abbott_trees.png', 'assets/battle_burcham_frathouse_streetview.png',
      'assets/battle_burcham_houses_streetview.png', 'assets/battle_burcham_road_street_view.png', 'assets/battle_burcham_street_near_abbott.png', 'assets/battle_EL_highschool_streetview.png',
      'assets/battle_woods.png', 'assets/battle_z731pool.png', 'assets/battle_z_volleyball.png',
      'assets/battle_z_711_burcham.png', 'assets/battle_z_burcham_woods.png', 'assets/battle_z_burchamplace.png',
    ]
    for (let i = 0; i < gameStateBattle.images.length; i++) {
      this.load.image(`background${i}`, gameStateBattle.images[i]);
    }
    this.load.image(`school_roof`, 'assets/school_roof.png');
    this.load.image(`burcham_walk`, 'assets/burcham_walk.png');
    this.load.image(`burcham_walk_front`, 'assets/burcham_walk_front.png');
    this.load.image(`blinded`, 'assets/blinded.png');
    this.load.spritesheet('bleeding',
      'assets/bleeding.png', {
        frameWidth: 50,
        frameHeight: 50
      });
      this.load.spritesheet('pepperSpray',
        'assets/pepperSpray.png', {
          frameWidth: 200,
          frameHeight: 80
        });
        this.load.spritesheet('airsoft',
          'assets/airsoft.png', {
            frameWidth: 50,
            frameHeight: 30
          });
          this.load.spritesheet('mohawk',
            'assets/mohawk.png', {
              frameWidth: 25,
              frameHeight: 55
            });
      this.load.audio('smack', ['assets/smack.mp3']);

    //this.load.image(`background1`, 'assets/burcham_battle.png');
  },
  create: function() {
    this.smack = this.sound.add('smack', {
      volume: .25
    });

    //battle animation

    this.anims.create({
      key: 'throw',
      frames: this.anims.generateFrameNumbers('mohawk', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'break',
      frames: this.anims.generateFrameNumbers('mohawk', {
        start: 1,
        end: 1
      }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'spray',
      frames: this.anims.generateFrameNumbers('pepperSpray', {
        start: 0,
        end: 9
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'airsoftShoot',
      frames: this.anims.generateFrameNumbers('airsoft', {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: 0
    });


    this.anims.create({
      key: 'bleedingfast',
      frames: this.anims.generateFrameNumbers('bleeding', {
        start: 0,
        end: 4
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'bleedingslow',
      frames: this.anims.generateFrameNumbers('bleeding', {
        start: 0,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    });

    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
    //use uiscene functions
    this.UIScene = this.scene.get("UIScene");


    //status effects create
    airsoft = this.physics.add.sprite(-50, -50, 'airsoft').setDepth(1000).setScale(4);
    spray = this.physics.add.sprite(-50, -50, 'pepperSpray').setDepth(1000);
    mohawk = this.physics.add.sprite(-50, -50, 'mohawk').setDepth(1000);

    macX = this.add.image(-50, -50, 'blinded');
    macBleed = this.physics.add.sprite(-50, -50, 'bleeding');
    macBleed.anims.play('bleedingfast', true)

    alX = this.add.image(-50, -50, 'blinded');
    alBleed = this.physics.add.sprite(-50, -50, 'bleeding');
    alBleed.anims.play('bleedingfast', true)

    bennettX = this.add.image(-50, -50, 'blinded');
    bennettBleed = this.physics.add.sprite(-50, -50, 'bleeding');
    bennettBleed.anims.play('bleedingfast', true)

    trevorX = this.add.image(-50, -50, 'blinded');
    trevorBleed = this.physics.add.sprite(-50, -50, 'bleeding');
    trevorBleed.anims.play('bleedingfast', true)
  },
  update: function() {
    if (this.billBackWalk){
      this.units[this.index].x-=1
      this.units[this.index].flipX = true;
    }
    //to make enemies run away
    for (let i=0;i<this.enemies.length;i++){
      if (this.enemies[i].runaway && this.enemies[i].running===false){
        this.enemies[i].running=true
        this.enemies[i].anims.play(animObject[this.enemies[i].type][0],true)
      } if (this.enemies[i].running){
        window.setTimeout(() => {
          this.enemies[i].running = false;
          this.enemies[i].runaway = false;
        }, 3000);
        this.enemies[i].x-=3
        this.enemies[i].flipX = true;
      }

    }
    if (throwingMohawk && gameStateBattle.rnd===0){
      mohawk.setScale(1-(mohawkStartingYValue - mohawk.y)/(mohawkStartingYValue))
      mohawk.setFrame(0)
      //mohawk.anims.play('throw',true)
      mohawk.x+=8*Math.cos(throwingAngle)
      mohawk.y+=8*Math.sin(throwingAngle)
      mohawk.angle+=16
      if (mohawk.x>1500){
        gameState.shatter.play();
        throwingMohawk = false;
      }
    } else if (throwingMohawk && gameStateBattle.rnd>0){
      mohawk.setScale(1-(mohawkStartingYValue - mohawk.y)/(mohawkStartingYValue))
      mohawk.setFrame(0)
      //mohawk.anims.play('throw',true)
      mohawk.x+=8*Math.cos(throwingAngle)
      mohawk.y+=8*Math.sin(throwingAngle)
      mohawk.angle+=16
      if (Math.abs(mohawk.x-throwingMohawkTarget[0].x)<10){
        gameState.shatter.play();
        throwingMohawk = false;
        fallingMohawk = true;
        gameStateBattle.randomX = Math.random()*3 + 2;
        gameStateBattle.signX = (-1)**(Math.floor(Math.random()*2))
        gameStateBattle.playingMohawkGround = false
      }
    } else if (fallingMohawk && gameStateBattle.rnd>0){
      mohawkBounceTimer+=1
      throwingMohawkTarget=[]
      mohawk.setFrame(1)
      mohawk.x+=gameStateBattle.signX*gameStateBattle.randomX
      mohawk.y+=3*(-100+mohawkBounceTimer*6)/100
      mohawk.angle-=4
      window.setTimeout(() => {
        if (!gameStateBattle.playingMohawkGround){
          gameState.mohawkGround.play();
          gameStateBattle.playingMohawkGround = true
        }
        mohawkBounceTimer=0;
        fallingMohawk = false;
        mohawk.angle = 90;
        mohawk.setFrame(2);
      }, 1000);
      window.setTimeout(() => {
        mohawk.x=-50
        mohawk.y=-50
      }, 1500);
      window.setTimeout(() => {
        gameStateBattle.playingMohawkGround = false
      }, 2500);
    }
    if (!settingDepth) { //sets depth according to y value except during attacks when we use custom depths
      for (let i = 0; i < this.units.length; i++) {
        this.units[i].setDepth(this.units[i].y)
      }
      macX.setDepth(gameStateBattle.me.y + .1)
      macBleed.setDepth(gameStateBattle.me.y + .1)
      if (trevor.following) {
        trevorX.setDepth(gameStateBattle.trevor.y + .1)
        trevorBleed.setDepth(gameStateBattle.trevor.y + .1)
      }
      if (al.following) {
        alX.setDepth(gameStateBattle.al.y + .1)
        alBleed.setDepth(gameStateBattle.al.y + .1)
      }
      if (bennett.following) {
        bennettX.setDepth(gameStateBattle.bennett.y + .1)
        bennettBleed.setDepth(gameStateBattle.bennett.y + .1)
      }
    }

    //to make burchamwalk scroll left
    if (bossBattle && (bossType === 'fratboy2prime') && gameStateBattle.switch === -1) {
      burchamWalkImage.a.x += 1
      burchamWalkFrontImage.a.x += 1
    } else if (bossBattle && (bossType === 'fratboy2prime') && gameStateBattle.switch === 1) {
      burchamWalkImage.a.x -= 1
      burchamWalkFrontImage.a.x -= 1
    }
    if (bossBattle && (bossType === 'fratboy2prime') && burchamWalkImage.a.x >= 0) {
      gameStateBattle.switch = 1
    }
    if (bossBattle && (bossType === 'fratboy2prime') && burchamWalkImage.a.x <= -4958) {
      gameStateBattle.switch = -1
    }

    // for blindness and bleeding animations
    macX.setScale(blindObject["Mac"] / 2)
    macX.x = gameStateBattle.me.x - 3
    macX.y = gameStateBattle.me.y - 60
    macBleed.setScale(bleedingObject["Mac"] / 2)
    macBleed.x = gameStateBattle.me.x - 3
    macBleed.y = gameStateBattle.me.y
    if (gameStateBattle.me.living === false) {
      macX.visible = false
      macBleed.visible = false
    } else {
      macX.visible = true
      macBleed.visible = true
    }

    if (trevor.following) {
      trevorX.x = gameStateBattle.trevor.x - 10
      trevorX.y = gameStateBattle.trevor.y - 70
      trevorBleed.x = gameStateBattle.trevor.x - 3
      trevorBleed.y = gameStateBattle.trevor.y
      trevorX.setScale(blindObject["Jimmy"] / 2)
      trevorBleed.setScale(bleedingObject["Jimmy"] / 2)
      if (gameStateBattle.trevor.living === false) {
        trevorX.visible = false
        trevorBleed.visible = false
      } else {
        trevorX.visible = true
        trevorBleed.visible = true
      }
    }
    if (bennett.following) {
      bennettX.x = gameStateBattle.bennett.x
      bennettX.y = gameStateBattle.bennett.y - 50
      bennettX.setScale(blindObject["Bennett"] / 2)
      bennettBleed.x = gameStateBattle.bennett.x - 3
      bennettBleed.y = gameStateBattle.bennett.y
      bennettBleed.setScale(bleedingObject["Bennett"] / 2)
      if (gameStateBattle.bennett.living === false) {
        bennettX.visible = false
        bennettBleed.visible = false
      } else {
        bennettX.visible = true
        bennettBleed.visible = true
      }
    }
    if (al.following) {
      alX.x = gameStateBattle.al.x
      alX.y = gameStateBattle.al.y - 60
      alX.setScale(blindObject["Al"] / 2)
      alBleed.setScale(bleedingObject["Al"] / 2)
      alBleed.x = gameStateBattle.al.x - 3
      alBleed.y = gameStateBattle.al.y
      if (gameStateBattle.al.living === false) {
        alX.visible = false
        alBleed.visible = false
      } else {
        alX.visible = true
        alBleed.visible = true
      }
    }

    gameStateBattle.t += 1;
    gameStateBattle.damageText.x -= 2
    gameStateBattle.damageText.y += (gameStateBattle.t * 2 - 30) / 30
    gameStateBattle.damageText.scaleX -= .005
    gameStateBattle.damageText.scaleY -= .005
  },
  startBattle: function() {
    /*
    if (gameStateBattle.firstStrike){
      console.log(`launch first strike test`)
      if (runaway){
        gameStateBattle.firstStrike.setText('Jew got first strike!')
      } else {
        gameStateBattle.firstStrike.setText('Jew got first strike!')
      }
        gameStateBattle.firstStrikeDisplay.visible = true;
        gameStateBattle.firstStrikeDisplayFront.visible = true;
        gameStateBattle.firstStrike.visible = true;
        window.setTimeout(() => {
          gameStateBattle.firstStrikeDisplay.visible = false;
          gameStateBattle.firstStrikeDisplayFront.visible = false;
          gameStateBattle.firstStrike.visible = false;
        }, 3000);
    }
    */

    numberOfPlayers = 1
    if (trevor.following) {
      numberOfPlayers += 1
    }
    if (al.following) {
      numberOfPlayers += 1
    }
    if (bennett.following) {
      numberOfPlayers += 1
    }
    //enemies

    let enems = [
      ['crackhead', 'Melvin', 1, 15, crackhead, 'crackheadright'],
      ['ex_junkie', 'Bill', 25, 8, ex_junkie, 'ex_junkieright'],
      ['junkie', 'Derek', 40, 8, junkie, 'junkieright'],
      ['fratboy1', 'Chad', 65, 8, fratboy1, 'frat1jump'],
      ['fratboy2', 'Dylan', 20, 8, fratboy2, 'frat2right'],
      ['fratboy3', 'Cam', 30, 11, fratboy3, 'frat3right'],
      ['fratboy4', 'Jackson', 20, 10, fratboy4, 'frat4right'],
    ]

/*
    enems=[];  //to get a specific enemy
    for (let i=0; i<7 ;i++){
      enems.push(['ex_junkie', 'Bill', 30, 8, ex_junkie, 'ex_junkieright'])
  }*/


    if (bossBattle && (bossType === 'darkboy' || bossType === 'dio')) {
      this.add.image(0, -125, `school_roof`).setOrigin(0, 0);
    } else if (bossBattle && (bossType === 'fratboy2prime')) {
      burchamWalkImage = {}
      burchamWalkFrontImage = {}
      burchamWalkImage.a = this.add.image(-4957, -125, `burcham_walk`).setOrigin(0, 0);
      burchamWalkFrontImage.a = this.add.image(-6157 + 1200, -125, `burcham_walk_front`).setOrigin(0, 0);
      burchamWalkFrontImage.a.setDepth(324)
    } else { // add random background or location based background
      this.add.image(0, -125, `background${battleBackgroundIndex}`).setOrigin(0, 0);
    }
    if (bossBattle && bossType === 'darkboy') {
      gameStateBattle.enem1 = new Enemy(this, 450, 250, 'darkboy2', null, 'Dark Boy 2', 1000, 20);
      this.add.existing(gameStateBattle.enem1);
    } else if (bossBattle && bossType === 'dio') {
      gameStateBattle.enem1 = new Enemy(this, 250, 100, 'dio', null, 'Dio', 1200, 45);
      this.add.existing(gameStateBattle.enem1);
    } else if (bossBattle && bossType === 'fratboy2prime') {
      gameStateBattle.enem1 = new Enemy(this, 120, 200, 'fratboy2prime', null, 'StabBoy 2', 600, 30);
      this.add.existing(gameStateBattle.enem1);
      gameStateBattle.enem2 = new Enemy(this, 385, 350, enems[3][0], null, enems[3][1], enems[3][2] + 3 * (levelObject['Mac'] - 1), enems[3][3] + enems[3][3] / 3 * (levelObject['Mac'] - 1));
      this.add.existing(gameStateBattle.enem2);
      gameStateBattle.enem3 = new Enemy(this, 450, 250, enems[4][0], null, enems[4][1], enems[4][2] + 3 * (levelObject['Mac'] - 1), enems[4][3] + enems[4][3] / 3 * (levelObject['Mac'] - 1));
      this.add.existing(gameStateBattle.enem3);
      gameStateBattle.enem4 = new Enemy(this, 250, 275, enems[5][0], null, enems[5][1], enems[5][2] + 3 * (levelObject['Mac'] - 1), enems[5][3] + enems[5][3] / 3 * (levelObject['Mac'] - 1));
      this.add.existing(gameStateBattle.enem4);
      gameStateBattle.enem5 = new Enemy(this, 200, 325, enems[2][0], null, enems[2][1], enems[2][2] + 3 * (levelObject['Mac'] - 1), enems[2][3] + enems[2][3] / 3 * (levelObject['Mac'] - 1));
      this.add.existing(gameStateBattle.enem5);
    } else if (bossBattle && bossType === 'frank') {
      gameStateBattle.enem1 = new Enemy(this, 450, 250, 'fratboy5', null, 'Frank', 1000, 35);
      this.add.existing(gameStateBattle.enem1);
    } else {
      //adding enemies...recall it goes (scene, x, y, texture, frame, type, hp, damage)
      gameStateBattle.enem1 = new Enemy(this, 450, 250, enems[rr][0], null, enems[rr][1], enems[rr][2] + 15 * (levelObject['Mac'] - 1), enems[rr][3] + Math.floor(enems[rr][3] / 4) * (levelObject['Mac'] - 1));
      this.add.existing(gameStateBattle.enem1);
      if (set1.size === 2) {
        gameStateBattle.enem2 = new Enemy(this, 400, 300, enems[ss][0], null, enems[ss][1], enems[ss][2] + 15 * (levelObject['Mac'] - 1), enems[ss][3] + Math.floor(enems[ss][3] / 4) * (levelObject['Mac'] - 1));
        this.add.existing(gameStateBattle.enem2);
      }
      if (set2.size === 3 && numberOfPlayers >= 2) {
        gameStateBattle.enem3 = new Enemy(this, 350, 350, enems[tt][0], null, enems[tt][1], enems[tt][2] + 15 * (levelObject['Mac'] - 1), enems[tt][3] + Math.floor(enems[tt][3] / 4) * (levelObject['Mac'] - 1));
        this.add.existing(gameStateBattle.enem3);
      }
      if (set3.size === 4 && numberOfPlayers >= 3) {
        gameStateBattle.enem4 = new Enemy(this, 300, 275, enems[pp][0], null, enems[pp][1], enems[pp][2] + 15 * (levelObject['Mac'] - 1), enems[pp][3] + Math.floor(enems[pp][3] / 4) * (levelObject['Mac'] - 1));
        this.add.existing(gameStateBattle.enem4);
      }
      if (set4.size === 5 && numberOfPlayers >= 3) {
        gameStateBattle.enem5 = new Enemy(this, 250, 325, enems[qq][0], null, enems[qq][1], enems[qq][2] + 15 * (levelObject['Mac'] - 1), enems[qq][3] + Math.floor(enems[qq][3] / 4) * (levelObject['Mac'] - 1));
        this.add.existing(gameStateBattle.enem5);
      }
    }

    //recall inputs look like (scene, x, y, texture, frame, type, hp, damage)
    // player characters - warrior
    gameStateBattle.me = new PlayerCharacter(this, 850, 250, "me", 1, "Mac", hpObject['Mac'], damageObject['Mac']);
    if (hpObject['Mac'] > 0) {
      this.add.existing(gameStateBattle.me);
      gameStateBattle.me.active = true
      gameStateBattle.me.living = true
    } else {
      gameStateBattle.me.active = false
      gameStateBattle.me.living = false
    }

    if (al.following) {
      gameStateBattle.al = new PlayerCharacter(this, 800, 300, "al", 4, "Al", hpObject['Al'], damageObject['Al']);
      if (hpObject['Al'] > 0) {
        this.add.existing(gameStateBattle.al);
        gameStateBattle.al.active = true
        gameStateBattle.al.living = true
      } else {
        gameStateBattle.al.active = false
        gameStateBattle.al.living = false
      }
    }

    if (trevor.following) {
      gameStateBattle.trevor = new PlayerCharacter(this, 750, 350, "trevor", 4, "Jimmy", hpObject['Jimmy'], damageObject['Jimmy']);
      if (hpObject['Jimmy'] > 0) {
        this.add.existing(gameStateBattle.trevor);
        gameStateBattle.trevor.active = true
        gameStateBattle.trevor.living = true
      } else {
        gameStateBattle.trevor.active = false
        gameStateBattle.trevor.living = false
      }
    }

    if (bennett.following) {
      gameStateBattle.bennett = new PlayerCharacter(this, 1001, 325, "bennett", 4, "Bennett", hpObject['Bennett'], damageObject['Bennett']);
      if (hpObject['Bennett'] > 0) {
        this.add.existing(gameStateBattle.bennett);
        gameStateBattle.bennett.active = true
        gameStateBattle.bennett.living = true
      } else {
        gameStateBattle.bennett.active = false
        gameStateBattle.bennett.living = false
      }
    }


    //anims for enemies
    if (bossBattle === true && bossType === 'darkboy') {
      gameStateBattle.enem1.anims.play('darkboy2walk', true);
      gameStateBattle.enem1.flipX = true
    } else if (bossBattle === true && bossType === 'dio') {
      gameStateBattle.enem1.anims.play('diofloat', true);
      //dio anims here
    } else if (bossBattle === true && bossType === 'fratboy2prime') {
      gameStateBattle.enem1.anims.play('fratboy2primewalk', true);
      gameStateBattle.enem1.flipX = true
      gameStateBattle.enem2.anims.play(enems[3][5], true);
      gameStateBattle.enem3.anims.play(enems[4][5], true);
      gameStateBattle.enem4.anims.play(enems[5][5], true);
      gameStateBattle.enem5.anims.play(enems[2][5], true);
    } else if (bossBattle === true && bossType === 'frank') {
      gameStateBattle.enem1.anims.play('frat5huhuh', true);
      gameStateBattle.enem1.flipX = true
    } else {
      gameStateBattle.enem1.anims.play(enems[rr][5], true);
      if (set1.size === 2) {
        gameStateBattle.enem2.anims.play(enems[ss][5], true);
      }
      if (set2.size === 3 && numberOfPlayers >= 2) {
        gameStateBattle.enem3.anims.play(enems[tt][5], true);
      }
      if (set3.size === 4 && numberOfPlayers >= 3) {
        gameStateBattle.enem4.anims.play(enems[pp][5], true);
      }
      if (set4.size === 5 && numberOfPlayers >= 3) {
        gameStateBattle.enem5.anims.play(enems[qq][5], true);
      }
    }

    //animations for sprites
    gameStateBattle.me.anims.play('bouncing', true);
    //gameStateBattle.me.flipX = true;
    if (al.following) {
      gameStateBattle.al.anims.play('alleft', true);
    }
    if (trevor.following) {
      gameStateBattle.trevor.anims.play('trevorright', true);
      gameStateBattle.trevor.flipX = true;
    }
    if (bennett.following) {
      gameStateBattle.bennett.anims.play('bennett_walk', true);
    }

    // array with heroes
    this.heroes = [gameStateBattle.me];
    if (trevor.following) {
      this.heroes.push(gameStateBattle.trevor);
    }
    if (al.following) {
      this.heroes.push(gameStateBattle.al);
    }
    if (bennett.following) {
      this.heroes.push(gameStateBattle.bennett);
    }
    // array with enemies
    if (bossBattle === true && bossType === 'darkboy') {
      this.enemies = [gameStateBattle.enem1]
    } else if (bossBattle === true && bossType === 'dio') {
      this.enemies = [gameStateBattle.enem1]
    } else if (bossBattle === true && bossType === 'fratboy2prime') {
      this.enemies = [gameStateBattle.enem1, gameStateBattle.enem2, gameStateBattle.enem3, gameStateBattle.enem4, gameStateBattle.enem5]
    } else if (bossBattle === true && bossType === 'frank') {
      this.enemies = [gameStateBattle.enem1]
    } else {
      this.enemies = [gameStateBattle.enem1];
      if (set1.size === 2) {
        this.enemies.push(gameStateBattle.enem2)
      }
      if (set2.size === 3 && numberOfPlayers >= 2) {
        this.enemies.push(gameStateBattle.enem3)
      }
      if (set3.size === 4 && numberOfPlayers >= 3) {
        this.enemies.push(gameStateBattle.enem4)
      }
      if (set4.size === 5 && numberOfPlayers >= 3) {
        this.enemies.push(gameStateBattle.enem5)
      }
    }

    this.aliveEnemies = this.enemies

    // array with actions (not sure if this is ever used)
    this.actions = ["Attack", "Special", "Defend", "Items"]
    this.items = ["Gatorade", "Monster", "Hamms"]
    this.specials = specialObject[this.heroes[this.index]]

    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    if (runaway){
      this.index = -1;
    } else {
      this.index = this.units.length-2  // currently active unit
    }
    //currentHero=this.heroes[this.index]

    this.scene.run("UIScene");
  },
  checkVictory: function() {
    var victory = true;
    // if all enemies are dead we have victory
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living)
        victory = false;
        console.log(`${this.enemies[i]} living: ${this.enemies[i].living}`)
    }
    return victory;
  },
  checkGameOver: function() {
    var gameOver1 = true;
    // if all heroes are dead we have game over
    for (var i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living)
        gameOver1 = false;
    }
    return gameOver1
  },
  endBattleVictory: function() {
    // grants experience items and money
    openFightDialogue = false;
    numberOfFights += 1;
    battleBackground = ''
    if (bossBattle && bossType === 'darkboy') {
      exp += 100 * 3 ** (levelObject['Mac'] - 1)
      reward = 10
      money += reward
      items.push('Empty NyQuil')
      gameState.spooky.stop()
    } else if (bossBattle && bossType === 'dio') {
      exp += 200 * 3 ** (levelObject['Mac'] - 1)
      reward = 100
      money += reward
      equipment.push('Dio Band')
      gameState.holyDiver.stop()
      gameState.music.stop()
      gameState.spooky.stop()
      dioshrine.disableBody(true, true)
      dioEnabled = false
    } else if (bossBattle && bossType === 'fratboy2prime') {
      exp += 100 * 3 ** (levelObject['Mac'] - 1)
      reward = 20
      money += reward
      items.push('knife')
      gameState.spooky.stop()
    } else if (bossBattle && bossType === 'frank') {
      exp += 100 * 3 ** (levelObject['Mac'] - 1)
      reward = 25
      money += reward
      gameState.spooky.stop()
    } else {
      exp += this.enemies.length * levelObject['Mac'] * 10;
      reward += Math.round(this.enemies.length * Math.ceil(levelObject['Mac'] / 5) * Math.floor(Math.random() * 3) * 30) / 100;
      money += reward;
      let rewardKeys = Object.keys(randomEncounterRewards);
      let rn = Math.floor(Math.random() * rewardKeys.length);
      let rewardProbability = randomEncounterRewards[rewardKeys[rn]];
      let rn2 = Math.random();
      if (rn2 < rewardProbability) {
        itemReward = rewardKeys[rn];
        if (itemReward === "Andy Capp's Hot Fries" || itemReward === 'Labatt Max Ice' || itemReward === 'Monster' || itemReward === 'Gatorade' || itemReward === 'Hamms' || itemReward === 'Larry Special') {
          all_usable_items[itemReward] += 1;
          if (usable_items[itemReward]) {
            usable_items[itemReward] += 1
          } else {
            usable_items[itemReward] = 1;
          }
          if (itemReward === "Andy Capp's Hot Fries"){
            andycapps += 1;
          } else if (itemReward === "Labatt Max Ice"){
              maxice += 1;
            } else if (itemReward === "Monster"){
                monster += 1;
              } else if (itemReward === "Gatorade"){
                  gatorade += 1;
                } else if (itemReward === "Hamms"){
                    hamms += 1;
                  } else if (itemReward === "Larry Special"){
                      larrySpecial += 1;
                    }
        } else if (itemReward === 'Wife Beater' || itemReward === 'SP Booster' || itemReward === 'Damage Booster' || itemReward === 'HP Booster' || itemReward === 'Fubu Shirt' || itemReward === 'Camo Pants') {
          equipment.push(itemReward)
        }
      };
    }
    exp *= 2 / 3
    exp = Math.floor(exp)
    for (let i = 0; i < this.heroes.length; i++) {
      expObject[this.heroes[i].type] += exp;
    }
    window.setTimeout(() => {
      wonBattle = 1
    }, 1000);
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (var i = 0; i < this.units.length; i++) {
      // link item
      this.units[i].destroy();
      //reset damage indicator
      gameStateBattle.t = 0;
      gameStateBattle.u = 0;
      gameStateBattle.damageText.scaleX = 2;
      gameStateBattle.damageText.scaleY = 2;
      //destroy all status effect animations
      /*
      macX.destroy();
      macBleed.destroy();
      if (trevor.joinParameter && trevor.following) {
          trevorX.destroy()
          trevorBleed.destroy()
      }
      if (bennett.joinParameter && bennett.following) {
        bennettX.destroy()
        bennettBleed.destroy()
      }
      if (al.joinParameter && al.following) {
        alX.destroy()
        alBleed.destroy()
      }
      */
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep('UIScene');
    // return to WorldScene and sleep current BattleScene
    gameState.battlesong1.stop();
    gameState.battlesong2.stop();
    gameState.battlesong3.stop();
    gameState.battlesong4.stop();
    gameState.battlesong5.stop();
    gameState.battlesong6.stop();
    gameState.battlesong7.stop();
    gameState.battlesong8.stop();
    gameState.battlesong9.stop();
    if (bossBattle && (bossType === 'dio' || bossType === 'darkboy')) {
      bossBattle = false;
      this.scene.stop('DarkWorld')
      this.scene.switch('LightWorld')
      gameState.music = this.sound.add('theme');
      worldTheme = 'light'
    } else {
      bossBattle = false;
      this.scene.switch('LightWorld');
    }
  },
  endBattleGameOver: function() {
    this.scene.sleep('UIScene');
    if (bossBattle) {
      gameState.dead.play();
      gameState.spooky.stop();
      gameState.holyDiver.stop();
      gameState.music = this.sound.add('theme');
    } else {
      gameState.dead.play();
      if (gameState.battleSongIndex === 0) {
        gameState.battlesong1.stop();
      } else if (gameState.battleSongIndex === 1) {
        gameState.battlesong2.stop();
      } else if (gameState.battleSongIndex === 2) {
        gameState.battlesong3.stop();
      } else if (gameState.battleSongIndex === 3) {
        gameState.battlesong4.stop();
      } else if (gameState.battleSongIndex === 4) {
        gameState.battlesong5.stop();
      } else if (gameState.battleSongIndex === 5) {
        gameState.battlesong6.stop();
      } else if (gameState.battleSongIndex === 6) {
        gameState.battlesong7.stop();
      } else if (gameState.battleSongIndex === 7) {
        gameState.battlesong8.stop();
      } else if (gameState.battleSongIndex === 8) {
        gameState.battlesong9.stop();
      }
    }
    this.scene.switch('LightWorld');
    gameOver = true;
    bossBattle = false;
    worldTheme = 'light';
  },
  wake: function() {      //this never seems to get called sommehow
      //set hp for party
    gameStateBattle.me.hp = hpObject["Mac"]
    if (bennett.joinParameter && bennett.following) {
      gameStateBattle.bennett.hp = hpObject["Bennett"]
    }
    if (trevor.joinParameter && trevor.following) {
      gameStateBattle.trevor.hp = hpObject["Jimmy"]
    }
    if (al.joinParameter && al.following) {
      gameStateBattle.al.hp = hpObject["Al"]
    }
    gameState.swimNoise.stop()
    this.scene.run('UIScene');
    this.time.addEvent({
      delay: 2000,
      callback: this.exitBattle,
      callbackScope: this
    });
  },
  exitBattle: function() {
    this.scene.sleep('UIScene');
    this.scene.switch('LightWorld');
    gameState.music.play()
  },
  receivePlayerSelection: function(action, target) {
    if (this.UIScene.actionsMenu.menuItems[action]._text == 'Gatorade') {
      if (gatorade === 0) {
        this.index--
      }
      this.units[this.index].gatorade()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Monster') {
      if (monster === 0) {
        this.index--
      }
      this.units[this.index].monster()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Labatt Max Ice') {
      if (maxice === 0) {
        this.index--
      }
      this.units[this.index].maxice()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Hamms') {
      if (hamms === 0) {
        this.index--
      }
      this.units[this.index].hamms()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Larry Special') {
      if (larrySpecial === 0) {
        this.index--
      }
      this.units[this.index].larrySpecial()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Liquor') {
      if (liquorItem === 0) {
        this.index--
      }
      this.units[this.index].liquor()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Attack') {
      //attack animations
        this.units[this.index].attack(this.aliveEnemies[target]);
      settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
      window.setTimeout(() => {
        settingDepth = false;
      }, 2999);
      if (this.units[this.index].type === "Mac") {
        r = Math.floor(Math.random() * 4);
        if (r === 0) {
          gameStateBattle.me.flipX = false;
          gameStateBattle.me.anims.play('attack_improved', false);
          //setting locations and depths for each hit
          gameStateBattle.me.x = this.aliveEnemies[target].x + 80
          gameStateBattle.me.y = this.aliveEnemies[target].y + 1
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
          gameState.punchSound.play();
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y - 1
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
            gameState.punchSound.play();
          }, 500);
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y + 1
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y - 1)
            gameState.bodyhit.play();
          }, 1000);
        } else if (r === 1) {
          gameStateBattle.me.flipX = false;
          gameStateBattle.me.anims.play('attack_improved2', false);
          //setting locations and depths for each hit
          gameStateBattle.me.x = this.aliveEnemies[target].x + 80
          gameStateBattle.me.y = this.aliveEnemies[target].y + 1
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
          gameState.punchSound.play();
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y + 1
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
            gameState.punchSound.play();
          }, 500);
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y - 20
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
            gameState.bodyhit.play();
          }, 1000);
        } else if (r === 2) {
          gameStateBattle.me.flipX = false;
          gameStateBattle.me.anims.play('attack_improved3', false);
          //setting locations and depths for each hit
          gameStateBattle.me.x = this.aliveEnemies[target].x + 80
          gameStateBattle.me.y = this.aliveEnemies[target].y + 1
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
          gameState.punchSound.play();
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y - 1
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y - 1)
            gameState.punchSound.play();
          }, 500);
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y - 25
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
            gameState.bodyhit.play();
          }, 1000);
        } else if (r === 3) {
          gameStateBattle.me.flipX = false;
          gameStateBattle.me.anims.play('attack_improved4', false);
          //setting locations and depths for each hit
          gameStateBattle.me.x = this.aliveEnemies[target].x + 75
          gameStateBattle.me.y = this.aliveEnemies[target].y + 1
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y - 1)
          gameState.punchSound.play();
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 73
            gameStateBattle.me.y = this.aliveEnemies[target].y - 10
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
            gameState.bodyhit.play();
          }, 500);
          window.setTimeout(() => {
            gameStateBattle.me.x = this.aliveEnemies[target].x + 75
            gameStateBattle.me.y = this.aliveEnemies[target].y - 10
            gameStateBattle.me.setDepth(this.aliveEnemies[target].y - 1)
            gameState.bodyhit.play();
          }, 1000);
        }

        window.setTimeout(() => {
          gameStateBattle.me.x = 850
          gameStateBattle.me.y = 250
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 2999);
      } else if (this.units[this.index].type === "Al") {
        airsoft.x = this.aliveEnemies[target].x + 100
        airsoft.y = this.aliveEnemies[target].y + 20
        airsoft.anims.play('airsoftShoot',true);
        gameStateBattle.al.x = this.aliveEnemies[target].x + 260
        gameStateBattle.al.y = this.aliveEnemies[target].y + 20
        gameStateBattle.al.anims.play('alattack', false);
        gameState.airsoft.play();
        window.setTimeout(() => {
          airsoft.x = -50
          airsoft.y = -50
          gameStateBattle.al.x = 800
          gameStateBattle.al.y = 300
          gameStateBattle.al.anims.play('alleft', true);
        }, 2999);
      } else if (this.units[this.index].type === "Jimmy") {
        gameStateBattle.trevor.setDepth(this.aliveEnemies[target].y - 1)
        window.setTimeout(() => {
          this.smack.play();
        }, 300);
        window.setTimeout(() => {
          gameStateBattle.trevor.setDepth(this.aliveEnemies[target].y + 1)
          this.smack.play();
        }, 300+666);
        window.setTimeout(() => {
          gameStateBattle.trevor.setDepth(this.aliveEnemies[target].y - 1)
          this.smack.play();
        }, 300+2*666);
        window.setTimeout(() => {
          gameStateBattle.trevor.setDepth(this.aliveEnemies[target].y + 1)
          this.smack.play();
        }, 300+3*666);
        gameStateBattle.trevor.x = this.aliveEnemies[target].x + 61
        gameStateBattle.trevor.y = this.aliveEnemies[target].y - 10
        gameStateBattle.trevor.anims.play('trevorslap', false);
        gameStateBattle.trevor.flipX = false;
        window.setTimeout(() => {
          gameStateBattle.trevor.x = 750
          gameStateBattle.trevor.y = 350
          gameStateBattle.trevor.anims.play('trevorright', true);
          gameStateBattle.trevor.flipX = true;
        }, 2999);
      } else if (this.units[this.index].type === "Bennett") {
        gameStateBattle.bennett.x = this.aliveEnemies[target].x + 60
        gameStateBattle.bennett.y = this.aliveEnemies[target].y - 30
        gameStateBattle.bennett.anims.play('bennett_attack', false);
        gameState.bodyhit.play();
        window.setTimeout(() => {
          gameStateBattle.bennett.x = this.aliveEnemies[target].x + 140
          gameStateBattle.bennett.y = this.aliveEnemies[target].y + 30
          gameStateBattle.bennett.anims.play('bennett_attack', true);
        }, 1000);
        window.setTimeout(() => {
          gameStateBattle.bennett.x = this.aliveEnemies[target].x + 55
          gameStateBattle.bennett.y = this.aliveEnemies[target].y + 37
          gameStateBattle.bennett.anims.play('bennett_attack', true);
          gameState.bodyhit.play();
        }, 2000);
        window.setTimeout(() => {
          gameStateBattle.bennett.x = 1001
          gameStateBattle.bennett.y = 325
          gameStateBattle.bennett.anims.play('bennett_walk', true);
        }, 2999);
      }
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Defend') {
      this.units[this.index].defend()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Special') {
      this.UIScene.actionsMenu.specialRemap()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Items') {
      this.UIScene.actionsMenu.itemRemap()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Muay Thai Combo (3)') {
      if (spObject['Mac'] >= 3) {
        spObject['Mac'] -= 3
        this.units[this.index].special(this.aliveEnemies[target])
        gameStateBattle.me.x = this.aliveEnemies[target].x + 80;
        gameStateBattle.me.y = this.aliveEnemies[target].y;
        //gameStateBattle.me.flipX = false;
        gameStateBattle.me.anims.play('special_combo', false);
        gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
        //front front back front front back
        settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
        window.setTimeout(() => {
          settingDepth = false;
        }, 2999);
        gameState.punchSound.play();
        window.setTimeout(() => {
          gameState.punchSound.play();
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
        }, 430);
        window.setTimeout(() => {
          gameState.punchSound.play();
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y - 1)
        }, 430*2);
        window.setTimeout(() => {
          gameState.punchSound.play();
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
        }, 430*3);
        window.setTimeout(() => {
          gameState.punchSound.play();
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y + 1)
        }, 430*4);
        window.setTimeout(() => {
          gameState.punchSound.play();
          gameStateBattle.me.setDepth(this.aliveEnemies[target].y - 1)
        }, 430*5);
        window.setTimeout(() => {
          gameStateBattle.me.x = 850;
          gameStateBattle.me.y = 250;
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 3500);
      } else { // if you dont have enough SP, go again
        this.scene.scene.events.emit("Message", "Shiiiit you ain't got the SP for that shiit");
        this.index--;
      }
      this.UIScene.actionsMenu.actionsRemap()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Fuck Everybody Up (8)') {
      if (spObject['Mac'] >= 8) {
        spObject['Mac'] -= 8
        gameStateBattle.me.flipX = false;
        gameStateBattle.me.anims.play('fuck_everybody_up', false);
        /*
        for (let i=0;i<6;i++){
            this.units[this.index].attack(this.aliveEnemies[i%this.aliveEnemies.length])
        }*/
        for (let i = 0; i < 6; i++) {
          window.setTimeout(() => {
            gameState.punchSound.play()
            this.units[this.index].attack(this.aliveEnemies[i % this.aliveEnemies.length])
            gameStateBattle.me.x = this.aliveEnemies[i % this.aliveEnemies.length].x + 80;
            gameStateBattle.me.y = this.aliveEnemies[i % this.aliveEnemies.length].y;
          }, 500 * i);
        }
        window.setTimeout(() => {
          gameStateBattle.me.x = 850;
          gameStateBattle.me.y = 250;
          //gameStateBattle.me.flipX = true;
          gameStateBattle.me.anims.play('bouncing', true);
        }, 3500);
      } else { // if you dont have enough SP, go again
        this.scene.scene.events.emit("Message", "Shiiiit you ain't got the SP for that shiit");
        this.index--;
      }
      this.UIScene.actionsMenu.actionsRemap()
    }
    //special attack for Jimmy
    else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Double Smack (4)') {
      if (spObject['Jimmy'] >= 4) {
        spObject['Jimmy'] -= 4
        this.units[this.index].special(this.aliveEnemies[target])
        gameStateBattle.trevor.x = this.aliveEnemies[target].x + 61;
        gameStateBattle.trevor.y = this.aliveEnemies[target].y - 10;
        gameStateBattle.trevor.anims.play('trevorslap', false);
        gameStateBattle.trevor.flipX = false;
        window.setTimeout(() => {
          this.smack.play();
        }, 300);
        window.setTimeout(() => {
          gameStateBattle.trevor.setDepth(this.aliveEnemies[target].y + 1)
          this.smack.play();
        }, 300+666);
        window.setTimeout(() => {
          gameStateBattle.trevor.setDepth(this.aliveEnemies[target+1].y - 1)
          this.smack.play();
        }, 300+2*666);
        window.setTimeout(() => {
          gameStateBattle.trevor.setDepth(this.aliveEnemies[target+1].y + 1)
          this.smack.play();
        }, 300+3*666);
        window.setTimeout(() => {
          this.units[this.index].special(this.aliveEnemies[target + 1])
          gameStateBattle.trevor.x = this.aliveEnemies[target + 1].x + 61;
          gameStateBattle.trevor.y = this.aliveEnemies[target + 1].y - 10;
        }, 1500);
        window.setTimeout(() => {
          gameStateBattle.trevor.x = 750;
          gameStateBattle.trevor.y = 350;
          gameStateBattle.trevor.anims.play('trevorright', true);
          gameStateBattle.trevor.flipX = true;
        }, 2999);
      } else { // if you dont have enough SP, go again
        this.scene.scene.events.emit("Message", "Shiiiit you ain't got the SP for that shiit");
        this.index--;
      }
      this.UIScene.actionsMenu.actionsRemap()
    }
    //special attack for Al
    else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Blast Errbody (5)') {
      if (spObject['Al'] >= 5) {
        spObject['Al'] -= 5
        this.units[this.index].special(this.aliveEnemies[target])
        gameStateBattle.al.x = this.aliveEnemies[target].x + 200;
        gameStateBattle.al.y = this.aliveEnemies[target].y;
        gameStateBattle.al.anims.play('alattack', false);
        gameState.airsoft.play();
        window.setTimeout(() => {
          gameState.beatbox.play();
        }, 500);
        window.setTimeout(() => {
          this.units[this.index].special(this.aliveEnemies[target + 1])
          gameStateBattle.al.angle = -7
          gameState.airsoft.play();
        }, 1000);
        window.setTimeout(() => {
          this.units[this.index].special(this.aliveEnemies[target - 1])
          gameStateBattle.al.angle = 7
          gameState.airsoft.play();
        }, 2000);
        window.setTimeout(() => {
          gameStateBattle.al.angle = 0
          gameStateBattle.al.x = 800;
          gameStateBattle.al.y = 300;
          gameStateBattle.al.anims.play('alleft', true);
        }, 2999);
      } else { // if you dont have enough SP, go again
        this.scene.scene.events.emit("Message", "Shiiiit you ain't got the SP for that shiit");
        this.index--;
      }
      this.UIScene.actionsMenu.actionsRemap()
    } else if (this.UIScene.actionsMenu.menuItems[action]._text == 'Dirty Combo (7)') {
      if (spObject['Bennett'] >= 7) {
        spObject['Bennett'] -= 7
        this.units[this.index].special(this.aliveEnemies[target])
        gameStateBattle.bennett.x = this.aliveEnemies[target].x + 55;
        gameStateBattle.bennett.y = this.aliveEnemies[target].y + 10;
        gameStateBattle.bennett.anims.play('bennett_special_attack', false);
        gameState.bodyhit.play();
        window.setTimeout(() => {
          gameState.bodyhit.play();
        }, 500);
        window.setTimeout(() => {
          gameStateBattle.bennett.x = this.aliveEnemies[target].x + 48;
          gameStateBattle.bennett.y = this.aliveEnemies[target].y;
          gameState.bitenoise.play();
        }, 1000);
        window.setTimeout(() => {
          gameStateBattle.bennett.x = 1001
          gameStateBattle.bennett.y = 325
          gameStateBattle.bennett.anims.play('bennett_walk', true);
        }, 2999);
      } else { // if you dont have enough SP, go again
        this.scene.scene.events.emit("Message", "Shiiiit you ain't got the SP for that shiit");
        this.index--;
      }
      this.UIScene.actionsMenu.actionsRemap()
    }

    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this
    });

  },
  nextTurn: function() {
    // map hero menu items to heroes
    this.UIScene.remapHeroes();
    // map enemies menu items to enemies
    this.UIScene.remapEnemies();
    //to decrease blindness for hero
    if (this.units[this.index]) {
      if (this.index < this.heroes.length && blindObject[this.units[this.index].type] > 0) {
        blindObject[this.units[this.index].type] -= 1
      }
      if (this.index < this.heroes.length && bleedingObject[this.units[this.index].type] > 0) {
        bleedingObject[this.units[this.index].type] -= 1
        gameStateBattle.t = 0;
        gameStateBattle.u = 0;
        gameStateBattle.damageText.scaleX = 2;
        gameStateBattle.damageText.scaleY = 2;
        let dmm = Math.floor(this.units[this.index].hp * .1) + 5
        this.scene.scene.events.emit("damageIndicator", [dmm, this.units[this.index].x, this.units[this.index].y]);
        this.units[this.index].hp -= dmm
        hpObject[this.units[this.index].type] -= dmm;
      }
    }
    // if we have victory or game over
    if (this.checkVictory()) {
      this.endBattleVictory();
      return;
    }
    if (this.checkGameOver()) {
      this.endBattleGameOver();
      return;
    }
    window.setTimeout(() => {
      do {
        // currently active unit
        this.index++;
        // if there are no more units, we start again from the first one
        if (this.index >= this.units.length) {
          this.index = 0;
        }
        if (this.index < this.heroes.length) {
          currentHero = this.units[this.index].type
        }
      } while (!this.units[this.index].living);
      // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        // we need the player to select action and then enemy
        this.events.emit("PlayerSelect", this.index);
      } else { // else if its enemy unit
        // pick random living hero to be attacked
        var r;
        do {
          r = Math.floor(Math.random() * this.heroes.length);
        } while (!this.heroes[r].living)
        // call the enemy's attack function
        // if you paid crackhead 10 he will attack his own teammates
        if (this.units[this.index].type === "Melvin" && crackheadJoin) {
          r = Math.floor(Math.random() * this.enemies.length);
          if (this.enemies[r].type==="Melvin"){
            if (this.enemies.length===1){
              this.endBattleVictory();
            }
          } else {
              this.units[this.index].attack(this.enemies[r]);
          }
        } else {
            this.units[this.index].attack(this.heroes[r]);
        }
        currentXY = {
          x: JSON.parse(JSON.stringify(this.units[this.index].x)),
          y: JSON.parse(JSON.stringify(this.units[this.index].y))
        };
        //attack locations for enemies
        if (this.units[this.index].type === "Melvin" && crackheadJoin) {
          settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
          this.units[this.index].setScale(.85)
          window.setTimeout(() => {
            settingDepth = false;
            this.units[this.index].setScale(1)
          }, 2000);
          this.units[this.index].setDepth(this.enemies[r].y - 1)
          this.units[this.index].x = this.enemies[r].x-20;
          this.units[this.index].y = this.enemies[r].y+5;
        } else if (this.units[this.index].type === "Melvin" && !crackheadJoin) {
          settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
          this.units[this.index].setScale(.85)
          window.setTimeout(() => {
            settingDepth = false;
            this.units[this.index].setScale(1)
          }, 2000);
          this.units[this.index].setDepth(this.heroes[r].y - 1)
          this.units[this.index].x = this.heroes[r].x-20;
          this.units[this.index].y = this.heroes[r].y+5;
        } else if (this.units[this.index].type === "Chad") {
          settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
          window.setTimeout(() => {
            settingDepth = false;
          }, 2000);
          this.units[this.index].setDepth(this.heroes[r].y + 1)
          this.units[this.index].x = this.heroes[r].x-50;
          this.units[this.index].y = this.heroes[r].y-15;
          window.setTimeout(() => {
            this.units[this.index].x = this.heroes[r].x-100;
            this.units[this.index].y = this.heroes[r].y-15;
          }, 500);
        } else if (this.units[this.index].type === "Dylan") {
          this.units[this.index].x = this.heroes[r].x-210;
          this.units[this.index].y = this.heroes[r].y-15;
          spray.x = this.heroes[r].x-60;
          spray.y = this.heroes[r].y- 50;
          spray.anims.play('spray',true)
          window.setTimeout(() => {
            spray.x = -50
            spray.y = -50
          }, 2000);
        }
        else if (this.units[this.index].type === "Jackson") {
          this.units[this.index].x = this.heroes[r].x - 70;
          this.units[this.index].y = this.heroes[r].y;
          settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
          window.setTimeout(() => {
            settingDepth = false;
          }, 2000);
          this.units[this.index].setDepth(this.heroes[r].y + 1)
        } else if (this.units[this.index].type === "Cam") {
          window.setTimeout(() => {
            mohawkStartingYValue = this.units[this.index].y-50;
            throwingMohawk = true;
            throwingMohawkTarget.push(this.heroes[r])
            throwingAngle = Math.atan((this.heroes[r].y-this.units[this.index].y)/(this.heroes[r].x-this.units[this.index].x))
            mohawk.x = this.units[this.index].x;
            mohawk.y = this.units[this.index].y-50;
          }, 300);
          window.setTimeout(() => {
            throwingMohawk = false;
          }, 3000);
        } else if (this.units[this.index].type === "Derek") {
          settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
          window.setTimeout(() => {
            settingDepth = false;
            this.units[this.index].setScale(1);
          }, 2000);
          this.units[this.index].setDepth(this.heroes[r].y - 1)
          this.units[this.index].x = this.heroes[r].x-120;
          this.units[this.index].y = this.heroes[r].y;
          window.setTimeout(() => {
            this.units[this.index].setScale(.85)
            this.units[this.index].x = this.heroes[r].x - 35;
            this.units[this.index].y = this.heroes[r].y - 25;
          }, 300);
          window.setTimeout(() => {
            this.units[this.index].x = this.heroes[r].x - 80;
            this.units[this.index].y = this.heroes[r].y - 25;
          }, 1000);
        } else if (this.units[this.index].type === "Bill") {
          settingDepth = true; //do this so we can set custom depth (in a way other than by y-value)
          this.units[this.index].setScale(.8);
          window.setTimeout(() => {
            settingDepth = false;
            this.units[this.index].setScale(1);
            this.billBackWalk = false;
            this.units[this.index].flipX = false;
          }, 2000);
          this.units[this.index].setDepth(this.heroes[r].y + 1)
            this.units[this.index].x = this.heroes[r].x - 45;
            this.units[this.index].y = this.heroes[r].y;
          window.setTimeout(() => {
            this.units[this.index].anims.play(animObject[this.units[this.index].type][0], true);
            this.billBackWalk = true;
          }, 800);
        } else {
          this.units[this.index].x = this.heroes[r].x - 70;
          this.units[this.index].y = this.heroes[r].y;
        }
        //anims for enemy attacks
        this.units[this.index].anims.play(animObject[this.units[this.index].type][1], false);
        //should be able to do the following in one line but its not working... oh well
        if (sfxObject[this.units[this.index].type] == 'bodyhit') {
          gameState.bodyhit.play();
        } else if (sfxObject[this.units[this.index].type] == 'slash') {
          gameState.slash.play();
        } else if (sfxObject[this.units[this.index].type] == 'spray') {
          gameState.spray.play();
        } else if (sfxObject[this.units[this.index].type] == 'bitenoise') {
          gameState.bitenoise.play();
        } else if (sfxObject[this.units[this.index].type] == 'stabnoise') {
          gameState.stabnoise.play();
        } else if (sfxObject[this.units[this.index].type] == 'shatter') {
          gameState.shatter.play();
        } else if (sfxObject[this.units[this.index].type] == 'throw') {
          gameState.throw.play();
        }

        window.setTimeout(() => {
          this.units[this.index].x = currentXY.x;
          this.units[this.index].y = currentXY.y;
          this.units[this.index].anims.play(animObject[this.units[this.index].type][0], true);
        }, 2000);

        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({
          delay: 3000,
          callback: this.nextTurn,
          callbackScope: this
        });
      }
    }, 500);
  },
});

var UIScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function UIScene() {
      Phaser.Scene.call(this, {
        key: 'UIScene'
      });
    },
  createMenu: function() {
    // map hero menu items to heroes
    this.remapHeroes();
    // map enemies menu items to enemies
    this.remapEnemies();
    //remap actions
    this.actionsMenu.actionsRemap()
    // first move
    this.battleScene.nextTurn();
  },
  onEnemy: function(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection(actionIndex, index);
  },
  onSelectedAction: function(index) {
    if (this.actionsMenu.menuItems[actionIndex]._text == 'Attack') {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(index);
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Defend') {
      this.battleScene.receivePlayerSelection(1, 0);
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Items') {
      this.actionsMenu.clear()
      this.actionsMenu.itemRemap()
      this.actionsMenu.select(0)
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Special') {
      this.actionsMenu.clear()
      this.actionsMenu.specialRemap()
      this.actionsMenu.select(0)
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Muay Thai Combo (3)') {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(index);
      //this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Fuck Everybody Up (8)') {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(index);
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Blast Errbody (5)') {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(index);
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Double Smack (4)') {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(index);
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Dirty Combo (7)') {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(index);
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Gatorade') {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Monster') {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == "Labatt Max Ice") {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == "Andy Capp's Hot Fries") {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Hamms') {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Liquor') {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    } else if (this.actionsMenu.menuItems[actionIndex]._text == 'Larry Special') {
      this.battleScene.receivePlayerSelection(actionIndex, 0);
      this.actionsMenu.actionsRemap()
      this.actionsMenu.deselect()
    }

  },
  onEndBattle: function() {},
  onPlayerSelect: function(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select();
    this.currentMenu = this.actionsMenu;
  },
  onKeyInput: function(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
        gameState.menuSelect.play()
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
        gameState.menuSelect.play()
      } else if (event.code === "ArrowRight" || event.code === "Shift") {

      } else if (event.code === "Enter") {
        this.currentMenu.confirm();
        gameState.menuSelect2.play()
      }
    }
  },
  remapHeroes: function() {
    var heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  },
  remapEnemies: function() {
    var enemies = this.battleScene.enemies;
    aliveEnemies = []
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].living) {
        aliveEnemies.push(enemies[i])
      }
    }
    this.enemiesMenu.remap(aliveEnemies);
    this.battleScene.aliveEnemies = aliveEnemies;
  },
  //not sure if i'm going to use this
  remapActions: function() {
    var actions = this.battleScene.actions;
    this.actionsMenu.remap(actions);
  },

  create: function() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(3, 0xb39c0e);
    this.graphics.fillStyle(0x000000, 1);
    this.graphics.strokeRect(0 + 5, 450, 400 - 5, 150 - 5);
    this.graphics.fillRect(0 + 5, 450, 400 - 5, 150 - 5);
    this.graphics.strokeRect(400 + 5, 450, 400 - 5, 150 - 5);
    this.graphics.fillRect(400 + 5, 450, 400 - 5, 150 - 5);
    this.graphics.strokeRect(800 + 5, 450, 400 - 5, 150 - 5);
    this.graphics.fillRect(800 + 5, 450, 400 - 5, 150 - 5);

    // basic container to hold all menus
    this.menus = this.add.container();
    this.heroesMenu = new HeroesMenu(1000 - 195, 500 - 50, this);
    this.actionsMenu = new ActionsMenu(600 - 195, 500 - 50, this);
    this.enemiesMenu = new EnemiesMenu(200 - 195, 500 - 50, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get("BattleScene");
    // listen for keyboard events
    this.input.keyboard.on("keydown", this.onKeyInput, this);

    // when its player units turn to move
    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

    // when the action on the menu is selected
    // for now we have only one action so we dont send an action id... fix needed
    this.events.on("SelectedAction", this.onSelectedAction, this);

    // an enemy is selected
    this.events.on("Enemy", this.onEnemy, this);

    // when the scene receives wake event
    this.sys.events.on('wake', this.createMenu, this);

    // the message describing the current action
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);
    this.createMenu();
    this.scene.bringToTop();
  },
});
