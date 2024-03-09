import { Gender } from "../../types";
import { Male, Female, Transgender } from "@mui/icons-material";

export const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Female:
      return <Female />;
    case Gender.Male:
      return <Male />;
    case Gender.Other:
      return <Transgender />;
    default:
      return null;
  }
};
