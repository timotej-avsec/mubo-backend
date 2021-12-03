const connectToDatabase = require('../bin/db');
const UrlEntry = require('../models/UrlEntry');
var randomstring = require("randomstring");

const redirect = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let response = {
        statusCode: 301,
        headers: {
            Location: 'https://www.mubo.one',
        }
    }

    await connectToDatabase();
    const code = event.pathParameters ? event.pathParameters.urlCode : null;

    if(code){
        console.log(code)

        const urlEntry = await UrlEntry.findOne({code: code.toLowerCase()}).clone();
        console.log(urlEntry)
        if(urlEntry){
            response = {
                statusCode: 301,
                headers: {
                    Location: urlEntry.url,
                }
            }
        }
    }

    return response;

  };

module.exports.handler = redirect