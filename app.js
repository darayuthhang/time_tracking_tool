const express = require('express');
const path = require('path');
const {databaseConnection} = require("./database/index");
const expressApp = require('./express-app');


const StartServer = async () => {

    const app = express();

    // await databaseConnection();
    await expressApp(app);
    const PORT = process.env.PORT || 5000;
    if (process.env.NODE_ENV !== 'local') {
        app.use(express.static(path.join(__dirname, 'client/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/client/build/index.html'));
        });
    }
    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    // .on('error', (err) => {
    //     console.log(err);
    //     process.exit();
    // })
}

StartServer();

// Initialize the OpenAI client
// const openai = require('openai');
// let openAIClient = new openai.OpenAI(API_KEY);

// // Create a text completer object with your prompt and max completion length (optional)  
// let myCompleter = new openai.CompletionRequest({ prompt: 'What would you like to say?', max_tokens: 10 });

// // Call the API to get a response from the server  
// let response = openAIClient.completions(myCompleter).then((response))
// console.log(response);
