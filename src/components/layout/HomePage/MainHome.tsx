/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import SideBar from '../../shared/sidebar'
function MainHome({ data, meta }: any) {
    return (
        <div>
            <SideBar data={data} meta={meta} />


        </div>
    )
}

export default MainHome