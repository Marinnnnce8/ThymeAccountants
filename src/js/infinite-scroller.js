/*--------------------
Vars
--------------------*/
const $isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if (!$isFF) {
  const $menu = document.querySelector('.banner-menu')
  const $items = document.querySelectorAll('.banner-menu-item')
  let itemHeight = $items[0].clientHeight
  let wrapHeight = $items.length * itemHeight

  let scrollSpeed = 0
  let oldScrollY = 0
  let scrollY = 0
  let y = 0

  /*--------------------
  Lerp
  --------------------*/
  const lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t
  }

  /*--------------------
  Prevent page scroll
  --------------------*/
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch (e) { }

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // Call this to disable
  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  // Call this to enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  $menu.addEventListener('mouseover', function () {
    disableScroll();
  });

  $menu.addEventListener('mouseout', function () {
    enableScroll();
  });


  /*--------------------
  Dispose
  --------------------*/
  const dispose = (scroll) => {
    gsap.set($items, {
      y: (i) => {
        return i * itemHeight + scroll
      },
      modifiers: {
        y: (y) => {
          const s = gsap.utils.wrap(-itemHeight, wrapHeight - itemHeight, parseInt(y))
          return `${s}px`
        }
      }
    })
  }
  dispose(0)


  /*--------------------
  Wheel
  --------------------*/
  const handleMouseWheel = (e) => {
    scrollY -= e.deltaY
  }


  /*--------------------
  Touch
  --------------------*/
  let touchStart = 0
  let touchY = 0
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

    scrollSpeed = y - oldScrollY
    oldScrollY = y

    gsap.to($items, {
      scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * .005,
      rotate: scrollSpeed * 0.2
    })

    gsap.registerPlugin(ScrollTrigger);
    const menu = document.querySelectorAll('.banner-menu')[0];
    const menuItems = gsap.utils.toArray('.banner-menu-items');

    menuItems.forEach((item) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: menu,
          start: "20% 50%",
          end: "20% 50%",
          scrub: false,
          markers: true
        },
        duration: 0.8,
        opacity: 1,
        immediateRender: false,
      })

      gsap.to(item, {
        scrollTrigger: {
          trigger: menu,
          start: "20% 50%",
          end: "20% 50%",
          scrub: false,
          markers: true,
        },
        duration: 0.8,
        opacity: 0.2,
        immediateRender: false,
      })
    })
  }
  render()
}