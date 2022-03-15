export const GAProduct = (obj, quantity) => {
    let p = {};
    if(obj){
        p.item_id = obj.id;
        p.item_name = obj.title;
        p.item_brand = obj.brand;
        p.price = obj.price;
        p.currency = obj.currency;
        p.variant = obj.colour;
        p.quantity = quantity || 1;
        p.affiliation = obj.merchant_name;
        p.item_category = obj.category;
    }
    return p;   
}

/* 
{
    id: "P12345",
    name: "Android Warhol T-Shirt",
    brand: "Google",
    category: "Apparel/T-Shirts",
    coupon: "SUMMER_DISCOUNT",
    list_name: "Search Results",
    list_position: 1,
    price: 14.99,
    quantity: 2,
    variant: "Black"
  }
*/