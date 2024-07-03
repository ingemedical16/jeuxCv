
export const dogAnimationStates = [
    {
      name: 'idle',
      frames: 7,
    },
    {
      name: 'jump',
      frames: 7,
    },
    {
      name: 'fail',
      frames: 7,
    },
    {
      name: 'run',
      frames: 9,
    },
    {
      name: 'dizzy',
      frames: 11,
    },
    {
      name: 'sit',
      frames: 5,
    },
    {
      name: 'roll',
      frames: 7,
    },
    {
      name: 'bite',
      frames: 7,
    },
    {
      name: 'ko',
      frames: 12,
    },
    {
      name: 'getHit',
      frames: 4,
    }
  ];

  export const KEYEVENT = {
    PRESS_LEFT: 'PRESS_LEFT',
    PRESS_RIGHT: 'PRESS_RIGHT',
    PRESS_UP: 'PRESS_UP',
    PRESS_DOWN: 'PRESS_DOWN',
    PRESS_ENTER: 'PRESS_ENTER',
    RELEASE_LEFT: 'RELEASE_LEFT',
    RELEASE_RIGHT: 'RELEASE_RIGHT',
    RELEASE_UP: 'RELEASE_UP',
    RELEASE_DOWN: 'RELEASE_DOWN',
    RELEASE_ENTER: 'RELEASE_ENTER',
}