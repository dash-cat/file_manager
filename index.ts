import { screen , box,  } from 'blessed';

// Create a screen object.
var myScreen = screen({
  smartCSR: true
});

myScreen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
var myBox = box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Append our box to the screen.
myScreen.append(myBox);

// Add a png icon to the box
// var icon = image({
//   parent: myBox,
//   top: 0,
//   left: 0,
//   type: 'overlay',
//   width: 'shrink',
//   height: 'shrink',
//   file: __dirname + '/my-program-icon.png',
//   search: false
// });

// If our box is clicked, change the content.
myBox.on('click', function() {
  myBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  myScreen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
myBox.key('enter', function() {
  myBox.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  myBox.setLine(1, 'bar');
  myBox.insertLine(1, 'foo');
  myScreen.render();
});

// Quit on Escape, q, or Control-C.
myScreen.key(['escape', 'q', 'C-c'], function() {
  return process.exit(0);
});

// Focus our element.
myBox.focus();

// Render the screen.
myScreen.render();