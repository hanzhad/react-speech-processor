import axios from "axios";

const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    try {
        const response = await axios.get(url);

        return  response.data.content;

    } catch (e) {
        return "<speak><s>There was an error</s></speak>"
    }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): string[] => {
    const start = "<s>"
    const end = "</s>"
    const matchRegex = new RegExp(`${start}(.*?${end})`, "g")
    const replaceRegex = new RegExp(`${start}|${end}`, "g")

    if (content.split("<speak>")[0] !== "") {
        throw new Error("This is not valid ssml")
    }

    return content
        .replace(/<speak>|<\/speak>|<p>|<\/p>/g, "")
        .match(matchRegex)
        ?.map((s) => s.replace(replaceRegex, "")) || []
};

export {fetchContent, parseContentIntoSentences};
