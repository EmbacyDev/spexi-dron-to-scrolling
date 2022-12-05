import * as THREE from 'three'
import Setup, {smootherIndex, vectorsLook, vectorsPosition} from "./script";

export default class Drone
{
    constructor(position, look)
    {
        this.setup = new Setup()
        this.scene = this.setup.scene
        this.resources = this.setup.resources
        this.time = this.setup.time
        this.position = position
        this.look = look
        // Resource
        this.resource = this.resources.items.droneModel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.position.set(...this.position)
        this.model.lookAt(...this.look)
        this.model.scale.set(0.17, 0.17, 0.17)
        this.scene.add(this.model)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        // Actions
        this.animation.actions = {}

        this.animation.actions.prop1 = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.prop2 = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.prop3 = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.prop4 = this.animation.mixer.clipAction(this.resource.animations[3])

        this.animation.actions.prop1.play()
        this.animation.actions.prop2.play()
        this.animation.actions.prop3.play()
        this.animation.actions.prop4.play()

    }

    update()
    {
        this.model.position.set(...vectorsPosition)
        this.model.lookAt(...vectorsLook)
        this.animation.mixer.update(this.time.delta * smootherIndex)
    }
}
