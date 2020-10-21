export class RangeSlider {
  constructor(id) {
    this.slider = document.querySelector(`#${id}`);
    this.beforeBtn = this.slider.querySelector('.slider__btn-before');
    this.afterBtn = this.slider.querySelector('.slider__btn-after');
    this.control = this.slider.querySelector('.slider__range');
    this.minValue = +this.control.min;
    this.maxValue = +this.control.max;
    this.beforeImg = this.slider.querySelector('.slider__img-before');
    this.afterImg = this.slider.querySelector('.slider__img-after');
    this.init();
  }

  init() {
    this.control.addEventListener(
      'input',
      function (e) {
        e.preventDefault();

        this.setVisibility();
      }.bind(this)
    );

    this.beforeBtn.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        this.toggleVisibility(1000);
      }.bind(this)
    );

    this.afterBtn.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        this.toggleVisibility(0);
      }.bind(this)
    );

    this.setVisibility();
  }

  changeVisibility(value) {
    const width = value / 10;
    this.beforeImg.style.clipPath = `inset(0% ${100 - width}% 0% 0%)`;
    this.afterImg.style.clipPath = `inset(0% 0% 0% ${width}%)`;
  }

  toggleVisibility(value) {
    this.beforeImg.style.transition = 'all 0.5s ease 0s';
    this.afterImg.style.transition = 'all 0.5s ease 0s';

    this.changeVisibility(value);

    setTimeout(() => {
      this.beforeImg.style.transition = '';
      this.afterImg.style.transition = '';
    }, 500);
    this.control.value = value;
  }

  setVisibility() {
    const value = +this.control.value;

    if (value === this.minValue) {
      this.toggleVisibility(0);
      return;
    }
    if (value === this.maxValue) {
      this.toggleVisibility(1000);
      return;
    }

    this.changeVisibility(value);
  }
}
