// GitHub repo loader
const config = { githubUser: document.body.getAttribute("data-github") || "your-github-username" };

async function loadGitHubProjects() {
  const container = document.getElementById("projects-grid");
  if (!container || !config.githubUser) return;

  try {
    const res = await fetch(`https://api.github.com/users/${config.githubUser}/repos?sort=pushed&per_page=6`);
    const repos = await res.json();
    container.innerHTML = "";
    repos.forEach(r => {
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `<h3>${r.name}</h3>
        <p class="small">${r.description || "No description"}</p>
        <div class="small">★ ${r.stargazers_count} • ${r.language || "—"}</div>
        <a class="btn" href="${r.html_url}" target="_blank">View</a>`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load repos", err);
  }
}
loadGitHubProjects();

// Map (only if map div exists)
if (document.getElementById("map")) {
  const map = L.map("map").setView([5.56, -0.20], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
  L.marker([5.64, -0.21]).addTo(map).bindPopup("Madina - Survey Center");
}
