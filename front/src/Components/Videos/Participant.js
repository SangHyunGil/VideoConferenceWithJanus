import { useEffect, useState } from "react";
import styled from "styled-components";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ParticipantsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  p {
    margin: 0;
  }
`;

const Participant = ({ publishFeed, subscribeFeeds }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    let temp = [publishFeed];
    subscribeFeeds.map((subscribeFeed) => temp.push(subscribeFeed));
    setPeople(temp);
  }, [publishFeed, subscribeFeeds]);

  const renderParticipantData = people.map((person, index) => (
    <p key={index}> {person.display}</p>
  ));

  return (
    <ParticipantsWrapper>
        <p>참여자 목록</p>
        <ParticipantsWrapper>{renderParticipantData}</ParticipantsWrapper>
    </ParticipantsWrapper>
  );
};

export default Participant;
