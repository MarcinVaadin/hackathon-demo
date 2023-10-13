import {ChatGPTAPI, ChatMessage} from "chatgpt";

export type ComponentAttribute = {
    name: string,
    type: string,
    description?: string,
}

export async function promptChatGPT(localName: string) {

    // PUT YOUR CHAT GPT API KEY HERE
    const apiKey = 'sk-xxxxxxxxxxxxxxxxxxxxx';

    // PROMPT CAN BE MODIFIED TO ACHIEVE BETTER RESULTS
    // trust me, that one below is already pretty damn good!
    const prompt = 'JSON list of objects of TAG html element attributes. Each object must contain name, type and description. Display only JSON list.';

    if (!apiKey || !prompt) {
        console.warn('Cannot use ChatGPT API, please check that OPENAI_API_KEY and OPENAI_API_PROMPT env vars are set.');
        return;
    }

    const api = new ChatGPTAPI({
        apiKey: apiKey,
        fetch: self.fetch.bind(self),
        completionParams: {
            model: 'gpt-4',
        }
    });

    const readyPrompt = prompt.replace('TAG', localName);
    console.log('Prompt: ' + readyPrompt);
    api.sendMessage(readyPrompt).then((res: ChatMessage) => {
        console.log(res);
        const attributes = convertToComponentAttributes(res.text);
        console.log(attributes);
        dispatchEvent(new CustomEvent('chatgpt-response', {detail: attributes}));
    })
    dispatchEvent(new CustomEvent('chatgpt-prompted', {detail: readyPrompt}));
}

function convertToComponentAttributes(text: string): ComponentAttribute[] {
    // Find the starting and ending curly braces to extract the JSON object
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]") + 1;
    const jsonString = text.substring(startIndex, endIndex);
    console.log('Parsing: ' + jsonString);
    return JSON.parse(jsonString);
}