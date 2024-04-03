import './App.css';

import {Controls} from './components/Controls';
import {CurrentlyReading} from './components/CurrentlyReading';
import {fetchContent, parseContentIntoSentences} from "./lib/content";
import {useCallback, useEffect, useState} from "react";
import {useSpeech} from "./lib/useSpeech";

const loadContent = async () => {
    const message = await fetchContent()

    return parseContentIntoSentences(message);
}

function App() {
    const [sentences, setSentences] = useState<Array<string>>([]);
    const {noSentences, playbackState, pause, play} = useSpeech(sentences);


    const loadContentHandler = useCallback(() => {
        loadContent().then(r => setSentences(r))
    }, [setSentences])

    useEffect(() => {
        loadContentHandler()
    }, [loadContentHandler])

    return (
        <div className="App">
            <h1>Text to speech</h1>
            <div>
                {/*<CurrentlyReading/>*/}
            </div>
            <div>
                <Controls
                    noSentences={noSentences}
                    state={playbackState}
                    pause={pause}
                    play={play}
                    loadNewContent={loadContentHandler}
                />
            </div>
        </div>
    );
}

export default App;
