import React from 'react';

const Blanks = (props) => {
    const current = props.current;
    return (
        <h1>{current.join('   ')}</h1>
    );
}

export { Blanks };