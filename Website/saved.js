const savedContainer = document.getElementById("saved-outfits");
let savedOutfits = JSON.parse(localStorage.getItem("outfits")) || [];

function saveOutfits() {
  localStorage.setItem("outfits", JSON.stringify(savedOutfits));
}

function renderOutfits() {
  savedContainer.innerHTML = "";

  if (savedOutfits.length === 0) {
    savedContainer.innerHTML = "<p>Keine Outfits gespeichert.</p>";
    return;
  }

  const sortedOutfits = [...savedOutfits].sort((a, b) => (b.favorite === true) - (a.favorite === true));

  sortedOutfits.forEach((outfit, index) => {
    const outfitCard = document.createElement("div");
    outfitCard.className = "saved-outfit-card";

    const star = outfit.favorite ? "⭐" : "☆";

    outfitCard.innerHTML = `
      <div class="outfit-header">
        <h3 class="outfit-title">${outfit.name}</h3>
        <div>
          <button class="favorite-btn" data-index="${index}" title="Favorit umschalten">${star}</button>
          <button class="delete-btn" data-index="${index}" title="Outfit löschen">🗑️</button>
        </div>
      </div>
      <div class="saved-outfit-parts">
        <div class="part">${outfit.parts[0]}</div>
        <div class="part">${outfit.parts[1]}</div>
        <div class="part">${outfit.parts[2]}</div>
      </div>
    `;

    savedContainer.appendChild(outfitCard);
  });

  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const clickedName = sortedOutfits[index].name;
      const realIndex = savedOutfits.findIndex(o => o.name === clickedName);
      savedOutfits[realIndex].favorite = !savedOutfits[realIndex].favorite;
      saveOutfits();
      renderOutfits();
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const clickedName = sortedOutfits[index].name;
      const realIndex = savedOutfits.findIndex(o => o.name === clickedName);
      if (realIndex !== -1) {
        savedOutfits.splice(realIndex, 1);
        saveOutfits();
        renderOutfits();
      }
    });
  });
}

renderOutfits();