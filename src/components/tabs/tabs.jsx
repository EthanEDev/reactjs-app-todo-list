import "./tabs.scss";

export default function Tabs({ activeTab, setActiveTab, Counts }) {
  return (
    <div className="tabs">
      {/* Button for the "All" tab, highlights as active if activeTab is "all" */}
      <button
        className={activeTab === "all" ? "active-tab" : ""}
        onClick={() => setActiveTab("all")}
      >
        All ({Counts.all}) {/* Displays count of all tasks*/}
      </button>
      {/* Button for the "Pending" tab, highlights as active if activeTab is "open" */}
      <button
        className={activeTab === "open" ? "active-tab" : ""}
        onClick={() => setActiveTab("open")}
      >
        Pending ({Counts.open}) {/* Displays count of open/pending tasks */}
      </button>
      {/* Button for the "Completed" tab, highlights as active if activeTab is "done" */}
      <button
        className={activeTab === "done" ? "active-tab" : ""}
        onClick={() => setActiveTab("done")}
      >
        Completed ({Counts.done}) {/* Displays count of completed tasks */}
      </button>
    </div>
  );
}
