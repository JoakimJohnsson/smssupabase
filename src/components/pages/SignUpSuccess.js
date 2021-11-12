import React from "react";
import Login from "../Login";

const SignupSuccess = () => {

    return (
        <>
            <div className={"bg-gradient-to-br from-blue-1000 via-blue-800 to-blue-900 bg-black"}>
                <div className={"grid grid-cols-1 md:grid-cols-2"}>
                    <div className={"px-10 py-20 lg:p-20"}>
                        <Login/>
                    </div>
                    <div className={"px-10 py-20 lg:p-20 flex justify-center flex-col"}>
                        <h1 className={"font-bold mb-10 text-white text-2xl sm:text-4xl md:text-2xl lg:text-5xl text-center"}>
                            Welcome to Svenska Marvelsamlare!
                        </h1>
                        <p className={"mb-8 w-2/3 text-white text-center mx-auto"}>Do you collect swedish marvel comics?</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupSuccess;
