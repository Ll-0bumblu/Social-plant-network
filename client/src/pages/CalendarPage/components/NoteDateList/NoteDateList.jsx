import React from 'react'
import './NoteDateList.css'
import { transformDate } from '../Calendar/utils';

import ListIcon from '@mui/icons-material/List';

function NoteDateList({ dateList }) {
    return (
        <div className='note-card_list'>
            <span className='note-card_title'><ListIcon sx={{ fontSize: "32px"}}/> Ближайшие задачи</span>
            {dateList.map(item => (
                <div className="note-card">
                    <span className={`event-sticker ${item.type === 'watering' ? 'watering-sticker' : 'dressing-sticker'}`}>
                        {item.type === 'watering' ? '💧' : '🌱'}
                    </span>
                   <span><b>{item.name}</b> - полить {transformDate(item.date)}</span> 
                </div>
            ))}
        </div>
    )
}

export default NoteDateList
