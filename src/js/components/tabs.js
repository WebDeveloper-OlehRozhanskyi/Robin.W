// Вкладки за патерном WAI-ARIA Tabs: вкладку перемикає клік, стрілки ← →,
// Home і End. Tab з вкладки веде одразу в панель, а не по всіх вкладках
export function initTabs() {
 document.querySelectorAll('.tabs').forEach(initTabGroup)
}

function initTabGroup(group) {
 const tabs = [...group.querySelectorAll('[role="tab"]')]

 const select = selectedTab => {
  tabs.forEach(tab => {
   const isSelected = tab === selectedTab

   tab.setAttribute('aria-selected', String(isSelected))
   tab.tabIndex = isSelected ? 0 : -1
   document.getElementById(tab.getAttribute('aria-controls')).hidden =
    !isSelected
  })
 }

 group.addEventListener('click', event => {
  const tab = event.target.closest('[role="tab"]')

  if (tab) select(tab)
 })

 group.addEventListener('keydown', event => {
  const index = tabs.indexOf(event.target)

  if (index === -1) return

  const nextIndex = {
   ArrowRight: (index + 1) % tabs.length,
   ArrowLeft: (index - 1 + tabs.length) % tabs.length,
   Home: 0,
   End: tabs.length - 1,
  }[event.key]

  if (nextIndex === undefined) return

  // Інакше Home/End ще й прокрутили б сторінку
  event.preventDefault()
  select(tabs[nextIndex])
  tabs[nextIndex].focus()
 })
}
