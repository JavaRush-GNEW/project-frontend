const BASE_URL = "http://localhost:8080";

// get players-per-page-select value

let playersPerPage = 3;
// let playersCount = 0;

window.addEventListener("DOMContentLoaded", function () {
    initValues();
    getPlayersAmount().then(response => generateButtons(response));

    getPlayers(0, playersPerPage).then(players => updateTable(players));


    document.getElementById("players-per-page-select").addEventListener("change", (event) => {
        playersPerPage = event.target.value;
        getPlayers(0, playersPerPage).then(players => updateTable(players));
    })
})


function initValues(){
    playersPerPage = document.getElementById("players-per-page-select").value;
}


function generateButtons(playersAmount){
    let buttonsContainer = document.getElementById("page-buttons-container");

    // 50 Players
    // 5 players per page
    // =  10 pages

    let pagesCount = Math.ceil(playersAmount / playersPerPage);

    buttonsContainer.innerHTML = "";
    for (let i = 1; i <= pagesCount; i++) {
        let button = document.createElement("div");
        button.textContent = i;
        button.classList.add("btn");
        button.classList.add("btn-secondary");
        button.addEventListener("click", () => getPlayers(i - 1, playersPerPage).then(players => updateTable(players)));
        buttonsContainer.appendChild(button);
    }
}


function getPlayers(pageNumber = 0, pageSize = playersPerPage) {
    const requestOptions = {
        method: "GET",
    };

    const params = new URLSearchParams({
        pageNumber: pageNumber,
        pageSize: pageSize,
    });

    const requestUrl = BASE_URL + "/rest/players?" + params;

    return fetch(requestUrl, requestOptions)
        .then((response) => response.json())
}


function getPlayersAmount(){
    const requestOptions = {
        method: "GET",
    };

    const requestUrl = BASE_URL + "/rest/players/count";

    return fetch(requestUrl, requestOptions).then(response => response.text());
}


function updateTable(json) {
    let tableBody = document.getElementById("playersTableBody");
    tableBody.innerHTML = "";

    json.forEach((player) => {
        let row = document.createElement("tr");

        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let titleCell = document.createElement("td");
        let race = document.createElement("td");
        let profession = document.createElement("td");
        let level = document.createElement("td");
        let birthday = document.createElement("td");
        let banned = document.createElement("td");

        idCell.textContent = player.id;
        nameCell.textContent = player.name;
        titleCell.textContent = player.title;
        race.textContent = player.race;
        profession.textContent = player.profession;
        level.textContent = player.level;
        birthday.textContent = player.birthday;
        banned.textContent = player.banned;

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(titleCell);
        row.appendChild(race);
        row.appendChild(profession);
        row.appendChild(level);
        row.appendChild(birthday);
        row.appendChild(banned);

        console.log(player);

        tableBody.appendChild(row)
    })
}