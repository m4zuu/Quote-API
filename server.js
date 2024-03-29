const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req,res,next) => {
    const randomQuote = getRandomElement(quotes)
    res.send({quote:randomQuote})
})

app.get('/api/quotes', (req,res,next)=>{
  const filterAuthor = quotes.filter(author =>{
    return  author.person === req.query.person
  })

  if(req.query.person){
    res.json({quotes: filterAuthor})
  }else{
    res.send({quotes: quotes})
  }
})

app.post('/api/quotes', (req,res,next)=>{
    const newQuote = {
        person: req.query.person,
        quote: req.query.quote
    }
    if(newQuote.person && newQuote.quote){
        quotes.push(newQuote)
        res.send({quote: newQuote})
    }else{
        res.status(400).send('Already Exist')
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})