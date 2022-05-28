else if (dropZone===zoneBennettAccessory2 && equipment[gameObject._text]['type']==="accessory"){
  if (equipped["Bennett"].accessory2){
    unequip(equipped["Bennett"].accessory2,"Bennett")
  }
  equipped['Bennett'].accessory2 = gameObject._text;
  alAccessory2EquippedText.setText(gameObject._text);
  gameObject.destroy();
  equip(equipped["Bennett"].accessory2,"Bennett")
}
