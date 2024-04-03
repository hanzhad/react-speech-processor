import {useEffect, useState} from 'react';

import {createSpeechEngine, PlayingState} from './speech';


/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
    const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
    const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

    const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

    const noSentences = currentSentenceIdx >= sentences.length;

    const engine = createSpeechEngine({
        onBoundary(e: SpeechSynthesisEvent): void {
            console.log('onBoundary')
        },
        onEnd(e: SpeechSynthesisEvent): void {
            console.log('onEnd')
            setCurrentSentenceIdx((i) => i += 1)
        },
        onStateUpdate(state: PlayingState): void {
            setPlaybackState(state);
        }

    })
    console.log('currentSentenceIdx', currentSentenceIdx)

    useEffect(() => {
        setCurrentSentenceIdx(0)
        setPlaybackState("initialized");
    }, [sentences])

    useEffect(() => {
        if (currentSentenceIdx < sentences.length) {
            engine.load(sentences[currentSentenceIdx]);
            if(currentSentenceIdx !== 0) {
              engine.play()
            }
        }
    }, [sentences, currentSentenceIdx])

    const play = () => {
        if (!noSentences && playbackState !== "playing") {
            engine.play()
        }
    };

    const pause = () => {
        if (!noSentences && playbackState !== "paused") {
            engine.pause()
        }
    };

    return {
        noSentences: currentSentenceIdx >= sentences.length,
        currentWordRange,
        playbackState,
        play,
        pause,
    };
};

export {useSpeech};
