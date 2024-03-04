import "./style.css";

function $(selector) {
  return document.querySelector(selector);
}

function load_teams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(data => {
      display_teams(data);
    });
}

function create_entry(team) {
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
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
  <td></td>
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

function on_sbumit(e) {
  e.preventDefault();
  let team = get_form_values();
  create_entry(team);
  window.location.reload();
}

function init_events() {
  $("#teams-form").addEventListener("submit", on_sbumit);
}

init_events();
load_teams();
