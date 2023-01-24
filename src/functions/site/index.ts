/* eslint-disable import/no-anonymous-default-export */
import { handlerPath } from '../../libs/handler-resolver'

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    timeout: 180,
    events: [
        {
            http: {
                method: 'get',
                path: 'sites',
                private: true,
            },
        },
    ],
    maximumRetryAttempts: 0,
}
