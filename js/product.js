'use strict';

/**
 * Модуль, связанный с конструктором товара
 */
(function () {

  // Вспомогательные переменные
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');

  /**
   * Параметры обычной метки
   *
   * @typedef {Object} PinData
   * @property {number} WIDTH
   * @property {number} HEIGHT
   * @property {Node} BLOCK
   * @property {string} ACTIVE_CLASS
   */
  var PinData = {
    WIDTH: 50,
    HEIGHT: 70,
    BLOCK: document.querySelector('#pin').content.querySelector('.map__pin'),
    ACTIVE_CLASS: 'map__pin--active'
  };

  /**
   * Конструктор объекта-товара,
   * который содержит информацию о
   * самом товаре, узлы пина и
   * карточки объявлени, а также
   * обработчики
   *
   * @param {Object} product Товар
   * @constructor
   */
  const Product = (product) => {

    // Данные
    this.data = product;

    // Карточка товара (основная)
    this.renderProduct = window.сard.renderAdCard(ad);

    // Карточка товара (в корзине)
    this.renderProduct = window.pinAndCard.renderAdCard(ad);


    var closeButton = this.renderAd.querySelector('.popup__close');
    var adFragment = document.createDocumentFragment();
    var self = this;

    /**
     * Функция показа карточки объявления
     */
    var showCard = function () {
      adFragment.appendChild(self.renderAd);
      map.insertBefore(adFragment, mapFilters);
      document.addEventListener('keydown', cardEscPressHandler);
      document.addEventListener('mouseup', cardClickOutHandler);
    };

    /**
     * Функция закрытия карточки объявления
     *
     * @param {Node} element
     */
    var closeCard = function (element) {
      map.removeChild(element);
      self.renderPin.classList.remove(PinData.ACTIVE_CLASS);
      document.removeEventListener('keydown', cardEscPressHandler);
      document.removeEventListener('mouseup', cardClickOutHandler);
    };

    /**
     * Функция-обработчик, закрывающая
     * окно карты при нажатии клавиши ESC
     *
     * @param {Event} evt
     */
    var cardEscPressHandler = function (evt) {
      window.utils.escPressHandler(evt, function () {
        closeCard(self.renderAd);
      });
    };

    /**
     * Функция-обработчик, закрывающая
     * окно карты при нажатии (клике)
     * вне объявления
     *
     * @param {Event} evt
     */
    var cardClickOutHandler = function (evt) {
      window.utils.outsideClickHandler(evt, self.renderAd, function () {
        closeCard(self.renderAd);
      });
    };

    /**
     * Функция-обработчик, которая
     * осуществляет показ соответствующего
     * текущему пину объявления
     */
    var pinClickHandler = function () {
      var previousAd = mapFilters.previousElementSibling;
      self.renderPin.classList.add(PinData.ACTIVE_CLASS);
      if (previousAd.classList.contains('map__card')) {
        closeCard(previousAd);
      }
      showCard();
    };

    /**
     * Функция-обработчик, которая
     * осуществляет закрытие карточки
     * при клике на крест
     */
    var cardClickHandler = function () {
      closeCard(self.renderAd);
    };

    this.renderPin.addEventListener('click', pinClickHandler);
    closeButton.addEventListener('click', cardClickHandler);
  };

  /**
   * Функция создания массива объектов
   * (на основе конструктора Ad
   * и массива объектов-объявлений)
   *
   * @param {number} amount
   * @param {Object[]} data
   * @return {Object[]}
   */
  var renderAds = function (amount, data) {
    var tempArray = [];
    for (var i = 0; i < amount; i++) {
      tempArray.push(new Ad(data[i]));
    }
    return tempArray;
  };

  // Экспорт
  window.accommodation = {
    renderAds: renderAds
  };
})();
