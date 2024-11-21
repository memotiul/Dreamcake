import { useState } from "react";
import TrendyTab from "./trendyTab";
import FlavouredTab from "./flavouredTab";
import SnacksTab from "./snacksTab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Trendy");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Trendy":
        return <TrendyTab />;
      case "Flavoured":
        return <FlavouredTab />;
      case "Snacks":
        return <SnacksTab />;
    }
  };

  return (
    <div className="mx-auto p-4 ">
      <div className="flex flex-row gap-8 text-gray-300">
        <div className="flex flex-col max-w-md mx-auto text-center items-center justify-center">
          <h2 className="text-3xl text-white">OUR BEST MENU</h2>
          <div className="w-40 h-[2px] bg-yellow-400 my-5 mx-auto"></div>
          <p className="paragraph text-sm">
            Choose from the list below of Flavoured Cakes,Trendy
            Cakes,Customized Cakes and Snacks.Orders Will be delivered at
            registerd address with minimum delivery charges(depends on
            location).
          </p>
        </div>
      </div>
      {/* Tab buttons */}
      <div className="flex space-x-4 items-center justify-center mt-8">
        {["Trendy", "Flavoured", "Snacks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Render the active tab content */}
      {renderTabContent()}
    </div>
  );
};

export default Tabs;
