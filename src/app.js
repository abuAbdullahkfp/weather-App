const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {geocode, forecast, foreCast} = require('./utils/geocode')
const { describe } = require('yargs')

const app = express()
const port = process.env.PORT || 3000

// Set Path for express config
let publicDirectory = path.join(__dirname, '../public')
let viewPath = path.join(__dirname, '../templates/views')
let partialPath = path.join(__dirname,'../templates/partials')

// Express and other settings 
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectory))

//server and routes
app.get('', (req, res) => {
   context = {
     title: 'Weather App',
     name: 'Afrid'
   }
   res.render('index', context)
})

app.get('/about', (req, res) => {
   context = {
     title: "About Page",
     name: "Afrid",
   };
  res.render('about', context)
})

app.get('/weather', (req, res)=>{
  if (!req.query.address){
   return res.send({
      error: 'Please provide your Location'
    })
  }
  const address = req.query.address
  geocode(address, (error, { latitute, longitude, placeName }={}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    foreCast(
      { latitute, longitude },
      (error, { description, feelslike, temperature } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast:`The weather is ${description}. It is currently ${temperature}C. It feels like ${feelslike}C outside.` ,
          location: placeName,
          address
        });
      }
    );
  });
})


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    name: 'Afrid'
  })
})

app.get('/help/*', (req, res) => {
  res.render("404", {
    title: "404",
    name: "Afrid",
    message: "Help Article not found",
  });
})

app.get('*', (req, res) => {
   res.render("404", {
     title: "404",
     name: "Afrid",
     message: "Page Not Found",
   });
})


app.listen(port, ()=>{
  console.log('Server started at port '+port)  
})


