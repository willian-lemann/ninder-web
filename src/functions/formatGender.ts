export function getGender(genderEnum: number) {
  const genderBasedOnEnum = {
    1: "Male",
    2: "Female",
  };

  return (
    genderBasedOnEnum[genderEnum as keyof typeof genderBasedOnEnum] ||
    "Other gender"
  );
}
