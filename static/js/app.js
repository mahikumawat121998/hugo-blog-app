// document.addEventListener("DOMContentLoaded", () => {
//   const mode = localStorage.getItem("mode") || "";
//   const toggle = document.querySelector(".toggle");
//   const body = document.querySelector("body");

//   document.body.className = mode;

//   if (toggle) {
//     toggle.addEventListener("click", () => {
//       const newMode = mode === "light" ? "" : "light";
//       localStorage.setItem("mode", newMode);
//       body.classList.toggle("light");
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  // const toggleButton = document.getElementById("theme-toggle");
  const toggle = document.querySelector(".toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme);

  toggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("light") ? "dark" : "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  });
});


function getRandomHexColor() {
  let color = '#';
  const hexCharacters = '0123456789ABCDEF';
  for (let i = 0; i < 6; i++) {
    color += hexCharacters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const element = document.getElementById('category-link1');
element.style.backgroundColor = getRandomHexColor(); // or getRandomRgbColor() or getRandomHslColor()
 