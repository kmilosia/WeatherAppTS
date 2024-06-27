import React from 'react'

const DetailHeader: React.FC<{icon: React.ComponentType<{ className?: string }>,title: string}> = ({icon: Icon, title}) => {
  return (
    <div className='flex text-lg items-center'>
        <Icon className='text-3xl'/>
        <p>{title}</p>
    </div>
  )
}

export default DetailHeader
