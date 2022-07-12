const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPah = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPah))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Mohit Tulsani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Mohit Tulsani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Mohit Tulsani',
        message: 'This is a help page'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must specify an address to get weather forecast'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Mohit Tulsani',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error: 404',
        name: 'Mohit Tulsani',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})