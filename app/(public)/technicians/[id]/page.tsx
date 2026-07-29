import React from 'react'
import { getTechnicianById } from '../../_action/technician'

export const TechnicinaData = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const getTechniciandata = await getTechnicianById(id as string)

    console.log(getTechniciandata)
    return (
        <div>
     {/* dtat{getTechniciandata} */}
        </div>
    )
}

export default TechnicinaData
