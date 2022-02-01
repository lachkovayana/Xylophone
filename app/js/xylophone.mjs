let root;
const KEYS_TO_NOTES = { KeyA: "A", KeyB: "B", KeyC: "C", KeyD: "D", KeyE: "E", KeyF: "F", KeyG: "G" };

export function init(rootElement) {
  root = rootElement;

  const bars = root.querySelectorAll('.bar')
  bars.forEach(bar => {
    bar.addEventListener('mouseover', () => onBarMouseOver(bar));
    bar.addEventListener('click', () => toggleBarDisabledState(bar));
  })

  document.addEventListener('keypress', (event) => onKeyPress(event));
}

// if we have several xylophones, play the one clicked on (their names must be xylophone + number)
let xylophones = document.querySelectorAll('[id^="xylophone"]')
xylophones.forEach((xyl) => {
  xyl.addEventListener('click', () => { root = xyl; console.log("new root is ", xyl); });
})


function onBarMouseOver(bar) {
  if (isBarEnabled(bar))
    hitBar(bar)
}

function onKeyPress(event) {
  const keyCode = event.code;
  console.log(keyCode);
  if (KEYS_TO_NOTES[keyCode]) {
    let bar = getBarByNote(KEYS_TO_NOTES[keyCode])
    if (isBarEnabled(bar))
      hitBar(bar)
  }
}

function toggleBarDisabledState(bar) {
  isBarEnabled(bar) ?
    bar.classList.add("disabled") : bar.classList.remove("disabled")
}

function isBarEnabled(bar) {
  return !bar.classList.contains("disabled");
}

function getNoteByBar(bar) {
  return root.querySelector(`#${bar.dataset.note}`);
}

function getBarByNote(note) {
  console.log(root);
  return root.querySelector(`[data-note='${note}']`)
}


function hitBar(bar) {
  const noteAudio = getNoteByBar(bar)
  noteAudio.currentTime = 0
  noteAudio.play()
  bar.classList.add('active')
  setTimeout(() => {
    bar.classList.remove('active')
  }, 200)


  // make bar inactive after playing sound
  // noteAudio.addEventListener('ended', () => {
  // bar.classList.remove('active')
  // })
}


// unused functions
// function onBarClick(event) {}
// function silenceBar(note) {}
