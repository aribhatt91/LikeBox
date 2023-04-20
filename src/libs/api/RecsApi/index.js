import DataLayer from '../DataLayer';
const BASE_URL = `http://localhost:3300/`

const sendUserEvent = async (userEvent) => {
    if(!window.DEV_MODE || !userEvent.eventType){
        return;
    }
    try{
        window.loginfo('api:recommendations:sendUserEvent:request:payload', userEvent);
        const response = await fetch(
            `${BASE_URL}recommendations/user-event`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(userEvent)
            }
        );

        const data = await response.json();
        window.loginfo('api:recommendations:sendUserEvent:response', data);
    }catch(error){
        window.logerror('api:recommendations:sendUserEvent:error', error);
    }
    
}

/* 
Product
https://cloud.google.com/retail/recommendations-ai/docs/reference/rest/v2/projects.locations.catalogs.branches.products#Product


ProductDetail
https://cloud.google.com/retail/recommendations-ai/docs/reference/rest/v2/projects.locations.catalogs.userEvents#ProductDetail
{
  "product": {
    object (Product)
  },
  "quantity": integer
}
https://cloud.google.com/recommendations-ai/docs/record-events#pixel
UserEvent
https://cloud.google.com/recommendations-ai/docs/reference/rest/v1beta1/projects.locations.catalogs.eventStores.userEvents
*/
const getVisitorId = () => {
    return window.gaGlobal ? window.gaGlobal.vid || "" : "";
}
const postProductDetailEvent = function(eventType, productDetails, listId) {
    try{
        if(arguments.length < 2){
            window.logerror('postProductDetailEvent:error:Insufficient arguments');
            return;
        }
        const visitorId = getVisitorId();
        const obj = {
            eventType,
            visitorId,
            productDetails,
            userId: DataLayer.getUser().email
        };
        if(listId){
            obj.listId = listId;
        }

        sendUserEvent(obj);
    }catch(err){

    }
    
}

export default {
    homePageView: () => {
        sendUserEvent({
            "vistorId": getVisitorId(),
            "eventType": "home-page-view"
        });
    },
    categoryPageView: (pageCategories) => {
        sendUserEvent({
            "vistorId": getVisitorId(),
            "eventType": "category-page-view",
            pageCategories
        });
    },
    detailPageView: (product) => {
        postProductDetailEvent("detail-page-view", [{'id': product.id}]);
    },
    cartPageView: () => {
        /* 
        https://cloud.google.com/retail/recommendations-ai/docs/user-events#shopping-cart-page-view
         */
        /* postProductDetailEvent("shopping-cart-page-view", (DataLayer.getCart().products || []).map(product => {
            return {
                "product": {
                    id: product.id
                },
                "quantity": product.quantity || 1
            }
        })); */
    },
    addToList: (product) => {
        postProductDetailEvent("add-to-list", [product], "wishlist1");
    },
    removeFromList: (product) => {
        postProductDetailEvent("remove-from-list", [product], "wishlist1");
    },
    addToCart: (product) => {
        postProductDetailEvent("add-to-cart", [{
            "product": {
                id: product.id
            },
            "quantity": product.quantity || 1
        }]);
    },
    removeFromCart: (product) => {
        postProductDetailEvent("remove-from-cart", [{
            "product": {
                id: product.id
            },
            "quantity": product.quantity || 1
        }]);
    },
    search: (searchQuery) => {
        sendUserEvent({
            "eventType": "search", 
            "visitorId": getVisitorId(),
            searchQuery
        });
    },
    fetchRecommendedProducts: async ({
        criteria="recently_viewed_default",
        category,
        productId
    }) => {
        try{
            window.loginfo('api:recommendations:fetchRecommendedProducts:request', productId);
            const payload = {
                criteria,
                eventType: "detail-page-view",
                productId,
                visitorId: getVisitorId()
            };
            const response = await fetch(
                `${BASE_URL}recommendations/fetch/`,
                {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  body: JSON.stringify(payload)
                }
            );

            window.loginfo('api:recommendations:fetchRecommendedProducts:response', response);
        }catch(error){
            window.logerror('api:recommendations:fetchRecommendedProducts:request', error);
        }        
    }
}