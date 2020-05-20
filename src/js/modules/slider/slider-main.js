import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    btnsAnimate() {
        this.btns.forEach((btn) => {
            if (btn.closest(".sidecontrol__controls")) {
                btn.classList.add("animated", "fadeInRight", "infinite");
            }
        });
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        try {
            this.hanson.style.display = "none";
            if (n == 3) {
                this.hanson.classList.add("animated", "slideInUp");
                setTimeout(() => {
                    this.hanson.style.display = "block";
                }, 3000);
            }
        } catch (e) {}

        this.slides.forEach((slide) => {
            slide.style.display = "none";
            slide.classList.add("animated", "fadeIn");
        });

        this.slides[this.slideIndex - 1].style.display = "block";
    }

    plusSlides(n) {
        this.showSlides((this.slideIndex += n));
    }

    bindTriggers() {
        try {
            this.btns.forEach((item) => {
                item.addEventListener("click", () => {
                    this.plusSlides(1);
                });
                item.parentNode.previousElementSibling.addEventListener(
                    "click",
                    (e) => {
                        console.log(e);
                        e.preventDefault();
                        if (event.currentTarget.parentNode('.sidecontrol')) {
                            if (this.slideIndex > 1) {
                                this.slideIndex = 1;
                                this.showSlides(this.slideIndex);
                            }
                        }
                    }
                );
            });

            document.querySelectorAll(".prevmodule").forEach((item) => {
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.plusSlides(-1);
                });
            });

            document.querySelectorAll(".nextmodule").forEach((item) => {
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.plusSlides(1);
                });
            });
        } catch (e) {}
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector(".hanson");
            } catch (e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
            this.btnsAnimate();
        }
    }
}
