// JavaScript ES6 (Babel might be needed!)
//
// You don't need to use any JavaScripts!
// libs: mobile-detect.js [http://hgoebl.github.io/mobile-detect.js/]
//

const ResponsiveScroll = function (elThis, elClass = "is-notTouch") {
    this.element = document.querySelector(elThis);
    this.md = new MobileDetect(window.navigator.userAgent);
    this.render = () => {
        if (!this.md.mobile() && this.element && typeof this.element === "object") {
            this.element.classList.add(elClass);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let yourName = new ResponsiveScroll(".responsive-scroll");
    yourName.render();
})

// // Buttons

// let responsiveScrollControl = new function () {
//     this.md = new MobileDetect(window.navigator.userAgent);
//     this.element = document.querySelector(".controls");
//     // this.element.buttons = this.element.querySelectorAll(".button");
//     // this.element.buttons.classReset = () => {
//     //     for (let index in this.element.buttons) {
//     //         if (typeof this.element.buttons[index] === "object") {
//     //             this.element.buttons[index].classList.remove("selected");
//     //         }
//     //     }
//     // }
//     this.target = document.querySelector(".responsive-scroll");
//     // this.init = function () {
//     //     // for (let index in this.element.buttons) {
//     //     //     let tempElBtn = this.element.buttons[index];
//     //     //     if (typeof tempElBtn === "object") {
//     //     //         tempElBtn.onclick = function () {
//     //     //             responsiveScrollControl.element.buttons.classReset();
//     //     //             if (this.getAttribute("data-class")) {
//     //     //                 this.classList.add("selected");
//     //     //                 responsiveScrollControl.target.classList.add("is-notTouch");
//     //     //             } else {
//     //     //                 this.classList.add("selected");
//     //     //                 responsiveScrollControl.target.classList.remove("is-notTouch");
//     //     //             }
//     //     //         }
//     //     //     }
//     //     // }
//     // }
// }

// // document.addEventListener("DOMContentLoaded", () => {
// //     responsiveScrollControl.init();
// // });