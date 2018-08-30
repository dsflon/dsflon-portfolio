import React from 'react';

const Nl2br = (text) => {

    var regex = /(\r\n)/g

    return text.split(regex).map(function (line,i) {
        if (line.match(regex)) {
            return <br key={i} />
        } else {
            return line;
        }
    });

}

export default Nl2br;
