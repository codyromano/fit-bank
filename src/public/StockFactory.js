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

    const stocks = symbols.map(symbol =>
      new Stock({
        symbol,
        price: randInt(minPrice, maxPrice)
      })
    );

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

    let pricesChanged = false;
    stocks.forEach(stock => {
      if (stock.shouldUpdatePrice()) {
        stock.updatePrice();
        pricesChanged = true;
      }
    });

    if (pricesChanged) {
      Db.save('stocks', stocks);
    }

    return stocks;
  }
  
  exports.StockFactory = StockFactory;
})(window);