class Product {

    constructor(){}

    get sku(){
        return this.sku;
    }
    set sku(sku) {
        this.sku = sku;
    }
    get merchantId(){
        return this.merchantId;
    }
    set merchantId(merchantId) {
        this.merchantId = merchantId;
    }
    get name(){
        return this.name;
    }
    set name(name) {
        this.name = name;
    }
    get brand(){
        return this.name;
    }
    set brand(brand) {
        this.brand = brand;
    }
    get link(){
        return this.link;
    }
    set link(link) {
        this.link = link;
    }
    get searchTerms(){
        return this.searchTerms;
    }
    set searchTerms(searchTerms) {
        this.searchTerms = searchTerms;
    }
    get category(){
        return this.category;
    }
    set category(category) {
        this.category = category;
    }
    get subcategory(){
        return this.subcategory;
    }
    set subcategory(subcategory) {
        this.subcategory = subcategory;
    }
    get currency(){
        return this.currency;
    }
    set currency(currency) {
        this.currency = currency;
    }
    get price(){
        return this.price;
    }
    set price(price) {
        this.price = price;
    }
    get inStock(){
        return this.inStock;
    }
    set inStock(inStock) {
        this.inStock = inStock;
    }
    get inventory(){
        return this.inventory;
    }
    set inventory(inventory) {
        this.inventory = inventory;
    }
    get thumbnail(){
        return this.thumbnail;
    }
    set thumbnail(thumbnail) {
        this.thumbnail = thumbnail;
    }
    get images(){
        return this.thumbnail;
    }
    set images(images) {
        this.images = images;
    }
    get tags(){
        return this.tags;
    }
    set tags(tags) {
        this.tags = tags;
    }
    get description(){
        return this.description;
    }
    set description(description) {
        this.description = description;
    }
    get deliveryTime(){
        return this.deliveryTime;
    }
    set deliveryTime(deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
    get reviews(){
        return this.reviews;
    }
    set reviews(reviews) {
        this.reviews = reviews;
    }
    get rating(){
        return this.rating;
    }
    set rating(rating) {
        this.rating = rating;
    }
    get colour(){
        return this.rating;
    }
    set colour(colour) {
        this.colour = colour;
    }
}
export const convertAwinToProduct = (awinObj, sku) => {
    let p = {};
    if(awinObj && sku){
        p.sku = sku;
        p.merchantId = awinObj.merchant_id;
        p.name = awinObj.product_name;
        let category = awinObj.category || "";
        p.searchTerms = awinObj.searchTerms || [];

        

        if(category.indexOf('/') > -1){
            p.category = ((category.split('/') || [])[0] || "").trim();
            p.subcategory = ((category.split('/') || [])[1] || "").trim();
        }else if(category.indexOf('>') > -1){

        }
        
        //TODO - change this if necessary
        p.brand = awinObj.merchant_name;
        p.price = awinObj.search_price;
        p.currency = awinObj.currency;
        p.inventory = awinObj.stock_quantity;
        p.inStock = awinObj.in_stock === 1 || awinObj.in_stock === "1";
        p.description = awinObj.description;
        p.tags = awinObj.searchTerms;
        p.deliveryTime = awinObj.delivery_time;
        p.deliveryCost = awinObj.delivery_cost;
        p.reviews = awinObj.reviews;
        p.rating = awinObj.rating;
        p.link = awinObj.merchant_deep_link;
        p.thumbnail = awinObj.aw_image_url;
        p.colour = awinObj.colour;
        p.merchant_name = awinObj.merchant_name || "";
        let images = [];
        if(awinObj.merchant_thumb_url && awinObj.merchant_thumb_url !== ""){
            images.push(awinObj.merchant_thumb_url)
        }
        if(awinObj.alternate_image && awinObj.alternate_image !== ""){
            images.push(awinObj.alternate_image)
        }
        if(awinObj.alternate_image_two && awinObj.alternate_image_two !== ""){
            images.push(awinObj.alternate_image_two)
        }
        if(awinObj.alternate_image_three && awinObj.alternate_image_three !== ""){
            images.push(awinObj.alternate_image_three)
        }
        if(awinObj.alternate_image_four && awinObj.alternate_image_four !== ""){
            images.push(awinObj.alternate_image_four)
        }
        /* If no gallery image is present at all, show the thumbnail */
        if(images.length === 0){
            images.push(awinObj.aw_image_url);
        }
        p.images = images;

        if(awinObj.variants && Array.isArray(awinObj.variants)) {
            p.variants = awinObj.variants.map((item) => Object.assign({},{
                'colour': item.colour,
                'name': item.name,
                'size': item.size,
                'link': item.aw_deep_link,
                'merchant_link': item.merchant_deep_link,
                'inStock': (item.in_stock === 1 || item.in_stock === "1")
            }));
        }
        
    }
    return p;
    
}

export const convertCJToProduct = (cjObj, sku) => {
    let p = {};
    if(cjObj && sku){
        p.sku = sku;
        p.merchantId = cjObj.merchant_id;
        p.name = cjObj.TITLE;
        let category = cjObj.PRODUCT_TYPE || "";
        p.searchTerms = cjObj.searchTerms || [];

        if(category.indexOf('/') > -1){
            p.category = ((category.split('/') || [])[0] || "").trim();
            p.subcategory = ((category.split('/') || [])[1] || "").trim();
        }else if(category.indexOf('>') > -1){
            p.category = ((category.split('>') || [])[0] || "").trim();
            p.subcategory = ((category.split('>') || [])[1] || "").trim();
        }
        
        //TODO - change this if necessary
        p.brand = cjObj.BRAND;
        p.price = cjObj.SALE_PRICE ? cjObj.SALE_PRICE : cjObj.PRICE;
        p.fullPrice = cjObj.PRICE;
        p.currency = cjObj.CURRENCY;
        //p.inventory = cjObj.stock_quantity;
        p.inStock = cjObj.AVAILABILITY === "in stock";
        p.description = cjObj.DESCRIPTION;
        p.tags = cjObj.searchTerms;
        //p.deliveryTime = cjObj.delivery_time;
        //p.reviews = cjObj.reviews;
        //p.rating = cjObj.rating;
        p.link = cjObj.LINK;
        p.thumbnail = cjObj.IMAGE_LINK;
        p.colour = cjObj.COLOR;
        p.merchant_name = cjObj.merchant_name || "";
        let size = cjObj.SIZE || "";
        try{
            p.sizes = size.split(',').map(s => s.trim());
        }catch(err){

        }
        
        let images = (cjObj.ADDITIONAL_IMAGE_LINK || "").split(',');
        if(images.length === 0){
            images.push(p.thumbnail);
        }
        p.images = images || [];

        if(cjObj.variants && Array.isArray(cjObj.variants)) {
            p.variants = cjObj.variants.map((item) => Object.assign({},{
                'sku': item.ID,
                'colour': item.COLOR,
                'size': item.SIZE,
                'link': item.LINK,
                'inStock': (item.AVAILABILITY  === "in stock")
            }));
        }
        
    }
    return p;
    
}


export default Product;