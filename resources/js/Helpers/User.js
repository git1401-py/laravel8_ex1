import Token from './Token'
import AppStorage from './AppStorage'


class User{

   responseAfterLogin(res) {
        const access_token = res.data.access_token
        const username = res.data.name
        const email = res.data.email
        const user_id = res.data.user_id
        if(Token.isValid(access_token)){
            AppStorage.store(access_token , username , email , user_id)
        }
   }


   hasToken(){
       const storeToken = localStorage.getItem('token');
       if (storeToken){
           return Token.isValid(storeToken)? true : false
       }
       return false
   }
   loggedIn(){
       return this.hasToken()
   }
   token(){
    if(this.loggedIn()){
        return localStorage.getItem('token');
   }
   }

   name(){
       if(this.loggedIn()){
            return localStorage.getItem('user');
       }
   }
   email(){
       if(this.loggedIn()){
            return localStorage.getItem('email');
       }
   }
   user_id(){
       if(this.loggedIn()){
            return localStorage.getItem('user_id');
       }
   }
   id(){
       if(this.loggedIn()){
            const payload = Token.payload(localStorage.getItem('token'));
            return payload.sub;
       }
       return false
   }
 
 }
 
 
 export default User = new User()