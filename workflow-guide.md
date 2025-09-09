# 🎯 Создание Workflow "Тест MCP n8n - Напоминания важных событий"

## 📋 Описание Workflow

Этот workflow позволяет пользователям через Telegram бота:
- ✅ Добавлять напоминания о важных событиях
- ✅ Обновлять существующие события  
- ✅ Удалять события
- ✅ Просматривать список событий
- ✅ Получать напоминания о предстоящих событиях

## 🔧 Пошаговое создание через веб-интерфейс n8n

### Шаг 1: Создание нового workflow
1. Откройте https://eneca.app.n8n.cloud
2. Нажмите "New workflow"
3. Назовите workflow: "Тест MCP n8n - Напоминания"

### Шаг 2: Добавление узлов

#### 2.1 Telegram Trigger (Триггер)
- **Тип**: `Telegram Trigger`
- **Настройки**:
  - Updates: `message`
  - Credentials: Настройте Telegram Bot API
- **Позиция**: [250, 300]

#### 2.2 AI Agent (Обработка запросов)
- **Тип**: `AI Agent` (из LangChain)
- **Настройки**:
  - Model: `gpt-4o-mini`
  - System Message: 
    ```
    Ты - помощник для управления напоминаниями важных событий. 
    Ты можешь:
    1. Добавлять новые события в календарь
    2. Обновлять существующие события
    3. Удалять события
    4. Показывать список событий
    5. Напоминать о предстоящих событиях
    
    Используй доступные инструменты для работы с календарем. 
    Отвечай на русском языке.
    ```
  - Tools: Добавьте Google Calendar узлы как инструменты
- **Позиция**: [450, 300]

#### 2.3 Google Calendar (Управление событиями)
- **Тип**: `Google Calendar`
- **Настройки**:
  - Operation: `Create Event`
  - Calendar ID: `primary`
  - Start: `={{ $json.start }}`
  - End: `={{ $json.end }}`
  - Summary: `={{ $json.title }}`
  - Description: `={{ $json.description }}`
- **Позиция**: [650, 300]

#### 2.4 Memory Store (Хранение контекста)
- **Тип**: `Memory Store`
- **Настройки**:
  - Operation: `Set`
  - Key: `user_context_{{ $json.from.id }}`
  - Value: `={{ $json }}`
- **Позиция**: [450, 500]

#### 2.5 Memory Get (Получение контекста)
- **Тип**: `Memory Store`
- **Настройки**:
  - Operation: `Get`
  - Key: `user_context_{{ $json.from.id }}`
- **Позиция**: [250, 500]

#### 2.6 Telegram Send (Ответ пользователю)
- **Тип**: `Telegram`
- **Настройки**:
  - Operation: `Send Message`
  - Chat ID: `={{ $json.from.id }}`
  - Text: `={{ $json.response }}`
- **Позиция**: [850, 300]

#### 2.7 Set Data (Подготовка данных)
- **Тип**: `Set`
- **Настройки**:
  - Values:
    - user_id: `={{ $json.from.id }}`
    - message_text: `={{ $json.text }}`
    - username: `={{ $json.from.username }}`
- **Позиция**: [250, 100]

### Шаг 3: Настройка соединений

1. **Telegram Trigger** → **Set Data**
2. **Set Data** → **Memory Get** (параллельно)
3. **Set Data** → **AI Agent** (параллельно)
4. **Memory Get** → **AI Agent**
5. **AI Agent** → **Google Calendar**
6. **Google Calendar** → **Telegram Send**

### Шаг 4: Настройка Credentials

#### 4.1 Telegram Bot API
1. Создайте бота через @BotFather в Telegram
2. Получите API токен
3. Добавьте в n8n: Settings → Credentials → Telegram API

#### 4.2 OpenAI API
1. Получите API ключ на platform.openai.com
2. Добавьте в n8n: Settings → Credentials → OpenAI API

#### 4.3 Google Calendar OAuth2
1. Настройте OAuth2 в Google Cloud Console
2. Добавьте в n8n: Settings → Credentials → Google Calendar OAuth2

### Шаг 5: Настройка AI Agent Tools

В AI Agent добавьте следующие инструменты:

1. **Google Calendar - Create Event**
   - Operation: Create
   - Calendar ID: primary
   - Description: "Создать новое событие в календаре"

2. **Google Calendar - Update Event**
   - Operation: Update
   - Description: "Обновить существующее событие"

3. **Google Calendar - Delete Event**
   - Operation: Delete
   - Description: "Удалить событие"

4. **Google Calendar - Get All Events**
   - Operation: Get All
   - Description: "Получить список всех событий"

## 🚀 Тестирование Workflow

### Примеры команд для Telegram бота:

1. **Добавить событие**:
   ```
   Добавь напоминание на 15 января 2025 в 14:00 - Встреча с клиентом
   ```

2. **Обновить событие**:
   ```
   Обнови встречу с клиентом на 16 января в 15:00
   ```

3. **Удалить событие**:
   ```
   Удали встречу с клиентом
   ```

4. **Показать события**:
   ```
   Покажи все мои напоминания
   ```

## 🔧 Дополнительные настройки

### Настройка Memory Store
- Используется для хранения контекста пользователя
- Ключ формируется как `user_context_{user_id}`
- Позволяет AI агенту помнить предыдущие взаимодействия

### Настройка уведомлений
- Добавьте Schedule Trigger для периодических напоминаний
- Настройте фильтрацию событий по дате
- Добавьте отправку уведомлений за день/час до события

## 📱 Использование через MCP

После создания workflow вы сможете управлять им через n8n-MCP инструменты:

- `n8n_get_workflow` - получить workflow
- `n8n_update_partial_workflow` - обновить workflow
- `n8n_trigger_webhook_workflow` - запустить workflow
- `n8n_validate_workflow` - проверить workflow

## 🎯 Результат

После настройки у вас будет полнофункциональный бот для управления напоминаниями, который:
- Понимает естественный язык
- Работает с календарем Google
- Запоминает контекст пользователя
- Отвечает на русском языке
- Интегрируется с n8n-MCP для автоматизации
