const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("Tane4ka170");
async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);
}

function createUserCard(user) {
  const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.login}</h2>
                <a href="${user.html_url}">${user.html_url}</a>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = search.value.trim(); // Видаляємо зайві пробіли

  if (user) {
    try {
      const userData = await getUser(user);
      createUserCard(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    search.value = "";
  }
});
