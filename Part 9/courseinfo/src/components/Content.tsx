import { CoursePart } from "../types";
import { Part } from "./Part";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <div key={part.name} style={{ padding: "5px" }}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};
