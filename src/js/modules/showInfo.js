export default class ShowInfo {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
    }

    init() {
        try {
            this.btns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    try{
                        const sibling = btn.closest(".module__info-show").nextElementSibling;
    
                        sibling.classList.toggle("msg");
                        sibling.style.marginTop = "20px";
                    } catch (e) {}
                });
            });
        } catch (e) {}
    }
}
