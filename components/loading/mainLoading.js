import React from 'react';

const MainLoading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
           <div>
           <img className='block m-auto' width={50} src='/load.gif' />
           <p>Initializing</p>
           </div>
        </div>
    );
};

export default MainLoading;