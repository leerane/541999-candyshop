'use strict';

/**
 * Модуль, связанный с генерацией карточки товара
 */
(function () {

  // Вспомогательные переменные
  const cardBlock = document.querySelector('#card').content.querySelector('.catalog__card');
  const RATING_PLURAL = ['звезда', 'звезды', 'звёзд'];

  /**
   * Параметры карточки товара
   *
   * @typedef {Object} CardData
   * @property {Node} BLOCK
   * @property {string[]} CLASSES
   */
  const CardData = {
    BLOCK: document.querySelector('#card').content.querySelector('.catalog__card'),
    CLASSES: ['card--in-stock', 'card--little', 'card--soon']
  };

  /**
   * Соответствие рейтинга классу
   *
   * @typedef {Object} map
   * @property {string} 1
   * @property {string} 2
   * @property {string} 3
   * @property {string} 4
   * @property {string} 5
   */

  /**
   * Рейтинг товара
   *
   * @typedef {Object} starRatingMap
   * @property {string} BASIS
   * @property {map}
   */
  const StarRating = {
    BASIS: 'stars__rating',
    map: {
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five'
    }
  };

  /**
   * Функция определения класса
   * для карточки товара
   *
   * @param {number} amount Количество товара
   * @return {string}
   */
  const getClass = amount => {
    return amount > 5
      ? CardData.CLASSES[0]
      : (amount > 0 ? CardData.CLASSES[1] : CardData.CLASSES[2]);
  };

  /**
   * Функция рендеринга рейтинга продукта
   *
   * @param {Object} product Товар
   * @param {Node} cardNode Узел главного блока (карточки)
   */
  const renderProductRating = (product, cardNode) => {
    cardNode.querySelector('.stars__rating').classList.add(StarRating.BASIS +
      '--' + StarRating.map[product['rating']['value']]);
    cardNode.querySelector('.stars__rating').textContent = 'Рейтинг: ' +
      product['rating']['value'] + ' ' + window.utils.makePlural(product['rating']['value'], RATING_PLURAL);
    cardNode.querySelector('.star__count').textContent = product['rating']['number'];
    cardNode.querySelector('.card__characteristic').textContent = product['rating']['number'];
  };

  /**
   * Функция рендеринга цены продукта
   *
   * @param {Object} product Товар
   * @param {Element} priceNode Узел цены товара
   */
  const renderProductPrice = (product, priceNode) => {
    priceNode.insertAdjacentText('afterbegin', product['price'] + ' ');
    priceNode.querySelector('.card__weight').textContent = '/ ' + product['weight'] + 'Г'
  };

  /**
   * Функция рендеринга карточки товара
   * на основе шаблона
   *
   * @param {Object} product Товар
   * @return {Node} productCard Узел карточки товара
   */
  const renderProductCard = product => {

    // Название и соответствующий класс главного блока
    const productCard = cardBlock.cloneNode(true);
    productCard.classList.add(getClass(product['amount']));
    productCard.querySelector('.card___title').src = product['name'];

    // Установка рейтинга
    renderProductRating(product, productCard);

    // Определение цены товара
    renderProductPrice(product, productCard.querySelector('.card__price'));

    // Описание товара
    productCard.querySelector('.card__characteristic').textContent = product['nutritionFacts']['sugar']
      ? 'Содержит сахар'
      : 'Без сахара';
    productCard.querySelector('.card__composition-list').textContent = product['nutritionFacts']['contents'];

    return productCard;
  };

  /**
   * Функция отрисовки карточек товаров
   * (в DocumentFragment)
   *
   * @param {number} amount
   * @param {Object[]} data
   * @return {DocumentFragment}
   */
  const renderProductCards = (amount, data) => {
    const cardsFragment = document.createDocumentFragment();
    for (var j = 0; j < amount; j++) {
      cardsFragment.appendChild(data[j].renderCard);
    }
    return cardsFragment;
  };

  // Экспорт
  window.card = {
    render: renderProductCard,
    append: renderProductCards
  };
})();
