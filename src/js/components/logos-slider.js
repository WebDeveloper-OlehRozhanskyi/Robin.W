import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'

// Стрічка їде лише ширше за 1380px (rem(1380), як міксин laptop у SCSS) і
// лише якщо в системі не просили менше анімації. В інших випадках логотипи
// стоять сіткою (_logos.scss)
const sliderQuery = window.matchMedia(
 '(width > 86.25rem) and (prefers-reduced-motion: no-preference)'
)

export function initLogosSlider() {
 const slider = document.querySelector('.logos__slider')

 if (!slider) return

 let swiper = null

 // Стара версія перевіряла ширину лише при завантаженні. Тепер стрічка
 // вмикається й вимикається, коли змінюють розмір вікна
 const update = () => {
  if (sliderQuery.matches && !swiper) {
   swiper = new Swiper(slider, {
    modules: [Autoplay],
    slidesPerView: 4,
    speed: 4000,
    // Без loop стрічка доїжджала до кінця і поверталася назад
    loop: true,
    allowTouchMove: false,
    autoplay: { delay: 0, disableOnInteraction: false },
   })
  } else if (!sliderQuery.matches && swiper) {
   swiper.destroy(true, true)
   swiper = null
  }
 }

 update()
 sliderQuery.addEventListener('change', update)
}
