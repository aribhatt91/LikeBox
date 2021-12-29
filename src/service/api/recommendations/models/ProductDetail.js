const ProductDetail = (obj) => {
    let p = {};
    if(obj){
        p.id = obj.id;
        /* p.displayPrice = obj.price;
        p.originalPrice = obj.full_price || obj.price;
        p.currencyCode = obj.currency || "GBP";
        p.name = obj.title;
        p.stockState = 'In Stock'; */
    }
    return {
      "product": p,
      "quantity": obj.quantity || 1
    };   
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