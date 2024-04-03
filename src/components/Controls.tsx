import {PlayingState} from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = (props: {
    noSentences: boolean;
    play: () => void;
    pause: () => void;
    loadNewContent: () => void;
    state: PlayingState;
}) => {
    const {
        play,
        pause,
        loadNewContent,
    } = props;

    console.log('props.state', props.state)
    return (
        <div>
            <button disabled={props.noSentences || props.state === "paused"} onClick={play}>play</button>
            <button disabled={props.noSentences || props.state === "initialized"} onClick={pause}>pause</button>
            <button disabled={props.state === "playing"} onClick={loadNewContent}>loadNewContent</button>
        </div>
    );
};
