// Те саме, що міксин bm у SCSS: rem(767.98)
const mobileQuery = window.matchMedia('(width <= 47.99875rem)')

// Мобільне меню. Поки воно відкрите, сторінка під ним не прокручується,
// а main і footer стають inert: фокус з клавіатури туди не потрапляє
export function initMenu() {
 const header = document.querySelector('.header')
 const button = document.querySelector('.burger-btn')
 const menu = document.querySelector('.menu')
 const background = document.querySelectorAll('main, .footer')

 if (!header || !button || !menu) return

 const isOpen = () => menu.classList.contains('menu--open')

 const setOpen = open => {
  menu.classList.toggle('menu--open', open)
  header.classList.toggle('header--menu-open', open)
  document.body.classList.toggle('page--lock', open)
  button.setAttribute('aria-expanded', String(open))
  background.forEach(element => {
   element.inert = open
  })
 }

 button.addEventListener('click', () => setOpen(!isOpen()))

 // Закриваємо лише відкрите меню. Стара версія перемикала стан при кожному
 // кліку, тож на десктопі клік по пункту «відкривав» приховане меню
 menu.addEventListener('click', event => {
  if (event.target.closest('.menu__link') && isOpen()) setOpen(false)
 })

 document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isOpen()) {
   setOpen(false)
   button.focus()
  }
 })

 // Вікно розширили до десктопа з відкритим меню: без цього сторінка
 // лишилася б заблокованою, а бургера, щоб її розблокувати, там уже немає
 mobileQuery.addEventListener('change', event => {
  if (!event.matches) setOpen(false)
 })
}
