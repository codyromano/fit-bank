/**
* @desc Wrap a "class" instance's method in a function.
* The wrapper function will execute before the original
* function, but the original function will behave the same.
*/
function wrapMethod(object, methodName, wrapperFn) {
  const method = object[methodName];
  const isFunction = value => typeof value === 'function';

  if (![method, wrapperFn].every(isFunction)) {
    throw new TypeError(`Invalid wrapper or instance method`);
  }
  object[methodName] = (...args) => {
    wrapperFn(object, [...args]);
    return method.apply(object, [...args]);
  };
  return true;
}

class MetricFactory {
  constructor() {
    this.manifest = Db.get('metricNameManifest') || [];
  }
  /**
  * metricName - Which metric changed
  * methodName - The method called on that metric
  * ...args - Additional arguments
  */
  onMetricChanged(metricName, methodName, ...args) {
    console.info(...args);
  }
  create(name, initialValue) {
    let metric = new Metric(name, initialValue);

    // Name of the methods we want to watch
    const watchMethods = ['get', 'add'];

    for (const methodName of watchMethods) {
      const watcher = this.onMetricChanged.bind(this, name, methodName);
      wrapMethod(metric, methodName, watcher);
    }
    return metric;
  }
}