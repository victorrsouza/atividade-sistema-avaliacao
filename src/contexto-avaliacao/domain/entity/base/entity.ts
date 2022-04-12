import { v4 as uuidV4 } from 'uuid'

export abstract class BaseEntity {

    private readonly _id: string

    constructor() {
        this._id = uuidV4()
    }

    public id = () => this._id    
}