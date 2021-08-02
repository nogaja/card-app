import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export function CardPreview({ place, index, currCard }) {
    return (
        <Droppable droppableId={place.id}>
            {(provided) => (
                <div
                    //styled cmp from react-dnd
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                >
                    {provided.placeholder}
                    <div>
                      
                        <p >card preview</p>
                        {/* will change evreyy draw... */}
                        {place.card && <img className="drawn-card" src={place.card.cards[0].image}/>}
                    </div>

                    {/* <Draggable draggableId={`card-${place.id}`} index={index}>
                        {(provided) => (
                            <div>
                                <p {...provided.draggableProps}
                                    ref={provided.innerRef}>card preview</p>
                                <p {...provided.dragHandleProps}>handle</p>
                            </div>
                        )}
                    </Draggable> */}
                </div>
            )}
        </Droppable>
    )
}
