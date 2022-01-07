const connectToDatabase = require('../bin/db');
const UrlEntry = require('../models/UrlEntry');

const redirect = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let response = {
        statusCode: 301,
        headers: {
            Location: process.env.FRONTEND_URL,
        }
    }

    await connectToDatabase();
    const code = event.pathParameters ? event.pathParameters.urlCode : null;

    if(code){
        const urlEntry = await UrlEntry.findOne({code: code.toLowerCase()}).clone();
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