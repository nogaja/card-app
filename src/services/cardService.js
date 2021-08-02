import { storageService } from './asyncStorageService'

export const cardService = {
    createPlaces,
    query,
    getById,
    update,
    // remove,
}


async function query() {
    return storageService.query('cards');
    // return httpService.get('board', { params: filterBy });
}

async function getById(deckId) {
    return storageService.get('card', deckId)
    // return httpService.get(`board/${boardId}`);
}


//todo : work on update
async function update(places) {
    return storageService.put('places', places);
    // return httpService.put(`board/${board._id}`, board);
}


// move to storageService
async function createPlaces() {
    return storageService.get('places')
}

//move to util
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}