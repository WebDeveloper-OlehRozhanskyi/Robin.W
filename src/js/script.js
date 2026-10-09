import { initActiveLink } from './components/active-link.js'
import { initForm } from './components/form.js'
import { initHeader } from './components/header.js'
import { initLogosSlider } from './components/logos-slider.js'
import { initMenu } from './components/menu.js'
import { initTabs } from './components/tabs.js'

// type="module" виконується після розбору HTML, тож DOMContentLoaded не потрібен
initHeader()
initMenu()
initActiveLink()
initLogosSlider()
initTabs()
initForm()
