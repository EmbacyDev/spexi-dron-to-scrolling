import * as THREE from 'three'
import Setup from './script'

export default class Camera
{
    constructor()
    {
        this.setup = new Setup()
        this.sizes = this.setup.sizes
        this.scene = this.setup.scene
        this.time = this.setup.time
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(0, 15, 60)
        this.scene.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update()
    {
        const elapsedTime = this.time.clock.getElapsedTime()
        const timer = 0.0006 * Date.now();

        const angle = elapsedTime * 0.5
        let xCos = (Math.cos(angle) / 20)
        let yCos = (Math.sin(timer) / 20)
        this.instance.position.x -= xCos
        this.instance.position.y += yCos
        this.instance.position.z += xCos / 100
        this.instance.lookAt(0,0,0)
    }

}
