import {useCallback, useEffect, useRef, useState} from 'react';

import {createSpeechEngine, PlayingState, SpeechEngine} from './speech';


/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (textForSpeech: string) => {
    const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);

    const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

    const Engine = useRef<SpeechEngine>()

    const engine = Engine.current;

    useEffect(() => {
        Engine.current = createSpeechEngine({
            onBoundary({charIndex, charLength}: SpeechSynthesisEvent): void {
                setCurrentWordRange([charIndex, charLength])
            },
            onStateUpdate(state: PlayingState): void {
                setPlaybackState(state);
            }

        })
    }, [])


    useEffect(() => {
        setCurrentWordRange([0, 0])
        setPlaybackState("initialized");
        engine?.load(textForSpeech)
    }, [textForSpeech])


    const play = () => {
        if (playbackState === "ended") {
            return
        }

        if (playbackState === "paused") {
            engine?.resume()
            return;
        }
        if (playbackState !== "playing") {
            engine?.play();
            setCurrentWordRange([0, 0])
            return;
        }
    };

    const pause = () => {
        if (playbackState !== "ended" && playbackState !== "paused") {
            engine?.pause()
        }
    };

    return {
        currentWordRange: currentWordRange,
        playbackState,
        play,
        pause,
    };
};

export {useSpeech};
