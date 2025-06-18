// -------------------- user/register -----------------------
/**
 * @swagger
 * tags:
 *   name: User
 *   description: API про пользователей
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Ошибка сервера
 */

// user/login
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Вход пользователя
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Успешный вход
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Неверный email или пароль
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Неверный пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */

// -------------------- user/edit -----------------------

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Обновление данных пользователя
 *     tags: 
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fullname
 *         schema:
 *           type: string
 *         description: Новое полное имя пользователя
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Новый email пользователя
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: Новый пароль (не менее 6 символов)

 *     responses:
 *       200:
 *         description: Данные пользователя успешно обновлены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Данные пользователя успешно обновлены
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     fullname:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Ошибка валидации (например, короткий пароль или email уже существует)
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */

// -------------------- user/me -----------------------
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Получение данных пользователя по access_token
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешное получение данных
 *       401:
 *         description: Токен отсутствует
 *       403:
 *         description: Недействительный токен
 *       500:
 *         description: Ошибка сервера
 */

// ---------------------------- getAllUsers -------------------

/**
 * @swagger
 * /user/allUsers:
 *   get:
 *     summary: Получение всех пользователей
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Успешное получение списка пользователей
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
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-08-01T12:00:00Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-08-05T12:00:00Z
 *       404:
 *         description: Пользователи не найдены
 *       500:
 *         description: Ошибка сервера
 */

// -------------- getAllUsersByInput ---------------------------
/**
 * @swagger
 * /user/allUsersByInput:
 *   get:
 *     summary: Поиск пользователей по частичному совпадению fullname
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: fullname
 *         schema:
 *           type: string
 *         required: true
 *         description: Часть или полное имя пользователя для поиска
 *     responses:
 *       200:
 *         description: Список найденных пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fullname:
 *                     type: string
 *                     example: "Иван Иванов"
 *                   email:
 *                     type: string
 *                     example: "ivan@example.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Параметр fullname обязателен
 *       404:
 *         description: Пользователи не найдены
 *       500:
 *         description: Ошибка сервера
 */
