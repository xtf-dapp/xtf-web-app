import NavbarComponent from '../navigation/NavigationComponent'
import './JourneyComponent.css'

function JourneyComponent() {
    return (
        <div>
            <NavbarComponent />
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-item-date">Jan 2023</div>
                    <h2>First Meetup of founders</h2>
                    <p>The founders of the product met for the first time and discussed their ideas for the product.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-item-date">Feb 2023</div>
                    <h2>Market Gathering and Ideation begin</h2>
                    <p>The founders gathered information about the market and started brainstorming ideas for the product.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-item-date">Mar 2023</div>
                    <h2>POC iteration started</h2>
                    <p>The first proof of concept for the product was developed and tested.</p>
                </div>
            </div>
        </div>
    );
}

export default JourneyComponent;
