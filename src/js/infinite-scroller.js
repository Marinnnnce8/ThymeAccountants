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
    // x: (i) => {
    //   return (menuWidth / 2) - (i * 25);
    // },
    // opacity: (i) => {
    //   if ((menuWidth / 2) + (i * 25) <= menuWidth) {
    //     return .4 + i / 10;
    //   } else {
    //     return .4 - i / 10;
    //   }
    // },
    // scale: (i) => {
    //   if ((menuWidth / 2) + (i * 25) <= menuWidth) {
    //     return .4 + i / 10;
    //   } else {
    //     return .4 - i / 10;
    //   }
    // },
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
  scrollX -= e.deltaX
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
  // scrollX += (touchX - touchStart) * 2.5
  // touchStart = touchX
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
  // console.log(y);
  // x = changeDirection(x, menuWidth)
  // dispose(x)

  scrollSpeed = y - oldScrollY
  oldScrollY = y

  gsap.to($items, {
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * .005,
    rotate: scrollSpeed * 0.2
  })

  gsap.registerPlugin(ScrollTrigger);
  const menu = document.querySelectorAll('.menu')[0];
  const menuItems = document.querySelectorAll('.menu-items');

  // document.querySelectorAll('.menu-item').forEach((item) => {
    for (var i = 0; i < menuItems.length; i++) {

      gsap.to(item[i], {
        scrollTrigger: {
          trigger: item,
          x: menuWidth / 2 - i * 30,
          scrub: false,
          markers: false
        },
        duration: 0.8,
        opacity: 1,
        // immediateRender: false,
      })

      gsap.to(item[i], {
        scrollTrigger: {
          trigger: menu,
          x: 0,
          scrub: false,
          markers: false,
        },
        duration: 0.8,
        opacity: 0.2,
        // immediateRender: false,
      })
    }

  // })
}
render()
