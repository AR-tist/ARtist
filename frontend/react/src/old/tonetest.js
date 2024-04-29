import React, { useEffect } from 'react';
import Keyboard from './Keyboard';
import './tonetest.css';
import * as Tone from 'tone';

const Tonetest = () => {
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();

    const handleKeyDown = (e) => {
      const key = document.getElementById(e.key);
      if (key) {
        key.classList.add('pressed');
        playSound(e.key);
      }
    };

    const handleKeyUp = (e) => {
      const key = document.getElementById(e.key);
      if (key) {
        key.classList.remove('pressed');
      }
    };

    const playSound = (key) => {
      switch (key) {
        case 'q':
          synth.triggerAttackRelease('C4', '8n');
          break;
        case 'w':
          synth.triggerAttackRelease('D4', '8n');
          break;
        case 'e':
          synth.triggerAttackRelease('E4', '8n');
          break;
        case 'r':
          synth.triggerAttackRelease('F4', '8n');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <Keyboard />
    </div>
  );
};

export default Tonetest;