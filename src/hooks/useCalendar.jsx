import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react'


const useCalendar = () => {
  const [headers, setHeaders] = useState();
  const [view, setView] = useState();
  const [current, setCurrent] = useState({});
  
  const weekdays = useMemo(() => ["일", "월", "화", "수", "목", "금", "토"], []);

  const body = useMemo(() => {
    if (isEmpty(current)) return {}
    const startDay = new Date(current.year, current.month-1, 0)
    const prevDate = startDay.getDate();
    const prevDay = startDay.getDay();

    const endDay = new Date(current.year, current.month, 0)
    const nextDate = endDay.getDate();
    const nextDay = endDay.getDay();
    return { startDay, prevDate, prevDay, endDay, nextDate, nextDay };
  },[current]);

  const prevDays = useMemo(() => {
    if (isEmpty(body)) return []
    const { prevDate, prevDay } = body;
    const days = []
    for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
      days.push(i)
    }
    return days
  },[body])

  const currentDays = useMemo(() => {
    if (isEmpty(body)) return []
    const { nextDate } = body;
    const days = []
    for (var i = 1; i <= nextDate; i++) {
      days.push(i)
    }
    return days
  },[body])

  const nextDays = useMemo(() => {
    if (isEmpty(body)) return []
    const { nextDay } = body;
    const days = []
    for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
      days.push(i)
    }
    return days
  },[body])


  useEffect(() => {
    const newDate = new Date();
    const value = {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    };
    setCurrent(value);
  }, []);

  return { weekdays, headers, prevDays, currentDays, nextDays, view, current }
};

export default useCalendar