const updateBtn = document.querySelectorAll(".update");
const commentTxt = document.querySelector(".comment");
const li = document.querySelectorAll("li");

window.addEventListener("pageshow", function(e) {
  window.addEventListener("scroll", (e) => {
    localStorage.setItem("top", window.scrollY);
  })
  localStorage.getItem("top") ? document.documentElement.scrollTop = +localStorage.getItem ("top") + 10 : null
})

if (updateBtn.length) {
  updateBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      fetch(
        "/campgrounds/comment/" +
          this.getAttribute("data-comment") +
          "/" +
          this.getAttribute("data-author"),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: btn.closest(".parent").querySelector("p").textContent,
          }),
        }
        ).then((res) => {
          if(res.redirected) return location.href = res.url; 
          res.json().then(data => {
            document.querySelector(".alert") ? document.querySelector(".alert").remove() : null;
            let alert =  document.createElement("h6");
                alert.setAttribute("class", data.danger ? "alert alert-danger" : "alert alert-success");
                alert.textContent = data.danger ? data.danger : data.success;
            document.querySelector(".container").prepend(alert)
          });
        });
    });
  });
}

li.forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
  });
});
