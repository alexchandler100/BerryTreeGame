//button to buy goldChain
goldChainText = this.add.text(670, 260, 'Gold Chain', {
  fontSize: '25px',
  fill: '#ffffff'
});
goldChainText.setInteractive().on('pointerup', function() {
  if (money >= 50) {
    gameState44.chaching.play()
    money -= 50;
    equipment["Kanye Sunglassses"]['numberOwned'] += 1
    redisplayItems = true
  }
}, this);
goldChainText.inventoryName = "Gold Chain"
