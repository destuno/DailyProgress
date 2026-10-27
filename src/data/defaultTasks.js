export const CATEGORIES = {
  study: 'Учеба',
  react: 'React',
  js: 'JavaScript',
  leetcode: 'LeetCode',
  project: 'Проекты',
  analytics: 'Data Analytics',
};

export const DEFAULT_TASKS = [
  { id: 't1', title: 'Теория: 1 урок курса', category: 'study' },
  { id: 't2', title: 'React: практика компонентов', category: 'react' },
  { id: 't3', title: 'JS: одна тема (замыкания, промисы)', category: 'js' },
  { id: 't4', title: 'LeetCode: 1-2 задачи', category: 'leetcode' },
  { id: 't5', title: 'Проект: 30 минут работы', category: 'project' },
  { id: 't6', title: 'Аналитика: SQL или Pandas', category: 'analytics' },
];

// Описания стартовых задач: задание, объяснение, пример и материалы
export const TASK_INFO = {
  t1: {
    goal: 'Пройти один урок по Git и записать 3 ключевые идеи своими словами.',
    explanation: [
      'Git хранит историю изменений проекта. Основные понятия: commit (снимок изменений), branch (отдельная линия работы) и merge (объединение веток).',
      'Теория запоминается только тогда, когда вы ее применяете. Поэтому после урока обязательно повторите команды в терминале.',
    ],
    code: `git init
git add .
git commit -m "first commit"
git checkout -b feature/login
git merge feature/login`,
    steps: [
      'Выберите один урок про Git (или главу книги Pro Git).',
      'Посмотрите или прочитайте его без отвлечений.',
      'Запишите в заметки 3 идеи своими словами.',
      'Повторите команды из примера в своей папке проекта.',
    ],
    resources: [
      { title: 'Pro Git (книга на русском)', url: 'https://git-scm.com/book/ru/v2' },
      { title: 'Git: шпаргалка команд', url: 'https://training.github.com/downloads/ru/github-git-cheat-sheet/' },
    ],
  },

  t2: {
    goal: 'Создать компонент Counter, который получает start через props и хранит счетчик в state.',
    explanation: [
      'Компонент — это функция, которая возвращает JSX.',
      'Props — данные, которые родитель передает потомку. Их нельзя менять внутри компонента.',
      'State — данные, которые меняются со временем. Изменение state через useState перерисовывает компонент.',
    ],
    code: `import { useState } from 'react';

function Counter({ start }) {
  const [count, setCount] = useState(start);

  return (
    <button onClick={() => setCount(count + 1)}>
      Нажато: {count}
    </button>
  );
}`,
    steps: [
      'Создайте компонент Counter с props start.',
      'Выведите два Counter с разными start (например, 0 и 10).',
      'Добавьте кнопку «Сбросить», которая возвращает счетчик в start.',
      'Проверьте, что два счетчика работают независимо.',
    ],
    resources: [
      { title: 'React: Learn (официальная документация)', url: 'https://react.dev/learn' },
      { title: 'React: Passing Props', url: 'https://react.dev/learn/passing-props-to-a-component' },
      { title: 'React: State', url: 'https://react.dev/learn/state-a-components-memory' },
    ],
  },

  t3: {
    goal: 'Понять замыкание и написать функцию createAdder(n), которая возвращает функцию прибавления n.',
    explanation: [
      'Замыкание — это функция, которая «помнит» переменные из места, где она была создана, даже если внешняя функция уже завершила работу.',
      'Это основа многих приемов: счетчики, приватные переменные, колбэки и хуки React.',
    ],
    code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}

const next = makeCounter();
next(); // 1
next(); // 2`,
    steps: [
      'Прочитайте раздел про замыкания и повторите пример из кода выше.',
      'Напишите функцию createAdder(n), которая возвращает функцию (x) => x + n.',
      'Проверьте: const add5 = createAdder(5); add5(10) должно вернуть 15.',
      'Запишите в заметки, почему переменная n «сохраняется».',
    ],
    resources: [
      { title: 'javascript.info: Замыкания', url: 'https://javascript.info/closure' },
      { title: 'javascript.info: Промисы', url: 'https://javascript.info/promise-basics' },
    ],
  },

  t4: {
    goal: 'Решить две простые задачи на LeetCode: Two Sum и Valid Parentheses.',
    explanation: [
      'Перед кодом объясните решение словами или на бумаге. Так вы быстрее найдете идею.',
      'Если за 25 минут решения нет, посмотрите подсказку (Hint), а не готовый ответ. Через день решите задачу заново без подсказок.',
    ],
    steps: [
      'Two Sum: найдите два числа в массиве, сумма которых равна target. Подсказка: используйте объект или Map, чтобы за один проход запоминать уже увиденные числа. Сложность: O(n).',
      'Valid Parentheses: проверьте, что скобки ()[]{} закрыты в правильном порядке. Подсказка: используйте стек (массив) и push/pop.',
      'Для каждой задачи запишите в заметки идею и сложность по времени.',
      'Отправьте решение и проверьте все тесты.',
    ],
    resources: [
      { title: 'LeetCode: Two Sum (1)', url: 'https://leetcode.com/problems/two-sum/' },
      { title: 'LeetCode: Valid Parentheses (20)', url: 'https://leetcode.com/problems/valid-parentheses/' },
    ],
  },

  t5: {
    goal: 'Сделать один маленький шаг в своем проекте за 30 минут и зафиксировать результат коммитом.',
    explanation: [
      'Проекты двигаются маленькими шагами. Вместо «сделать сайт» выберите конкретную задачу: добавить фильтр, исправить адаптивность, написать README.',
      'Коммит с понятным сообщением сохраняет историю и показывает работодателю, что вы работаете системно.',
    ],
    code: `git add .
git commit -m "feat: добавлен фильтр задач по категории"`,
    steps: [
      'Выберите одну задачу из списка дел проекта.',
      'Поставьте таймер на 30 минут.',
      'Сделайте коммит с понятным сообщением (префиксы feat, fix, docs).',
      'Запишите в заметки, что сделано и что будет дальше.',
    ],
    resources: [
      { title: 'Conventional Commits (правила сообщений)', url: 'https://www.conventionalcommits.org/ru/v1.0.0/' },
    ],
  },

  t6: {
    goal: 'Написать три запроса SQL или три операции в Pandas на любом открытом датасете.',
    explanation: [
      'SQL — язык для выборки данных из таблиц. Основные конструкции: SELECT (что вывести), WHERE (фильтр), GROUP BY (группировка).',
      'Pandas — библиотека Python для таблиц (DataFrame). Для аналитика это основной инструмент после SQL.',
    ],
    code: `SELECT category, COUNT(*) AS tasks
FROM completions
WHERE done = 1
GROUP BY category
ORDER BY tasks DESC;`,
    steps: [
      'Пройдите 5-10 интерактивных заданий по SQL (SELECT, WHERE, GROUP BY).',
      'Найдите небольшой CSV-датасет на Kaggle или в открытых данных.',
      'Напишите запрос: топ-5 значений по одной колонке.',
      'Повторите то же самое в Pandas: df.groupby(...).size().sort_values(ascending=False).',
    ],
    resources: [
      { title: 'SQLBolt: интерактивный курс SQL', url: 'https://sqlbolt.com/' },
      { title: 'Pandas: Getting Started', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
    ],
  },
};