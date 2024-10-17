const api = "http://localhost:8000";
let token = "";
let _id = "";

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

$(document).ready(async () => {
  $("#login").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let data = form.serializeArray();
    console.log(data);
    console.log(data[0].value);
    console.log(data[1].value);

    user.login(data[0].value, data[1].value);
  });

  $("#activity").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let data = form.serializeArray();
    console.log(data);
    console.log(data[0].value);
    console.log(data[1].value);

    console.log(window.localStorage.getItem("_id"));
    console.log(window.localStorage.getItem("token"));

    task.create(data[0].value, data[1].value);
  });
});

const task = {
  async list() {
    await $.ajax({
      url: api + "/tasks",
      type: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      success: (data) => {
        console.log(data);
        var divs = "";

        if (data.ok) {
          data.ok.forEach((element) => {
            divs += `<div class="p-4 bg-zinc-100 rounded-md h-24 border-slay-500 border">
      <div class="flex items-center gap-1">
        <input class="w-4 h-4" type="checkbox" name="activity" id="${
          element._id
        }">
        <label class="p-1 font-medium" for="${element._id}">${
              element.title
            }</label>
      </div>
      <span class="ml-6 text-zinc-500">${new Date(
        element.date
      ).toLocaleDateString("pt-BR", options)}</span>
    </div>`;
          });
        }

        console.log(divs);
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
      success: (data) => {
        console.log(data);
        window.location.reload();
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
