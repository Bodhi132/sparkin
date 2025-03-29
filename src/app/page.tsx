import Stepper from "./components/Stepper";
import JamPolicy from "./components/JamPolicy";
import './globals.css';

export default function Home() {
  return (
      <div className="px-5 py-6 bg-[#E6E5E7]">
        <h1 className="my-2 font-bold text-xl">Add Account</h1>
        <div className="flex gap-10">
          <Stepper />
          <JamPolicy />
        </div>
      </div>
  );
}
