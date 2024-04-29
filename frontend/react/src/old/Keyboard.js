import React from 'react';
import * as Tone from 'tone';

const Keyboard = () => {
  const synth = new Tone.Synth().toDestination();

  const playSound = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  const handleKeyDown = (e) => {
    const key = document.getElementById(e.key);
    if (key) {
      key.classList.add('pressed');
      switch (e.key) {
        case 'q':
          key.style.background = 'tomato';
          playSound('C4');
          break;
        case 'w':
          key.style.background = 'tomato';
          playSound('D4');
          break;
        case 'e':
          key.style.background = 'tomato';
          playSound('E4');
          break;
        case 'r':
          key.style.background = 'tomato';
          playSound('F4');
          break;  
        case 't':
            key.style.background = 'tomato';
            playSound('G4');
            break;
        case 'y':
            key.style.background = 'tomato';
            playSound('A4');
            break;
        case 'u':
            key.style.background = 'tomato';
            playSound('B4');
            break;
        case 'i':
            key.style.background = 'tomato';
            playSound('C5');
            break;    
        default:
          break;
      }
    }
  };

  const handleKeyUp = (e) => {
    const key = document.getElementById(e.key);
    if (key) {
      key.classList.remove('pressed');
      key.style.background = '';
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return (
    <div className="keyboard">
      <div id="q">q 도</div>
      <div id="w">w 레</div>
      <div id="e">e 미</div>
      <div id="r">r 파</div>
      <div id="t">t 솔</div>
      <div id="y">y 라</div>
      <div id="u">u 시</div>
      <div id="i">i 도</div>
    </div>
  );
};

export default Keyboard;