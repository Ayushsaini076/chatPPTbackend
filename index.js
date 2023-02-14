// my backend server
require("dotenv").config();
const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const openAI = require('openai')
const { Configuration, OpenAIApi }=openAI
const API_KEY = process.env.API_KEY


const configuration = new Configuration({
    organization: "org-hhDspFEWExuwuHz98gtNWI5L",
    apiKey: `${API_KEY}`
});
const openai = new OpenAIApi(configuration);



const app = express();
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
const port = process.env.port || 3001;
app.use(bodyparser.json());

app.post('/',async (req,res)=>{
    const {message}= req.body;

    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0,
    });
    

    
      

    console.log(response.data)
    

    
    if(response.data.choices[0].text ){
        res.json({
            message:response.data.choices[0].text,
            
        })
    }
      
})

app.listen(port,()=>{
    console.log('server listening at port',port);
})

