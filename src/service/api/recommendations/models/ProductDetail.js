const ProductDetail = (obj, quantity) => {
    let p = {};
    if(obj){
        p.id = obj.sku;
        p.displayPrice = obj.price;
        p.originalPrice = obj.price;
        p.currencyCode = obj.currency;
        p.quantity = quantity || 1;
        p.stockState = 'In Stock';
        /* p.variant = obj.colour;
        p.item_name = obj.name;
        p.item_brand = obj.brand;
        p.affiliation = obj.merchant_name;
        p.item_category = obj.category; */
    }
    return p;   
}
export default ProductDetail;
/* 
{
  "id": string,
  "currencyCode": string,
  "originalPrice": number,
  "displayPrice": number,
  "stockState": enum (StockState),
  "quantity": integer,
  "availableQuantity": integer,
  "itemAttributes": {
    object (FeatureMap)
  }
}
*/