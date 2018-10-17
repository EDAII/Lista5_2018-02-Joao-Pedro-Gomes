export interface ITroco {
    id?: number;
    valor?: number;
}

export class Troco implements ITroco {
    constructor(public id?: number, public valor?: number) {}
}
