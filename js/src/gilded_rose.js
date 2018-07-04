class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

let propertyNames = {
  sulfuras: "Sulfuras",
  backstagePass: "Backstage pass",
  conjured: "Conjured",
  agedBrie: "Aged Brie"
}

class ItemProperties {
  constructor(item) {
    this.name = item.name;
    this.isSulfuras = item.name.startsWith(propertyNames.sulfuras);
    this.isBackstagePass = item.name.startsWith(propertyNames.backstagePass);
    this.isConjured = item.name.startsWith(propertyNames.conjured);
    //Copies name
    let tempName = (' ' + item.name).slice(1);
    if (this.isConjured) {
      tempName = tempName.slice(9);
    }
    this.isAgedBrie = (tempName === propertyNames.agedBrie);
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {

      let item = this.items[i];

      this.changeItemQuality(item);
    }

    return this.items;

  }
  changeItemQuality(item) {
    let properties = new ItemProperties(item);
    //Sulfuras never change
    if (properties.isSulfuras) {
      return;
    }

    //default multiplier
    let multiplier = 1;
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      multiplier *= 2;
    }
    if (properties.isConjured) {
      multiplier *= 2;

    }

    //defult quality change
    let qualityChangeAmount = -1;

    if (properties.isAgedBrie) {
      qualityChangeAmount = 1;
    }
    if (properties.isBackstagePass) {
      qualityChangeAmount = this.getBackstagePassQualityChange(item);
    }

    qualityChangeAmount *= multiplier;

    item.quality += qualityChangeAmount;

    //Prevent the quality from boing below 0 or becoming greater then 50
    this.boundQuality(item);

  }

  getBackstagePassQualityChange(item) {
    /*- "Backstage passes" increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  Quality drops to 0 after the concert*/

    if (item.sellIn < 0) {
      return -item.quality;
    } else if (item.sellIn <= 5) {
      return 3;
    } else if (item.sellIn <= 10) {
      return 2;
    } else {
      return 1;
    }
  }

  boundQuality(item) {
    item.quality = Math.max(0, item.quality);
    item.quality = Math.min(50, item.quality);
  }

}

