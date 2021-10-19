/* https://cloud.google.com/recommendations-ai/docs/reference/rest/v1beta1/StockState */
export default function StockState(value) {
    switch(value){
        case 0:
            return 'OUT_OF_STOCK';
        case 1:
            return 'IN_STOCK';
        case 2:
            return 'PREORDER';
        case 3:
            return 'BACKORDER';
        default:
            return 'STOCK_STATE_UNSPECIFIED'
    }
}  