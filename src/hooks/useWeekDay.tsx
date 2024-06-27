import { useEffect, useState } from 'react'

const useWeekDay = (dateString: string) => {
    const [dayOfWeek, setDayOfWeek] = useState('')
    useEffect(() => {
        if (!dateString) return
        const dateObj = new Date(dateString.replace(/-/g, '/'))
        const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
        const dayName = dateObj.toLocaleDateString('en-US', options)
        setDayOfWeek(dayName)
      }, [dateString])
    
    return dayOfWeek
}

export default useWeekDay
