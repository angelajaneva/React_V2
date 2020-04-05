import React from 'react'


const Home = (props) => {
    return (
        <div className="hero-wrap ftco-degree-bg" style={{backgroundImage: 'url(' + require('./background2.jpg') + ')'}}>

            {/*style="background-image: url('images/background.jpg');"*/}
            {/*data-stellar-background-ratio="0.5*/}
            <div className="overlay"/>
            <div className="container">
                <div className="row no-gutters slider-text justify-content-center align-items-center">
                    <div className="text text-center">
                        <form action="#" className="search-location mt-lg-5">
                            <div className="row justify-content-center">
                                <div className="form-group">
                                    <div className="form-field">
                                        <input type="text" className="form-controlcss" placeholder="Search" aria-label="Search"/>
                                        <button className="ti-search" type="submit"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

)
};

export default Home