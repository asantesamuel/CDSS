import React from "react";

import { GoLaw } from "react-icons/go";
import { FaExclamationTriangle } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-gradient-to-br bg-white backdrop-blur-sm rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-center p-4 md:p-6 w-full">
        <div className=" flex flex-col justify-center p-4 md:p-6 w-1/2">
          <section className="mt-12 p-5 border-l-4 border-red-500 bg-red-50 rounded-r-lg shadow-inner justify-center items-center">
            <h3 className="text-xl font-bold text-red-800 flex items-center gap-2">
              <FaExclamationTriangle /> Important Medical Disclaimer
            </h3>
            <p className="text-red-700 mt-2">
              This application is intended for use as a clinical decision
              support tool for trained medical professionals only. It is{" "}
              <strong className="font-semibold">NOT</strong> a substitute for
              professional medical diagnosis, advice, or treatment. The results
              provided by the model are for informational purposes and must
              always be verified by a qualified radiologist or physician.
            </p>
          </section>
          <footer className="text-center mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <GoLaw /> &copy; {new Date().getFullYear()} CDSS Project. All
              Rights Reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Unauthorized reproduction or distribution of this application, or
              any portion of it, is strictly prohibited and may result in severe
              civil and criminal penalties.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
