import './style.css'
import * as THREE from 'three'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Sizes from "./Sizes.js";
import Time from "./Time.js";
import Resources from "./Resources.js";
import World from "./World";

import gsap from 'gsap'
import sources from './sources.js'


const curveRoad = new THREE.CatmullRomCurve3([
    new THREE.Vector3(80, 66, -50),
    new THREE.Vector3(30, 5, -10),
    new THREE.Vector3(10, 0, 10),
    new THREE.Vector3(-2, 0, 20),
    new THREE.Vector3(-20, 1, 0),
    new THREE.Vector3(-100, -36, 20),
]);
export const pointsRoad = curveRoad.getPoints(1000);

const curveLook = new THREE.CatmullRomCurve3([
    new THREE.Vector3(30, -20, -5),
    new THREE.Vector3(15, -10, -10),
    new THREE.Vector3(20, -5, -15),
    new THREE.Vector3(15, 0, -30),
    new THREE.Vector3(15, 2, -25),
    new THREE.Vector3(20, 2, -45),
    new THREE.Vector3(30, 0, -80),
    new THREE.Vector3(40, -20, -90),
]);
export const pointsLook = curveLook.getPoints(1000);

let instance = null

export default class Setup
{
    constructor(_canvas, _canvasWrapper)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // // Global access
        // window.experience = this

        // Options
        this.canvas = _canvas

        // Setup

        this.sizes = new Sizes(_canvasWrapper)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

}

export const vectorFirstPosition = new THREE.Vector3()
vectorFirstPosition.x = 40;
vectorFirstPosition.y = 60;
vectorFirstPosition.z = -50;

export const vectorFirstLock = new THREE.Vector3()
vectorFirstLock.x = -50
vectorFirstLock.y = 30
vectorFirstLock.z = 30

const propIndexRotation = 0.0027
export let smootherIndex = propIndexRotation

function animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        let progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

export let vectorsPosition = vectorFirstPosition
export let vectorsLook = vectorFirstLock
const bound = document.getElementById('section3d')
const frameCount = pointsRoad.length;
window.addEventListener('scroll', () => {
    const distanceFromTop = window.scrollY + bound.getBoundingClientRect().top;
    const rawPercentScrolled = (window.scrollY - distanceFromTop) / (bound.scrollHeight - window.innerHeight);
    const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
    const frameIndex = Math.min(frameCount - 1, Math.ceil(percentScrolled * frameCount));
        gsap.to(
            vectorsPosition,
            {
                duration: 2,
                ease: "power3.out",
                x: pointsRoad[frameIndex].x,
                y: pointsRoad[frameIndex].y,
                z: pointsRoad[frameIndex].z,
            }
        )
        gsap.to(
            vectorsLook,
            {
                duration: 1,
                ease: "power1.out",
                x: pointsLook[frameIndex].x,
                y: pointsLook[frameIndex].y,
                z: pointsLook[frameIndex].z,
            }
        )
    animate({
        duration: 1200,
        timing: function back(x, timeFraction) {
            return -Math.pow(timeFraction, 2) * ((x) * timeFraction - x)
        }.bind(null, 5),
        draw: function(progress) {
            smootherIndex = propIndexRotation + Number((progress / 100).toFixed(3))
        }
    });
});

const canvasOne = new Setup(document.querySelector('canvas.webgl-one'),
    document.querySelector('.canvas-w-one'))

const canvasTwo = new Setup(document.querySelector('canvas.webgl-two'),
    document.querySelector('.canvas-w-two'))
// Canvas

