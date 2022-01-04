import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = (props) => { 
  const router = useRouter();

  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modalState);

  const [url, setUrl] = useState({
    image: "https://links.papareact.com/ocw",
    height: 40,
    width: 100,
  });

  const setLogo = () => {
    if (window.innerWidth < "650px") {
      setUrl({
        image: "https://links.papareact.com/jjm",
        height: 5,
        width: 5,
      });
    }
  };

  return (
    <Container>
      <HeaderSection className="max-w-7xl lg:mx-auto">
        <LogoSection>
          <Image
            onClick={() => router.push("/")}
            src={url.image}
            height={url.height}
            width={url.width}
          />
        </LogoSection>

        <SearchSection>
          <SearchIcon style={{ marginRight: "10px", marginLeft: "5px" }} />
          <Input className="search" type="text" placeholder="Search" />
        </SearchSection>

        <HeaderIcon>
          <HomeIcon onClick={() => router.push("/")} className="iconBtn" />

          {session ? (
            <>
              <MarkUnreadChatAltIcon className="iconBtn" />
              <AddCircleIcon onClick={() => setOpen(true)} className="iconBtn" />
              <ExploreIcon className="iconBtn" />
              <FavoriteIcon className="iconBtn" />
              <UserAvatar onClick={() => signOut()} src={session.user.image} />
            </>
          ) : (
            <button className="font-bold" onClick={() => signIn()}>
              Sign in
            </button>
          )}
        </HeaderIcon>
      </HeaderSection>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid whitesmoke;
`;

const LogoSection = styled.div`
  margin-top: 6px;

  :hover {
    cursor: pointer;
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: whitesmoke;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid lightgray;

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const Input = styled.input`
  outline-width: 0;
  border: none;
  background-color: whitesmoke;
`

const UserAvatar = styled(Avatar)`
  border: 2px solid #f56040;

  :hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;
const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
`;
