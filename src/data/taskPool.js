import { TASK_INFO } from './defaultTasks';

export const POOL_TASKS = [
  {
    id: 'p01',
    title: 'React: список из массива с key',
    category: 'react',
    info: {
      goal: 'Вывести список из трех элементов через map и добавить уникальный key.',
      explanation: [
        'В React списки строятся методом map: для каждого элемента массива возвращается JSX.',
        'Атрибут key помогает React понять, какой элемент изменился. Используйте уникальный id, а не индекс массива, если список может меняться.',
      ],
      code: `const fruits = [
  { id: 1, name: 'Яблоко' },
  { id: 2, name: 'Банан' },
  { id: 3, name: 'Груша' },
];

<ul>
  {fruits.map((f) => (
    <li key={f.id}>{f.name}</li>
  ))}
</ul>`,
      steps: [
        'Создайте массив из трех объектов с полями id и name.',
        'Выведите их внутри ul через map.',
        'Используйте id как key, а не индекс.',
        'Запишите в заметки, что появляется в консоли, если key не указать.',
      ],
      resources: [{ title: 'React: Rendering Lists', url: 'https://react.dev/learn/rendering-lists' }],
    },
  },
  {
    id: 'p02',
    title: 'React: условный рендер',
    category: 'react',
    info: {
      goal: 'Сделать кнопку, которая показывает и скрывает текст.',
      explanation: [
        'Условный рендер означает, что элемент показывается только при определенном значении state. Обычно для этого используют && или тернарный оператор.',
      ],
      code: `const [open, setOpen] = useState(false);

return (
  <>
    <button onClick={() => setOpen(!open)}>Показать</button>
    {open && <p>Этот текст появляется по клику.</p>}
  </>
);`,
      steps: [
        'Создайте компонент с useState и значением false.',
        'Добавьте кнопку, которая переключает значение.',
        'Выведите текст через &&.',
        'Замените текст на тернарный оператор: одно сообщение при открытом состоянии, другое при закрытом.',
      ],
      resources: [{ title: 'React: Conditional Rendering', url: 'https://react.dev/learn/conditional-rendering' }],
    },
  },
  {
    id: 'p03',
    title: 'React: обновить массив в state',
    category: 'react',
    info: {
      goal: 'Добавить и удалить элемент списка в state, не меняя массив напрямую.',
      explanation: [
        'В state нельзя менять массив методами push или splice. Нужно создать новый массив: оператор spread для добавления и filter для удаления.',
        'Если изменить старый массив напрямую, React не заметит изменений и не перерисует компонент.',
      ],
      code: `setItems([...items, newItem]);            // добавить
setItems(items.filter((i) => i.id !== id)); // удалить`,
      steps: [
        'Создайте state со списком из двух элементов.',
        'Добавьте поле ввода и кнопку, которая добавляет новый элемент через spread.',
        'Добавьте кнопку удаления у каждого элемента через filter.',
        'Запишите в заметки, почему push не подходит для state.',
      ],
      resources: [{ title: 'React: Updating Arrays in State', url: 'https://react.dev/learn/updating-arrays-in-state' }],
    },
  },
  {
    id: 'p04',
    title: 'JS: map, filter, reduce',
    category: 'js',
    info: {
      goal: 'Из массива чисел получить сумму только четных чисел.',
      explanation: [
        'map преобразует каждый элемент и возвращает новый массив. filter оставляет только элементы, для которых условие истинно. reduce сворачивает массив в одно значение, например сумму.',
        'Эти три метода составляют основу работы с данными во фронтенде и в анализе данных.',
      ],
      code: `const nums = [1, 2, 3, 4, 5, 6];

const sumEven = nums
  .filter((n) => n % 2 === 0)
  .reduce((acc, n) => acc + n, 0); // 12`,
      steps: [
        'Выпишите результат для массива [1, 2, 3, 4, 5, 6] до запуска кода.',
        'Запустите пример в консоли браузера и сравните результат.',
        'Измените условие: сумма чисел больше 3.',
        'Попробуйте заменить reduce на цикл for и сравните читаемость.',
      ],
      resources: [{ title: 'javascript.info: Методы массивов', url: 'https://javascript.info/array-methods' }],
    },
  },
  {
    id: 'p05',
    title: 'JS: деструктуризация и spread',
    category: 'js',
    info: {
      goal: 'Достать поля из объекта и массива и обновить объект, не меняя исходный.',
      explanation: [
        'Деструктуризация позволяет вытащить значения из объектов и массивов в отдельные переменные.',
        'Spread (три точки) копирует поля в новый объект. Так вы обновляете данные без изменения оригинала, что важно для React.',
      ],
      code: `const user = { name: 'Анна', age: 25 };
const { name, age } = user;

const updated = { ...user, age: 26 }; // user не изменился
const [first, ...rest] = [1, 2, 3];   // first = 1, rest = [2, 3]`,
      steps: [
        'Выполните пример в консоли и проверьте, что user остался прежним.',
        'Создайте объект с вложенным полем и достаньте его через деструктуризацию.',
        'Напишите функцию, которая возвращает новый объект с измененным полем.',
      ],
      resources: [{ title: 'javascript.info: Деструктуризация', url: 'https://javascript.info/destructuring-assignment' }],
    },
  },
  {
    id: 'p06',
    title: 'JS: порядок setTimeout и Promise',
    category: 'js',
    info: {
      goal: 'Предсказать порядок вывода в консоль, а затем проверить себя.',
      explanation: [
        'JavaScript выполняет один поток кода. Сначала идет синхронный код, затем микрозадачи (Promise), и только потом макрозадачи (setTimeout). За это отвечает event loop.',
      ],
      code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// порядок вывода: 1, 4, 3, 2`,
      steps: [
        'Запишите порядок вывода в заметки до запуска кода.',
        'Запустите код в консоли браузера и сравните.',
        'Добавьте второй setTimeout и предскажите, где он окажется.',
        'Объясните своими словами, что такое event loop.',
      ],
      resources: [{ title: 'javascript.info: Event loop', url: 'https://javascript.info/event-loop' }],
    },
  },
  {
    id: 'p07',
    title: 'LeetCode: Contains Duplicate (217)',
    category: 'leetcode',
    info: {
      goal: 'Проверить, есть ли в массиве повторяющиеся числа. Цель: решение за O(n).',
      explanation: [
        'Идея: проходите массив и запоминайте уже встреченные значения в Set. Если текущее значение уже есть в Set, значит дубликат найден.',
        'Проверка наличия в Set занимает почти константное время, поэтому весь проход выполняется за O(n).',
      ],
      steps: [
        'Прочитайте условие задачи на LeetCode.',
        'Сначала придумайте решение перебором и запишите его сложность.',
        'Подсказка: используйте Set для хранения уже встреченных чисел.',
        'Отправьте решение и проверьте, что все тесты проходят.',
      ],
      resources: [{ title: 'LeetCode: Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/' }],
    },
  },
  {
    id: 'p08',
    title: 'LeetCode: Valid Anagram (242)',
    category: 'leetcode',
    info: {
      goal: 'Проверить, что две строки состоят из одинаковых букв в разном порядке.',
      explanation: [
        'Анаграммы содержат одинаковые буквы с одинаковым количеством. Подсчитайте количество каждой буквы в обеих строках и сравните результаты.',
        'Для подсчета удобно использовать объект или Map, где ключ — буква, а значение — количество.',
      ],
      steps: [
        'Прочитайте условие и выпишите два примера: true и false.',
        'Подсказка: сначала проверьте, что длины строк одинаковы.',
        'Подсчитайте буквы первой строки в объекте.',
        'Вычтите буквы второй строки и проверьте, что все значения равны нулю.',
      ],
      resources: [{ title: 'LeetCode: Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/' }],
    },
  },
  {
    id: 'p09',
    title: 'LeetCode: Best Time to Buy and Sell Stock (121)',
    category: 'leetcode',
    info: {
      goal: 'Найти максимальную прибыль, купив и продав акцию в разные дни.',
      explanation: [
        'Проходите массив слева направо и запоминайте минимальную цену, которую уже видели.',
        'Для каждого дня считайте возможную прибыль: цена сегодня минус минимальная цена до этого дня. Максимум из этих значений и есть ответ. Решение занимает один проход.',
      ],
      steps: [
        'Опишите задачу своими словами в заметках.',
        'Проверьте идею на примере [7, 1, 5, 3, 6, 4]: ответ должен быть 5.',
        'Реализуйте один проход с сохранением минимума.',
        'Отправьте решение и запишите сложность по времени и памяти.',
      ],
      resources: [{ title: 'LeetCode: Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' }],
    },
  },
  {
    id: 'p10',
    title: 'Pandas: первое знакомство с датасетом',
    category: 'analytics',
    info: {
      goal: 'Загрузить CSV-файл и получить краткую сводку по данным.',
      explanation: [
        'Перед анализом проверяют структуру данных: сколько строк, какие типы колонок и есть ли пропуски. В Pandas для этого используются read_csv, info, describe и isna.',
      ],
      code: `import pandas as pd

df = pd.read_csv('data.csv')
df.info()        # типы колонок и количество значений
df.describe()    # статистика по числовым колонкам
df.isna().sum()  # пропуски по каждой колонке`,
      steps: [
        'Найдите любой CSV-датасет на Kaggle или возьмите встроенный пример из seaborn.',
        'Выполните четыре команды из примера.',
        'Запишите в заметки три наблюдения о данных.',
        'Выведите частоты значений одной колонки: df["column"].value_counts().',
      ],
      resources: [{ title: 'Pandas: 10 minutes to pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html' }],
    },
  },
  {
    id: 'p11',
    title: 'SQL: GROUP BY и HAVING',
    category: 'analytics',
    info: {
      goal: 'Написать запрос, который считает заказы каждого клиента и показывает только тех, у кого больше двух заказов.',
      explanation: [
        'GROUP BY объединяет строки с одинаковым значением колонки, а агрегатные функции COUNT, SUM и AVG считают значения внутри каждой группы.',
        'WHERE фильтрует строки до группировки, а HAVING фильтрует уже сгруппированные результаты.',
      ],
      code: `SELECT customer_id, COUNT(*) AS orders_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 2
ORDER BY orders_count DESC;`,
      steps: [
        'Пройдите урок про агрегатные функции на SQLBolt.',
        'Создайте таблицу orders в онлайн-редакторе SQLite с 10 тестовыми строками.',
        'Выполните запрос из примера.',
        'Запишите в заметки разницу между WHERE и HAVING своими словами.',
      ],
      resources: [
        { title: 'SQLBolt: интерактивный курс SQL', url: 'https://sqlbolt.com/' },
        { title: 'W3Schools: GROUP BY', url: 'https://www.w3schools.com/sql/sql_groupby.asp' },
      ],
    },
  },
  {
    id: 'p12',
    title: 'Проект: README с описанием',
    category: 'project',
    info: {
      goal: 'Написать README для одного из своих проектов по понятной структуре.',
      explanation: [
        'README — первая страница, которую открывает рекрутер. Хороший README отвечает на три вопроса: что это за проект, как его запустить и какие технологии использованы.',
        'Скриншот или ссылка на демо заметно усиливают впечатление.',
      ],
      steps: [
        'Добавьте заголовок и одно предложение с описанием проекта.',
        'Напишите раздел «Установка» с командами npm install и npm run dev.',
        'Добавьте список используемых технологий.',
        'Вставьте скриншот или ссылку на демо.',
      ],
      resources: [{ title: 'Markdown: basic syntax', url: 'https://www.markdownguide.org/basic-syntax/' }],
    },
  },
];

// Возвращает описание задачи из стартового набора или из пула
export const getTaskInfo = (id) =>
  TASK_INFO[id] ?? POOL_TASKS.find((task) => task.id === id)?.info ?? null;