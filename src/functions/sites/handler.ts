import { APIGatewayProxyHandler } from 'aws-lambda'
import axios from 'axios'
import conn from '@libs/db'

import { corsSuccessResponse, corsErrorResponse } from '@libs/lambda-response'

export const main: APIGatewayProxyHandler = async (event) => {
    console.log('banana hello from sites')
    const params = event.queryStringParameters
    try {
        const query = await conn.query(
            `select json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(feature)
              ) polygons
              from 
            (select ST_AsGeoJson(rs.wkb_geometry)::json feature
            from roman_sites rs 
            ) t1`
        )
        const { polygons } = query.rows[0]

        return corsSuccessResponse({
            statusCode: 200,
            body: polygons,
        })
    } catch (e) {
        console.log('error', e)
        return corsErrorResponse(e, 400)
    }
}
