class UserDetails{
    constructor() {
      

        if(UserDetails.instance instanceof UserDetails){
            return UserDetails.instance;
        }
        else {    
            this.user = {
                uId: ""
            }
            UserDetails.instance = this;
        }    
      
    }

    getUser(){
        return this.user.uId;
    }

    setUser(userId){
        this.user.uId = userId
        console.log("UID SET:",this.user.uId)
    }
}

module.exports = UserDetails