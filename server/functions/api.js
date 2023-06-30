const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const axios = require('axios');

const cors = require("cors")
router.use(cors())
router.use(express.json())




    
router.post('/api/compile', async (req, res) => {
  // console.log(req.body)
  let script = req.body.script;
  let stdin = req.body.stdin;
  let lang = req.body.lang;

  
  var program = {
  "language": lang,
  "code": script,
  "input": stdin,
};
  if(script==="") res.send({output:"Please write the code!"})
  axios.post('https://api.codex.jaagrav.in', program)
.then((response) => {
  console.log('Response:', response.data);
  if(response.data.error) res.send({output:response.data.error})
  res.send({output:response.data.output})

  console.log("here");


})
.catch((error) => {



  console.error('Error:', error);
  res.send({error:"network error"})


  console.log("not here")
});
})



router.get('/hello', (req, res) => {
    res.send({message:"Hello from server!", status:200})
})


app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
