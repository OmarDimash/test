# API сокращения URL

Этот проект представляет собой простой API сокращения URL, созданный с помощью Node.js и Express.js.

## Конечные точки

### POST /shorten
Принимает объект JSON с URL и возвращает сокращенный код URL.

**Запрос:**
```json
{
"url": "http://example.com"
}# test
