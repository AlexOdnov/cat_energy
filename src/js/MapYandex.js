export class MapYandex {
  constructor(settings = {}) {
    this.settings = Object.assign(
      {
        mapContainerID: "map",
        src: "https://api-maps.yandex.ru/2.1/?lang=ru_RU",
        zoom: 15,
        scrollZoom: false,
        pin: false,
        controls: false,
      },
      settings
    );
    this.mapContainer = document.querySelector(
      `#${this.settings.mapContainerID}`
    );
    this.mapInitializer = this.mapInitializer.bind(this);
    this.init();
  }

  init() {
    window.addEventListener("scroll", this.mapInitializer);
    this.mapInitializer();
  }

  mapCreate() {
    const myMap = new ymaps.Map(this.settings.mapContainerID, {
      center: [this.settings.xCoord, this.settings.yCoord],
      zoom: this.settings.zoom,
      controls: ["zoomControl"],
    });

    if (this.settings.pin) {
      const placemark = new ymaps.Placemark(
        [this.settings.xCoord, this.settings.yCoord],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: this.settings.pin.path,
          iconImageSize: this.settings.pin.size,
          iconImageOffset: this.settings.pin.offset,
        }
      );
      myMap.geoObjects.add(placemark);
    } else {
      const placemark = new ymaps.Placemark([
        this.settings.xCoord,
        this.settings.yCoord,
      ]);
      myMap.geoObjects.add(placemark);
    }

    if (!this.settings.scrollZoom) {
      myMap.behaviors.disable("scrollZoom");
    }

    if (this.settings.controls) {
      this.settings.controls.forEach((el) => {
        myMap.controls.add(el);
      });
    }
  }

  mapInitializer() {
    const mapCoord = this.mapContainer.getBoundingClientRect().top;

    if (mapCoord <= document.documentElement.clientHeight * 2) {
      const mapScript = document.createElement("script");
      mapScript.src = this.settings.src;
      document.body.append(mapScript);
      mapScript.onload = () => {
        ymaps.ready(this.mapCreate.bind(this));
      };
      window.removeEventListener("scroll", this.mapInitializer);
    }
  }
}

// возможные настройки
// settings = {
//   mapContainerID: 'map',
//   src: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
//   zoom: 10,
//   scrollZoom: false,
//   xCoord: 0,
//   yCoord: 0,
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
// };
