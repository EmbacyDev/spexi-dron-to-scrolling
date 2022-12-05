import * as THREE from "three";
import Setup from './script'

export default class Renderer {
    constructor() {
        this.setup = new Setup()
        this.canvas = this.setup.canvas
        this.sizes = this.setup.sizes
        this.scene = this.setup.scene
        this.camera = this.setup.camera

        this.setInstance()
    }
    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        })
        this.instance.physicallyCorrectLights = true
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.setClearColor( 0xffffff, 0)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }
    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}
