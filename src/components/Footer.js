import React from 'react';
import {useAuth} from "../contexts/Auth";

const Footer = () => {
    const {user} = useAuth();
    const border = user ? "border-blue-900" : "border-yellow-400";

    return (
        <footer className={"footer relative p-6 border-t-4 " + border}>
            <div className="container mx-auto px-6 prose">
                <div className="flex flex-col items-center">
                    <div className="sm:w-2/3 lg:w-full text-center py-6">
                        <p className="text-xs">
                            © 2020 Joakim Johnsson
                        </p>
                        <p className="text-xs">
                            This webb application contains images and information which is owned and copyrighted
                            by <a href="https://www.marvel.com">MARVEL Entertainment</a> and is used without permission
                            according to the Fair use doctrin of the United States.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
