const Error404 = () => {
    return (
        <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <h1 className="display-1">404</h1>
                                    <p className="lead">URL Not Found</p>
                                    <p>This requested URL was not found on this server.</p>
                                    <a href="/">
                                        <i className="fas fa-arrow-left me-1"></i>
                                        Return to Dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Error404;