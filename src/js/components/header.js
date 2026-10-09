// Шапка стає чорною, щойно сторінку прокрутили нижче її висоти
// (90px на десктопі, 70px на мобільному — береться з самої шапки)
export function initHeader() {
 const header = document.querySelector('.header')

 if (!header) return

 const update = () => {
  header.classList.toggle(
   'header--scrolled',
   window.scrollY > header.offsetHeight
  )
 }

 // Одразу, а не лише при прокрутці: сторінку можуть перезавантажити посередині
 update()
 window.addEventListener('scroll', update, { passive: true })
}
