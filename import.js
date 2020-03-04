const dotenv = require('dotenv')
dotenv.config()

const token = process.env.API_TOKEN

const fs = require('fs')
const axios = require('axios')

const api = axios.create({
    baseURL: 'https://zebra.liip.ch/api/v2'
})

const get = path => {
    return api.get(`${path}?token=${token}`)
}

async function init() {
    let res = await get('/locations')
    const locations = Object.values(res.data.data).map(({ id, code, name }) => ({ id, code, name }))
    fs.writeFileSync('locations.json', JSON.stringify(locations))

    res = await get('/users')
    const users = Object.values(res.data.data.list)
        .filter(({ liipch_visible, liipch_show_picture }) => liipch_visible && liipch_show_picture)
        .map(({ id, name, location_id, rokka_picture_hash }) => ({ id, name, location_id, rokka_picture_hash }))

    fs.writeFileSync('users.json', JSON.stringify(users))
}

init()