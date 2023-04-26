const { OpenAiService } = require('../services');

module.exports = (app) => {

    /**
     * 
     */
    app.post("/api/v1/tasks", async (req, res, next) => {
        const {input} = req.body;
        
        try {
            // const data = await openAiService.generatePrompt(input);
            return res.status(200).json({success:true, data})
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    })
    // app.get("/api/v1/tasks", async (req, res, next) => {
    //     return res.status(200).json({success: true})
    // })
}
