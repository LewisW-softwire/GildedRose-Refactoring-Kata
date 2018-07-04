class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name.startsWith('Sulfuras')) {
        continue;
      }

      
      let qualityChangeAmount = -1;

      let increasingQuality = item.name === 'Aged Brie' || item.name.startsWith('Backstage pass');
      if (increasingQuality) {
        qualityChangeAmount = 1;
        if (item.name.startsWith('Backstage pass')) {
          qualityChangeAmount = this.updateBackstagePassQuality(item);
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
          qualityChangeAmount=qualityChangeAmount*2;
      }

      if(item.name.startsWith('Conjured')){
         qualityChangeAmount*=2;
      }
      item.quality += qualityChangeAmount;
      //Prevent the quality from boing below 0 or becoming greater then 50
      if (item.quality <= 0) {
        item.quality = Math.max(0, item.quality);
      } else if (item.quality >= 50) {
        item.quality = Math.min(50, item.quality);
      }
    }

    return this.items;
  }

  updateBackstagePassQuality(item) {
    if(item.sellIn<0){
      return -item.quality;
    }else if (item.sellIn < 6) {
      return 3;
    }else if (item.sellIn < 11) {
      return 2;
    }else{
      return 1;
    }
  }

}
