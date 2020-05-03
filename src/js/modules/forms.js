export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll("input");
        this.message = {
            loading: "Загрузка...",
            success: "Спасибо! Скоро мы с вами свяжемся!",
            failure: "Что-то пошло не так...",
        };
        this.path = "assets/question.php";
    }

    clearInputs() {
        this.inputs.forEach((item) => {
            item.value = "";
        });
    }

    checkMailInputs() {
        const txtInputs = document.querySelectorAll('[type="email"]');

        txtInputs.forEach((input) => {
            input.addEventListener("keypress", function (e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {

        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.creteTextRange) {
                let range = elem.creteTextRange();

                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = "+1 (__) ___-____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, (a) => {
                return /[_\d]/.test(a) && i < val.length
                    ? val.charAt(i++)
                    : i >= val.length
                    ? ""
                    : a;
            });

            if (event.type === "blur") {
                if (this.value.length == 2) {
                    this.value = "";
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let phoneInputs = document.querySelectorAll('[name="phone"]');

        phoneInputs.forEach((input) => {
            input.addEventListener("input", createMask);
            input.addEventListener("focus", createMask);
            input.addEventListener("blur", createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await res.text();
    }

    init() {
        this.initMask();
        this.checkMailInputs();

        this.forms.forEach((form) => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                let statusMessage = document.createElement("div");
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then((res) => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    }
}
