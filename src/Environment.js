import * as THREE from 'three'
import Setup, {smootherIndex, vectorsLook, vectorsPosition} from './script'

export default class Environment
{
    constructor(target)
    {
        this.setup = new Setup()
        this.scene = this.setup.scene
        this.resources = this.setup.resources
        this.target = target

        this.setSunLight()
    }

    setSunLight()
    {
        this.allLight = new THREE.AmbientLight(0xffffff);
        this.allLight.intensity = 2.1
        this.allLight.position.set(0, 10, -40);
        this.allLight.lookAt(0, 0, 0)

        this.sunLight = new THREE.DirectionalLight(0xffffff, 2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0, 50, 50)

        this.sunLight2 = new THREE.DirectionalLight(0xffffff, 2)
        this.sunLight2.castShadow = true
        this.sunLight2.shadow.camera.far = 15
        this.sunLight2.shadow.mapSize.set(1024, 1024)
        this.sunLight2.shadow.normalBias = 0.05
        this.sunLight2.position.set(-40, -50, 50)

        this.scene.add(this.sunLight.target)
        // this.scene.add(this.sunLight2.target)
        this.scene.add(this.allLight)
        this.scene.add(this.sunLight)
        // this.scene.add(this.sunLight2)
    }
    update()
    {
        // this.sunLight.target = this.target
        // this.sunLight2.target = this.target
    }
}
