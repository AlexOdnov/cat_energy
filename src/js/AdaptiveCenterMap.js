import { MapYandex } from './MapYandex';

export class AdaptiveCenterMap extends MapYandex {
  constructor(settings) {
    super(settings);

    this.changeCenter = this.changeCenter.bind(this);
    this.checkCenter();
  }

  mapCreate() {
    super.mapCreate();
    this.changeCenter();
  }

  checkCenter() {
    window.addEventListener('resize', this.changeCenter);
  }

  changeCenter() {
    if (this.myMap && window.innerWidth >= this.settings.breakpoint) {
      this.myMap.setCenter([
        this.settings.newYCenter,
        this.settings.newXCenter,
      ]);
    } else if (this.myMap && window.innerWidth < this.settings.breakpoint) {
      this.myMap.setCenter([this.settings.yCenter, this.settings.xCenter]);
    }
  }
}

//возможные настройки
// settings = {
//   mapContainerID: 'map',
//   src: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
//   zoom: 10,
//   scrollZoom: false,
//   yCenter: 0,
//   xCenter: 0,
//   yPin: 0,
//   xPin: 0,
//   pin: {
//     path: 'img/backgrounds/map-pin.svg',
//     size: [50, 50],
//     offset: [-25, -50],
//   },
//   controls: [
//     'zoomControl',
//     'geolocationControl',
//     'searchControl',
//     'trafficControl',
//     'typeSelector',
//     'rulerControl',
//     'fullscreenControl',
//   ],
//   breakpoint: 0,
//   newYCenter: 0,
//   newXCenter: 0,
// };
