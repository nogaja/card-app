import { CardList } from '../cmps/CardList'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { cardService } from "../services/cardService"
import { loadCards, loadCard, loadPlaces, updatePlaces } from '../store/actions/cardActions'
import { Component } from 'react'
// import { useDrag } from 'react-dnd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// import {DragDropContext} from 'react-beautiful-dnd'
class _CardApp extends Component {
    state = {
        deckId: null,
        cardPlaces: null,
    }
    // const dispatch = useDispatch()

    async componentDidMount() {
        await this.props.loadCards()
        await this.props.loadPlaces()
        console.log(this.props.cards[0].deck_id, this.props.places);
        //ask ran :
        this.setState({ deckId: this.props.cards[0].deck_id })
        this.setState({ cardPlaces: this.props.places })
    }
    async drawCard(deckId) {
        await this.props.loadCard(deckId)
        // console.log('card flipped', this.props.currCard.cards[0].code);
    }
    onDragEnd = async (result) => {
        // TODO - REORDER
        const { destination, source, draggableId } = result
        console.log('source', source);
        const { currCard, places } = this.props
        console.log('currCard', currCard);
        if (!destination) {
            return
        }
        if (
            destination.droppableId === source.droppableId && destination.index === source.index
        ) return

        const destPlace = places.find(place => place.id === destination.droppableId)
        destPlace.card = currCard
        // currCard.cards.splice(0,1)

        const newPlaces = { ...this.props.places }
        // console.log('newPlaces', newPlaces);
        this.props.updatePlaces(newPlaces)

        // TODO- 
        // 1. check  local storage
        // 2. splice card from source
        // 3. fix pics


    }


    render() {
        const { cards, currCard, places } = this.props
        if (this.props.places.length !== 25) return <p>Loading...</p>
        // if(!cards || cards.length) return <p>Loading...</p>
        return (
            <div className="container flex column">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="deck">
                        <p onClick={() => {
                            this.drawCard(this.state.deckId)
                        }}>deck goes here --- click!</p>

                        <Droppable droppableId={this.state.deckId}>
                            {(provided) => (
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {provided.placeholder}
                                    {
                                        currCard.cards && currCard.cards[0] && <Draggable draggableId={currCard.cards[0].code} index={'0'} type="card">
                                            {(provided) => (
                                                <img className="drawn-card" src={currCard.cards[0].image}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                />
                                            )}
                                        </Draggable>
                                    }
                                </div>


                            )}

                        </Droppable>
                    </div>
                    <div >
                        {/* <CardList cardPlaces={cardService.createPlaces()} /> */}
                        <CardList cardPlaces={places} currCard={currCard} />

                    </div>
                </DragDropContext>
            </div>
        )
    }
}

//use hooks instead
function mapStateToProps(state) {
    return {
        cards: state.cardModule.cards,
        currCard: state.cardModule.currCard,
        places: state.cardModule.places

    }
}
const mapDispatchToProps = {
    loadCards,
    loadCard,
    loadPlaces,
    updatePlaces
}

export const CardApp = connect(mapStateToProps, mapDispatchToProps)(_CardApp)
