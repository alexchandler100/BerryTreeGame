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

    inventoryText = this.add.text(750, 100, `Inventory: `, {
      fontSize: '25px',
      fill: '#fff'
    });

    gameState4.newText={}
    let xcoord4 = 630;
    let ycoord4 = 140;
    for (a_item of equipment) {
      gameState4.newText[a_item]=this.add.text(xcoord4, ycoord4, `${a_item}`, {
        fontSize: '25px',
        fill: equipmentDescriptions[a_item].color
      }).setDepth(1);
      gameState4.newText[a_item].setInteractive();
      this.input.setDraggable(gameState4.newText[a_item]);
      if (ycoord4>=500){
        xcoord4=870
        ycoord4=140
      }
      else{
        ycoord4+=40
      }
    }

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
  });

  gameState4.tempBackground = this.add.rectangle(0,0, 400, 200, 0xffffff).setOrigin(0,0);
  gameState4.tempBackground.visible=false;
  gameState4.tempText=this.add.text(0,0, ``, {
    fontSize: '25px',
    fill: '#000000'
  });
  gameState4.tempText.visible=false;
  gameState4.tempBackground.setDepth(2)
  gameState4.tempText.setDepth(3)

  this.input.on('pointerover', function (pointer, justOver) {
    if (equipmentDescriptions[justOver[0]._text]){
      gameState4.tempBackground.x=pointer.x + 10;
      gameState4.tempBackground.y=pointer.y - 15;
      gameState4.tempBackground.visible=true;
      gameState4.tempText.visible=true;
      gameState4.tempText.setText(`Type: ${equipmentDescriptions[justOver[0]._text].type} \nDef: ${equipmentDescriptions[justOver[0]._text].def} \nEffect: ${equipmentDescriptions[justOver[0]._text].effect}`);
      gameState4.tempText.x=gameState4.tempBackground.x;
      gameState4.tempText.y=gameState4.tempBackground.y;
      gameState4.tempBackground.width=gameState4.tempText.width;
      gameState4.tempBackground.height=gameState4.tempText.height;
    }
});

this.input.on('pointerout', function (pointer, justOut) {
  if (equipmentDescriptions[justOut[0]._text]){
    gameState4.tempText.visible=false
    gameState4.tempBackground.visible=false
  }
});

