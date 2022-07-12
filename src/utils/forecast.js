const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c6cd07735b8b9e5dc86792bd7d2cbc94&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather forecast services', undefined)
        } else if (body.error) {
            callback('Unable to find location: ' + body.error.info, undefined)
        } else {
            callback(undefined, 'Forecast: ' + body.current.weather_descriptions[0] + '. It is currently '
                + body.current.temperature + ' degrees celsius outside. It feels like ' + body.current.feelslike + ' degrees celsius. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast