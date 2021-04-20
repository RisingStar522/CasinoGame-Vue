# window-resize-subject

[![npm version](https://badge.fury.io/js/window-resize-subject.svg)](https://badge.fury.io/js/window-resize-subject)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI](https://github.com/mya-ake/window-resize-subject/workflows/CI/badge.svg)

> Handler for the window resize event of the observer pattern.

## Install

**npm**

```bash
$ npm i window-resize-subject
```

**yarn**

```bash
$ yarn add window-resize-subject
```

## Usage

```js
import { WindowResizeSubject } from 'window-resize-subject';

// create subject
const subject = new WindowResizeSubject();

// add observer
const observer = ({ width, height }) => {
  // do something
};
subejct.addObserver('name', observer);

// start watching the resize event
subject.subscribe();
```

> note: You can also write in a method chain

```js
subejct.addObserver('name', observer).subscribe();
```

## Methods

### addObserver

- params:
  - name:
    - type: `string` | `Symbol`
  - observer:
    - type: `WindowResizeObserver`
      - details: `(event: { width: number, height: number }) => void`

Add observer.  
And called with the current window size.

```js
subejct.addObserver('name', ({ width, height }) => {
  // do something
});
```

### subscribe

Start watching the resize event.

### unsubscribe

Stop watching the resize event.

> note: observer is not deleted.

### notifyObservers

- params:
  - size:
    - type: `Object`
      - width: `number`
      - height: `number`

Force update.

```js
subject.notifyObservers({ width: 800, height: 600 });
```

### deleteObserver

- params:
  - name:
    - type: `string` | `Symbol`

Deletes the specified Observer.

```js
subject.deleteObserver('name');
```

### deleteObservers

Deletes all Observers.

### setDelay

- params:
  - type: `number`

Changes the delay time for a resize event.

```js
subject.setDelay(100);
```

### hasObserver

returns true if it has an observer.

## Options

### `delay` (option)

- type: `number`
- default: `33`

Changes the delay time for a resize event.

```js
import { WindowResizeSubject } from 'window-resize-subject';

const subject = new WindowResizeSubject({ delay: 100 });
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/mya-ake/window-resize-subject/issues) or a [pull request](https://github.com/mya-ake/window-resize-subject/pulls).

## License

[MIT](https://github.com/mya-ake/window-resize-subject/blob/master/LICENSE)
