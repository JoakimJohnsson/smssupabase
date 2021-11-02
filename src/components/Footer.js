import React from 'react';

const Footer = () => {

    return (
        <footer className={"footer relative p-6 border-t border-blue-1000"}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <div className="sm:w-2/3 lg:w-full text-center py-6">
                        <p className="text-xs mb-5">
                            This webb application contains images and information which is owned and copyrighted
                            by <a href="https://www.marvel.com">MARVEL Entertainment</a> and is used without permission
                            according to the fair use doctrin of the United States.
                        </p>
                        <p className="text-xs">
                            © 2021-2022 Svenska Marvelsamlare
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
