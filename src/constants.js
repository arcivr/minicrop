export const IN_BROWSER = typeof window !== 'undefined'
export const WINDOW = IN_BROWSER ? window : {}

export const MARGIN = 40
export const ZOOM_MAXIMUM = 5

// Classes
export const CLASS_MOVING = "moving"
export const CLASS_ZOOMING = "zooming"
export const ACTION_CLASSES = [CLASS_MOVING, CLASS_ZOOMING]

// Events
export const EVENT_CROP = 'crop'
export const EVENT_ZOOM = 'zoom'

export const EVENT_POINTER_DOWN = 'pointerdown touchstart mousedown'
export const EVENT_POINTER_MOVE = 'pointermove touchmove mousemove'
export const EVENT_POINTER_UP   = 'pointerup pointercancel touchend touchcancel mouseup mouseout'
export const EVENT_READY = 'ready'
export const EVENT_RESIZE = 'resize'
export const EVENT_WHEEL = 'wheel'
