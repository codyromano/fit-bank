(function(exports) {
  function generateStocks(minPrice, maxPrice) {
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
      stocks = generateStocks();
    }

    stocks.forEach(stock => {
      if (stock.shouldUpdatePrice()) {
        stock.updatePrice();
      }
    });

    return stocks;
  }
  
  exports.StockFactory = StockFactory;
})(window);