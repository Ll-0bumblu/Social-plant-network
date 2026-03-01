const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const validFile = (file) => {
    if (!file) return ({isValid: false, error: "Файл не выбран"});

    if (!ALLOWED_TYPES.includes(file.type)) return ({isValid: false, error: "Неподдерживаемый формат файла"});

    if (file.size > MAX_FILE_SIZE) return ({isValid: false, error: "Слишком большой файл"});

    return ({isValid: true, error: ""})
}

export {validFile}