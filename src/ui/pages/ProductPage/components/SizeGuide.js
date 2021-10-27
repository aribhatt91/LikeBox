import React, {useState} from 'react'
import AppModal from '../../../components/generic/AppModal';
import SIZE_CHART from '../../../../service/constants/size-guide';
import SizeChart from './SizeChart';
export default function SizeGuide({affiliate, className}) {
    const [show, setShow] = useState(false);
    const size_obj = SIZE_CHART[affiliate] || [];
    
    return (
        <React.Fragment>
            {size_obj.length >= 1 && <a href="#" onClick={() => setShow(true)} className={className? className : ""}>
                Size guide
            </a>}
            {show && <AppModal className="size-guide-modal" id="size-guide" onClose={() => setTimeout(()=>setShow(false), 500)}>
                <SizeChart affiliate={affiliate} />
            </AppModal>}
            
        </React.Fragment>
    )
}
