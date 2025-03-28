// import React, {useState} from 'react'
// import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
// import {restoreState} from '../hw06/localStorage/localStorage'
// import s from './Clock.module.css'
//
// function Clock() {
//     const [timerId, setTimerId] = useState<number | undefined>(undefined)
//     // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
//     const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
//     const [show, setShow] = useState<boolean>(false)
//
//     const start = () => {
//
//         // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
//         // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
//
//     }
//
//     const stop = () => {
//         // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
//
//     }
//
//     const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
//
//     }
//     const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
//
//     }
//
//     const stringTime = 'date->time' || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
//     const stringDate = 'date->date' || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем
//
//     // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
//     const stringDay = 'date->day' || <br/> // пишут студенты
//     const stringMonth = 'date->month' || <br/> // пишут студенты
//
//     return (
//         <div className={s.clock}>
//             <div
//                 id={'hw9-watch'}
//                 className={s.watch}
//                 onMouseEnter={onMouseEnter}
//                 onMouseLeave={onMouseLeave}
//             >
//                 <span id={'hw9-day'}>{stringDay}</span>,{' '}
//                 <span id={'hw9-time'}>
//                     <strong>{stringTime}</strong>
//                 </span>
//             </div>
//
//             <div id={'hw9-more'}>
//                 <div className={s.more}>
//                     {show ? (
//                         <>
//                             <span id={'hw9-month'}>{stringMonth}</span>,{' '}
//                             <span id={'hw9-date'}>{stringDate}</span>
//                         </>
//                     ) : (
//                         <>
//                             <br/>
//                         </>
//                     )}
//                 </div>
//             </div>
//
//             <div className={s.buttonsContainer}>
//                 <SuperButton
//                     id={'hw9-button-start'}
//                     disabled={true} // пишут студенты // задизэйблить если таймер запущен
//                     onClick={start}
//                 >
//                     start
//                 </SuperButton>
//                 <SuperButton
//                     id={'hw9-button-stop'}
//                     disabled={true} // пишут студенты // задизэйблить если таймер не запущен
//                     onClick={stop}
//                 >
//                     stop
//                 </SuperButton>
//             </div>
//         </div>
//     )
// }
//
// export default Clock
import React, {useState, useEffect} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    // Форматирование времени и даты
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '.')
    }

    const formatDay = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date)
    }

    const formatMonth = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date)
    }

    const start = () => {
        // Запускаем обновление времени каждую секунду
        const id: number = window.setInterval(() => {
            setDate(new Date())
        }, 1000)
        setTimerId(id)
    }

    const stop = () => {
        // Останавливаем таймер и сбрасываем ID
        if (timerId) {
            clearInterval(timerId)
            setTimerId(undefined)
        }
    }

    const onMouseEnter = () => setShow(true)
    const onMouseLeave = () => setShow(false)

    // Получаем отформатированные строки
    const stringTime = formatTime(date)
    const stringDate = formatDate(date)
    const stringDay = formatDay(date)
    const stringMonth = formatMonth(date)

    // Очистка таймера при размонтировании компонента
    useEffect(() => {
        return () => stop()
    }, [])

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={!!timerId}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock