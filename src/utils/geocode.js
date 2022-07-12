const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oaXR0OTYiLCJhIjoiY2w1YW1kcW44MDl2bzNrcmlvYzR1ODZyMiJ9.K6nmkq8BUtAdRhdtZDdQ1g&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Location Services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another location', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode