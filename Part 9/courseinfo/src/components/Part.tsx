import { CoursePart } from "../types";
import { assertNever } from "../utils";

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>{" "}
          <br />
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>{" "}
          <br />
          <i>project exercises {part.groupProjectCount}</i>
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>{" "}
          <br />
          <i>{part.description}</i> <br />
          <i>
            background material: <a href={part.backgroundMaterial}>here</a>
          </i>
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>{" "}
          <br />
          <i>{part.description}</i> <br />
          <i>required skills: {part.requirements.join(", ")}</i>
        </div>
      );
    default:
      return assertNever(part);
  }
};
