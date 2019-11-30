import React from 'react';
import "./Home.css"

const Home = () => {
    return (
        <div className="main-layout">
		<div className="project-description">
    			<div className="bg-block first-block"> </div>
    			<div className="bg-block second-block"> </div>
    			<p><span className="text--highlight">Xraylab</span> is a machine learning based project for the prediction of lung anomalies.</p>
    			<p>Many people in remote areas are not always able to quickly get an analysis of lung diseases, or get it at all.</p>
    			<p>So with the <span className="text--highlight">Xraylab</span>, any person having a snapshot of the lungs can get a reliable analysis in a matter of seconds.</p>
  		</div>
        </div>
    )
}

export default Home;
