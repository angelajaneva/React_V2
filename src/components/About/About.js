import React, {Component} from 'react';
import './aboutStyle.css';

class About extends Component {

    render() {
        return (
            <div className="hero-wrap container">
                <div className="mt-5">

                    <br/><br/>
                    <div className="container_ con mt-4">
                        <p style={{textAlign: "center", fontFamily: 'Gill Sans'}}>Organize your work!</p>
                        <div className="parallax1">

                        </div>
                        <br/>

                        <p> Every year, hundreds of millions of people face the challenge of studying a new skill,
                            subject,
                            or foreign language. For too many of us, this learning process is brutally slow, boring,
                            inconvenient, ineffective, and impermanent. Quenote is here to change that. We apply the
                            latest in cognitive science research to make studying as accessible, fun, and effective as
                            humanly possible.
                        </p>
                        <p/>
                        <p/>

                        <br/>
                        <p style={{textAlign: "center", fontFamily: 'Gill Sans'}}>Share your experience!</p>
                        <div className="parallax2">

                        </div>
                        <br/>
                        <p>
                            At Quenote, we believe that anyone can learn anything. All it takes is a tenacious spirit, the
                            right guidance and the tools to see it through. We know that students are under more
                            pressure
                            than ever. It can leave them feeling overwhelmed, produce anxiety and make it all too easy
                            to
                            burn out. It’s our job to give every student the tools and confidence to succeed, no matter
                            their motivation or what they’re striving to achieve
                        </p>


                        <br/>
                        <p style={{textAlign: "center", fontFamily: 'Gill Sans'}}>Remember everything important !</p>
                        <div className="parallax3">

                        </div>
                        <br/>
                        <p>Great minds don’t always think alike, but they can share ideas and create together. With Quenote,
                            all
                            your work is in one place
                            Four tools in one. No more getting lost in tabs.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;