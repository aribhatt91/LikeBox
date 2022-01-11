export default function CartProduct (obj, variant, quantity=1) {
    let p = {};
    if(obj){
        p.id = obj.id;
        p.name = obj.title;
        p.thumbnail = obj.thumbnail;
        p.brand = obj.brand;
        p.price = obj.price;
        if(variant){
            p.size = variant.size;
        }
        p.quantity = quantity || 1;
    }
    return p;   
}

/* 
{
    id: String,
    parent_product_id: String,
    name: String,
    thumbnail: String,
    price: Number,
    quantity: Number,
    size: String, //optional
    colour: String //optional
}
*/