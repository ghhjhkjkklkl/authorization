import vars from "./vars.js";
import users from "./database.js";

const { form, formFields } = vars;

class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.#validateOnSubmit();
  }

  #validateOnSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = 0;

      this.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (this.#validateFields(input) === false) {
          error++;
        }
      });
      if (this.#validateUserData() === false) {
        error++;
      }

      if (error === 0) {
        localStorage.setItem("auth", "qwerty123");
        this.form.submit();
      }
    });
  }

  #validateFields(field) {
    if (field.value.trim() === "") {
      this.#setFieldStatus(
        field,
        `${field.previousElementSibling.textContent} can not be blank`,
        "error"
      );
      return false;
    } else if (field.type === "password") {
      if (field.value.length < 8) {
        this.#setFieldStatus(
          field,
          `${field.previousElementSibling.textContent} must be at least 8 characters`,
          "error"
        );
        return false;
      } else {
        this.#setFieldStatus(field, null, "success");
        return true;
      }
    } else {
      this.#setFieldStatus(field, null, "success");
      return true;
    }
  }

  #validateUserData() {
    const userName = this.form.elements.username;
    const password = this.form.elements.password;
    let isAuthenticated = false;
    for (let user of users) {
      if (user.login === userName.value && user.password === password.value) {
        isAuthenticated = true;
        break;
      } else {
        document.querySelector(".auth-error").innerText =
          "Your data is incorrect!";
      }
    }
    return isAuthenticated;
  }

  #setFieldStatus(field, message, status) {
    const formErrorMsg = field.parentNode.querySelector(".form-error-message");
    9;

    if (status === "error") {
      formErrorMsg.textContent = message;
      field.classList.add("error");
    }

    if (status === "success") {
      formErrorMsg.textContent = message;
      field.classList.remove("error");
    }
  }
}

const validator = new Login(form, formFields);
