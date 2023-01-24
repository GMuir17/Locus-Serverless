function lambdaResponse({
    json,
    statusCode,
    allowCORS = false,
    isJson = true,
}) {
    const response = {
        statusCode,
        body: isJson ? JSON.stringify(json) : json,
        headers: isJson
            ? { 'content-type': 'application/json; charset=utf-8' }
            : {},
    }

    if (allowCORS) {
        response.headers = {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json; charset=utf-8',
        }
    }

    return response
}

export function errorResponse(json, statusCode = 500) {
    return lambdaResponse({
        json,
        statusCode: statusCode,
    })
}

export function corsErrorResponse(json, statusCode = 500) {
    return lambdaResponse({
        json,
        statusCode: statusCode,
        allowCORS: true,
    })
}

export function successResponse(json, statusCode = 200) {
    return lambdaResponse({
        json,
        statusCode: statusCode,
    })
}

export const corsSuccessResponse = (json, statusCode = 200) => {
    return lambdaResponse({
        json,
        statusCode: statusCode,
        allowCORS: true,
    })
}

export const corsTextSuccessResponse = (json, statusCode = 200) => {
    return lambdaResponse({
        json,
        statusCode: statusCode,
        allowCORS: true,
        isJson: false,
    })
}
