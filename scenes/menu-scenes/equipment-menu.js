const gameState4 = {};
let redisplay=true;

var EquipmentMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, {
      "key": "EquipmentMenu"
    });
  },
  wake: function (){
    redisplay=true
  },
  init: function(data) {
    //sumn
  },
  preload: function() {},
  create: function() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    //background and border
    gameState4.border = this.add.rectangle(600, 300, 1006, 506, 0xb39c0e);
    gameState4.narrative_background = this.add.rectangle(600, 300, 1000, 500, 0x000);

    //switch to menu 1
    gameState4.pausemenu_button1 = this.add.rectangle(150, 70, 20, 20, 0xfff);
    gameState4.pausemenu_button1.setInteractive()
    gameState4.pausemenu_button1.on('pointerup', function() {
      scene_number=1
    }, this);

    //switch to menu 2
    gameState4.pausemenu_button2 = this.add.rectangle(180, 70, 20, 20, 0xfff);
    gameState4.pausemenu_button2.setInteractive()
    gameState4.pausemenu_button2.on('pointerup', function() {
      scene_number=7
    }, this);

    //switch to menu 3
    gameState4.pausemenu_button3 = this.add.rectangle(210, 70, 20, 20, 0xfff);
    gameState2.pausemenu_button_white3 = this.add.rectangle(210, 70, 16, 16, 0x000);
    gameState4.pausemenu_button3.setInteractive()
    gameState4.pausemenu_button3.on('pointerup', function() {
      scene_number=8
    }, this);

    //switch to menu 4
    gameState4.pausemenu_button4 = this.add.rectangle(240, 70, 20, 20, 0xfff);
    gameState4.pausemenu_button4.setInteractive()
    gameState4.pausemenu_button4.on('pointerup', function() {
      scene_number=9
    }, this);


    //exit button
    gameState4.exit_button = this.add.rectangle(1080, 70, 20, 20, 0xfff);
    gameState4.exit_button.setInteractive()
    gameState4.exit_button.on('pointerup', function() {
      launchParameter=false;
      this.scene.stop();
      scene_number = 2;
      pause = false;
    }, this);
    exitText = this.add.text(1080-7, 70-14, 'x', {
      fontSize: '25px',
      fill: '#fff'
    });

    menuText = this.add.text(500, 60, "Equipment", {
      fontSize: '30px',
      fill: '#fff'
    });

    inventoryText = this.add.text(690, 100, `Inventory: `, {
      fontSize: '25px',
      fill: '#fff'
    });

    gameState4.newText={}
    let xcoord4 = 570;
    let ycoord4 = 140;
    for (a_item of Object.keys(equipment)) {
      let unequipped = equipment[a_item]['numberOwned'] - equipment[a_item]['equipped']
      if (unequipped>0){
        for (let i=0;i<unequipped;i++){
          //console.log(a_item)
          gameState4.newText[a_item]=this.add.text(xcoord4, ycoord4, `${a_item}`, {
            fontSize: '15px',
            fill: playerColorsEquip[equipment[a_item]['character']]
          }).setDepth(1);
          gameState4.newText[a_item].setInteractive();
          this.input.setDraggable(gameState4.newText[a_item]);
          if (ycoord4>=500){
            xcoord4=810
            ycoord4=140
          }
          else{
            ycoord4+=30
          }
        }
      }
    }

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
  });

  var borderWidth = 2
  gameState4.tempBackground = this.add.rectangle(0, 0, 400, 200, 0x000000).setOrigin(0, 0);
  gameState4.tempBackground.visible = false;
  gameState4.tempBackground.setDepth(2);
  gameState4.tempBackground2 = this.add.rectangle(0, 0, 400 + 2*borderWidth, 200 + 2*borderWidth, 0xb39c0e).setOrigin(0, 0);
  gameState4.tempBackground2.visible = false;
  gameState4.tempBackground2.setDepth(1);

  var style = {
    fontSize: '15pt',
    //font: '20pt Arial',
    fill: 'white',
    align: 'left',
    wordWrap: {
      width: 450,
      callback: null,
      callbackScope: null,
      useAdvancedWrap: false
  },
  };
  gameState4.tempText = this.add.text(0, 0, ``, style);
  gameState4.tempText.visible = false;
  gameState4.tempText.setDepth(3);

  this.input.on('pointerover', function (pointer, justOver) {
    if (equipment[justOver[0]._text]){
      gameState4.tempBackground.x = pointer.x + 50;
      gameState4.tempBackground.y = pointer.y - 15;
      gameState4.tempBackground.visible = true;
      gameState4.tempBackground2.x = pointer.x + 50 - borderWidth;
      gameState4.tempBackground2.y = pointer.y - 15 - borderWidth;
      gameState4.tempBackground2.visible = true;
      gameState4.tempText.visible=true;
      gameState4.tempText.setText(`Type: ${equipment[justOver[0]._text]['type']} \nDef: ${equipment[justOver[0]._text]['def']} \nEffect: ${equipment[justOver[0]._text]['effect']} \nvalue: $${equipment[justOver[0]._text]['value']}`);
      gameState4.tempText.x=gameState4.tempBackground.x;
      gameState4.tempText.y=gameState4.tempBackground.y;
      gameState4.tempBackground.width=gameState4.tempText.width;
      gameState4.tempBackground.height=gameState4.tempText.height;
      gameState4.tempBackground2.width = gameState4.tempText.width + 2*borderWidth;
      gameState4.tempBackground2.height = gameState4.tempText.height + 2*borderWidth;
    }
});

