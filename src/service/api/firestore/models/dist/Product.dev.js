"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.convertCJToProduct = exports.convertAwinToProduct = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Product =
/*#__PURE__*/
function () {
  function Product() {
    _classCallCheck(this, Product);
  }

  _createClass(Product, [{
    key: "sku",
    get: function get() {
      return this.sku;
    },
    set: function set(sku) {
      this.sku = sku;
    }
  }, {
    key: "merchantId",
    get: function get() {
      return this.merchantId;
    },
    set: function set(merchantId) {
      this.merchantId = merchantId;
    }
  }, {
    key: "name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }, {
    key: "brand",
    get: function get() {
      return this.name;
    },
    set: function set(brand) {
      this.brand = brand;
    }
  }, {
    key: "link",
    get: function get() {
      return this.link;
    },
    set: function set(link) {
      this.link = link;
    }
  }, {
    key: "searchTerms",
    get: function get() {
      return this.searchTerms;
    },
    set: function set(searchTerms) {
      this.searchTerms = searchTerms;
    }
  }, {
    key: "category",
    get: function get() {
      return this.category;
    },
    set: function set(category) {
      this.category = category;
    }
  }, {
    key: "subcategory",
    get: function get() {
      return this.subcategory;
    },
    set: function set(subcategory) {
      this.subcategory = subcategory;
    }
  }, {
    key: "currency",
    get: function get() {
      return this.currency;
    },
    set: function set(currency) {
      this.currency = currency;
    }
  }, {
    key: "price",
    get: function get() {
      return this.price;
    },
    set: function set(price) {
      this.price = price;
    }
  }, {
    key: "inStock",
    get: function get() {
      return this.inStock;
    },
    set: function set(inStock) {
      this.inStock = inStock;
    }
  }, {
    key: "inventory",
    get: function get() {
      return this.inventory;
    },
    set: function set(inventory) {
      this.inventory = inventory;
    }
  }, {
    key: "thumbnail",
    get: function get() {
      return this.thumbnail;
    },
    set: function set(thumbnail) {
      this.thumbnail = thumbnail;
    }
  }, {
    key: "images",
    get: function get() {
      return this.thumbnail;
    },
    set: function set(images) {
      this.images = images;
    }
  }, {
    key: "tags",
    get: function get() {
      return this.tags;
    },
    set: function set(tags) {
      this.tags = tags;
    }
  }, {
    key: "description",
    get: function get() {
      return this.description;
    },
    set: function set(description) {
      this.description = description;
    }
  }, {
    key: "deliveryTime",
    get: function get() {
      return this.deliveryTime;
    },
    set: function set(deliveryTime) {
      this.deliveryTime = deliveryTime;
    }
  }, {
    key: "reviews",
    get: function get() {
      return this.reviews;
    },
    set: function set(reviews) {
      this.reviews = reviews;
    }
  }, {
    key: "rating",
    get: function get() {
      return this.rating;
    },
    set: function set(rating) {
      this.rating = rating;
    }
  }, {
    key: "colour",
    get: function get() {
      return this.rating;
    },
    set: function set(colour) {
      this.colour = colour;
    }
  }]);

  return Product;
}();

var convertAwinToProduct = function convertAwinToProduct(awinObj, sku) {
  var p = {};

  if (awinObj && sku) {
    p.sku = sku;
    p.merchantId = awinObj.merchant_id;
    p.name = awinObj.product_name;
    var category = awinObj.category || "";
    p.searchTerms = awinObj.searchTerms || [];

    if (category.indexOf('/') > -1) {
      p.category = ((category.split('/') || [])[0] || "").trim();
      p.subcategory = ((category.split('/') || [])[1] || "").trim();
    } else if (category.indexOf('>') > -1) {} //TODO - change this if necessary


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
    var images = [];

    if (awinObj.merchant_thumb_url && awinObj.merchant_thumb_url !== "") {
      images.push(awinObj.merchant_thumb_url);
    }

    if (awinObj.alternate_image && awinObj.alternate_image !== "") {
      images.push(awinObj.alternate_image);
    }

    if (awinObj.alternate_image_two && awinObj.alternate_image_two !== "") {
      images.push(awinObj.alternate_image_two);
    }

    if (awinObj.alternate_image_three && awinObj.alternate_image_three !== "") {
      images.push(awinObj.alternate_image_three);
    }

    if (awinObj.alternate_image_four && awinObj.alternate_image_four !== "") {
      images.push(awinObj.alternate_image_four);
    }
    /* If no gallery image is present at all, show the thumbnail */


    if (images.length === 0) {
      images.push(awinObj.aw_image_url);
    }

    p.images = images;

    if (awinObj.variants && Array.isArray(awinObj.variants)) {
      p.variants = awinObj.variants.map(function (item) {
        return Object.assign({}, {
          'colour': item.colour,
          'name': item.name,
          'size': item.size,
          'link': item.aw_deep_link,
          'merchant_link': item.merchant_deep_link,
          'inStock': item.in_stock === 1 || item.in_stock === "1"
        });
      });
    }
  }

  return p;
};

exports.convertAwinToProduct = convertAwinToProduct;

var convertCJToProduct = function convertCJToProduct(cjObj, sku) {
  var p = {};

  if (cjObj && sku) {
    p.sku = sku;
    p.merchantId = cjObj.merchant_id;
    p.name = cjObj.TITLE;
    var category = cjObj.PRODUCT_TYPE || "";
    p.searchTerms = cjObj.searchTerms || [];

    if (category.indexOf('/') > -1) {
      p.category = ((category.split('/') || [])[0] || "").trim();
      p.subcategory = ((category.split('/') || [])[1] || "").trim();
    } else if (category.indexOf('>') > -1) {
      p.category = ((category.split('>') || [])[0] || "").trim();
      p.subcategory = ((category.split('>') || [])[1] || "").trim();
    } //TODO - change this if necessary


    p.brand = cjObj.BRAND;
    p.price = cjObj.SALE_PRICE ? cjObj.SALE_PRICE : cjObj.PRICE;
    p.fullPrice = cjObj.PRICE;
    p.currency = cjObj.CURRENCY; //p.inventory = cjObj.stock_quantity;

    p.inStock = cjObj.AVAILABILITY === "in stock";
    p.description = cjObj.DESCRIPTION;
    p.tags = cjObj.searchTerms; //p.deliveryTime = cjObj.delivery_time;
    //p.reviews = cjObj.reviews;
    //p.rating = cjObj.rating;

    p.link = cjObj.LINK;
    p.thumbnail = cjObj.IMAGE_LINK;
    p.colour = cjObj.COLOR;
    p.merchant_name = cjObj.merchant_name || "";
    var size = cjObj.SIZE || "";

    try {
      p.sizes = size.split(',').map(function (s) {
        return s.trim();
      });
    } catch (err) {}

    var images = (cjObj.ADDITIONAL_IMAGE_LINK || "").split(',');

    if (images.length === 0) {
      images.push(p.thumbnail);
    }

    p.images = images || [];

    if (cjObj.variants && Array.isArray(cjObj.variants)) {
      p.variants = cjObj.variants.map(function (item) {
        return Object.assign({}, {
          'sku': item.ID,
          'colour': item.COLOR,
          'size': item.SIZE,
          'link': item.LINK,
          'inStock': item.AVAILABILITY === "in stock"
        });
      });
    }
  }

  return p;
};

exports.convertCJToProduct = convertCJToProduct;
var _default = Product;
exports["default"] = _default;