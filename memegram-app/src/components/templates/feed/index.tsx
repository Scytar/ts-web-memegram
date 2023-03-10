import React, {useState} from 'react'
import { SingleFeedPanel } from 'components/organisms'
import PostSkeleton from 'components/skeletons/postSkeleton'

type PropTypes = {
    isInDevelopmentMode: boolean;
}

const Feed = ({isInDevelopmentMode}:PropTypes): JSX.Element => {

  
  const [loadingState, setloadingState] = useState<boolean>(false)
  // All possible loading states:
  // 'isLoading', 'Loaded', 'Success', 'Error'  

  interface feedArrayOfObjects{
    key: number,
    isInPlaceholderMode: boolean,
  }


  const [arrayOfPanels, setarrayOfPanels] = useState<feedArrayOfObjects[]>([
    {
        key:1,
        isInPlaceholderMode: isInDevelopmentMode,
    },
    {
        key:2,
        isInPlaceholderMode: isInDevelopmentMode,
    }
])


  return (
    <>
    {      
        arrayOfPanels.map(
            (item, index)=>{
                return <SingleFeedPanel key={item.key} isInPlaceholderMode={item.isInPlaceholderMode} />
            }
        )
    }
    <PostSkeleton />
    </>
  )
}

export { Feed }