import * as THREE from 'three'
import Setup, {pointsLook, pointsRoad, vectorsLook } from './script'

export default class Floor {
    constructor(position) {
        this.setup = new Setup()
        this.scene = this.setup.scene
        this.resources = this.setup.resources
        this.positionTarget = position

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometryEarth = new THREE.SphereGeometry(8, 60, 60);
        this.geometryTarget = new THREE.SphereGeometry(1, 32, 10);
        this.geometryRoad = new THREE.BufferGeometry().setFromPoints(pointsRoad);
        this.geometryLook = new THREE.BufferGeometry().setFromPoints(pointsLook);

    }

    setTextures() {
        this.textures = {}
        this.textures.color = this.resources.items.earthTexture
    }

    setMaterial() {
        this.colors = {
            color1: 0xff0000,
            color2: 0xffF00F,
            color3: 'green'
        }
        this.lineMaterial = new THREE.LineBasicMaterial({color: this.colors.color1});
        this.lineMaterial2 = new THREE.LineBasicMaterial({color: this.colors.color2});

        this.materialTarget = new THREE.MeshBasicMaterial({color: this.colors.color3});

        this.material = new THREE.MeshPhongMaterial({
            map: this.textures.color,
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 25
        })
    }

    setMesh() {

        this.splineObject = new THREE.Line(this.geometryRoad, this.lineMaterial);
        this.splineObject2 = new THREE.Line(this.geometryLook, this.lineMaterial2);

        this.meshEarth = new THREE.Mesh(this.geometryEarth, this.material)
        this.meshEarth.position.set(0, 0, -5);
        this.meshEarth.receiveShadow = true

        this.meshTarget = new THREE.Mesh(this.geometryTarget, this.materialTarget)



        this.scene.add(this.splineObject)
        this.scene.add(this.splineObject2)
        this.scene.add(this.meshEarth)
        this.scene.add(this.meshTarget)
    }

    update()
    {
        this.meshEarth.rotation.y += .005;
        this.meshTarget.position.set(...vectorsLook)

    }
}
