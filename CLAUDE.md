# CLAUDE.md

Цей файл містить інструкції для Claude Code (claude.ai/code) щодо роботи з кодом у цьому репозиторії.

## Огляд

Односторінковий сайт «Robin Williams» (клон Webflow-шаблону), перебудований зі старої верстки на шаблон `../my-site-ai-test/`: Vite 7, SCSS + BEM, vanilla JS-модулі, Swiper 14. Деплой на GitHub Pages через Actions (`.github/workflows/deploy.yml`), `base: '/Robin.W/'`. Тестів і TypeScript немає.

Стара версія — лише зібрані файли, без вихідників — є в історії до коміту перебудови (останній старий коміт `deea716`) і в копії `../Robin.W-old-build/`. Її `index.html` відкривається напряму в браузері, з нею звіряють вигляд.

## Команди

```bash
npm run dev       # dev-сервер; <img> тут ще без <picture>
npm run build     # prebuild (plugins/genFormats.js) + vite build -> dist/
npm run preview   # віддає dist/ на http://localhost:4173/Robin.W/
npm run lint      # eslint ., потім stylelint "**/*.scss"
npm run format    # prettier --write .
```

Стиль коду той самий, що в шаблоні: Prettier з відступом в 1 пробіл, без крапок з комою, одинарні лапки; Stylelint з власним порядком властивостей (`stylelint.config.js`); ESLint вимагає `eqeqeq` і `camelcase`.

## Архітектура

**Сторінка.** `index.html` — секції по порядку: `top`, `experience`, `promo` (Philosophy & values), `skillset`, `logos`, `work`, `promo` (Instagram), `dribbble`, `response`, `photo`, `contact`. Пункти меню ведуть на `#experience`, `#work`, `#photo`, `#contact`.

**Точка входу.** `src/main.js` імпортує `swiper/css`, потім `scss/style.scss`, потім `js/script.js`. Swiper має йти першим: у `.swiper-slide` та сама специфічність, що в `.logos__item`, і наші правила мають стояти в бандлі після нього.

**Стилі.** `style.scss` → `components/_index.scss`: `foundation` (variables, root, normalize, functions, mixin), далі fonts, settings, general, header, `_page.scss` (усі `page/*` у порядку сторінки), footer.

- Токени — у `_root.scss`: кольори, `--text-*`, `--gap-N` (N — px з макета). `--padding-inline`, `--section-padding`, `--header-height` змінюються на брейкпоінтах.
- Міксини `image`, `list`, `button`, `margin-block`, `link`, `form` лежать у `_normalize.scss`, брейкпоінти (`l`, `laptop`, `t`, `bm`…) — у `_mixin.scss`.
- Спільні класи в `_general.scss`: `.container`, `.section` (вертикальні відступи 120 → 80 → 48), `.title` (дрібний підпис капсом), `.subtitle` (великий заголовок), `.btn` (посилання з лінією).
- Другий блок у тому ж файлі: `.card` у `_work.scss`, `.tabs` у `_photo.scss`, `.form` у `_contact.scss`.

**JS.** `src/js/script.js` викликає `init*` з `src/js/components/`:

- `header.js` — `header--scrolled`, коли прокрутили нижче висоти шапки;
- `menu.js` — бургер: `menu--open`, `header--menu-open`, `page--lock` на `body`, `inert` на `main` і `.footer`; закривається пунктом меню, Escape і переходом на десктопну ширину;
- `active-link.js` — `menu__link--active` для секції під шапкою (секцію бере з `href` пункту); на самому верху й між секціями з меню не підсвічено нічого;
- `logos-slider.js` — Swiper з `loop` і autoplay лише ширше за 1380px і без `prefers-reduced-motion`; при зміні медіазапиту вмикається й вимикається;
- `tabs.js` — вкладки за WAI-ARIA: стан у `aria-selected`, неактивні панелі мають `hidden`, стрілки / Home / End;
- `form.js` — демо-форма без бекенду: не надсилається, показує `.form__status` і ставить на нього фокус.

## Підводні камені

- Медіазапити в JS дублюють брейкпоінти SCSS: `menu.js` — `(width <= 47.99875rem)` = міксин `bm`, `logos-slider.js` — `(width > 86.25rem)` = `laptop`. Змінюєте `$bm` чи `$laptop` — міняйте і JS.
- Prettier має `htmlWhitespaceSensitivity: "ignore"` і ставить inline-елемент та розділовий знак після нього на різні рядки: на сторінці з'являється пробіл («Google , Interaction Designer»). Тому перед заголовками в `experience` стоїть `<!-- prettier-ignore -->`. Так само робіть для кожного нового `<span>…</span>,`.
- Зображення пишуться як `<img src="./src/images/...">`. Плагін `plugins/htmlImgToPicture.js` обгортає jpg/png у `<picture>` (avif, webp) лише при збірці, `<picture>` без класу, тож класи ставляться на `<img>`. Вихід повторює папки: `assets/images/photo/italy/01.avif`.
- `isRetinaSupport: false`: оригінали вже в розмірі показу. `formatQuality: { avif: 60 }`: з quality 80 avif виходив більшим за webp, а браузер бере перший `<source>`, тобто avif.
- SVG менші за 4 kB Vite вбудовує в HTML як `data:`. SVG-спрайт із шаблону (`vite-plugin-svg-icons`) не використовується: папки `src/images/icons` немає, `main.js` не імпортує `virtual:svg-icons-register`, усі SVG — через `<img>`.
- Swiper ставить `.swiper-wrapper { box-sizing: content-box }`, а `* { box-sizing: inherit }` передає це слайдам. Тому в `.logos__item` явно `border-box`, інакше рамка додає 2px.
- `.top__img` має фіксовану висоту 650px і `object-fit: cover`, як у старій версії: на вужчих екранах фото обрізається до вертикального кадру.
- Неактивні панелі вкладок ховає атрибут `hidden`. Не задавайте `.tabs__panel` властивість `display`, бо вона переб'є `hidden`.
