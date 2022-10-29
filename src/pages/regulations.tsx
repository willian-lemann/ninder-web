import Router from "next/router";
import { useAuthContext } from "@context/auth";
import { updateUserService } from "@services/user/updateUserService";

const Regulations = () => {
  const { user } = useAuthContext();

  const handleAccepRegulations = async () => {
    const id = user?.id as string;

    await updateUserService(id, { hasConfirmedRegulation: true });
  };

  const handleGoToHomePage = () => {
    Router.push("/");
  };

  return (
    <div className="flex items-center flex-col justify-center w-screen h-screen">
      regulations
      <div className="flex flex-col">
        <span>I accept the terms of service</span>
        <button onClick={handleAccepRegulations}>Go</button>

        <button onClick={handleGoToHomePage}>go to home</button>
      </div>
    </div>
  );
};

export default Regulations;