let nameFontSize = '25px';
let typeFontSize = '20px';
let vgap1 = 30;
let vgap2 = 20;
let vgap3 = 40;
let hgap1 = 70;
let hgap2 = 140;

    macText = this.add.text(225, 100, `Mac`, {
      fontSize: nameFontSize,
      fill: '#068c1b'
    });

    macBodyText = this.add.text(125, 100 + vgap1, `Body: `, {
      fontSize: typeFontSize,
      fill: '#fff'
    });

    macBodyEquippedText = this.add.text(125+hgap1, 100 + vgap1, `${equipped["Mac"].upper}`, {
      fontSize: typeFontSize,
      fill: '#068c1b'
    }).setDepth(1);
    macBodyEquippedText.setInteractive().on('pointerdown', function(){
      if (macBodyEquippedText._text!==''){
        //apply function to take status effects off from equipment
        let statFunctionOff = equipmentList[equipped["Mac"].upper];
        statFunctionOff("Mac",false);
        //put the equipped item back in inventory
        equipment.push(macBodyEquippedText._text);
        equipped["Mac"].upper=''
        macBodyEquippedText.setText('')
        redisplay=true
      }
    })
    //this.input.setDraggable(macBodyEquippedText);

    //  A drop zone for mac body text
    var zoneMacBody = this.add.zone(125+hgap1+75, 100 + vgap1 +15, 170, 30).setRectangleDropZone(170, 30);

    //  Just a visual display of the drop zone
    var graphicsMacBody = this.add.graphics();
    graphicsMacBody.lineStyle(2, 0xffff00);
    graphicsMacBody.strokeRect(zoneMacBody.x - zoneMacBody.input.hitArea.width/2, zoneMacBody.y-zoneMacBody.input.hitArea.height/2, zoneMacBody.input.hitArea.width, zoneMacBody.input.hitArea.height);
    graphicsMacBody.visible=false;

    macLegsText = this.add.text(125, 100 +vgap1 + vgap2, `Legs: `, {
      fontSize: typeFontSize,
      fill: '#fff'
    });

    macLegsEquippedText = this.add.text(125+hgap1, 100 +vgap1 + vgap2, `${equipped["Mac"].lower}`, {
      fontSize: typeFontSize,
      fill: '#068c1b'
    }).setDepth(1);
    macLegsEquippedText.setInteractive().on('pointerdown', function(){
      if (macLegsEquippedText._text!==''){
        //apply function to take status effects off from equipment
        let statFunctionOff = equipmentList[equipped["Mac"].lower];
        statFunctionOff("Mac",false);
        //put the equipped item back in inventory
        equipment.push(macLegsEquippedText._text);
        equipped["Mac"].lower=''
        macLegsEquippedText.setText('')
        redisplay=true
      }
    })
    //this.input.setDraggable(macLegsEquippedText);

    //  A drop zone for mac legs text
    var zoneMacLegs = this.add.zone(125+hgap1+75, 100+vgap1+vgap2+15, 170, 30).setRectangleDropZone(170, 30);

    //  Just a visual display of the drop zone
    var graphicsMacLegs = this.add.graphics();
    graphicsMacLegs.lineStyle(2, 0xffff00);
    graphicsMacLegs.strokeRect(zoneMacLegs.x - zoneMacLegs.input.hitArea.width/2, zoneMacLegs.y-zoneMacLegs.input.hitArea.height/2, zoneMacLegs.input.hitArea.width, zoneMacLegs.input.hitArea.height);
    graphicsMacLegs.visible=false;

    macAccessoryText = this.add.text(125, 100 + vgap1+2*vgap2, `Accessory: `, {
      fontSize: typeFontSize,
      fill: '#fff'
    });

    macAccessoryEquippedText = this.add.text(125 + hgap2, 100 + vgap1+2*vgap2, `${equipped["Mac"].accessory}`, {
      fontSize: typeFontSize,
      fill: '#fff'
    }).setDepth(1);
    macAccessoryEquippedText.setInteractive().on('pointerdown', function(){
      if (macAccessoryEquippedText._text!==''){
        //apply function to take status effects off from equipment
        let statFunctionOff = equipmentList[equipped["Mac"].accessory];
        statFunctionOff("Mac",false);
        //put the equipped item back in inventory
        equipment.push(macAccessoryEquippedText._text);
        equipped["Mac"].accessory=''
        macAccessoryEquippedText.setText('')
        redisplay=true
      }
    })
    //this.input.setDraggable(macAccessoryEquippedText);

    //  A drop zone for mac accessory
    var zoneMacAccessory = this.add.zone(125+hgap2+75, 100+vgap1+2*vgap2 + 15, 170, 30).setRectangleDropZone(170, 30);

    //  Just a visual display of the drop zone
    var graphicsMacAccessory = this.add.graphics();
    graphicsMacAccessory.lineStyle(2, 0xffff00);
    graphicsMacAccessory.strokeRect(zoneMacAccessory.x - zoneMacAccessory.input.hitArea.width/2, zoneMacAccessory.y-zoneMacAccessory.input.hitArea.height/2, zoneMacAccessory.input.hitArea.width, zoneMacAccessory.input.hitArea.height);
    graphicsMacAccessory.visible=false;


    if (al.following){
      alText = this.add.text(225, 100+vgap1 + 2*vgap2 + vgap3, `Al`, {
        fontSize: nameFontSize,
        fill: '#cb0000'
      });

      alBodyText = this.add.text(125, 100 + 2*vgap1 + 2*vgap2 + vgap3, `Body: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      alBodyEquippedText = this.add.text(125+hgap1, 100 + 2*vgap1 + 2*vgap2 + vgap3, `${equipped["Al"].upper}`, {
        fontSize: typeFontSize,
        fill: '#cb0000'
      }).setDepth(1);
      alBodyEquippedText.setInteractive().on('pointerdown', function(){
        if (alBodyEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Al"].upper];
          statFunctionOff("Al",false);
          //put the equipped item back in inventory
          equipment.push(alBodyEquippedText._text);
          equipped["Al"].upper=''
          alBodyEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(alBodyEquippedText);

      //  A drop zone for mac body text
      var zoneAlBody = this.add.zone(125+hgap1+75, 100 + 2*vgap1 + 2*vgap2 + vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      alLegsText = this.add.text(125, 100 + 2*vgap1 + 3*vgap2 + vgap3, `Legs: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      alLegsEquippedText = this.add.text(125+hgap1, 100 + 2*vgap1 + 3*vgap2 + vgap3, `${equipped["Al"].lower}`, {
        fontSize: typeFontSize,
        fill: '#cb0000'
      }).setDepth(1);
      alLegsEquippedText.setInteractive().on('pointerdown', function(){
        if (alLegsEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Al"].lower];
          statFunctionOff("Al",false);
          //put the equipped item back in inventory
          equipment.push(alLegsEquippedText._text);
          equipped["Al"].lower=''
          alLegsEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(alLegsEquippedText);

      //  A drop zone for mac body text
      var zoneAlLegs = this.add.zone(125+hgap1+75, 100 + 2*vgap1 + 3*vgap2 + vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      alAccessoryText = this.add.text(125, 100 + 2*vgap1 + 4*vgap2 + vgap3, `Accessory: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      alAccessoryEquippedText = this.add.text(125+hgap2, 100 + 2*vgap1 + 4*vgap2 + vgap3, `${equipped["Al"].accessory}`, {
        fontSize: typeFontSize,
        fill: '#fff'
      }).setDepth(1);
      alAccessoryEquippedText.setInteractive().on('pointerdown', function(){
        if (alAccessoryEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Al"].accessory];
          statFunctionOff("Al",false);
          //put the equipped item back in inventory
          equipment.push(alAccessoryEquippedText._text);
          equipped["Al"].accessory=''
          alAccessoryEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(alAccessoryEquippedText);

      //  A drop zone for mac body text
      var zoneAlAccessory = this.add.zone(125+hgap2+75, 100 + 2*vgap1 + 4*vgap2 + vgap3 +15, 170, 30).setRectangleDropZone(170, 30);
    }

    if (trevor.following){
      jimmyText = this.add.text(225, 100 + 2*vgap1 + 4*vgap2 + 2*vgap3, `Jimmy`, {
        fontSize: nameFontSize,
        fill: '#0f15a1'
      });

      jimmyBodyText = this.add.text(125, 100 + 3*vgap1 + 4*vgap2 + 2*vgap3, `Body: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      jimmyBodyEquippedText = this.add.text(125+hgap1, 100 + 3*vgap1 + 4*vgap2 + 2*vgap3, `${equipped["Jimmy"].upper}`, {
        fontSize: typeFontSize,
        fill: '#0f15a1'
      }).setDepth(1);
      jimmyBodyEquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyBodyEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Jimmy"].upper];
          statFunctionOff("Jimmy",false);
          //put the equipped item back in inventory
          equipment.push(jimmyBodyEquippedText._text);
          equipped["Jimmy"].upper=''
          jimmyBodyEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(jimmyBodyEquippedText);

      //  A drop zone for mac body text
      var zoneJimmyBody = this.add.zone(125+hgap1+75, 100 + 3*vgap1 + 4*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      jimmyLegsText = this.add.text(125, 100 + 3*vgap1 + 5*vgap2 + 2*vgap3, `Legs: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      jimmyLegsEquippedText = this.add.text(125+hgap1, 100 + 3*vgap1 + 5*vgap2 + 2*vgap3, `${equipped["Jimmy"].lower}`, {
        fontSize: typeFontSize,
        fill: '#0f15a1'
      }).setDepth(1);
      jimmyLegsEquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyLegsEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Jimmy"].lower];
          statFunctionOff("Jimmy",false);
          //put the equipped item back in inventory
          equipment.push(jimmyLegsEquippedText._text);
          equipped["Jimmy"].lower=''
          jimmyLegsEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(jimmyLegsEquippedText);

      //  A drop zone for mac body text
      var zoneJimmyLegs = this.add.zone(125+hgap1+75, 100 + 3*vgap1 + 5*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      jimmyAccessoryText = this.add.text(125, 100 + 3*vgap1 + 6*vgap2 + 2*vgap3, `Accessory: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      jimmyAccessoryEquippedText = this.add.text(125+hgap2, 100 + 3*vgap1 + 6*vgap2 + 2*vgap3, `${equipped["Jimmy"].accessory}`, {
        fontSize: typeFontSize,
        fill: '#fff'
      }).setDepth(1);
      jimmyAccessoryEquippedText.setInteractive().on('pointerdown', function(){
        if (jimmyAccessoryEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Jimmy"].accessory];
          statFunctionOff("Jimmy",false);
          //put the equipped item back in inventory
          equipment.push(jimmyAccessoryEquippedText._text);
          equipped["Jimmy"].accessory=''
          jimmyAccessoryEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(jimmyAccessoryEquippedText);

      //  A drop zone for mac body text
      var zoneJimmyAccessory = this.add.zone(125+hgap2+75, 100 + 3*vgap1 + 6*vgap2 + 2*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
    }

    if (bennett.following){
      bennettText = this.add.text(225, 100 + 3*vgap1 + 6*vgap2 + 3*vgap3, `Bennett`, {
        fontSize: nameFontSize,
        fill: '#fa7800'
      });

      bennettBodyText = this.add.text(125, 100 + 4*vgap1 + 6*vgap2 + 3*vgap3, `Body: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      bennettBodyEquippedText = this.add.text(125+hgap1, 100 + 4*vgap1 + 6*vgap2 + 3*vgap3, `${equipped["Bennett"].upper}`, {
        fontSize: typeFontSize,
        fill: '#fa7800'
      }).setDepth(1);
      bennettBodyEquippedText.setInteractive().on('pointerdown', function(){
        if (bennettBodyEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Bennett"].upper];
          statFunctionOff("Bennett",false);
          //put the equipped item back in inventory
          equipment.push(bennettBodyEquippedText._text);
          equipped["Bennett"].upper=''
          bennettBodyEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(bennettBodyEquippedText);

      //  A drop zone for mac body text
      var zoneBennettBody = this.add.zone(125+hgap1+75, 100 + 4*vgap1 + 6*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      bennettLegsText = this.add.text(125, 100 + 4*vgap1 + 7*vgap2 + 3*vgap3, `Legs: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      bennettLegsEquippedText = this.add.text(125+hgap1, 100 + 4*vgap1 + 7*vgap2 + 3*vgap3, `${equipped["Bennett"].lower}`, {
        fontSize: typeFontSize,
        fill: '#fa7800'
      }).setDepth(1);
      bennettLegsEquippedText.setInteractive().on('pointerdown', function(){
        if (bennettLegsEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Bennett"].lower];
          statFunctionOff("Bennett",false);
          //put the equipped item back in inventory
          equipment.push(bennettLegsEquippedText._text);
          equipped["Bennett"].lower=''
          bennettLegsEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(bennettLegsEquippedText);

      //  A drop zone for mac body text
      var zoneBennettLegs = this.add.zone(125+hgap1+75, 100 + 4*vgap1 + 7*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);

      bennettAccessoryText = this.add.text(125, 100 + 4*vgap1 + 8*vgap2 + 3*vgap3, `Accessory: `, {
        fontSize: typeFontSize,
        fill: '#fff'
      });

      bennettAccessoryEquippedText = this.add.text(125+hgap2, 100 + 4*vgap1 + 8*vgap2 + 3*vgap3, `${equipped["Bennett"].accessory}`, {
        fontSize: typeFontSize,
        fill: '#fff'
      }).setDepth(1);
      bennettAccessoryEquippedText.setInteractive().on('pointerdown', function(){
        if (bennettAccessoryEquippedText._text!==''){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Bennett"].accessory];
          statFunctionOff("Bennett",false);
          //put the equipped item back in inventory
          equipment.push(bennettAccessoryEquippedText._text);
          equipped["Bennett"].accessory=''
          bennettAccessoryEquippedText.setText('')
          redisplay=true
        }
      })
      //this.input.setDraggable(bennettAccessoryEquippedText);

      //  A drop zone for mac body text
      var zoneBennettAccessory = this.add.zone(125+hgap2+75, 100 + 4*vgap1 + 8*vgap2 + 3*vgap3+15, 170, 30).setRectangleDropZone(170, 30);
    }


    this.input.on('drop', function (pointer, gameObject, dropZone) {
      if (dropZone===zoneMacBody && equipmentTypes[gameObject._text]==="Mac_upper"){
        //apply function to take status effects off from equipment
        if (equipmentList[equipped["Mac"].upper]){
          let statFunctionOff = equipmentList[equipped["Mac"].upper];
          statFunctionOff("Mac",false);
          //put the equipped item back in inventory
          equipment.push(macBodyEquippedText._text);
        }
        //equip the new item
        equipped['Mac'].upper = gameObject._text;
        macBodyEquippedText.setText(gameObject._text);
        //get rid of the unneeded text object and remove the newly equipped item from inventory
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        //apply the status effects of new equipment item
        let statFunctionOn = equipmentList[equipped["Mac"].upper];
        statFunctionOn("Mac",true);
      }
      else if (dropZone===zoneMacLegs && equipmentTypes[gameObject._text]==="Mac_lower"){
        if (equipmentList[equipped["Mac"].lower]){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Mac"].lower];
          statFunctionOff("Mac",false);
          //put the equipped item back in inventory
          equipment.push(macLegsEquippedText._text);
        }
        //equip the new item
        equipped['Mac'].lower = gameObject._text;
        macLegsEquippedText.setText(gameObject._text);
        //get rid of the unneeded text object and remove the newly equipped item from inventory
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        //apply the status effects of new equipment item
        let statFunctionOn = equipmentList[equipped["Mac"].lower];
        statFunctionOn("Mac",true);
      }
      else if (dropZone===zoneMacAccessory && equipmentTypes[gameObject._text]==="accessory"){
        //apply function to take status effects off from equipment
        if (equipped["Mac"].accessory){
          let statFunctionOff = equipmentList[equipped["Mac"].accessory];
          statFunctionOff("Mac",false);
          //put the equipped item back in inventory
          equipment.push(macAccessoryEquippedText._text);
        }
        //equip the new item
        equipped['Mac'].accessory = gameObject._text;
        macAccessoryEquippedText.setText(gameObject._text);
        //get rid of the unneeded text object and remove the newly equipped item from inventory
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        //apply the status effects of new equipment item
        let statFunctionOn = equipmentList[equipped["Mac"].accessory];
        statFunctionOn("Mac",true);
      }
      else if (dropZone===zoneAlBody && equipmentTypes[gameObject._text]==="Al_upper"){
        if (equipmentList[equipped["Al"].upper]){
          let statFunctionOff = equipmentList[equipped["Al"].upper];
          statFunctionOff("Al",false);
          equipment.push(alBodyEquippedText._text);
        }
        equipped['Al'].upper = gameObject._text;
        alBodyEquippedText.setText(gameObject._text);
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        let statFunctionOn = equipmentList[equipped["Al"].upper];
        statFunctionOn("Al",true);
      }
      else if (dropZone===zoneAlLegs && equipmentTypes[gameObject._text]==="Al_lower"){
        if (equipmentList[equipped["Al"].lower]){
          let statFunctionOff = equipmentList[equipped["Al"].lower];
          statFunctionOff("Al",false);
          equipment.push(alLegsEquippedText._text);
        }
        equipped['Al'].lower = gameObject._text;
        alLegsEquippedText.setText(gameObject._text);
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        let statFunctionOn = equipmentList[equipped["Al"].lower];
        statFunctionOn("Al",true);
      }
      else if (dropZone===zoneAlAccessory && equipmentTypes[gameObject._text]==="accessory"){
        if (equipped["Al"].accessory){
          let statFunctionOff = equipmentList[equipped["Al"].accessory];
          statFunctionOff("Al",false);
          equipment.push(alAccessoryEquippedText._text);
        }
        equipped['Al'].accessory = gameObject._text;
        alAccessoryEquippedText.setText(gameObject._text);
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        let statFunctionOn = equipmentList[equipped["Al"].accessory];
        statFunctionOn("Al",true);
      }
      else if (dropZone===zoneJimmyBody && equipmentTypes[gameObject._text]==="Jimmy_upper"){
        if (equipmentList[equipped["Jimmy"].upper]){
          let statFunctionOff = equipmentList[equipped["Jimmy"].upper];
          statFunctionOff("Jimmy",false);
          equipment.push(jimmyBodyEquippedText._text);
        }
        equipped['Jimmy'].upper = gameObject._text;
        jimmyBodyEquippedText.setText(gameObject._text);
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        let statFunctionOn = equipmentList[equipped["Jimmy"].upper];
        statFunctionOn("Jimmy",true);
      }
      else if (dropZone===zoneJimmyLegs && equipmentTypes[gameObject._text]==="Jimmy_lower"){
        if (equipmentList[equipped["Jimmy"].lower]){
          let statFunctionOff = equipmentList[equipped["Jimmy"].lower];
          statFunctionOff("Jimmy",false);
          equipment.push(jimmyLegsEquippedText._text);
        }
        equipped['Jimmy'].lower = gameObject._text;
        jimmyLegsEquippedText.setText(gameObject._text);
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        let statFunctionOn = equipmentList[equipped["Jimmy"].lower];
        statFunctionOn("Jimmy",true);
      }
      else if (dropZone===zoneJimmyAccessory && equipmentTypes[gameObject._text]==="accessory"){
        if (equipped["Jimmy"].accessory){
          let statFunctionOff = equipmentList[equipped["Jimmy"].accessory];
          statFunctionOff("Jimmy",false);
          equipment.push(jimmyAccessoryEquippedText._text);
        }
        equipped['Jimmy'].accessory = gameObject._text;
        jimmyAccessoryEquippedText.setText(gameObject._text);
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        let statFunctionOn = equipmentList[equipped["Jimmy"].accessory];
        statFunctionOn("Jimmy",true);
      } else if (dropZone===zoneBennettBody && equipmentTypes[gameObject._text]==="Bennett_upper"){
        //apply function to take status effects off from equipment
        if (equipmentList[equipped["Bennett"].upper]){
          let statFunctionOff = equipmentList[equipped["Bennett"].upper];
          statFunctionOff("Bennett",false);
          //put the equipped item back in inventory
          equipment.push(bennettBodyEquippedText._text);
        }
        //equip the new item
        equipped['Bennett'].upper = gameObject._text;
        bennettBodyEquippedText.setText(gameObject._text);
        //get rid of the unneeded text object and remove the newly equipped item from inventory
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        //apply the status effects of new equipment item
        let statFunctionOn = equipmentList[equipped["Bennett"].upper];
        statFunctionOn("Bennett",true);
      }
      else if (dropZone===zoneBennettLegs && equipmentTypes[gameObject._text]==="Bennett_lower"){
        if (equipmentList[equipped["Bennett"].lower]){
          //apply function to take status effects off from equipment
          let statFunctionOff = equipmentList[equipped["Bennett"].lower];
          statFunctionOff("Bennett",false);
          //put the equipped item back in inventory
          equipment.push(bennettLegsEquippedText._text);
        }
        //equip the new item
        equipped['Bennett'].lower = gameObject._text;
        bennettLegsEquippedText.setText(gameObject._text);
        //get rid of the unneeded text object and remove the newly equipped item from inventory
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        //apply the status effects of new equipment item
        let statFunctionOn = equipmentList[equipped["Bennett"].lower];
        statFunctionOn("Bennett",true);
      }
      else if (dropZone===zoneBennettAccessory && equipmentTypes[gameObject._text]==="accessory"){
        //apply function to take status effects off from equipment
        if (equipped["Bennett"].accessory){
          let statFunctionOff = equipmentList[equipped["Bennett"].accessory];
          statFunctionOff("Bennett",false);
          //put the equipped item back in inventory
          equipment.push(bennettAccessoryEquippedText._text);
        }
        //equip the new item
        equipped['Bennett'].accessory = gameObject._text;
        bennettAccessoryEquippedText.setText(gameObject._text);
        //get rid of the unneeded text object and remove the newly equipped item from inventory
        const index = equipment.indexOf(gameObject._text);
        if (index > -1) {
          equipment.splice(index, 1);
        }
        gameObject.destroy();
        //apply the status effects of new equipment item
        let statFunctionOn = equipmentList[equipped["Bennett"].accessory];
        statFunctionOn("Bennett",true);
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
      for (a_item of equipment) {
        if (gameState4.newText[a_item])
        {gameState4.newText[a_item].destroy()}
      }
      gameState4.newText={}
      let xcoord4 = 630;
      let ycoord4 = 140;
      for (a_item of equipment) {
        gameState4.newText[a_item]=this.add.text(xcoord4, ycoord4, `${a_item}`, {
          fontSize: '25px',
          fill: equipmentDescriptions[a_item].color
        }).setDepth(1);
        gameState4.newText[a_item].setInteractive();
        this.input.setDraggable(gameState4.newText[a_item]);
        if (ycoord4>=500){
          xcoord4=870
          ycoord4=140
        }
        else{
          ycoord4+=40
        }
      }
      redisplay=false
    }
  }
});
