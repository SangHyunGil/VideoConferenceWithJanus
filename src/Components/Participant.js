import { useEffect, useState } from "react";

const Participant = ( { publishFeed, subscribeFeeds } ) => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        let temp = [publishFeed]
        subscribeFeeds.map((subscribeFeed) => (
            temp.push(subscribeFeed)
        ))
        setPeople(temp);
    }, [subscribeFeeds])

    const renderParticipantData = people.map((person, index) => (
        <p key={index}> {person.display}</p>
    ));

    return (
        <>
            <div
            style={{
              width: "400px",
              border: "1px solid",
              overflow: "auto",
              minHeight: "500px",
            }}
          >
            {renderParticipantData}
          </div>
        </>
    )
}

export default Participant;