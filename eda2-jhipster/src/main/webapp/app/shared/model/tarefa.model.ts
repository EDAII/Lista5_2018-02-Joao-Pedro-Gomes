import { IUser } from 'app/core/user/user.model';

export interface ITarefa {
    id?: number;
    horarioInicio?: number;
    horarioFinal?: number;
    nome?: string;
    tem?: IUser;
}

export class Tarefa implements ITarefa {
    constructor(
        public id?: number,
        public horarioInicio?: number,
        public horarioFinal?: number,
        public nome?: string,
        public tem?: IUser
    ) {}
}
