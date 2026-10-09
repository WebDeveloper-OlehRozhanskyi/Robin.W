// Підсвічує пункт меню тієї секції, яка зараз під шапкою. Секції беремо з
// href пунктів, а не за порядком .section у HTML, як було раніше
export function initActiveLink() {
 const header = document.querySelector('.header')
 const items = [...document.querySelectorAll('.menu__link')]
  .map(link => ({ link, section: document.querySelector(link.hash) }))
  .filter(item => item.section)

 if (!header || items.length === 0) return

 const update = () => {
  const line = header.offsetHeight
  const root = document.documentElement
  // Остання секція може так і не дійти до шапки: нижче неї лише футер
  const isPageEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 1

  const current = isPageEnd
   ? items.at(-1)
   : items.find(({ section }) => {
      const { top, bottom } = section.getBoundingClientRect()
      return top <= line && bottom > line
     })

  // Над першою секцією і між секціями з меню не підсвічено нічого.
  // Раніше підсвітка лишалася, навіть коли повернулися на самий верх
  items.forEach(({ link }) => {
   link.classList.toggle('menu__link--active', link === current?.link)
  })
 }

 update()
 window.addEventListener('scroll', update, { passive: true })
 window.addEventListener('resize', update)
}
