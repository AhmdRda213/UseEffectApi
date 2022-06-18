import {useEffect, useRef} from "react";

const usePrevState=(State)=>{
    const Ref=useRef();
    useEffect(()=>{
        Ref.current=State;
    });
    return Ref.current
}
export default usePrevState