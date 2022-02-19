import React from 'react';
import startupGraphics from './graphics/startupgraphics';

const Startup = (props) => {
    let step = props.step;
    if (step > 4) step = 4;

    return (
        <div id="startup">
            {<img className='bigGraphics' src={startupGraphics[step - 2]} />}
        </div>
        );
}


export { Startup };