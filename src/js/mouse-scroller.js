const ResponsiveScroll = function (elThis, elClass = "is-not-touch") {
    this.element = document.querySelector(elThis);
    this.md = new MobileDetect(window.navigator.userAgent);
    this.render = () => {
        if (!this.md.mobile() && this.element && typeof this.element === "object") {
            this.element.classList.add(elClass);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let yourName = new ResponsiveScroll(".responsive-scroll-box");
    yourName.render();
})