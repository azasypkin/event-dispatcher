# Event Dispatcher
This file provides a helper to add custom events to any object.

# Usage

In order to use this functionality with any object consumer should pick one of the following approaches: plain old 
`mixin` or ES6 Class `extends`approach:

```js
class Obj extends EventDispatcher {}
const obj = new Obj();
```

Or `mixin` approach:
```js
const obj = EventDispatcher.mixin({});
```

A list of events can be optionally provided and it is recommended to do so. If a list is provided then only the events 
present in the list will be allowed. Using other unknown events will cause other functions to throw an error:
```js
class Obj extends EventDispatcher {
  constructor() { 
    super(['somethinghappened', 'somethingelsehappened']); 
  }
}
const obj = new Obj();
```

Or `mixin` approach:
```js
const obj = EventDispatcher.mixin({ ... }, ['somethinghappened', 'somethingelsehappened']);
```

The object will have five new methods: `on`, `once`, `off`, `offAll` and `emit`. Use `on` to register a new 
event-handler:
```js
obj.on("somethinghappened", function onSomethingHappened() { ... });
```

If the same event-handler is added multiple times then only one will be registered, e.g.:
```js
function onSomethingHappened() { ... }
obj.on("somethinghappened", onSomethingHappened);
obj.on("somethinghappened", onSomethingHappened); // Does nothing
```

Use `off` to remove a registered listener:
```js
obj.off("somethinghappened", onSomethingHappened);
```

Use `once` to register a one-time event-handler: it will be automatically unregistered after being called.
```js
obj.once("somethinghappened", function onSomethingHappened() { ... });
```

And use `offAll` to remove all registered event listeners for the specified event:
```js
obj.offAll("somethinghappened");
```

When used without parameters `offAll` removes all registered event handlers, this can be useful when writing unit-tests.

Finally use 'emit' to send an event to the registered handlers:
```js
obj.emit("somethinghappened");
```

An optional parameter can be passed to 'emit' to be passed to the registered handlers:
```js
obj.emit("somethinghappened", 123);
```