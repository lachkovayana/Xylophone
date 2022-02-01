let root;
const KEYS_TO_NOTES = { KeyA: "A", KeyB: "B", KeyC: "C", KeyD: "D", KeyE: "E", KeyF: "F", KeyG: "G" };

export function init(rootElement) {
  root = rootElement;

  const bars = root.querySelectorAll('.bar')
  bars.forEach(bar => {
    bar.addEventListener('mouseover', () => onBarMouseOver(bar));
    bar.addEventListener('click', () => toggleBarDisabledState(bar));
  })
}

// if we have several xylophones, when we press the keys, 
// we play the xylophone that was last clicked 
// (their names must be xylophone + number)
const xylophones = document.querySelectorAll('[id^="xylophone"]')
xylophones.forEach((xylophone) => {
  xylophone.addEventListener('click', () => { root = xylophone });
})

document.addEventListener('keypress', (event) => onKeyPress(event));


function onBarMouseOver(bar) {
  if (isBarEnabled(bar))
    hitBar(bar)
}

function onKeyPress(event) {
  const keyCode = event.code;
  if (KEYS_TO_NOTES[keyCode]) {
    let bar = getBarByNote(KEYS_TO_NOTES[keyCode])
    if (isBarEnabled(bar))
      hitBar(bar)
  }
}

function toggleBarDisabledState(bar) {
  if (isBarEnabled(bar)) {
    bar.classList.add("disabled")
    silenceBar(bar)
  }
  else
    bar.classList.remove("disabled")
}

function isBarEnabled(bar) {
  return !bar.classList.contains("disabled");
}

function getNoteByBar(bar) {
  return root.querySelector(`#${bar.dataset.note}`);
}

function getBarByNote(note) {
  return root.querySelector(`[data-note='${note}']`)
}

function silenceBar(bar) {
  const noteAudio = getNoteByBar(bar)
  noteAudio.pause()
  noteAudio.currentTime = 0
}

function hitBar(bar) {
  const noteAudio = getNoteByBar(bar)
  noteAudio.currentTime = 0
  noteAudio.play()
  bar.classList.add('active')

  // make bar inactive after 200ms
  setTimeout(() => {
    bar.classList.remove('active')
  }, 200)

  // make bar inactive after completed playback
  // noteAudio.addEventListener('ended', () => {
  // bar.classList.remove('active')
  // })
}