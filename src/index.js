import "./style.css";
let all_teams = [];
let edit_id = false;
function $(selector) {
  return document.querySelector(selector);
}

function load_teams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(data => {
      all_teams = data;
      display_teams(data);
    });
}

function create_request(team) {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

function delete_request(id) {
  return fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  });
}

function update_request(team) {
  return fetch("http://localhost:3000/teams-json/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

function get_team_as_html(team) {
  return `<tr>
  <td>${team.promotion}</td>
  <td>${team.members}</td>
  <td>${team.name}</td>
  <td><a target="_blank" href="${team.url}">View</a></td>
  <td>
    <a href="#" data-id=${team.id} class="delete-btn">✖</a>
    <a href="#" data-id=${team.id} class="edit-btn">&#9998;</a>
  </td>
  </tr>
`;
}

function display_teams(teams) {
  if (!teams) {
    return false;
  }

  let html = teams.map(team => get_team_as_html(team));

  $("tbody").innerHTML = html.join("");
}

function get_form_values() {
  let ids = ["promotion", "members", "name", "url"];

  let team = {};

  ids.forEach(function (elem) {
    let inpt = $(`input[name=${elem}]`);
    team[elem] = inpt.value;
  });
  return team;
}

function set_form_values(team) {
  let ids = ["promotion", "members", "name", "url"];

  ids.forEach(function (elem) {
    $(`input[name=${elem}]`).value = team[elem];
  });
}

function on_submit(e) {
  e.preventDefault();
  let team = get_form_values();
  if (edit_id) {
    team.id = edit_id;
    update_request(team)
      .then(r => r.json())
      .then(status => {
        if (status.success) {
          window.location.reload();
        }
      });
  } else {
    create_request(team)
      .then(r => r.json())
      .then(status => {
        if (status.success) {
          window.location.reload();
        }
      });
  }
}

function start_edit(teams, id) {
  edit_id = id;
  const team = teams.find(elem => elem.id == id);
  set_form_values(team);
}

function init_events() {
  $("#teams-form").addEventListener("submit", on_submit);
  $("#teams-table tbody").addEventListener("click", e => {
    if (e.target.matches("a.delete-btn")) {
      delete_request(e.target.dataset.id)
        .then(r => r.json())
        .then(status => {
          if (status) {
            window.location.reload();
          }
        });
    } else if (e.target.matches("a.edit-btn")) {
      start_edit(all_teams, e.target.dataset.id);
    }
  });
}

init_events();
load_teams();
