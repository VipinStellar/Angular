export class AuthUser {
    id:number;
    name: string;
    email:string;
    uuid: string;
    token: string;
    emp_code :string;
    token_validity: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
    role: number;
    team_id: number;
    status: string;
    storageTime:number;
    redirectToUrl:string;
    assignRole:[]
}