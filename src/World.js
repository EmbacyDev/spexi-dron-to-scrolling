import Setup, {vectorFirstLock, vectorFirstPosition} from './script'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Drone from './Drone.js'

export default class World
{
    constructor()
    {
        this.setup = new Setup()
        this.scene = this.setup.scene
        this.resources = this.setup.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.drone = new Drone(vectorFirstPosition, vectorFirstLock)
            this.environment = new Environment(this.drone)
        })
    }

    update()
    {
        if(this.floor)
            this.floor.update()
        if(this.drone) {
            this.drone.update()
            this.environment.update()
        }

        // if(this.environment)

    }
}
