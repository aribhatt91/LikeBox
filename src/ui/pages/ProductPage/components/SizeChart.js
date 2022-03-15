import React, {useState} from 'react'
import SIZE_CHART from '../../../../libs/constants/size-guide';

export default function SizeChart({affiliate, className}) {
    const size_obj = SIZE_CHART[affiliate] || [];
    let top = null, bottom = null, top_table = <React.Fragment></React.Fragment>, bottom_table = <React.Fragment></React.Fragment>;

    if(size_obj && size_obj.length >= 1){
        top = size_obj[0];
        bottom = size_obj[1];
        let top_sizes = top['sizes'] || {},
        top_keys = Object.keys(top_sizes);
        let bottom_sizes = top['sizes'] || {},
        bottom_keys = Object.keys(bottom_sizes);

        top_table = (<React.Fragment><h3 className="mb-2">Tops</h3><table className="w-100">
            <thead>
                <tr>
                    <td>Size</td>
                    <td>inches</td>
                    <td>cm</td>
                </tr>
            </thead>
            <tbody>
                {
                    top_keys.map((size, index) => <tr key={index}>
                        <td>{size}</td>
                        <td>{
                            top_sizes[size]['inch'] || ""
                        }</td>
                        <td>{
                            top_sizes[size]['cm'] || ""
                        }</td>
                    </tr>)
                }
            </tbody>
        </table></React.Fragment>);

        bottom_table = (<React.Fragment><h3 className="mb-2">Bottoms</h3><table className="w-100">
        <thead>
            <tr>
                <td>Size</td>
                <td>inches</td>
                <td>cm</td>
            </tr>
        </thead>
        <tbody>
            {
                bottom_keys.map((size, index) => <tr key={index}>
                    <td>{size}</td>
                    <td>{
                        bottom_sizes[size]['inch'] || ""
                    }</td>
                    <td>{
                        bottom_sizes[size]['cm'] || ""
                    }</td>
                </tr>)
            }
        </tbody>
        </table></React.Fragment>);
    }
    
    return (
        <React.Fragment>
            <div className="container size-guide-body w-100 p-4">

                {size_obj.length >= 1 && <h2 className="mb-3 text-center">Size guide</h2>}
                
                {
                    top_table
                }
                {
                    bottom_table
                }
            </div>
        </React.Fragment>
    )
}
