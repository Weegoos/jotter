/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API для управления заметками
 */

// -------------------- notes/create -----------------------

/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     description: Создаёт новую заметку, связанную с файлом. В случае типа "private" можно указать пароль.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - fileName
 *               - title
 *               - type
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Текст новой заметки"
 *               fileName:
 *                 type: string
 *                 example: "my_notes.txt"
 *               title:
 *                 type: string
 *                 example: "Идея стартапа"
 *               type:
 *                 type: string
 *                 enum: [private, public, shared]
 *                 example: "private"
 *               password:
 *                 type: string
 *                 nullable: true
 *                 example: "secret123"
 *                 description: Указывается только если type = private
 *     responses:
 *       201:
 *         description: Заметка успешно создана.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "Текст новой заметки"
 *                 fileId:
 *                   type: integer
 *                   example: 5
 *                 fileName:
 *                   type: string
 *                   example: "my_notes.txt"
 *                 title:
 *                   type: string
 *                   example: "Идея стартапа"
 *                 type:
 *                   type: string
 *                   example: "private"
 *                 password:
 *                   type: string
 *                   nullable: true
 *                   example: "secret123"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-18T12:34:56.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-18T12:35:10.000Z"
 *       400:
 *         description: Ошибка в запросе (отсутствуют обязательные поля).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Контент, fileName, title и type обязательны"
 *       404:
 *         description: Файл не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл не найден"
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

// --------------------------- delete ---------------------

/**
 * @swagger
 * /notes/{noteId}:
 *   delete:
 *     summary: Удаление заметки по ID
 *     description: Удаляет заметку с указанным noteId из базы данных.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Уникальный идентификатор заметки
 *     responses:
 *       200:
 *         description: Заметка успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка успешно удалена."
 *       400:
 *         description: Ошибка в запросе (например, отсутствует noteId)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: noteId отсутствует."
 *       404:
 *         description: Заметка не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка не найдена."
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */

// ----------------------------- getByNoteID ------------
/**
 * @swagger
 * /notes/note/{noteId}:
 *   get:
 *     summary: Получить заметку по ID
 *     tags: [Notes]
 *     description: Получает одну заметку по её ID. Для приватных заметок требуется пароль (query параметр `password`).
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заметки
 *       - in: query
 *         name: password
 *         required: false
 *         schema:
 *           type: string
 *         description: Пароль для приватной заметки
 *     responses:
 *       200:
 *         description: Заметка найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 title:
 *                   type: string
 *                 type:
 *                   type: string
 *                 fileId:
 *                   type: integer
 *                 fileName:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Неверный запрос (например, отсутствует noteId или пароль)
 *       403:
 *         description: Неверный пароль
 *       404:
 *         description: Заметка не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 */

// -------------------- notes/all -----------------------

/**
 * @swagger
 * /notes/{fileId}/{pinned}:
 *   get:
 *     summary: Получить все заметки по ID файла и статусу pinned
 *     tags: [Notes]
 *     description: Возвращает все заметки, связанные с указанным fileId, с возможной фильтрацией по pinned (true/false).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID файла, для которого нужно получить заметки.
 *       - in: path
 *         name: pinned
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Флаг фильтрации закреплённых заметок. Если не передан — возвращаются все.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив заметок.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       400:
 *         description: Ошибка в запросе (например, отсутствует fileId и pinned).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: fileID и pinned отсутствует."
 *       403:
 *         description: Доступ запрещён — файл не принадлежит пользователю.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Доступ запрещен или файл не найден."
 *       500:
 *         description: Внутренняя ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */

// -------------------- notes/public -----------------------

/**
 * @swagger
 * /notes/{type}:
 *   get:
 *     summary: Получить заметки по типу
 *     description: Возвращает список заметок определённого типа пользователя.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: public
 *         description: Тип заметки
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ. Список заметок указанного типа.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Моя заметка"
 *                   content:
 *                     type: string
 *                     example: "Содержимое заметки"
 *                   type:
 *                     type: string
 *                     example: "public"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-13T10:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-14T12:30:00.000Z"
 *       400:
 *         description: тип не передан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Укажите тип"
 *       500:
 *         description: Ошибка сервера при получении заметок
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера при получении заметок"
 */

// /notes/{fileId}/search:

/**
 * @swagger
 * /notes/{fileId}/search:
 *   get:
 *     summary: Поиск заметок по заголовку или содержимому
 *     description: Ищет заметки внутри файла по совпадению в заголовке или содержимом (регистрозависимо). 
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID файла, в котором производится поиск
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Строка поиска, которая будет сравниваться с title и content
 *     responses:
 *       200:
 *         description: Найденные заметки
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *       400:
 *         description: Неверный запрос (например, отсутствует fileId или параметр поиска)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ошибка сервера при получении заметок
 */


// -------------------- notes/update -----------------------

/**
 * @swagger
 * /notes/update/{noteId}:
 *   put:
 *     summary: Обновление заметки
 *     description: Обновляет содержимое, заголовок и тип заметки по её ID.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID заметки, которую нужно обновить.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - title
 *               - type
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Обновленное содержание заметки"
 *               title:
 *                 type: string
 *                 example: "Новый заголовок"
 *               type:
 *                 type: string
 *                 enum: [private, public, protected, idea, code]
 *                 example: "public"
 *     responses:
 *       200:
 *         description: Успешное обновление заметки.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "Обновленное содержание заметки"
 *                 title:
 *                   type: string
 *                   example: "Новый заголовок"
 *                 type:
 *                   type: string
 *                   example: "public"
 *       400:
 *         description: Некорректные данные в запросе.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Все поля обязательны"
 *       404:
 *         description: Заметка не найдена.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка не найдена"
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

/**
 * @swagger
 * /notes/{noteId}/pin:
 *   put:
 *     summary: Обновить статус закрепления заметки (pinned)
 *     description: Обновляет флаг pinned у заметки, если она принадлежит пользователю
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: noteId
 *         in: path
 *         required: true
 *         description: ID заметки
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: boolean
 *                 description: Новое значение флага pinned (true или false)
 *                 example: true
 *     responses:
 *       200:
 *         description: Статус pinned обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Статус pinned обновлён
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Ошибка валидации — поле value отсутствует
 *       403:
 *         description: Файл пользователя не найден или доступ запрещён
 *       404:
 *         description: Заметка не найдена или доступ запрещён
 *       500:
 *         description: Внутренняя ошибка сервера
 */
