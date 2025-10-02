const Footer = () => {
    return (
        <footer className="footer">
            <div className="justify-center">
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Mariam Fathi All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
