import "./style.css";
let teams;

async function load_teams() {
  const promise = await fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(data => {
      teams = data;
    });
}

function display_teams() {
  if (!teams) {
    return false;
  }
  let html = "";
  teams.forEach(team => {
    html += `<tr>
            <td>${team.promotion}</td>
            <td>${team.members}</td>
            <td>${team.name}</td>
            <td>${team.url}</td>
            <td></td>
            </tr>
    `;
  });
  document.querySelector("tbody").innerHTML = html;
}

await load_teams();
display_teams();
