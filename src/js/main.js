import MainSlider from "./modules/slider/Slider-main";
import VideoPlayer from "./modules/PlayVideo";
import MiniSlider from "./modules/slider/Slider-mini";
import Difference from "./modules/Difference";
import Form from "./modules/Forms";
import ShowInfo from "./modules/ShowInfo";
import Download from "./modules/Download";

window.addEventListener("DOMContentLoaded", () => {
    "use string";

    new VideoPlayer(".showup .play", ".overlay").init();
    new VideoPlayer(".module__video-item .play", ".overlay").init();

    const slider = new MainSlider({ 
        btns: ".next", 
        container: ".page" 
    });
    slider.render();

    const modulePageSlider = new MainSlider ({
        container: '.moduleapp',
        btns: '.next',

    });
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: ".showup__content-slider",
        prev: ".showup__prev",
        next: ".showup__next",
        activeClass: "card-active",
        animate: true,
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: ".modules__content-slider",
        prev: ".modules__info-btns .slick-prev",
        next: ".modules__info-btns .slick-next",
        activeClass: "card-active",
        animate: true,
        autoplay: true,
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: ".feed__slider",
        prev: ".feed__slider .slick-prev",
        next: ".feed__slider .slick-next",
        activeClass: "feed__item-active",
    });
    feedSlider.init();

    new Difference(".officerold", ".officernew", ".officer__card-item").init();

    new Form(".form").init();

    new ShowInfo('.plus').init();

    new Download('.download').init();
});
