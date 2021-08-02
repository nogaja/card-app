import { cardService } from "../../services/cardService";

export function loadCards() {
    return async (dispatch) => {
        try {
            const cards = await cardService.query()
            dispatch({ type: 'SET_CARDS', cards })

        } catch (err) {
            console.log('CardActions: err in loadCards', err);
        }
    }
}

export function loadCard(deckId) {
    return async (dispatch) => {
        try {
            const card = await cardService.getById(deckId)
            dispatch({ type: 'SET_CARD', card })

        } catch (err) {
            console.log('CardActions: err in loadCard', err);
        }
    }
}

export function loadPlaces() {
    return async (dispatch) => {
        try {
            const places = await cardService.createPlaces()
            dispatch({ type: 'SET_PLACES', places })
            console.log('places in loader', places);
        } catch (err) {
            console.log('cardAction: err in loadPlaces', err);
        }
    }
}

export function updatePlaces(places) {
    return async (dispatch) => {
        try{
            const updatedPlaces = await cardService.update(places)
            dispatch({ type: 'UPDATE_PLACES', places: updatedPlaces })
        } catch (err){
            console.log('cardActions: err in updatePlaces', err);
        }
    }
}