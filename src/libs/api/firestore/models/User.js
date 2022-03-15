class User {
    constructor(email, name){

    }
    setCart(cart){
        this.cart = cart;
    }
    getCart(cart){
        return this.cart || null
    }
    addAddress(address) {
        this.addresses = (this.addresses || []).push(address)
    }
}

export default User;