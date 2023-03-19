import gsap from 'gsap'

    // eslint-disable-next-line
const likeDown = (refsToBeAnimated:any, targetState:any, setTargetState:any) : void => {

    const tl = gsap.timeline({
        onComplete: () => {
            setTargetState(false)
        }
    })

    if (targetState) {
        tl.to(refsToBeAnimated[0].current, {
            duration: 0.4,
            scale: 0.1,
            ease: 'power1.out'
        })       
        .to(refsToBeAnimated[0].current, {
            duration: 0.4,
            scale: 1,
            ease: 'power1.out',
        }) 
        .to(refsToBeAnimated[1].current, {
            duration: 0.4,
            ease: 'power1.out',
            opacity: 1,
            delay:-0.2
        })
        .to(refsToBeAnimated[2].current, {
            duration: 0.4,
            ease: 'power1.out',
            opacity: 0,
            delay:-0.8
        })
    }  

    return
}

export default likeDown
