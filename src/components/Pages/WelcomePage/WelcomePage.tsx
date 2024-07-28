import style from "./WelcomePage.module.scss";

export default function WelcomePage() {
  return (
    <div className={style.page__wrapper}>
      <ul className={style.taskList}>
        <li>
          <strong>|| 16.07:</strong>
          <ul className={style.ul_outer}>
            <li>
              Компоненты:
              <ul className={style.ul_inner}>
                <li>Button</li>
                <li>Nav</li>
                <li>Main</li>
                <li>2GIS map</li>
                <li>Home page</li>
              </ul>
            </li>
            <li>React Router: Настройка маршрутизации</li>
            <li>Стили для Home Page</li>
          </ul>
        </li>
        <li>
          <strong>|| 17.07:</strong>
          <ul className={style.ul_outer}>
            <li>
              Компоненты:
              <ul className={style.ul_inner}>
                <li>Search Bar</li>
                <li>Modal</li>
                <li>Telegram API</li>
                <li>Resources Page</li>
                <li>Welcome Page</li>
                <li>Header</li>
              </ul>
            </li>
            <li>Telegram API: получение данных о канале по названию</li>
            <li>Стили для полученных каналов</li>
          </ul>
        </li>
        <li>
          <strong>|| 18.07:</strong>
          <ul className={style.ul_outer}>
            <li>
              OpenTripMap API:
              <ul className={style.ul_inner}>
                <li>Получение координат по названию города</li>
                <li>Получение интересных мест в радиусе</li>
              </ul>
            </li>
            <li>Компоненты: Expanded Nav</li>
            <li>Фильтрация модалок по тексту в строке поиска</li>
            <li>Рефакторинг стилей: добавление миксинов, плейсхолдеров</li>
          </ul>
        </li>
        <li>
          <strong>|| 19.07:</strong>
          <ul className={style.ul_outer}>
            <li>Прокидывание полученных координат между компонентами</li>
            <li>
              2GIS API:
              <ul className={style.ul_inner}>
                <li>Отображение карты с координатами по умолчанию</li>
                <li>
                  Изменение местоположения карты после получения новых координат
                </li>
                <li>Отслеживание изменения города между страницами</li>
                <li>
                  Автоматический resize карты при изменении размера экрана
                </li>
              </ul>
            </li>
            <li>
              OpenTripMap API:
              <ul className={style.ul_inner}>
                <li>Получение списка достопримечательностей по координатам</li>
                <li>Получение подробной информации о достопримечательностях</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>|| 20.07:</strong>
          <ul className={style.ul_outer}>
            <li>Компоненты: Selector</li>
            <li>Redux: состояния для категорий из Selector</li>
            <li>Добавление страницы Википедии</li>
          </ul>
        </li>
        <li>
          <strong>|| 21.07:</strong>
          <ul className={style.ul_outer}>
            <li>2GIS API: Рефакторинг методов</li>
            <li>Redux: Состояния для карты</li>
            <li>
              Настройка взаимодействия между отображением карты, 2GIS API,
              категориями и состояниями карты
            </li>
          </ul>
        </li>
        <li>
          <strong>|| 22.07:</strong>
          <ul className={style.ul_outer}>
            <li>
              2GIS API:
              <ul className={style.ul_inner}>
                <li>Рефакторинг методов</li>
                <li>Установка меток на карту</li>
                <li>Удаление меток с карты</li>
                <li>Установка цветов для меток</li>
              </ul>
            </li>
            <li>React context: Кэширование полученных меток</li>
            <li>Упорядочивание модалок по тематике</li>
          </ul>
        </li>
        <li>
          <strong>|| 23.07:</strong>
          <ul className={style.ul_outer}>
            <li>Рефакторинг стилей для: Header, Loader, List, Nav</li>
            <li>Рефакторинг скроллов</li>
          </ul>
        </li>
        <li>
          <strong>|| 25.07:</strong>
          <ul className={style.ul_outer}>
            <li>
              2GIS API:
              <ul className={style.ul_inner}>
                <li>Кэширование экземпляра карты</li>
                <li>Кастомный стиль карты для более быстрой загрузки</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>|| 27.07:</strong>
          <ul className={style.ul_outer}>
            <li>
              Исправление двух вызовов <code>useEffect()</code>
            </li>
            <li>Сброс выбранных категорий при изменении города</li>
            <li>Модальное окно для открытой метки</li>
            <li>Добавление изображений в модальное окно</li>
            <li>Рефакторинг всех файлов</li>
          </ul>
        </li>
      </ul>

      <h3 className={style.title}>Будущие задачи:</h3>
      <ul className={style.ul_outer}>
        <li>Сохранение маршрутов</li>
        <li>Переключение страниц</li>
        <li>Unit tests</li>
      </ul>
    </div>
  );
}

