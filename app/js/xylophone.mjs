let root;
const KEYS_TO_NOTES = { c: "C", d: "D", e: "E", f: "F", g: "G", a: "A", b: "B" };

export function init(rootElement) {
  root = rootElement;

  const bars = root.querySelectorAll('.bar')
  bars.forEach(bar => {
    bar.addEventListener('mouseover', () => onBarMouseOver(bar));
    bar.addEventListener('click', () => toggleBarDisabledState(bar));
  })

  root.addEventListener('keypress', (event) => onKeyPress(event));
}

function onBarMouseOver(bar) {
  if (isBarEnabled(bar))
    hitBar(bar)
}

function onKeyPress(event) {
  const keyName = event.key;
  if (KEYS_TO_NOTES[keyName]) {
    let bar = getBarByNote(KEYS_TO_NOTES[keyName])
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
