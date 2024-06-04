import {IF} from '../url'

const ProfilePosts = ({p}) => {
    return (
        <div className="flex w-full p-4 mt-8 space-x-4 ">
          {/* Left */}
          <div className="w-[35%] h-[200px] flex justify-center items-center">
    <img src={IF+p.photo} alt="" className="object-cover w-full h-full"/>
    
    </div>
       {/* Right */}
       <div className="flex flex-col w-[65%]">
        <h1 className="mb-1 text-xl font-bold md:-2 md:text-2xl">
        {p.title}
        </h1>
        <div className="flex items-center justify-between mb-2 space-x-4 text-sm font-semibold text-gray-500 md:mb-4">
        <p>@{p.username}</p>
          <div className="flex space-x-2">
          <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{p.desc.slice(0,200)+" ...Read more"}</p>
    </div>
        </div>
      )
    }
    

export default ProfilePosts