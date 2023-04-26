export interface User{
    username: string;
    password: string;
    Email:string,
    profile: {
        about_you:string,
        usertype: string
    }

}
export interface User_login{
    username: string;
    password: string;
    usertype: string;
}
export interface LoginResponseInterface{
    access: string;
    refresh: string;
    id:string,
    usertype:string

  }