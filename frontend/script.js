const api = "https://todo-list-xqlq.onrender.com";

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

$(document).ready(async () => {
  $("#register").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let data = form.serializeArray();

    user.register(data[0].value, data[1].value);
  });

  $("#login").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let data = form.serializeArray();

    user.login(data[0].value, data[1].value);
  });

  $("#activity").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let data = form.serializeArray();
    console.log(data);
    console.log(data[0].value);
    console.log(data[1].value);

    task.create(data[0].value, data[1].value);
  });
});

const task = {
  async list() {
    await $.ajax({
      url: api + `/tasks/${window.localStorage.getItem("_id")}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      success: (data) => {
        console.log(data);
        var divs = "";

        if (data.ok) {
          data.ok.forEach((element) => {
            console.log(element.status);
            divs += `
            <div class="flex p-4 bg-zinc-100 rounded-md h-24 border-slay-500 border">
              <div>
                <div class="flex items-center gap-1">
                  <input class="w-4 h-4 hover:cursor-pointer" type="checkbox" name="activity" id="${
                    element._id
                  }" onclick="task.update('${element._id}', this.checked)" ${
              element.status === "Completa" && "checked"
            }
                      }'>
                  <label class="${
                    element.status === "Completa" && "line-through"
                  } p-1 font-medium hover:cursor-pointer" for="${
              element._id
            }">${element.title}</label>
                </div>
                <span class="ml-6 text-zinc-500" onclick="task.delete('${
                  element._id
                }')">${new Date(element.date).toLocaleDateString(
              "pt-BR",
              options
            )}</span>
              </div>
              <span class="ml-auto my-auto material-symbols-outlined hover:cursor-pointer" onclick="task.delete('${
                element._id
              }')">
                delete
              </span>
            </div>`;
          });
        }
        $("#activities").html(divs);
      },
    });
  },
  async create(title, date) {
    await $.ajax({
      url: api + "/task",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        title: title,
        date: date,
        status: "Pendente",
        userId: window.localStorage.getItem("_id"),
      }),
      type: "POST",
      contentType: "application/json; charset=utf-8",
      success: () => {
        task.list();
        $(".close-modal")[[0]].click();
        $("#activity").trigger("reset");
      },
    });
  },
  async update(_id, status) {
    console.log(status);
    await $.ajax({
      url: api + `/task/${_id}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        status: status ? "Completa" : "Pendente",
      }),
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      success: () => {
        task.list();
      },
    });
  },
  async delete(_id) {
    await $.ajax({
      url: api + `/task/${_id}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      type: "DELETE",
      contentType: "application/json; charset=utf-8",
      success: () => {
        task.list();
      },
    });
  },
};

const user = {
  async register(email, password) {
    await $.ajax({
      url: api + "/register",
      data: JSON.stringify({ email: email, password: password }),
      type: "POST",
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("_id", data._id);
        window.location = "home.html";
      },
    });
  },
  async login(email, password) {
    await $.ajax({
      url: api + "/login",
      data: JSON.stringify({ email: email, password: password }),
      type: "POST",
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("_id", data._id);
        window.location = "home.html";
      },
    });
  },
  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("_id");

    window.location = "index.html";
  },
};
