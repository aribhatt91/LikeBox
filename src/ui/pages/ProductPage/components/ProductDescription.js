import React, {useState} from 'react';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import { capitalise } from '../../../../service/helper';
import PriceText from '../../../components/generic/PriceText';

function ProductDescription({product}){
    const [key, setKey] = useState('desc');
    return (
      <div className="app-tab-layout">
        <Tabs
          activeKey={key}
          onSelect={k => setKey(k)}>

          <Tab eventKey="desc" title="Description">
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    {product.description || ""}
                </div>
                <div className="d-flex flex-column">
                    {product.material && <p><b className="bold">Material:</b> {capitalise(product.material)}</p>}
                    {product.colour && <p><strong className="font-weight-700">Available colours:</strong> {capitalise(product.colour)}</p>}
                    {product.pattern && <p><b>Pattern/texture:</b> {capitalise(product.pattern)}</p>}
                    {product.gender && <p><b>Suitable for:</b> {capitalise(product.gender)}</p>}
                </div>
            </div>
          </Tab>
          <Tab eventKey="delivery" title="Delivery">
            <div className="d-flex">
                <table className="delivery-info w-100 m-0">
                    <tbody>
                    {
                        product.delivery_time && <tr>
                            <td>Delivery Time</td><td>{product.delivery_time}</td>
                        </tr>
                    }
                    {
                        product.delivery_cost && <tr>
                            <td>Shipping cost</td><td>
                            {
                                isNaN(Number(product.delivery_cost)) && <React.Fragment>{product.delivery_cost}</React.Fragment>
                            }
                            {
                                !isNaN(Number(product.delivery_cost)) && <PriceText value={Number(product.delivery_cost)}/>
                            }
                            </td>
                        </tr>
                    }
                    {
                        product.delivery_weight && <tr>
                            <td>Product Weight</td><td>{product.delivery_weight}</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
          </Tab>

        </Tabs>
  
  
      </div>
    )
}

export default ProductDescription;