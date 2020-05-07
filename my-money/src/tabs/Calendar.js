import React, {
    useEffect,
    useState,
    useReducer
} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {
    return (
        <>
            <div className="header-tabs">
                <div style={{ color: "white", textAlign: "center" }}>
                    <h1>Calendar</h1>
                </div>
            </div>

            <div className="tres" style={{ width: "100%", height: "100%" }}>
                <div className="resize-calendar" style={{ marginLeft: "5%" }}>
                    <br />
                    <div>
                        <FullCalendar
                            defaultView="dayGridMonth"
                            plugins={[dayGridPlugin]}
                            weekends={true}
                            events={[
                                { title: '- R$ 100,00', date: '2020-04-30' },
                                { title: '+ R$ 400000,00', date: '2020-04-29' }
                            ]}
                        />
                    </div>
                    <br />
                </div>
            </div>
        </>
    )
}

export default Calendar