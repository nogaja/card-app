const intialState = {
    cards: [],
    currCard: {},
    places: [],
}

export function cardReducer(state = intialState, action) {
    // console.log(action);
    switch (action.type) {
        case 'SET_CARDS':
            return { ...state, cards: [...state.cards, action.cards] }
        case 'SET_CARD':
            return { ...state, currCard: { ...action.card } }
        case 'SET_PLACES':
            return { ...state, places: action.places }
        case 'UPDATE_PLACES':
            return {
                ...state, places: state.places.map((place) =>
                    place.id === action.place.id ? action.place : place)
            }
        default:
            return state;
    }

}