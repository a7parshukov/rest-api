import { useState, useEffect } from "react";
import request from "./hooks/request.hook";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
  })

  let [users, setUsers] = useState([]);

  useEffect(() => {
    async function startFetching() {
      const data = await request("/api/users");
      if(data) {
        setUsers(data)
      }
    };
    startFetching();
  }, [])

  const styleName = {
    important: {
      "color": "red",
      "fontWeight": "bold"
    },
    noImportant: {
      "color": "black",
    }
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function createUser() {
    const {...user} = form;
    let response = await request("/api/users", "POST", user);
    setUsers([...users, response]);
    setForm({ name: "", phone: "" });
  }

  // const importantUser = (id) => {
  //   const user = users.find(elem => elem._id === id);
  //   user.important = !user.important;
  //   setUsers([...users]);
  // }
  async function importantUser(id) {
    const user = users.find(elem => elem._id === id);
    user.important = !user.important;
    await request(`/api/users/${id}`, "PUT", user);
    setUsers([...users]);
  }

  // const deleteUser = (id) => {
  //   setUsers(users.filter(elem => elem._id !== id));
  // }
  async function deleteUser(id) {
    let response = await request(`/api/users/${id}`, "DELETE");
    setUsers(users.filter(elem => elem._id !== id));
    console.log(response.message)
  }

  return (
    <div className="container">
      <h1>Заполнить форму</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Имя</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneInput" className="form-label">Телефон</label>
          <input
            type="text"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={createUser}
        >
          Записать
        </button>
      </form>
      <div>Количество элементов в массиве: {users.length}</div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Телефон</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => (
            <tr key={e._id}>
              <th scope="row"></th>
              <td style={e.important ? styleName.important : styleName.noImportant}>{e.name}</td>
              <td>{e.phone}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => importantUser(e._id)}
                >
                  Выделить
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteUser(e._id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;