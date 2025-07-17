interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabSliderProps {
  tabs: Tab[];
  selectedTab: string;
  onTabChange: (key: string) => void;
}

export function TabSlider({ tabs, selectedTab, onTabChange }: TabSliderProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap flex-shrink-0 ${
              selectedTab === tab.key
                ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                : "bg-white/80 text-pink-500 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
            }`}
            onClick={() => onTabChange(tab.key)}
            title={tab.label}
            style={{ minWidth: "fit-content" }}
          >
            {tab.icon && (
              <span className="mr-1.5 flex-shrink-0">{tab.icon}</span>
            )}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
