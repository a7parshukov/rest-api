import express from "express";
import bodyParser from "body-parser";
import { v4 } from "uuid";

const app = express();
const PORT = 5000;

let USERS = [
  { _id: v4(), name: "Aleksandr", phone: "789", important: false },
  { _id: v4(), name: "Aleksandr", phone: "123", important: false },
  { _id: v4(), name: "Aleksandr", phone: "888", important: false },
];

// middleware для парсинга body в json (response):
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* Метод GET
Используется для передачи всего списка пользователей из back во front
*/
app.get("/api/users", (req, res) => {
  res.status(200).json(USERS);
})

/* POST
Используется для создания нового пользователя.
С фронта прилетает "имя и телефон", а на бэке дополняется id и важностью.
Происходит обновление "БД" в файле бэкэнда.
*/
app.post("/api/users", (req, res) => {
  const newUser = { ...req.body, _id: v4(), important: false }
  USERS.push(newUser);
  res.status(201).json(newUser)
})

/* DELETE
Используется для удаления юзера по id
*/
app.delete("/api/users/:id", (req, res) => {
  USERS = USERS.filter(elem => elem._id !== req.params.id);
  res.status(200).json({ message: `Пользователь с ID ${req.params.id} удален` });
}) 

/* PUT
На фронте изменили важность. Отправили данные на бэк.
Бэк ищет по id пользователя и заменяет его данными с фронта.
*/
app.put("/api/users/:id", (req, res) => {
  const idx = USERS.findIndex(elem => elem._id === req.params.id);
  USERS[idx] = req.body;
  res.status(200).json({message: `Пользователь с ID ${req.params.id} изменил важность`});
})

app.listen(PORT, () => console.log(`Server has been started on ${PORT} ports...`));