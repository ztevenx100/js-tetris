export const BLOCK_SIZE = 20
export const BOARD_WIDTH = 14
export const BOARD_HEIGHT = 30

export const EVENT_MOVEMENTS = {
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  RIGHT: 'ArrowRight',
  ROTATE: 'ArrowUp',
}

export const PIECES = [
  [ // Pieza amarilla
    [1, 1],
    [1, 1]
  ],
  [ // Pieza azul
    [1, 1, 1, 1]
  ],
  [ // Pieza lila
    [0, 1, 0],
    [1, 1, 1]
  ],
  [ // Pieza verde
    [1, 1, 0],
    [0, 1, 1]
  ],
  [ // Pieza roja
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1]
  ]
]