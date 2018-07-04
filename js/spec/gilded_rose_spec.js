describe("Gilded Rose", function() {

  it("should not allow the qulity of an item to be negative", function() {
    const gildedRose = new Shop([ new Item("negative", 1, -1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(-1);
  });

  it("should not allow the qulity of an item to become negative", function() {
    const gildedRose = new Shop([ new Item("negative", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(-1);
  });

  it("should increase the quality of Aged Brie as it gets older", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(0);
  });

  it("should not allow the quality of an item to be greater than 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 60) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThan(51);
  });

  it("should not allow the quality of an item to become greater than 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThan(51);
  });

  it("should not change the sell by date of Sulfuras", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
  });

  it("should not decrease the quality of Sulfuras", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(20);
  });

  it("should increase the quality of Backstage Passes", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKBL90ETC concert", 20, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("should increase the quality of Backstage Passes by 2 when there are 10 days or less before the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKBL90ETC concert", 7, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("should increase the quality of Backstage Passes by 3 when there are 5 days or less before the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKBL90ETC concert", 3, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("should decrease the quality of Backstage Passes to 0 after the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKBL90ETC concert", -1, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should decrease the quality of items twice as fast once their sell by date has passed", function() {
    const gildedRose = new Shop([ new Item("bar", -1, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });


  it("Conjured should decrease x2", function() {
    const gildedRose = new Shop([ new Item("Conjured bar", -1, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

});
