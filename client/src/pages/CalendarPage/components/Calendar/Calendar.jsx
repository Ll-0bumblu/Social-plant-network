import React, { useState } from 'react';
import { GetCareDates } from '../../../../api/calendar';
import { useQuery } from '@tanstack/react-query';
import './Calendar.css';
import NoteDateList from '../NoteDateList/NoteDateList';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: careDates } = useQuery({ 
        queryKey: ['careDates'], 
        queryFn: GetCareDates 
    });

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );

    const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    );

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const prevMonth = () => {
        setCurrentDate(new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        ));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        ));
    };

    const getEventsForDate = (year, month, day) => {
        if (!careDates) return [];
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return careDates.filter(event => event.date === dateStr);
    };

    const generateDays = () => {
        const days = [];
        
        const firstDayIndex = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
        
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const isToday = 
                i === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear();
            
            const dayEvents = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), i);
            
            days.push(
                <div 
                    key={i} 
                    className={`calendar-day ${isToday ? 'today' : ''}`}
                >
                    <span className="day-number">{i}</span>
                    <div className="events-container">
                        {dayEvents.map((event, index) => (
                            <div 
                                key={index} 
                                className={`event-sticker ${event.type === 'watering' ? 'watering-sticker' : 'dressing-sticker'}`}
                            >
                                {event.type === 'watering' ? '💧' : '🌱'}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <>
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth} className="nav-button">←</button>
                <h2>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button onClick={nextMonth} className="nav-button">→</button>
            </div>
            
            <div className="weekdays">
                {weekDays.map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {generateDays()}
            </div>

            
        </div>
            <NoteDateList dateList={careDates?.slice(0, 11) || []} />
        </>
        
    );
};

export default Calendar;