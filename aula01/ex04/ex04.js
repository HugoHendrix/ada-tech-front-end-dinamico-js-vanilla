const list = document.getElementsByTagName("li");
for (const item of list) {
  item.addEventListener("click", (event) => {
    event.target.classList.toggle("highlight");
  });
}