import "./Header.scss"
import {FC, useEffect, useState} from "react";

import Calendar from 'react-calendar'
import Cal from '../../resources/calendar.png'
import 'react-calendar/dist/Calendar.css';

interface props {
    onDate: any
}

const Header: FC<props> = (props) => {

    const [calendar, calendarState] = useState<boolean>(false);
    const [date, dateState] = useState(new Date());
    const { onDate } = props;

    const toggleCalendar = () => {
        calendarState(!calendar);
    }

    useEffect(() => {
        onDate(date);
    }, [date, onDate])

    const setDate = (event: any) => {
        dateState(event);
        calendarState(false);
    }

    return (
        <header>
            <h1>Currency Calculator <span>🇺🇦</span></h1>
            <div className="calendar-wrapper"
            >
                <img src={Cal}
                     alt="calendar button"
                     onClick={() => toggleCalendar()}
                />
                <span onClick={() => toggleCalendar()}>
                        {`${date.getFullYear()}.${
                        (date.getMonth()<10) ? "0"+date.getMonth() : date.getMonth()}.${
                        (date.getDate()<10) ? "0"+date.getDate() : date.getDate()}`}
                </span>
                {calendar ? <Calendar onChange={setDate} value={date}/> : null}
            </div>
        </header>
    )
}

export default Header;