import "./style.css";

function load_teams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(data => {
      console.table(data);
      return data;
    });

  console.log(promise);
}

load_teams();
