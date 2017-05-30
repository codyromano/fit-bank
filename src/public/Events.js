/**
* @module PubSub
* @author Cody Romano
* @desc A basic module for publishing and subscribing to events. It supports 
* retroactive publishing. In other words, subscribers can respond to events
* that were broadcast before the subscribers were added. The retroactive 
* feature works by default, but it is optional.
*
* @example 
*
* var sum;
*
* PubSub.publish('addNumbers', 2, 2);
* PubSub.subscribe('addNumbers', function(n1, n2) {
*   sum = n1 + n2;
* });
*
* console.assert(sum === 4);
*/

(function(exports) {
  'use strict';

  var events = {},
      publishHistory = [];

  function notifySubscribers(eventId, args) {
    events[eventId].forEach(function(callback) {
      callback.apply(null, args);
    });
  }
  function checkEventId(genericInput) {
    if (typeof genericInput !== 'string' || !genericInput.length) {
      throw new Error('Invalid eventId: ' + genericInput);
    }
  }
  function checkCallback(genericInput) {
    if (typeof genericInput !== 'function') {
      throw new Error('Invalid callback');
    }
  }

  exports.Events = {
    /**
    * @param {Boolean} retroactive If the callback should be fired for publish
    * events that occurred in the past, before the subscriber was added.
    *
    * @returns {Number} The index of the new callback in the array of 
    * subscribers for the given eventId.
    */
    subscribe: function(eventId, callback, retroactive) {
      checkEventId(eventId);
      checkCallback(callback);

      var alreadyPublished = (this.getPublishCallsByEventId(eventId).length);
      retroactive = (typeof retroactive === 'boolean') ? retroactive : true;

      if (alreadyPublished && retroactive) {
        // Account for publications of the event that occurred before this 
        // subscriber was added. 
        this.getPublishCallsByEventId(eventId)
          .forEach(function(publishCall) {
            callback.apply(null, publishCall.arguments);
          });
      }
      events[eventId] = events[eventId] || [];
      return events[eventId].push(callback); 
    },
    /**
    * @returns {Array}
    */
    getPublishHistory: function() {
      return publishHistory;
    },
    /**
    * @returns {Array}
    */
    getPublishCallsByEventId: function(eventId) {
      checkEventId(eventId);
      return this.getPublishHistory().filter(function(publishCall) {
        return publishCall.eventId === eventId;
      });
    },
    /**
    * @returns {Boolean}
    */
    eventHasSubscribers: function(eventId) {
      checkEventId(eventId);
      return (typeof events[eventId] === 'object');
    },
    /**
    * @returns {Boolean} If subscribers were notified 
    */
    publish: function(eventId) {
      checkEventId(eventId);
      var argsExceptEventId = Array.prototype.slice.call(arguments, 1);

      publishHistory.push({
        eventId: eventId,
        arguments: argsExceptEventId
      });
      if (this.eventHasSubscribers(eventId)) {
        notifySubscribers(eventId, argsExceptEventId);
        return true;
      }
      return false;
    }
  };
})(window);