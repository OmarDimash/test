import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import validator from 'validator';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'urls.json');

app.use(express.json());

const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return {};
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));
};

app.post('/shorten', (req, res) => {
    console.log('Received POST request:', req.body); // Логируем запрос

    const { url } = req.body;
    if (!validator.isURL(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    const data = loadData();
    const code = nanoid(6);
    data[code] = url;
    saveData(data);
    res.json({ code, url: `http://localhost:${PORT}/${code}` });
});

app.get('/:code', (req, res) => {
    const { code } = req.params;
    const data = loadData();
    const url = data[code];
    if (url) {
        return res.redirect(302, url);
    }
    res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});