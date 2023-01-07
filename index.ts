import { screen , box, table } from 'blessed';
import { readdir } from 'fs/promises';

// Create a screen object.
var myScreen = screen({
  smartCSR: true
})
async function fire(path: string) : Promise<string[]> {
    return await readdir(path);
}



myScreen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
const myMiniBox = box({
    bottom: 0,
    right: 0,
    width: '97%',
    height: '20%',
    content: '{center}\n close me!{/center}',
    tags: true,
    style: {
      fg: 'black',
      bg: 'white',
     
      hover: {
        bg: 'red'
      }
    }
})
var myBox = box({
  top: 0,
  left: 0,
  width: '60%',
  height: '100%',
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
})

var rightBox = box({
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    content: '{center}commands{/center}',
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
  })

// Append our box to the screen.
myScreen.append(myBox);
rightBox.append(myMiniBox);
myScreen.append(rightBox);


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
  //myBox.setContent(`{center}${await fire(__dirname)}{/center}`);
   const myTable =  table({
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
        }}
    )
    myTable.setData((await fire(__dirname)).map(m => ([m])));
    myBox.append(myTable);
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