import {IF} from '../url'


const HomePosts = ({post}) => {
  return (
    <div className="w-full flex mt-4 space-x-4 bg-gray-300 p-4 rounded-3xl">
      {/* Left */}
      <div className="w-[35%]  h-[200px] flex justify-center items-center ">
        <img src={IF+post.photo} alt={post.title} className="h-full w-full object-cover  rounded-3xl"/>
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold items-center justify-between text-gray-500 space-x-4 md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
          </div>
        </div>
        <p className="text-sm font-medium md:text-base">
          {post.desc.substring(0, 200)+"...Read more"}
        </p>
      </div>
    </div>
  )
}

export default HomePosts