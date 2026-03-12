const transformDate = (date) => { // format - 2026-03-15
    const month = Number(date.slice(5, 7))
    const day = Number(date.slice(8, 10))

    const monthNames = [
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
        'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    ];

    return day + " " +  monthNames[month - 1].toLowerCase()
}

export {transformDate}