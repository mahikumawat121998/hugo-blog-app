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
// element.style?.backgroundColor = getRandomHexColor(); 
function copyLinkToClipboard(elem, link) {
  navigator.clipboard.writeText(link).then(() => {
    elem.innerText = "Copied!";
    // setTimeout(() => {
    //   elem.innerText = "Copy Link";
    // }, 2000);
  }
);
}
function shareLink(link, title) {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: title,
      url: link,
    }).then(() => {
      console.log('Thanks for sharing!');
    }).catch(console.error);
  } else {
    alert('Share not supported in this browser. You can copy the link manually.');
  }
}
 

let posts = [];

// Fetch index.json
fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    posts = data;
    console.log("Fetched Posts:", posts); 
  })
  .catch(error => {
    console.error("Failed to load index.json", error);
  });

// DOM elements
const input = document.getElementById('searchInput');
const resultsContainer = document.getElementById('searchResults');

input.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  resultsContainer.innerHTML = '';

  if (query.length === 0) return;

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<li>No posts found.</li>';
  } else {
    filtered.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
      resultsContainer.appendChild(li);
    });
  }
});

const searchInputContainer = document.getElementsByClassName("search-container")[0]; // get the first element
const button = document.getElementById('myButton');

button.addEventListener('click', function () {
  console.log("hello");
  searchInputContainer.classList.toggle('highlight');
});
