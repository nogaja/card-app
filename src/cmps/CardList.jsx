import React from 'react'
import { CardPreview } from './CardPreview'


export function CardList({ cardPlaces, currCard }) {
  return (

    <div className="board-container">
      {cardPlaces.map((place, index) => <CardPreview place={place} key={place.id} index={index} currCard={currCard} />)}
    </div>

  )
}
