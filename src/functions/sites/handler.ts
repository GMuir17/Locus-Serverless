import { APIGatewayProxyHandler } from 'aws-lambda'
import axios from 'axios'
import conn from '@libs/db'

import { corsSuccessResponse, corsErrorResponse } from '@libs/lambda-response'

export const main: APIGatewayProxyHandler = async (event) => {
    console.log('banana hello from sites')
    const params = event.queryStringParameters

    try {
        const query = await conn.query(`select * from roman_sites limit 10;`)
        const sites = query.rows
        return corsSuccessResponse({
            statusCode: 200,
            body: { message: 'hello from sites', sites },
        })
    } catch (e) {
        console.log('error', e)
        return corsErrorResponse(e, 400)
    }
}
