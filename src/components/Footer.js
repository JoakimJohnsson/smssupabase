import React from 'react';
import {useAuth} from "../contexts/Auth";

const Footer = () => {
    const {user} = useAuth();
    const bg = user ? "bg-blue-100" : "bg-yellow-100";

    return (
        <footer className={"footer relative p-6 " + bg}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <div className="sm:w-2/3 text-center py-6">
                        <p className="text-sm">
                            © 2020 Joakim Johnsson
                        </p>
                        <p className="text-sm">
                            This webb application contains images and information which is owned and copyrighted by
                            <a href="https://www.marvel.com"> MARVEL Entertainment </a>
                            and is used without permission according to the Fair use doctrin of the United States.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
