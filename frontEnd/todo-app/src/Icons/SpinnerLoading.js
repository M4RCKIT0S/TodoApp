import React from 'react'
import {Spinner} from './HeroIcons'
import {motion} from  'framer-motion'

export const SpinnerLoading = () => {
    return (
        <div className="mx-auto my-auto flex  h-full justify-center"> 
                    <motion.div className=""
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0,  270, 270,0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    transition={{repeat:Infinity, duration: 4}}
  >
        <div className="mx-auto my-auto h-full flex justify-center">
            <svg className="mx-auto my-auto"xmlns="http://www.w3.org/2000/svg" fill="none" height="180px" width="180px" viewBox="0 0 24 24" stroke="currentColor">
                <Spinner/>
            </svg>
        </div>
        </motion.div>
        </div>
    )
}
