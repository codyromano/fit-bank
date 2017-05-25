(function(exports) {
  const randInt = (min, max) => {
    const range = max - min;
    return Math.round(
      min + Math.random() * range
    );
  };

  function generateStocks({minPrice, maxPrice}) {
    const symbols = [
      'Amazon',
      'Google',
      'Facebook',
      'Microsoft',
      'Facebook',
      'McDonald\'s',
      'ExxonMobil'
    ].sort();

    const stocks = symbols.map(symbol => {
      return {
        symbol,
        price: randInt(minPrice, maxPrice),
        lastUpdate: new Date().getTime()
      };
    });

    return stocks;
  }

  function StockFactory() {
    let stocks = Db.get('stocks');

    if (typeof stocks !== 'object' || stocks === null) {
      stocks = generateStocks({
        minPrice: 100,
        maxPrice: 1000
      });
    }

    const stockInstances = stocks.map(stock =>
      new Stock(stock));

    let pricesChanged = false;
    stockInstances.forEach(stockObj => {
      if (stockObj.shouldUpdatePrice()) {
        stockObj.updatePrice();
        pricesChanged = true;
      }
    });

    if (!Db.save('stocks', stockInstances)) {
      throw new Error(`Could not save stocks`);
    }

    return stocks;
  }
  
  exports.StockFactory = StockFactory;
})(window);