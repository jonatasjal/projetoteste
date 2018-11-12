const axios = require('axios')
const baseURL = 'https://como-fazer-devpleno-8e0e5.firebaseio.com/' // url padrão
const auth = '7HUYNjF6vPgCblzVIwmspgsY2bYQ3euXBtXdPOEY'

// método tirado de index.js e melhorado
const list = async (key) => {
    const content = await axios.get(baseURL + key + '.json?auth=' + auth)
    if (content.data) {
        const objetos = Object
            .keys(content.data)
            .map(key => {
                return {
                    id: key,
                    ...content.data[key]
                }
            })
        return objetos
    }
    return []
}

// método deletar
const apagar = async (key, id) => {
    await axios.delete(baseURL + key + '/' + id + '.json?auth=' + auth)
    return true
}

// método editar
const get = async (key, id) => {
    const content = await axios.get(`${baseURL}/${key}/${id}.json?auth=` + auth)
    return {
        id: id,
        ...content.data
    }
}

// método atualizar
const update = async (key, id, data) => {
    await axios.put(`${baseURL}/${key}/${id}.json?auth=` + auth, data)
    return true
}

// método criar
const create = async (key, data) => {
    await axios.post(`${baseURL}/${key}.json?auth=` + auth, data)
    return true
}

// exportando todos de uma vez
module.exports = {
    list, apagar, get, update, create
}