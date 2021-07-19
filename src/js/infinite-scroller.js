/*--------------------
Vars
--------------------*/
const $menu = document.querySelector('.menu')
const $items = document.querySelectorAll('.menu-item')
let menuHeight = $menu.clientHeight
let menuWidth = $menu.clientWidth
let menuWidthHalf = $menu.clientWidth
let itemHeight = $items[0].clientHeight
let wrapHeight = $items.length * itemHeight
let itemWidth = $items[0].clientWidth
let wrapWidth = $items.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0
let oldScrollX = 0
let scrollX = 0
let x = 0


/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t
}


/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  gsap.set($items, {
    y: (i) => {
      return i * itemHeight + scroll
    },
    x: (i) => {
      if ((menuWidth / 2) + (i * 33) <= menuWidth) {
        return (menuWidth / 2) - (i * 33);
      } else {
        return (menuWidth / 2) + (i * 33);
      }
    },
    opacity: (i) => {
      if ((menuWidth / 2) + (i * 33) <= menuWidth) {
        return  .4 + i / 10;
      } else {
        return  .4 - i / 10;
      }
    },
    scale: (i) => {
      if ((menuWidth / 2) + (i * 33) <= menuWidth) {
        return  .4 + i / 10;
      } else {
        return  .4 - i / 10;
      }
    },
    modifiers: {
      y: (y) => {
        const s = gsap.utils.wrap(-itemHeight, wrapHeight - itemHeight, parseInt(y))
        return `${s}px`
      },
      // x: (x) => {
      //   const s = gsap.utils.wrap(-itemWidth, wrapHeight - itemHeight, parseInt(x))
      //   console.log(s);
      //   return `${s}px`
      // }
    }
  })
}
dispose(0)


/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY
  // scrollX -= e.deltaX
}


/*--------------------
Touch
--------------------*/
let touchStart = 0
let touchY = 0
let touchX = 0
let isDragging = false
const handleTouchStart = (e) => {
  touchStart = e.clientY || e.touches[0].clientY
  isDragging = true
  $menu.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
  if (!isDragging) return
  touchY = e.clientY || e.touches[0].clientY
  scrollY += (touchY - touchStart) * 2.5
  touchStart = touchY
  // touchX = e.clientX || e.touches[0].clientX
  scrollX += (touchX - touchStart) * 2.5
  touchStart = touchX
}
const handleTouchEnd = () => {
  isDragging = false
  $menu.classList.remove('is-dragging')
}


/*--------------------
Listeners
--------------------*/
$menu.addEventListener('mousewheel', handleMouseWheel)

$menu.addEventListener('touchstart', handleTouchStart)
$menu.addEventListener('touchmove', handleTouchMove)
$menu.addEventListener('touchend', handleTouchEnd)

$menu.addEventListener('mousedown', handleTouchStart)
$menu.addEventListener('mousemove', handleTouchMove)
$menu.addEventListener('mouseleave', handleTouchEnd)
$menu.addEventListener('mouseup', handleTouchEnd)

$menu.addEventListener('selectstart', () => { return false })


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  menuHeight = $menu.clientHeight
  itemHeight = $items[0].clientHeight
  wrapHeight = $items.length * itemHeight
})


/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render)
  y = lerp(y, scrollY, .1)
  dispose(y)
  // x = lerp(x, scrollX, .1)
  // dispose(x)

  scrollSpeed = y - oldScrollY
  oldScrollY = y

  // scrollSpeed = x - oldScrollX
  // oldScrollX = x

  gsap.to($items, {
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * .005,
    rotate: scrollSpeed * 0.2
  })

  gsap.registerPlugin(ScrollTrigger);
  const items = gsap.utils.toArray('.menu-item');

  // items.forEach(item => {
  //   gsap.from(item, {
  //     opacity: 0.2,
  //     y: 30,
  //     scrollTrigger: {
  //       trigger: ('.menu'),
  //       // start: "0% 0%",
  //       // end: "0% 20%",
  //       // scrub: 1,
  //       markers: true,
  //     }
  //   });
  //   // gsap.to(item, {
  //   //   opacity: 0,
  //   //   scrollTrigger: {
  //   //     trigger: item,
  //   //     start: "0% 80%",
  //   //     end: "0% 100%",
  //   //     scrub: 1,
  //   //     markers: true,
  //   //   }
  //   // });
  // });

  // document.querySelectorAll('.menu-item').forEach(function (elem) {
  //   gsap.from(elem, {
  //     opacity: 1,
  //     scrollTrigger: {
  //       trigger: elem,
  //       start: "0% 0%",
  //       end: "0% 20%",
  //       scrub: 1,
  //       markers: false,
  //     }
  //   })
  //   gsap.to(elem, {
  //     opacity: 0,
  //     scrollTrigger: {
  //       trigger: elem,
  //       start: "0% 80%",
  //       end: "0% 100%",
  //       scrub: 1,
  //       markers: false,
  //     }
  //   });

  // })
}
render()
