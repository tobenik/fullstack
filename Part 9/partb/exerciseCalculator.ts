const parseArguments = (
  args: string[]
): { target: number; hours: Array<number> } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const target = Number(args[2]);
  const hours = args.slice(3).map((hour) => Number(hour));
  if (!isNaN(target) && hours.every((hour) => !isNaN(hour))) {
    return {
      target,
      hours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}
export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;
  if (average < target) {
    rating = 1;
    ratingDescription = "You need to work harder";
  } else if (average === target) {
    rating = 2;
    ratingDescription = "Good job, but you can do better";
  } else {
    rating = 3;
    ratingDescription = "You are doing great";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}
