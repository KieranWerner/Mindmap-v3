import type { ContextMenuState, MindNode } from "../types";
import { MenuItem } from "./MenuItem";

type ContextMenuProps = {
  contextMenu: ContextMenuState;
  nodes: MindNode[];
  selectedIds: Set<number>;
  undoStack: { current: any[] };
  redoStack: { current: any[] };
  onClose: () => void;
  onAddStandalone: (pos?: { x: number; y: number }) => number;
  onSelectOnly: (id: number) => void;
  onRenameNode: (id: number, label: string) => void;
  onAddChild: (parentId: number) => number;
  onHighlightNodes: (ids: number[]) => void;
  onSetNodeColor: (ids: number[], color: string) => void;
  onRemoveNodes: (ids: number[]) => void;
  onToggleEdgeDashed: (edgeId: number) => void;
  onRenameEdge: (edgeId: number) => void;
  onRemoveEdges: (ids: number[]) => void;
  onUndo: () => void;
  onRedo: () => void;
};

export function ContextMenu({
  contextMenu,
  nodes,
  selectedIds,
  undoStack,
  redoStack,
  onClose,
  onAddStandalone,
  onSelectOnly,
  onRenameNode,
  onAddChild,
  onHighlightNodes,
  onSetNodeColor,
  onRemoveNodes,
  onToggleEdgeDashed,
  onRenameEdge,
  onRemoveEdges,
  onUndo,
  onRedo,
}: ContextMenuProps) {
  if (!contextMenu.open) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: contextMenu.x,
        top: contextMenu.y,
        zIndex: 2000,
        background: "#ffffff",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(15,23,42,.18)",
        padding: 6,
        minWidth: 240,
        border: "1px solid rgba(15,23,42,.06)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {contextMenu.kind === "bg" && (
        <>
          <MenuItem
            label="➕ New Node"
            onClick={() => {
              const id =
                contextMenu.wx != null
                  ? onAddStandalone({ x: contextMenu.wx, y: contextMenu.wy! })
                  : onAddStandalone();
              onSelectOnly(id);
              onClose();
            }}
          />
          <div style={{ height: 1, background: "rgba(15,23,42,.08)", margin: "6px 0" }} />
          <MenuItem
            label="↶ Undo (Ctrl+Z)"
            onClick={() => { onUndo(); onClose(); }}
            disabled={undoStack.current.length === 0}
          />
          <MenuItem
            label="↷ Redo (Ctrl+Y)"
            onClick={() => { onRedo(); onClose(); }}
            disabled={redoStack.current.length === 0}
          />
        </>
      )}

      {contextMenu.kind === "node" && (
        <>
          <MenuItem
            label="✏️ Rename"
            onClick={() => {
              if (contextMenu.targetNodeId != null) {
                const node = nodes.find((n) => n.id === contextMenu.targetNodeId);
                if (node) onRenameNode(contextMenu.targetNodeId, node.label);
              }
              onClose();
            }}
          />
          <MenuItem
            label="➕ Child"
            onClick={() => {
              if (contextMenu.targetNodeId != null)
                onSelectOnly(onAddChild(contextMenu.targetNodeId));
              onClose();
            }}
          />
          <MenuItem
            label="⭐ Highlight (Strg+B)"
            onClick={() => {
              if (contextMenu.targetNodeId != null) {
                const ids = Array.from(selectedIds.size ? selectedIds : new Set([contextMenu.targetNodeId]));
                onHighlightNodes(ids);
              }
              onClose();
            }}
          />
          <div style={{ height: 1, background: "rgba(15,23,42,.08)", margin: "6px 0" }} />
          <div style={{ display: "flex", gap: 6, padding: "4px 8px 6px" }}>
            {["#CDE8B0", "#A9D6EA", "#F9E79F", "#F7B2D9"].map((color, idx) => {
              const labels = ["Grün", "Blau", "Gelb", "Rot"];
              return (
                <button
                  key={color}
                  onClick={() => {
                    if (contextMenu.targetNodeId != null) {
                      const ids = Array.from(selectedIds.size ? selectedIds : new Set([contextMenu.targetNodeId]));
                      onSetNodeColor(ids, color);
                    }
                    onClose();
                  }}
                  title={labels[idx]}
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 999,
                    border: "1px solid rgba(15,23,42,.12)",
                    background: color,
                    cursor: "pointer",
                  }}
                />
              );
            })}
            <button
              onClick={() => {
                if (contextMenu.targetNodeId != null) {
                  const ids = Array.from(selectedIds.size ? selectedIds : new Set([contextMenu.targetNodeId]));
                  onSetNodeColor(ids, "");
                }
                onClose();
              }}
              title="Farbe entfernen"
              style={{
                width: 28,
                height: 20,
                borderRadius: 999,
                border: "1px solid rgba(15,23,42,.12)",
                background: "linear-gradient(135deg, transparent 0%, transparent 47%, #ef4444 47%, #ef4444 53%, transparent 53%)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ height: 1, background: "rgba(15,23,42,.08)", margin: "6px 0" }} />
          <MenuItem
            label="🗑️ Delete"
            onClick={() => {
              if (contextMenu.targetNodeId != null)
                onRemoveNodes([contextMenu.targetNodeId]);
              onClose();
            }}
          />
        </>
      )}

      {contextMenu.kind === "edge" && (
        <>
          <MenuItem
            label="╌╌╌ Toggle dashed"
            onClick={() => {
              if (contextMenu.targetEdgeId != null)
                onToggleEdgeDashed(contextMenu.targetEdgeId);
              onClose();
            }}
          />
          <MenuItem
            label="✏️ Rename edge"
            onClick={() => {
              if (contextMenu.targetEdgeId != null)
                onRenameEdge(contextMenu.targetEdgeId);
              onClose();
            }}
          />
          <div style={{ height: 1, background: "rgba(15,23,42,.08)", margin: "6px 0" }} />
          <MenuItem
            label="🗑️ Delete edge"
            onClick={() => {
              if (contextMenu.targetEdgeId != null)
                onRemoveEdges([contextMenu.targetEdgeId]);
              onClose();
            }}
          />
        </>
      )}
    </div>
  );
}
