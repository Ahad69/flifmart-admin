import { Skeleton } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <div className='h-96 flex justify-center items-center'>
           <img className='block m-auto' width={50} src='/load.gif' />
        </div>
    );
};

export default Loading;