require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai')
module.exports = class OpenAIService {
    constructor(){
        this.configuration = new Configuration({
            apiKey: "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",
        });
        this.openai = new OpenAIApi(this.configuration);
    }
    async generatePrompt(input){
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        });

        return completion.data.choices[0].message?.content
    }
}

