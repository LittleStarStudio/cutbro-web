import { AlertCircle, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

type DeleteModalProps = {
  isOpen: boolean;
  title?: string;
  itemName: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteModal({
  isOpen,
  title = "Delete Item",
  itemName,
  message,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        <p className="text-neutral-400 mb-6">
          {message || (
            <>
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">{itemName}</span>?
              This action cannot be undone.
            </>
          )}
        </p>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1 bg-red-500 hover:bg-red-600"
            onClick={onConfirm}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}