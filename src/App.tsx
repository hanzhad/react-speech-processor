import './App.css';

import {Controls} from './components/Controls';
import {CurrentlyReading} from './components/CurrentlyReading';
import {fetchContent, parseContentIntoSentences} from "./lib/content";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useSpeech} from "./lib/useSpeech";

const loadContent = async () => {
    const message = await fetchContent()

    return parseContentIntoSentences(message);
}

function App() {
    const [sentences, setSentences] = useState<Array<string>>([]);

    const textForSpeech = useMemo(() => [...sentences].join(" "), [sentences])

    const { currentWordRange, playbackState, pause, play} = useSpeech(textForSpeech);



    const loadContentHandler = useCallback(() => {
        loadContent().then(r => setSentences(r))
    }, [setSentences])

    useEffect(() => {
        loadContentHandler()
    }, [loadContentHandler])

    return (
        <div className="App">
            <h1>Text to speech</h1>
            <div>{playbackState}</div>
            <div>
                <Controls
                    state={playbackState}
                    pause={pause}
                    play={play}
                    loadNewContent={loadContentHandler}
                />
            </div>
            <div>
                <CurrentlyReading
                    currentWordRange={currentWordRange}
                    sentences={sentences}
                    textForSpeech={textForSpeech}
                />
            </div>
        </div>
    );
}

export default App;
