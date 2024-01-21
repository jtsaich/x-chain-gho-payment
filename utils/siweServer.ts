import { configureServerSideSIWE } from "connectkit-next-siwe";

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: "connectkit-next-siwe",
    password: "anbserjhjvwejrvhjg13g13e5r13g1e3",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
