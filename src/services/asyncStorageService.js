import Axios from 'axios'
const boards = []
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}
query()
function query(entityType, filterBy) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if (!entities || !entities.length) {
        entities = _getDeck()
        // boards.push(entities)
        // entities= boards
    }
    // console.log(Promise.resolve(entities));
    return Promise.resolve(entities)
}

function get(entityType, entityId) {

    if (entityType === 'places') {
        var entity = _createPlaces()
        return Promise.resolve(entity)
    } else {
        //DRAW CARD
        var entity = _getCard(entityId)
        return Promise.resolve(entity)
    }

}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            console.log(entities);
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _createPlaces() {
    const places = []
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            places.push({ id: i + ',' + j, card: null })

        }
    }
    return places
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


async function _getDeck() {
    let res = await Axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let data = res.data
    return data
}


async function _getCard(entityId) {
    let res = await Axios.get(`https://deckofcardsapi.com/api/deck/${entityId}/draw/?count=1`)
    let data = res.data
    console.log('getting you the card!', data);
    return data
}