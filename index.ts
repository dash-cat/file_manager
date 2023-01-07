import { screen , box,  } from 'blessed';
import { readdir } from 'fs/promises';

// Create a screen object.
var myScreen = screen({
  smartCSR: true
})
async function fire(path: string) : Promise<string> {
    return await (await readdir(path)).join('\n');
}



myScreen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
const myMiniBox = box({
    bottom: 0,
    right: 0,
    width: '30%',
    height: '30%',
    content: '{center}\n close me!{/center}',
    tags: true,
    border: {
      type: 'bg'
    },
    style: {
      fg: 'black',
      bg: 'white',
      border: {
        fg: 'black'
      },
      hover: {
        bg: 'red'
      }
    }
})
var myBox = box({
  top: 'center',
  left: 'center',
  width: '80%',
  height: '80%',
  content: '{center}\n Hello shluskha, push me!{/center}',
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
myScreen.append(myMiniBox);


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
myBox.on('click', async function() {
  myBox.setContent(`{center}${await fire(__dirname)}{/center}`);
  myScreen.render();
});
myMiniBox.on('click', function() { 
    process.exit(0);
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