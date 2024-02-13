export interface User {
    userId:string;
    userEmailId:string;
    password:string;
    isVerified:boolean;
    registerDate:Date;
    wishList?:[];
}