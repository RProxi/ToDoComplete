import pg from 'pg'

const client = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "example",
})

await client.connect()

export async function createToDo({text, is_done}) {
    return await client.query(`
    INSERT INTO todo (text, is_done)
    VALUES ($1, $2)
    RETURNING *
    `, [text, is_done])
}

export async function getAllToDos() {
    return await client.query(`
    SELECT * FROM todo
    `)
}

export async function deleteToDo(id) {
    return await client.query(`
    DELETE FROM todo
    WHERE id = $1
    `, [id])
}