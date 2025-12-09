type ToolbarProps = {
  onExport: () => void;
  onImportClick: () => void;
  onNewSite: () => void;
};

export function Toolbar({ onExport, onImportClick, onNewSite }: ToolbarProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 5,
        left: 5,
        zIndex: 1500,
        display: "flex",
        gap: 10,
        background: "rgba(255,255,255,0.9)",
        padding: "5px 5px",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,.12)",
        border: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <button
        onClick={onNewSite}
        title="New Site"
        style={{
          padding: "4px 8px",
          border: "1px solid rgba(0,0,0,.1)",
          borderRadius: 8,
          background: "#ffffff",
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        New Site
      </button>
      <button
        onClick={onExport}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
      >
        💾
      </button>
      <button
        onClick={onImportClick}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
      >
        📂
      </button>
    </div>
  );
}
