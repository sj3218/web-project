import React from 'react';
import '../../App.scss';
import Button from '../ui/Button';

function ButtonPage() {
    return (
        // <div className="ButtonPage">
        //     <div className="buttons">
        //         <Button>BUTTON</Button>
        //     </div>
        // </div>
        <div>
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
        </div>
    );
}

export default ButtonPage;
