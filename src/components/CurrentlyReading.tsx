import {useMemo} from "react";
import {s} from "vitest/dist/reporters-LLiOBu3g";
import {p} from "msw/lib/core/GraphQLHandler-907fc607";

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = (props: {
    currentWordRange: [number, number];
    textForSpeech: string;
    sentences: string[];
}) => {
    const {
        currentWordRange: [charIndex, charLength],
        textForSpeech,
        sentences,
    } = props;

    const map = useMemo(() => {
        let tempTextForSpeech = String(textForSpeech);

        const map = new Map()

        sentences.forEach((sentence, i) => {
            const start = tempTextForSpeech.indexOf(sentence);

            const end = start + sentence.length;

            if (start !== -1 && end !== -1) {
                tempTextForSpeech = [
                    tempTextForSpeech.substring(0, start),
                    new Array(sentence.length + 1).join("°"),
                    tempTextForSpeech.substring(end, tempTextForSpeech.length)
                ].join("");
                map.set(i, [start, end]);
            }
        });

        return map;
    }, [sentences, textForSpeech])


    return (
        <div data-testid="currently-reading">
            {
                sentences.map((sentence, i) => {
                    const [sentenceStart, sentenceEnd] = map.get(i);
                    if (charIndex >= sentenceStart && charIndex <= sentenceEnd) {
                        const start =  charIndex - sentenceStart;
                        const end = start + charLength;

                        const replacement = sentence.substring(start, end);

                        const pre = [
                            sentence.substring(0, start),
                            `<strong>${replacement}</strong>`,
                            sentence.substring(end, sentence.length),
                        ];

                        return <p key={i} dangerouslySetInnerHTML={{ __html: pre.join("")}} />
                    }

                    return <p key={i}>{sentence}</p>
                })
            }
        </div>
    );
};
