import React from 'react'

export const Register = () => {
    return (
      <div className="flex flex-row-reverse h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className="bg-white w-full md:w-1/3">
              <div className="my-10">
                <h1 className="font-mono text-center text-5xl">Register</h1>
              </div>
            <div className="bg-red-500">
                <form>
                    <div className="flex flex-col">
                        <input className=" rounded-lg border h-16 mx-5 my-5" type="text" placeholder="Username"/>
                        <input className=" rounded-lg h-16 mx-5 my-5"type="text" placeholder="Name"/>
                        <input className=" rounded-lg h-16 mx-5 my-5"type="text" placeholder="Email"/>
                        <input className=" rounded-lg h-16 mx-5 my-5"type="text" placeholder="Password"/>
                    </div>
                    <button className="bg-yellow-300">Register</button>
                </form>
            </div>
        </div>
      </div>
    );
}
