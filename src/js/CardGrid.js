export class CardGrid {
  constructor(settings = {}) {
    this.settings = Object.assign(
      {
        src: '',
        cardContainerSelector: '',
      },
      settings
    );
    this.cardContainer = document.querySelector(
      this.settings.cardContainerSelector
    );
    this.cardMore = null;
    this.init();
  }

  async init() {
    await this.renderCard();
    this.createCardMore();
    this.cardMore.addEventListener('click', this.appendCard.bind(this));
  }

  async loadData() {
    try {
      const response = await fetch(this.settings.src);
      return Object.values(await response.json());
    } catch (error) {
      console.warn(error);
    }
  }

  createCard(data) {
    const { img, title, weight, taste, price } = data;
    return `
    <article class="card-grid__item product-card">
      <a class="product-card__link" href="#">
        <img
          class="product-card__img"
          src="../img/contentImage/${img}.png"
          srcset="../img/contentImage/${img}.webp"
          alt="${title}"
        />
      </a>
      <a class="product-card__link-title" href="#">
        <h3 class="product-card__title">${title}</h3></a
      >
      <table class="product-card__characteristics">
        <tr class="product-card__row">
          <td class="product-card__cell">Масса</td>
          <td class="product-card__cell">${weight}</td>
        </tr>
        <tr class="product-card__row">
          <td class="product-card__cell">Вкус</td>
          <td class="product-card__cell">${taste}</td>
        </tr>
        <tr class="product-card__row">
          <td class="product-card__cell">Цена</td>
          <td class="product-card__cell">${price} Р.</td>
        </tr>
      </table>
      <button class="btn product-card__btn">заказать</button>
    </article>`;
  }

  createCardMore() {
    const cardMore = document.createElement('article');
    cardMore.className = 'card-grid__item load-more';
    cardMore.insertAdjacentHTML(
      'beforeend',
      `<div class="load-more__wrapper">
        <h3 class="load-more__title">Показать еще 100500 товаров</h3>
        <p class="load-more__text">На самом деле вкусов гораздо больше!</p>
        <button class="btn btn--wide btn--grey load-more__btn">
          показать все
        </button>
      </div>`
    );
    this.cardContainer.append(cardMore);
    this.cardMore = cardMore;
  }

  async renderCard() {
    try {
      const cards = await this.loadData();
      const html = cards.map((card) => this.createCard(card)).join('');
      this.cardContainer.insertAdjacentHTML('beforeend', html);
    } catch (error) {
      console.warn(error);
    }
  }

  async appendCard() {
    this.cardMore.remove();
    await this.renderCard();
    this.cardContainer.append(this.cardMore);
  }
}
