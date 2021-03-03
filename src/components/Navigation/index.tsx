import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";
import {
  Box,
  Text,
  Stack,
  Flex,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import {
  CloseIcon,
  TriangleDownIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

import Logo from "./Logo";

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <TriangleDownIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }: any) => {
  return (
    <Link to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const Navigation = ({ authUser }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
    >
      <Flex align="center" wrap="wrap">
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle Theme"
          variant="ghost"
        />
        <Logo w="100px" />
      </Flex>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <NavigationAuth isOpen={isOpen} />
          ) : (
            <NavigationNonAuth isOpen={isOpen} />
          )
        }
      </AuthUserContext.Consumer>
    </Flex>
  );
};

const NavigationAuth = ({ isOpen }: any) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to={ROUTES.DISCOVER}>Discover</MenuItem>
      <MenuItem to={ROUTES.NEWS}>News</MenuItem>
      <MenuItem to={ROUTES.MARKET}>Market</MenuItem>
      <MenuItem to={ROUTES.USER}>User</MenuItem>
      <MenuItem to={ROUTES.CHAT}>Chat</MenuItem>
      <SignOutButton />
    </Stack>
  </Box>
);

const NavigationNonAuth = ({ isOpen }: any) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to={ROUTES.DISCOVER}>Discover</MenuItem>
      <MenuItem to={ROUTES.NEWS}>News</MenuItem>
      <MenuItem to={ROUTES.MARKET}>Market</MenuItem>
      <MenuItem to={ROUTES.USER}>User</MenuItem>
      <MenuItem to={ROUTES.SIGN_UP}>Sign up</MenuItem>
      <MenuItem to={ROUTES.SIGN_IN}>Sign in</MenuItem>
    </Stack>
  </Box>
);

export default Navigation;
