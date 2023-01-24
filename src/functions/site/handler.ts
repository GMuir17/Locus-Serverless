import { APIGatewayProxyHandler } from 'aws-lambda'
import axios from 'axios'

import { corsSuccessResponse, corsErrorResponse } from '@libs/lambda-response'

export const main: APIGatewayProxyHandler = async (event) => {
    console.log('banana hello from sites')
    const params = event.queryStringParameters

    try {
        return corsSuccessResponse({
            statusCode: 200,
            body: { message: 'hello from sites' },
        })
    } catch (e) {
        console.log('error', e)
        return corsErrorResponse(e, 400)
    }
}
