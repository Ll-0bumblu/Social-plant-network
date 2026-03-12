const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Раздаем статические файлы из папки data
app.use('/data', express.static(path.join(__dirname, 'data')));

// Эндпоинт для загрузки изображения
app.post('/api/uploadImg', (req, res) => {
    setTimeout(() => res.json({
        name: "Ромашка полевая",
        probability: 89,
        family: "астровые"
    }), 1000);
});

// Эндпоинт для получения списка растений с изображениями
app.get('/api/plantList', async (req, res) => {
    try {
        // Путь к папке data
        const dataDir = path.join(__dirname, 'data');
        
        // Читаем содержимое папки data
        const files = await fs.readdir(dataDir);
        
        // Фильтруем только изображения (можно добавить другие форматы)
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });
        
        // Создаем массив объектов с информацией о растениях
        // В реальном приложении здесь может быть парсинг названий из файлов или БД
        const plantList = imageFiles.map((file, index) => {
            // Пример: извлекаем название из имени файла (без расширения)
            const fileNameWithoutExt = path.basename(file, path.extname(file));
            
            return {
                id: index + 1,
                name: fileNameWithoutExt.replace(/-/g, ' '), // Заменяем дефисы на пробелы
                imageUrl: `http://localhost:${port}/data/${file}`,
            };
        });
        
        // Имитация задержки (как в других эндпоинтах)
        setTimeout(() => res.json(plantList), 1000);
        
    } catch (error) {
        console.error('Ошибка при чтении папки data:', error);
        res.status(500).json({ error: 'Не удалось получить список растений' });
    }
});


async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
        console.log('Папка data создана');
    }
}

app.get('/api/careList', async (req, res) => {
    setTimeout(() => res.json([
        {
        "date": "2026-03-15",
        "type": "watering",
        "name": "Крапива",
        },
        {
        "date": "2026-03-20",
        "type": "watering",
        "name": "Роза",
        },
        {
        "date": "2026-03-28",
        "type": "dressing",
        "name": "Кактус",
        },
        {
        "date": "2026-03-28",
        "type": "watering",
        "name": "Кактус",
        },
    ]), 1000);
})

app.post('/api/addPlant', async (req, res) => {
    setTimeout(() => res.json(
        {message: "Успешно добавлено!"}
    ), 1000)
})

app.listen(port, async () => {
    await ensureDataDir();
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`Папка с данными: ${path.join(__dirname, 'data')}`);
});