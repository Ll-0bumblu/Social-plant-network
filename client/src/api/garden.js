const UploadPlanList = async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try{
        const response = await fetch('/api/plantList', {
            method: "GET",
            signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.status == 400) {
            throw new Error(`Нет подключения к серверу`)
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        clearTimeout(timeoutId)
        
        if (error.name === 'AbortError') {
            throw new Error('Превышено время ожидания ответа от сервера')
        }
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            throw new Error('Нет подключения к серверу')
        }
        
        throw new Error(`Ошибка: ${error.message}`)
    }
}