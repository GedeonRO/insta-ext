// api.js
async function getChatGPTResponse(inputText) {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${YOUR_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputText,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text;
}
