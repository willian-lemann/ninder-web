import { useState } from "react";
import Router from "next/router";
import { useAuthContext } from "@context/auth";

import { addErrorNotification } from "@components/shared/alert";
import { Loading } from "@components/shared/Loading";
import { acceptRegulationsService } from "@services/user/accept-regulations";

const file = "https://termify.io/terms-and-conditions/1667685585";

export default function Regulations() {
  const [isAcceptingRegulation, setIsAcceptingRegulation] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleAccepRegulations = async () => {
    setIsAcceptingRegulation(true);

    try {
      await acceptRegulationsService();

      Router.push("/");
    } catch (error) {
      addErrorNotification("Error trying to accept regulation, Try Again");
      console.log(error);
    } finally {
      setIsAcceptingRegulation(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="">
        <header className="my-10 flex justify-center">
          <h1 className="border-b-green-300 border-b-2 w-fit text-2xl">
            Terms of service
          </h1>
        </header>

        <div className="overflow-auto h-full max-h-[500px]">
          <iframe
            width={800}
            className="scale-100 h-full"
            src={`${file}#toolbar=0`}
          ></iframe>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center">
            <input
              checked={acceptedTerms}
              onChange={({ target }) => setAcceptedTerms(target.checked)}
              id="checked-checkbox"
              type="checkbox"
              className="w-4 h-4 outline-none text-blue-600 bg-gray-100 rounded border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-base font-medium text-zinc-700"
            >
              I Agree with the terms above
            </label>
          </div>

          <button
            disabled={!acceptedTerms}
            className={
              "disabled:opacity-50 disabled:cursor-not-allowed border-none bg-primary rounded-lg px-4 py-1 text-white"
            }
            onClick={handleAccepRegulations}
          >
            {isAcceptingRegulation ? <Loading /> : "Go Ninder"}
          </button>
        </div>
      </div>
    </div>
  );
}
