# Header
   - Экспортируйте функцию `createHeader(options)` из `header.js`.
   - Опишите параметры:
     - `logoText`, `logoHref` — текст и ссылка логотипа.
     - `navItems` — массив пунктов навигации,
     - `primary` - по сути указатель на страницу которая открыта в данный момент
     - `languages` — массив языков для переключения.
     - `authenticated` — флаг, показывающий, залогинен ли пользователь.

## **Подключение в странице**
     ```html
     <script type="module">
       import { createHeader } from '../shared/header/header.js';
       const header = createHeader({ /* параметры */ });
       document.body.prepend(header);
     </script>
     ```
