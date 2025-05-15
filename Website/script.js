const parts = {
    top: ["T-Shirt", "Pullover", "Hemd"],
    bottom: ["Jeans", "Shorts", "Jogginghose"],
    shoes: ["Sneaker", "Stiefel", "Sandalen"]
  };
  
  const current = {
    top: 0,
    bottom: 0,
    shoes: 0
  };
  
  function updatePartDisplay(part) {
    document.getElementById(`${part}-part`).textContent = parts[part][current[part]];
  }
  
  function changePart(part, direction) {
    const items = parts[part];
    current[part] = (current[part] + direction + items.length) % items.length;
    updatePartDisplay(part);
  }
  
  function saveOutfit() {
    const name = document.getElementById("outfit-name").value.trim();
    if (!name) {
      alert("Bitte gib dem Outfit einen Namen!");
      return;
    }
  
    const outfit = {
      name: name,
      parts: [
        parts.top[current.top],
        parts.bottom[current.bottom],
        parts.shoes[current.shoes]
      ]
    };
  
    const saved = JSON.parse(localStorage.getItem("outfits") || "[]");
    saved.push(outfit);
    localStorage.setItem("outfits", JSON.stringify(saved));
  
    alert("Outfit gespeichert!");
    document.getElementById("outfit-name").value = "";
  }