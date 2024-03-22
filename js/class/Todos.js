import { Task } from "./Task.js";

class Todos {
  #tasks = [];
  #backend_url = '';
  constructor(url) {
    this.#backend_url = url;
  }
  getTasks = () => {
    return new Promise(async(resolve, reject) => {
      console.log(this.#backend_url);
      fetch(this.#backend_url)
        .then((response) => response.json())
        .then(
          (json) => {
            console.log(json);
            this.#readJson(json);
            resolve(this.#tasks);
          },
          (error) => {
            reject(error);
            console.log("Error fetching tasks " + error.message);
          }
        );
    });
  };
  #readJson = (tasksAsJson) => {
    tasksAsJson.forEach((node) => {
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    });
  };
  addTask = (text) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({ description: text });
      fetch(this.#backend_url + "/new", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
        .then((response) => response.json())
        .then(
          (json) => {
            resolve(this.#addToArray(json.id, text));
          },
          (error) => {
            reject(error);
            console.log("Error saving task " + error.message);
          }
        );
    });
  };

  #addToArray = (id, text) => {
    const task = new Task(id, text);
    this.#tasks.push(task);
    return task;
  };
}

export { Todos };
