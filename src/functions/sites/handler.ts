import { APIGatewayProxyHandler } from 'aws-lambda'
import conn from '@libs/db'

import { corsSuccessResponse, corsErrorResponse } from '@libs/lambda-response'

export const main: APIGatewayProxyHandler = async () => {
    try {
        const query = await conn.query(
            `select json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(feature)
            ) polygons
              from 
            (select  json_build_object(
                'id', rs.pid,
                'type', 'Feature',
                'geometry', (ST_TRANSFORM(rs.wkb_geometry, 4326))::json,
                'properties', json_build_object(
                    'class', rs.class,
                    'type', rs.type,
                    'link', rs.link,
                    'area', rs.shape_area
                )
            ) feature
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
