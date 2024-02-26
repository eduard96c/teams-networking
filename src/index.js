import "./style.css";
let teams;
function load_teams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(data => {
      display_teams(data);
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

load_teams();
