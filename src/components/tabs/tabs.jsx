import "./tabs.scss";

export default function Tabs({ activeTab, setActiveTab, Counts }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === "all" ? "active-tab" : ""}
        onClick={() => setActiveTab("all")}
      >
        All ({Counts.all})
      </button>
      <button
        className={activeTab === "open" ? "active-tab" : ""}
        onClick={() => setActiveTab("open")}
      >
        Pending ({Counts.open})
      </button>
      <button
        className={activeTab === "done" ? "active-tab" : ""}
        onClick={() => setActiveTab("done")}
      >
        Completed ({Counts.done})
      </button>
    </div>
  );
}
