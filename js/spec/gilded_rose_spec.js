describe("Gilded Rose", function () {

  it("should not allow the qulity of an item to be negative", function () {
    let item = new Item("any item", 1, -1);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBeGreaterThan(-1);
  });

  it("should not allow the qulity of an item to become negative", function () {
    let item = new Item("any item", 1, 0);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBeGreaterThan(-1);
  });

  it("should increase the quality of Aged Brie as it gets older", function () {
    let item = new Item(propertyNames.agedBrie, 1, 0);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBeGreaterThan(0);
  });

  it("should not allow the quality of an item to be greater than 50", function () {
    let item = new Item(propertyNames.agedBrie, 1, 60);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBeLessThan(51);
  });

  it("should not allow the quality of an item to become greater than 50", function () {
    let item = new Item(propertyNames.agedBrie, 1, 50);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBeLessThan(51);
  });

  it("should not change the sell by date of Sulfuras", function () {
    let item = new Item(`${propertyNames.sulfuras}, Hand of Ragnaros`, 1, 20);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    const sellIn = items[0].sellIn;
    expect(sellIn).toBe(1);
  });

  it("should not decrease the quality of Sulfuras", function () {
    let item = new Item(`${propertyNames.sulfuras}, Hand of Ragnaros`, 1, 20);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(20);
  });

  it("should increase the quality of Backstage Passes", function () {
    let item = new Item(`${propertyNames.backstagePass}es to a TAFKBL90ETC concert`, 20, 0);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(1);
  });

  it("should increase the quality of Backstage Passes by 2 when there are 10 days or less before the concert", function () {
    let item = new Item(`${propertyNames.backstagePass}es to a TAFKBL90ETC concert`, 7, 0);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(2);
  });

  it("should increase the quality of Backstage Passes by 3 when there are 5 days or less before the concert", function () {
    let item = new Item(`${propertyNames.backstagePass}es to a TAFKBL90ETC concert`, 3, 0);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(3);
  });

  it("should decrease the quality of Backstage Passes to 0 after the concert", function () {
    let item = new Item(`${propertyNames.backstagePass} to a TAFKBL90ETC concert`, -1, 10);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(0);
  });

  it("should decrease the quality of items twice as fast once their sell by date has passed", function () {
    let item = new Item("any item", -1, 5);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(3);
  });


  it("Conjured should decrease x2", function () {
    let item = new Item(`${propertyNames.conjured} any item`, -1, 5);
    const quality = getQualityAfterUpdatingItem(item);
    expect(quality).toBe(1);
  });

});

function getQualityAfterUpdatingItem(item) {
  const gildedRose = new Shop([item]);
  const items = gildedRose.updateQuality();
  return items[0].quality;
}
