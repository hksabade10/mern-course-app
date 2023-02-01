import React from "react";

const Footer = () => {

    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">&copy; CMS 2023</div>
                    <div>
                        <a href="/privacy-policy">Privacy Policy</a>
                        <span> · </span>
                        <a href="/terms-conditions">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;