// Бекенду немає, а GitHub Pages на POST відповідає помилкою 405 — саме її
// отримував відвідувач старої версії. Тепер форма нікуди не йде і прямо
// каже, що вона демонстраційна
export function initForm() {
 const form = document.querySelector('.form')
 const status = form?.querySelector('.form__status')

 if (!form || !status) return

 // submit спрацьовує лише тоді, коли браузер уже перевірив required і email
 form.addEventListener('submit', event => {
  event.preventDefault()
  status.textContent =
   'Thank you! This is a demo form, so your message was not sent.'
  status.hidden = false
  // Фокус на повідомлення, щоб його прочитав і скрінрідер
  status.focus()
  form.reset()
 })
}
