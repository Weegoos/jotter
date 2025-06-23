/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API для управления файлами
 */

// -------------------- file/create -----------------------
/**
 * @swagger
 * /file/create:
 *   post:
 *     summary: Создать новый файл
 *     tags: [Files]
 *     description: Создает новый файл с указанием имени и описания, и привязывает его к пользователю.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Программирование"
 *                 description: Название создаваемого файла (может содержать HTML-теги)
 *               description:
 *                 type: string
 *                 example: "Описание файла"
 *                 description: Краткое описание файла
 *     responses:
 *       201:
 *         description: Файл успешно создан.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл создан!"
 *                 file:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "<pre>Программирование</pre>"
 *                     description:
 *                       type: string
 *                       example: "Описание файла"
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-05-10T17:31:57.162Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-05-10T17:31:57.162Z"
 *       400:
 *         description: Ошибка запроса (например, отсутствует userId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "userId обязателен!"
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

// -------------------- file/allFiles -----------------------

/**
 * @swagger
 * /file/allFiles:
 *   get:
 *     summary: Получить все файлы
 *     tags: [Files]
 *     description: Возвращает массив всех файлов из базы данных.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив файлов.
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
 *                   content:
 *                     type: string
 *                     example: "Текст файла"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-07T12:34:56.000Z"
 */

// -------------------- file/filesName -----------------------

/**
 * @swagger
 * /file/filesName:
 *   get:
 *     summary: Получить название файлов
 *     tags: [Files]
 *     description: Возвращает массив название всех файлов из базы данных.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив название файлов.
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
 *                   content:
 *                     type: string
 *                     example: "Текст файла"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-07T12:34:56.000Z"
 */

// -------------------- file/filesStatus -----------------------

/**
 * @swagger
 * /file/filesStatus:
 *   get:
 *     summary: Получить файлы по статусу и флагу pinned с пагинацией
 *     tags: [Files]
 *     description: >
 *       Возвращает список файлов по статусу и флагу pinned, с поддержкой пагинации.
 *       Также рассылает WebSocket-событие "get_files_by_status" с теми же данными пользователям, чей userId совпадает.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: Статус файлов 
 *       - in: query
 *         name: pinned
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Закреплён ли файл (true/false)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество файлов на странице
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает файлы и данные пагинации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "File 1"
 *                       description:
 *                         type: string
 *                         example: "Описание файла"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       pinned:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-05-01T10:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-01T10:00:00Z"
 *                 totalCount:
 *                   type: integer
 *                   description: Общее количество файлов
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   description: Общее количество страниц
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   description: Текущая страница
 *                   example: 1
 *       400:
 *         description: Ошибка в запросе (например, отсутствует статус или pinned)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: статус и pinned обязателен."
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */


// -------------------- file/editStatus -----------------------

/**
 * @swagger
 * /file/editStatus:
 *   put:
 *     summary: Обновить статус файла
 *     tags: [Files]
 *     description: Обновляет статус файла по его ID и ID пользователя через query-параметры.
 *     parameters:
 *       - in: query
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID файла
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Новый статус файла
 *     responses:
 *       200:
 *         description: Статус успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Статус обновлен"
 *                 file:
 *                   type: object
 *       400:
 *         description: Некорректный запрос (например, отсутствует userId, fileId или status)
 *       404:
 *         description: Файл не найден
 *       500:
 *         description: Ошибка сервера
 */

// /file/{fileId}/pin

/**
 * @swagger
 * /file/{fileId}/pin:
 *   put:
 *     summary: Обновить статус "pinned" для файла
 *     description: Устанавливает или снимает закрепление файла пользователя.
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID файла, который нужно обновить
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
 *                 example: true
 *     responses:
 *       200:
 *         description: Статус pinned успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pinned обновился
 *                 file:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Мой файл
 *                     pinned:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Поле value отсутствует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Все поля обязательны
 *       404:
 *         description: Файл не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Файл не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */


// -------------------- file/deleteFile -----------------------

/**
 * @swagger
 * /file/deleteFile/{fileId}:
 *   delete:
 *     summary: Удалить файл по ID
 *     tags: [Files]
 *     description: Удаляет файл по его ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Уникальный идентификатор файла
 *     responses:
 *       200:
 *         description: Файл успешно удален.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл успешно удален."
 *       400:
 *         description: Ошибка запроса (отсутствует fileId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: fileId отсутствует."
 *       404:
 *         description: Файл не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл не найден."
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */

// -------------------- file/deleteAll -----------------------

/**
 * @swagger
 * /file/deleteAll:
 *   delete:
 *     summary: Удалить все файлы
 *     tags: [Files]
 *     description: Удаляет все файлы из базы данных.
 *     responses:
 *       200:
 *         description: Все файлы успешно удалены.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Все файлы успешно удалены."
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */
