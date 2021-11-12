// Link-komponent som wrappar NextLink + Materials Link
// https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a

import PropTypes from "prop-types";
import { forwardRef } from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

const Link = forwardRef(({ href, as, prefetch, ...props }, ref) => {
  return (
    <NextLink href={href} as={as} prefetch={prefetch} passHref>
      <MuiLink ref={ref} {...props} />
    </NextLink>
  );
});

Link.displayName = "Link";

Link.defaultProps = {
  href: "#",
  prefetch: false,
};

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};

export default Link;
