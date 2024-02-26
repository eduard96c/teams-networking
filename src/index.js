import "./style.css";

function load_teams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(data => {
      display_teams(data);
    });
}

function create_entry() {
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      promotion: "WON3",
      members: "Your Name",
      name: "CV",
      url: "https://github.com/nmatei/teams-networking"
    })
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

  document.querySelector("tbody").innerHTML = html.join("");
}

function on_sbumit(e) {
  e.preventDefault();
  create_entry();
  window.location.reload();
}

function init_events() {
  document.querySelector("#teams-form").addEventListener("submit", on_sbumit);
}

init_events();
load_teams();
