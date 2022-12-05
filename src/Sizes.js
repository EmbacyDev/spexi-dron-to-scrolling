import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
    constructor(canvasWrapper) {

        super()
        this.wrapper = canvasWrapper
        // Setup
        this.width = this.wrapper .clientWidth
        this.height = this.wrapper .clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () => {
            this.width = this.wrapper.clientWidth
            this.height = this.wrapper.clientHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.aspectRatio = this.width / this.height

            this.trigger('resize')
        })
    }
}
