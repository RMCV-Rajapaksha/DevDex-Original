import React from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
const Comments = () => {
  return (
    
    <div className="px-2 py-2 my-2 bg-gray-200 rounded-lg ">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-gray-600">@jsjvk;odfm</h3>
      <div className="flex justify-center items-center space-x-4">
        <p className="text-gray-500">18/04/2024</p>
        <p className="text-gray-500">16:45</p>
        <div className="flex items-center justify-center space-x-2">
          <p className="cursor-pointer" ><BiEdit/></p>
          <p className="cursor-pointer" ><MdDelete/></p>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Comments