this.input.on('pointerout', function (pointer, justOut) {
  if (equipment[justOut[0]._text]){
    gameState4.tempText.visible=false
    gameState4.tempBackground.visible=false
    gameState4.tempBackground2.visible=false
  }
});

let nameFontSize = '20px';
let typeFontSize = '15px';
let vgap1 = 25;
let vgap2 = 15;
let vgap3 = 50;
let hgap1 = 70;
let hgap2 = 140;

function pickStyle(font, char, align='left'){
  return {
    fontSize: font,
    fill: playerColorsEquip[char],
    align: align
  }
}

    macText = this.add.text(250, 100, `Mac`, pickStyle(nameFontSize, 'Mac','left')).setOrigin(.5,0);
    // Mac Body
    macBodyText = this.add.text(245, 100 + vgap1, `Body: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
    macBodyEquippedText = this.add.text(255, 100 + vgap1, `${equipped["Mac"].upper}`, pickStyle(typeFontSize, 'Mac','left')).setOrigin(0,0).setDepth(1);
    macBodyEquippedText.setInteractive().on('pointerdown', function(){
      if (macBodyEquippedText._text!==''){
        unequip(equipped["Mac"].upper,"Mac")
        equipped["Mac"].upper=''
        macBodyEquippedText.setText('')
        redisplay=true
      }
    })
    //  A drop zone for mac body text
    var zoneMacBody = this.add.zone(340, 100 + vgap1 +15, 170, 30).setRectangleDropZone(170, 30);
    /*
    var graphicsMacBody = this.add.graphics();
    graphicsMacBody.lineStyle(2, 0xffff00);
    graphicsMacBody.strokeRect(zoneMacBody.x - zoneMacBody.input.hitArea.width/2, zoneMacBody.y-zoneMacBody.input.hitArea.height/2, zoneMacBody.input.hitArea.width, zoneMacBody.input.hitArea.height);
    graphicsMacBody.visible=false;
    */

    //Mac Legs
    macLegsText = this.add.text(245, 100 +vgap1 + vgap2, `Legs: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
    macLegsEquippedText = this.add.text(255, 100 +vgap1 + vgap2, `${equipped["Mac"].lower}`, pickStyle(typeFontSize, 'Mac','left')).setOrigin(0,0).setDepth(1);
    macLegsEquippedText.setInteractive().on('pointerdown', function(){
      if (macLegsEquippedText._text!==''){
        unequip(equipped["Mac"].lower,"Mac")
        equipped["Mac"].lower=''
        macLegsEquippedText.setText('')
        redisplay=true
      }
    })
    var zoneMacLegs = this.add.zone(340, 100+vgap1+vgap2+15, 170, 30).setRectangleDropZone(170, 30);

    //mac accessory
    macAccessoryText = this.add.text(245, 100 + vgap1+2*vgap2, `Accessory: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
    macAccessoryEquippedText = this.add.text(255, 100 + vgap1+2*vgap2, `${equipped["Mac"].accessory}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
    macAccessoryEquippedText.setInteractive().on('pointerdown', function(){
      if (macAccessoryEquippedText._text!==''){
        unequip(equipped["Mac"].accessory,"Mac")
        equipped["Mac"].accessory=''
        macAccessoryEquippedText.setText('')
        redisplay=true
      }
    })
    var zoneMacAccessory = this.add.zone(340, 100+vgap1+2*vgap2 + 15, 170, 30).setRectangleDropZone(170, 30);

    //mac accessory2
    macAccessory2Text = this.add.text(245, 100 + vgap1+3*vgap2, `Accessory 2: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
    macAccessory2EquippedText = this.add.text(255, 100 + vgap1+3*vgap2, `${equipped["Mac"].accessory2}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
    macAccessory2EquippedText.setInteractive().on('pointerdown', function(){
      if (macAccessory2EquippedText._text!==''){
        unequip(equipped["Mac"].accessory2,"Mac")
        equipped["Mac"].accessory2=''
        macAccessory2EquippedText.setText('')
        redisplay=true
      }
    })
    var zoneMacAccessory2 = this.add.zone(340, 100+vgap1+3*vgap2 + 15, 170, 30).setRectangleDropZone(170, 30);

    if (al.following){
      alText = this.add.text(250, 100+vgap1 + 2*vgap2 + vgap3, `Al`, pickStyle(nameFontSize, 'Al','left')).setOrigin(.5,0);
      //al body
      alBodyText = this.add.text(245, 100 + 2*vgap1 + 2*vgap2 + vgap3, `Body: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      alBodyEquippedText = this.add.text(255, 100 + 2*vgap1 + 2*vgap2 + vgap3, `${equipped["Al"].upper}`, pickStyle(typeFontSize, 'Al','left')).setOrigin(0,0).setDepth(1);
      alBodyEquippedText.setInteractive().on('pointerdown', function(){
        if (alBodyEquippedText._text!==''){
          unequip(equipped["Al"].upper,"Al")
          equipped["Al"].upper=''
          alBodyEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneAlBody = this.add.zone(340, 100 + 2*vgap1 + 2*vgap2 + vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      //al legs
      alLegsText = this.add.text(245, 100 + 2*vgap1 + 3*vgap2 + vgap3, `Legs: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      alLegsEquippedText = this.add.text(255, 100 + 2*vgap1 + 3*vgap2 + vgap3, `${equipped["Al"].lower}`, pickStyle(typeFontSize, 'Al','left')).setOrigin(0,0).setDepth(1);
      alLegsEquippedText.setInteractive().on('pointerdown', function(){
        if (alLegsEquippedText._text!==''){
          unequip(equipped["Al"].lower,"Al")
          equipped["Al"].lower=''
          alLegsEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneAlLegs = this.add.zone(340, 100 + 2*vgap1 + 3*vgap2 + vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      //al accessory
      alAccessoryText = this.add.text(245, 100 + 2*vgap1 + 4*vgap2 + vgap3, `Accessory: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      alAccessoryEquippedText = this.add.text(255, 100 + 2*vgap1 + 4*vgap2 + vgap3, `${equipped["Al"].accessory}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
      alAccessoryEquippedText.setInteractive().on('pointerdown', function(){
        if (alAccessoryEquippedText._text!==''){
          unequip(equipped["Al"].accessory,"Al")
          equipped["Al"].accessory=''
          alAccessoryEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneAlAccessory = this.add.zone(340, 100 + 2*vgap1 + 4*vgap2 + vgap3 +15, 170, 30).setRectangleDropZone(170, 30);

    //al accessory2
    alAccessory2Text = this.add.text(245, 100 + 2*vgap1 + 5*vgap2 + vgap3, `Accessory 2: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
    alAccessory2EquippedText = this.add.text(255, 100 + 2*vgap1 + 5*vgap2 + vgap3, `${equipped["Al"].accessory2}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
    alAccessory2EquippedText.setInteractive().on('pointerdown', function(){
      if (alAccessory2EquippedText._text!==''){
        unequip(equipped["Al"].accessory2,"Al")
        equipped["Al"].accessory2=''
        alAccessory2EquippedText.setText('')
        redisplay=true
      }
    })
    var zoneAlAccessory2 = this.add.zone(340, 100 + 2*vgap1 + 5*vgap2 + vgap3 +15, 170, 30).setRectangleDropZone(170, 30);
    }

    if (trevor.following){
      jimmyText = this.add.text(250, 100 + 2*vgap1 + 4*vgap2 + 2*vgap3, `Jimmy`, pickStyle(nameFontSize, 'Jimmy','left')).setOrigin(.5,0);
      jimmyBodyText = this.add.text(245, 100 + 3*vgap1 + 4*vgap2 + 2*vgap3, `Body: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      jimmyBodyEquippedText = this.add.text(255, 100 + 3*vgap1 + 4*vgap2 + 2*vgap3, `${equipped["Jimmy"].upper}`, pickStyle(typeFontSize, 'Jimmy','left')).setOrigin(0,0).setDepth(1);
      jimmyBodyEquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyBodyEquippedText._text!==''){
          unequip(equipped["Jimmy"].upper,"Jimmy")
          equipped["Jimmy"].upper=''
          jimmyBodyEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneJimmyBody = this.add.zone(340, 100 + 3*vgap1 + 4*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      jimmyLegsText = this.add.text(245, 100 + 3*vgap1 + 5*vgap2 + 2*vgap3, `Legs: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      jimmyLegsEquippedText = this.add.text(255, 100 + 3*vgap1 + 5*vgap2 + 2*vgap3, `${equipped["Jimmy"].lower}`, pickStyle(typeFontSize, 'Jimmy','left')).setOrigin(0,0).setDepth(1);
      jimmyLegsEquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyLegsEquippedText._text!==''){
          unequip(equipped["Jimmy"].lower,"Jimmy")
          equipped["Jimmy"].lower=''
          jimmyLegsEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneJimmyLegs = this.add.zone(340, 100 + 3*vgap1 + 5*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      jimmyAccessoryText = this.add.text(245, 100 + 3*vgap1 + 6*vgap2 + 2*vgap3, `Accessory: `, pickStyle(typeFontSize, 'all','left')).setOrigin(1,0);
      jimmyAccessoryEquippedText = this.add.text(255, 100 + 3*vgap1 + 6*vgap2 + 2*vgap3, `${equipped["Jimmy"].accessory}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
      jimmyAccessoryEquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyAccessoryEquippedText._text!==''){
          unequip(equipped["Jimmy"].accessory,"Jimmy")
          equipped["Jimmy"].accessory=''
          jimmyAccessoryEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneJimmyAccessory = this.add.zone(340, 100 + 3*vgap1 + 6*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      ///jimmy accessory 2
      jimmyAccessory2Text = this.add.text(245, 100 + 3*vgap1 + 7*vgap2 + 2*vgap3, `Accessory 2: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      jimmyAccessory2EquippedText = this.add.text(255, 100 + 3*vgap1 + 7*vgap2 + 2*vgap3, `${equipped["Jimmy"].accessory2}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
      jimmyAccessory2EquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyAccessory2EquippedText._text!==''){
          unequip(equipped["Jimmy"].accessory2,"Jimmy")
          equipped["Jimmy"].accessory2=''
          jimmyAccessory2EquippedText.setText('')
          redisplay=true
        }
      })
      var zoneJimmyAccessory2 = this.add.zone(340, 100 + 3*vgap1 + 7*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
    }

    if (bennett.following){
      bennettText = this.add.text(250, 100 + 3*vgap1 + 6*vgap2 + 3*vgap3, `Bennett`, pickStyle(nameFontSize, 'Bennett','left')).setOrigin(.5,0);
      bennettBodyText = this.add.text(245, 100 + 4*vgap1 + 6*vgap2 + 3*vgap3, `Body: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      bennettBodyEquippedText = this.add.text(255, 100 + 4*vgap1 + 6*vgap2 + 3*vgap3, `${equipped["Bennett"].upper}`, pickStyle(typeFontSize, 'Bennett','left')).setOrigin(0,0).setDepth(1);
      bennettBodyEquippedText.setInteractive().on('pointerdown', function(){
        if (bennettBodyEquippedText._text!==''){
          unequip(equipped["Bennett"].upper,"Bennett")
          equipped["Bennett"].upper=''
          bennettBodyEquippedText.setText('')
          redisplay=true
        }
      })
      //  A drop zone for mac body text
      var zoneBennettBody = this.add.zone(340, 100 + 4*vgap1 + 6*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      bennettLegsText = this.add.text(245, 100 + 4*vgap1 + 7*vgap2 + 3*vgap3, `Legs: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      bennettLegsEquippedText = this.add.text(255, 100 + 4*vgap1 + 7*vgap2 + 3*vgap3, `${equipped["Bennett"].lower}`, pickStyle(typeFontSize, 'Bennett','left')).setOrigin(0,0).setDepth(1);
      bennettLegsEquippedText.setInteractive().on('pointerdown', function(){
        if (bennettLegsEquippedText._text!==''){
          unequip(equipped["Bennett"].lower,"Bennett")
          equipped["Bennett"].lower=''
          bennettLegsEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneBennettLegs = this.add.zone(340, 100 + 4*vgap1 + 7*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      bennettAccessoryText = this.add.text(245, 100 + 4*vgap1 + 8*vgap2 + 3*vgap3, `Accessory: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      bennettAccessoryEquippedText = this.add.text(255, 100 + 4*vgap1 + 8*vgap2 + 3*vgap3, `${equipped["Bennett"].accessory}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
      bennettAccessoryEquippedText.setInteractive().on('pointerdown', function(){
        if (bennettAccessoryEquippedText._text!==''){
          unequip(equipped["Bennett"].accessory,"Bennett")
          equipped["Bennett"].accessory=''
          bennettAccessoryEquippedText.setText('')
          redisplay=true
        }
      })
      var zoneBennettAccessory = this.add.zone(340, 100 + 4*vgap1 + 8*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
      //bennett accessory2
      bennettAccessory2Text = this.add.text(245, 100 + 4*vgap1 + 9*vgap2 + 3*vgap3, `Accessory 2: `, pickStyle(typeFontSize, 'all','right')).setOrigin(1,0);
      bennettAccessory2EquippedText = this.add.text(255, 100 + 4*vgap1 + 9*vgap2 + 3*vgap3, `${equipped["Bennett"].accessory2}`, pickStyle(typeFontSize, 'all','left')).setOrigin(0,0).setDepth(1);
      bennettAccessory2EquippedText.setInteractive().on('pointerdown', function(){
        if (bennettAccessory2EquippedText._text!==''){
          unequip(equipped["Bennett"].accessory2,"Bennett")
          equipped["Bennett"].accessory2=''
          bennettAccessory2EquippedText.setText('')
          redisplay=true
        }
      })
      var zoneBennettAccessory2 = this.add.zone(340, 100 + 4*vgap1 + 9*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
    }

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      if (dropZone===zoneMacBody && equipment[gameObject._text]['type']==="Mac_upper"){
        if (equipped["Mac"].upper){
          unequip(equipped["Mac"].upper,"Mac") //apply function to take status effects off from equipment
        }
        equipped['Mac'].upper = gameObject._text; // set new equipment piece as equipped
        macBodyEquippedText.setText(gameObject._text); // show new equipment piece in text
        gameObject.destroy(); //get rid of the unneeded text object and remove the newly equipped item from inventory
        equip(equipped["Mac"].upper,"Mac") //apply the status effects of new equipment item
      }
      else if (dropZone===zoneMacLegs && equipment[gameObject._text]['type']==="Mac_lower"){
        if (equipped["Mac"].lower){
          unequip(equipped["Mac"].lower,"Mac")
        }
        equipped['Mac'].lower = gameObject._text;
        macLegsEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Mac"].lower,"Mac")
      }
      else if (dropZone===zoneMacAccessory && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Mac"].accessory){
          unequip(equipped["Mac"].accessory,"Mac")
        }
        equipped['Mac'].accessory = gameObject._text;
        macAccessoryEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Mac"].accessory,"Mac")
      }
      else if (dropZone===zoneMacAccessory2 && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Mac"].accessory2){
          unequip(equipped["Mac"].accessory2,"Mac")
        }
        equipped['Mac'].accessory2 = gameObject._text;
        macAccessory2EquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Mac"].accessory2,"Mac")
      }
      else if (dropZone===zoneAlBody && equipment[gameObject._text]['type']==="Al_upper"){
        if (equipped["Al"].upper){
          unequip(equipped["Al"].upper,"Al")
        }
        equipped['Al'].upper = gameObject._text;
        alBodyEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Al"].upper,"Al")
      }
      else if (dropZone===zoneAlLegs && equipment[gameObject._text]['type']==="Al_lower"){
        if (equipped["Al"].lower){
          unequip(equipped["Al"].lower,"Al")
        }
        equipped['Al'].lower = gameObject._text;
        alLegsEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Al"].lower,"Al")
      }
      else if (dropZone===zoneAlAccessory && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Al"].accessory){
          unequip(equipped["Al"].accessory,"Al")
        }
        equipped['Al'].accessory = gameObject._text;
        alAccessoryEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Al"].accessory,"Al")
      }
      else if (dropZone===zoneAlAccessory2 && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Al"].accessory2){
          unequip(equipped["Al"].accessory2,"Al")
        }
        equipped['Al'].accessory2 = gameObject._text;
        alAccessory2EquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Al"].accessory2,"Al")
      }
      else if (dropZone===zoneJimmyBody && equipment[gameObject._text]['type']==="Jimmy_upper"){
        if (equipped["Jimmy"].upper){
          unequip(equipped["Jimmy"].upper,"Jimmy")
        }
        equipped['Jimmy'].upper = gameObject._text;
        jimmyBodyEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Jimmy"].upper,"Jimmy")
      }
      else if (dropZone===zoneJimmyLegs && equipment[gameObject._text]['type']==="Jimmy_lower"){
        if (equipped["Jimmy"].lower){
          unequip(equipped["Jimmy"].lower,"Jimmy")
        }
        equipped['Jimmy'].lower = gameObject._text;
        jimmyLegsEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Jimmy"].lower,"Jimmy")
      }
      else if (dropZone===zoneJimmyAccessory && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Jimmy"].accessory){
          unequip(equipped["Jimmy"].accessory,"Jimmy")
        }
        equipped['Jimmy'].accessory = gameObject._text;
        jimmyAccessoryEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Jimmy"].accessory,"Jimmy")
      } else if (dropZone===zoneJimmyAccessory2 && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Jimmy"].accessory2){
          unequip(equipped["Jimmy"].accessory2,"Jimmy")
        }
        equipped['Jimmy'].accessory2 = gameObject._text;
        jimmyAccessory2EquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Jimmy"].accessory2,"Jimmy")
      } else if (dropZone===zoneBennettBody && equipment[gameObject._text]['type']==="Bennett_upper"){
        if (equipped["Bennett"].upper){
          unequip(equipped["Bennett"].upper,"Bennett")
        }
        equipped['Bennett'].upper = gameObject._text;
        bennettBodyEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Bennett"].upper,"Bennett")
      }
      else if (dropZone===zoneBennettLegs && equipment[gameObject._text]['type']==="Bennett_lower"){
        if (equipped["Bennett"].lower){
          unequip(equipped["Bennett"].lower,"Bennett")
        }
        equipped['Bennett'].lower = gameObject._text;
        bennettLegsEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Bennett"].upper,"Bennett")
      }
      else if (dropZone===zoneBennettAccessory && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Bennett"].accessory){
          unequip(equipped["Bennett"].accessory,"Bennett")
        }
        equipped['Bennett'].accessory = gameObject._text;
        bennettAccessoryEquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Bennett"].accessory,"Bennett")
      } else if (dropZone===zoneBennettAccessory2 && equipment[gameObject._text]['type']==="accessory"){
        if (equipped["Bennett"].accessory2){
          unequip(equipped["Bennett"].accessory2,"Bennett")
        }
        equipped['Bennett'].accessory2 = gameObject._text;
        bennettAccessory2EquippedText.setText(gameObject._text);
        gameObject.destroy();
        equip(equipped["Bennett"].accessory2,"Bennett")
      }
      else {
        gameObject.destroy()
      }
      redisplay=true;
    });

    gameState4.keyObjZ = this.input.keyboard.addKey('Z'); // Get key object
    gameState4.keyObjZ.on('down', function() {
      this.scene.stop();
      scene_number = 2;
      pause = false
      launchParameter=false;
    }, this);

  },
  update: function() {
    if (scene_number === 1) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('PauseMenu');
    }
    else if (scene_number === 7) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('ItemsMenu');
    }
    else if (scene_number === 9) {
      redisplay=true
      redisplayItems=true
      this.scene.switch('OverworldMenu');
    }
    if (redisplay){
      for (a_item of Object.keys(equipment)) {
        if (gameState4.newText[a_item])
        {gameState4.newText[a_item].destroy()}
      }
      gameState4.newText={}
      let xcoord4 = 570;
      let ycoord4 = 140;
      for (a_item of Object.keys(equipment)) {
        let unequipped = equipment[a_item]['numberOwned'] - equipment[a_item]['equipped']
        if (unequipped>0){
          for (let i=0;i<unequipped;i++){
            //console.log(a_item)
            gameState4.newText[a_item]=this.add.text(xcoord4, ycoord4, `${a_item}`, {
              fontSize: '15px',
              fill: playerColorsEquip[equipment[a_item]['character']]
            }).setDepth(1);
            gameState4.newText[a_item].setInteractive();
            this.input.setDraggable(gameState4.newText[a_item]);
            if (ycoord4>=500){
              xcoord4=810
              ycoord4=140
            }
            else{
              ycoord4+=30
            }
          }
        }
      }
      redisplay=false
    }
  }
});
