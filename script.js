const fetchBtn = document.getElementById("fetchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const repoCard = document.getElementById("repoCard");
const statusDiv = document.getElementById("status");
const languageSelect = document.getElementById("languageSelect");

async function fetchRepo() {
  const language = languageSelect.value;
  if (!language) {
    statusDiv.innerHTML = "<p class='error'>⚠️ Please select a language!</p>";
    return;
  }

  statusDiv.innerHTML = "<p class='loading'>⏳ Loading, please wait...</p>";
  repoCard.innerHTML = "";
  refreshBtn.style.display = "none";

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=100`
    );

    if (!response.ok) throw new Error("Error fetching repositories");

    const data = await response.json();
    if (data.items.length === 0) {
      statusDiv.innerHTML = "<p class='error'>No repositories found.</p>";
      return;
    }

    // اختيار عشوائي
    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];

    statusDiv.innerHTML = "";
    repoCard.innerHTML = `
      <h3><a href="${randomRepo.html_url}" target="_blank">${randomRepo.name}</a></h3>
      <p>${randomRepo.description || "No description available."}</p>
      <p>⭐ Stars: ${randomRepo.stargazers_count}</p>
      <p>🍴 Forks: ${randomRepo.forks_count}</p>
      <p>🐞 Issues: ${randomRepo.open_issues_count}</p>
    `;

    refreshBtn.style.display = "inline-block"; // يظهر زر التحديث
  } catch (error) {
    statusDiv.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
}

// زر Fetch
fetchBtn.addEventListener("click", fetchRepo);

// زر Refresh
refreshBtn.addEventListener("click", fetchRepo);
