class AppStorage{

    storeToken(token){
        localStorage.setItem('token' , token);
    }

    storeUser(user){
        localStorage.setItem('user' , user);
    }
    storeEmail(email){
        localStorage.setItem('email' , email);
    }
    storeId(user_id){
        localStorage.setItem('user_id' , user_id);
    }

    store(token , user,email , user_id){
        this.storeToken(token)
        this.storeUser(user)
        this.storeEmail(email)
        this.storeId(user_id)
    }

    clear(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('email')
        localStorage.removeItem('user_id')
    }

    getToken(){
        localStorage.getItem(token);
    }
    getUser(){
        localStorage.getItem(user);
    }
    getEmail(){
        localStorage.getItem(email);
    }
    
    getId(){
        localStorage.getItem(user_id);
    }

}


export default AppStorage = new AppStorage();