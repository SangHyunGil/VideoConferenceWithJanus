import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const category = [
  { name: "create", title: "방 생성" },
  { name: "rooms", title: "방 조회" }
];

export const CategoryWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px 18px 30px;
  //box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  border-bottom: 2px solid #e6e6e6;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CategoryMiddleWrapper = styled.div`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Category = styled(NavLink)`
  cursor: pointer;
  color: black;
  white-space: pre;
  text-decoration: none;
  position: relative;
  font-size: 1.3rem;
  font-family: "OTWelcomeBA", sans-serif;
  &:hover {
    color: #ffc107;
  }
  &.active {
    /*border-bottom: 2px solid #ffc107;*/
    color: #ffc107;
    padding-bottom: 5px;
    &:hover {
      color: #13c6dc;
    }
  }
  & + & {
    margin-left: 1rem;
  }
  @media (max-width: 480px) {
    display: ${(props) => (props.ismenuopen === 'true' ? "inline-block" : "none")};
    & + & {
      margin-left: 0;
    }
  }
`;

const MenuButton = styled(MenuIcon)`
  cursor: pointer;
  @media (min-width: 481px) {
    display: none !important;
  }
  @media (max-width: 480px) {
    display: block;
  }
`;

const MenuCloseButton = styled(CloseIcon)`
  cursor: pointer;
  @media (min-width: 481px) {
    display: none !important;
  }
  @media (max-width: 480px) {
    display: block;
  }
`;

export const UnderLine = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ffc107;
  @media (max-width: 480px) {
    display: none;
  }
`;

const LineVariants = {
  start: {
    opacity: 0,
    x: -100,
  },
  onGoing: {
    opacity: 1,
    x: 0,
  },
};

function Categories() {
  const location = useLocation();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [IsSelected, setIsSelected] = useState(
    location.pathname !== "/" ? location.pathname.split("/")[1] : "all"
  );
  useEffect(() => {
    setIsSelected(
      location.pathname !== "/" ? location.pathname.split("/")[1] : "all"
    );
  }, [location, isMenuOpen]);

  const MenuClickHandler = () => {
    setisMenuOpen((prev) => !prev);
  };

  return (
    <>
      <CategoryWrapper>
        <CategoryMiddleWrapper>
          {category.map((c) => (
            <Category
              key={c.name}
              activeclassname="active"
              onClick={() => setIsSelected(c.name)}
              to={c.name === "all" ? "/" : `/${c.name}`}
              ismenuopen={isMenuOpen+''}
            >
              {c.title}
              {IsSelected === c.name ? (
                <UnderLine
                  variants={LineVariants}
                  initial="start"
                  animate="onGoing"
                  layoutId="underline"
                />
              ) : null}
            </Category>
          ))}
        </CategoryMiddleWrapper>
      </CategoryWrapper>
    </>
  );
}

export default Categories;
