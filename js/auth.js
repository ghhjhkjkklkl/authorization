class Auth {
  constructor() {
    document.body.style.display = "none";
    const auth = localStorage.getItem("auth");
    this.#validateAuth(auth);
  }

  #validateAuth(auth) {
    if (auth === "qwerty123") {
      document.body.style.display = "block";
    } else {
      window.location.replace("/");
    }
  }

  logOut() {
    window.location.replace("/");
    localStorage.removeItem("auth");
  }
}
const auth = new Auth();
const logOutBtn = document.querySelector(".main__link");

logOutBtn.addEventListener("click", () => {
  auth.logOut();
});
