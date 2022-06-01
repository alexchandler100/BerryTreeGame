//button to buy rnd1
rnd1equip = generateRandomEquipment()
rnd1equip['value']*=2
rnd1Text = this.add.text(buy.x  - space*inc, buy.y + 4 * inc, rnd1equip['name'], style.mid);
rnd1Text.setInteractive().on('pointerup', function() {
  if (money >= rnd1equip['value']) {
    gameState44.chaching.play()
    money -= rnd1equip['value'];
    if (equipment[rnd1equip['name']]){
      rnd1equip['name'] = rnd1equip['name'] + ' '
      equipment[rnd1equip['name']]['value'] = Math.floor(equipment[rnd1equip['name']]['value']/2)
      equipment[rnd1equip['name']] = rnd1equip
    } else {
      equipment[rnd1equip['name']]['value'] = Math.floor(equipment[rnd1equip['name']]['value']/2)
      equipment[rnd1equip['name']] = rnd1equip
    }
    redisplay = true
  }
}, this);
rnd1Text.inventoryName = rnd1equip['name']
