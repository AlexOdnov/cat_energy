import { MobileMenu } from './MobileMenu';
import { AdaptiveCenterMap } from './AdaptiveCenterMap';

const mobileMenu = new MobileMenu();

const map = new AdaptiveCenterMap({
  yCenter: 59.938633647616214,
  xCenter: 30.32304549758399,
  yPin: 59.938633647616214,
  xPin: 30.32304549758399,
  pin: {
    path: 'img/backgrounds/map-pin.svg',
    size: [60, 71],
    offset: [-30, -71],
  },
  zoom: 16,
  breakpoint: 1440,
  newYCenter: 59.938633647616214,
  newXCenter: 30.317,
});
