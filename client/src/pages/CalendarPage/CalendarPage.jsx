import PageLayout from '../../layouts/PageLayout/PageLayout'
import Calendar from './components/Calendar/Calendar'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react'

function CalendarPage() {
  return (
    <PageLayout icon={<CalendarMonthIcon/>} name={"Календарь полива и удобрения"}> 
      <Calendar/>
    </PageLayout>
  )
}

export default CalendarPage
