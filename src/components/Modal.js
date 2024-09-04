'use client'
// https://medium.com/@bomber.marek/how-to-use-dialog-in-react-easy-modals-tooltips-81e44d570c8a
import { useRef } from "react";

const TestModal = ({ children, icon, className  }) => {
    const dialogRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) dialogRef.current.showModal();
    };

    const closeDialog = () => {
        if (dialogRef.current) dialogRef.current.close();
    };


    return (
        <>
            <div onClick={openDialog} className={className}>
                {icon}
            </div>


            <dialog ref={dialogRef}
                className={`backdrop:bg-black/50 backdrop:backdrop-blur-sm py-12 px-8 rounded-md
                         fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
                         w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]`}>

                {children}           
 

                <div onClick={closeDialog} className="absolute top-4 right-4 cursor-pointer" >
                    ❌
                </div>
            </dialog>


        </>
    );
};

export default TestModal;