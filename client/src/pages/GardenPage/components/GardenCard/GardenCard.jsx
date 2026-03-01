import React from 'react'
import './GardenCard.css'

function GardenCard({ cardData }) {
  return (
    <div className="plant-card">
        <div className="plant-img"><i className="fas fa-tree"></i></div>
        <div className="plant-info">
            <h3>{cardData.name}</h3>
            {/* <p><i className="fas fa-tint"></i>{cardData.care}</p> */}
        </div>
    </div>
  )
}

export default GardenCard
