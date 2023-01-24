import { Pool } from 'pg'

let conn: any

if (!conn) {
    conn = new Pool({
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        port: 5432,
        database: process.env.DATABASE,
    })
}

export default conn
