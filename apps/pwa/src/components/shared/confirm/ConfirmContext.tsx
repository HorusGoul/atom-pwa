import * as React from "react";
import Button from "../button/Button";
import styles from "./ConfirmContext.module.scss";
import { useUnmounted } from "@/hooks/useUnmounted";
import SwipeableModal from "../swipeable-modal/SwipeableModal";
import Icon from "../icon/Icon";
import { useLocale } from "@/hooks/useLocale";

export interface ConfirmAction<T = unknown, C = unknown> {
  title: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onCancel?: (() => Promise<C>) | (() => C);
  onConfirm?: (() => Promise<T>) | (() => T);
  hideCancel?: boolean;
  hideConfirm?: boolean;
}

export interface ConfirmContext {
  confirmAction: (action: ConfirmAction) => void;
}

export const ConfirmContext = React.createContext<ConfirmContext>({
  confirmAction: () => null,
});

export function useConfirm() {
  return React.useContext(ConfirmContext);
}

interface ConfirmProviderProps {
  children: React.ReactNode;
}

function ConfirmProvider({ children }: ConfirmProviderProps) {
  const { i18n } = useLocale();
  const [action, setAction] = React.useState<ConfirmAction | null>(null);
  const [, setLoading] = React.useState(false);

  const unmountedRef = useUnmounted();

  const confirmAction = React.useCallback((action: ConfirmAction) => {
    setAction(action);
  }, []);

  const onCancelClick = React.useCallback(async () => {
    if (!action) {
      return;
    }

    try {
      setLoading(true);

      if (action.onCancel) {
        await action.onCancel();
      }

      if (unmountedRef.current) return;
      setAction(null);
    } finally {
      if (unmountedRef.current) return;
      setLoading(false);
    }
  }, [action, unmountedRef]);

  const onConfirmClick = React.useCallback(async () => {
    if (!action) {
      return;
    }

    try {
      setLoading(true);

      if (action.onConfirm) {
        await action.onConfirm();
      }

      if (unmountedRef.current) return;
      setAction(null);
    } finally {
      if (unmountedRef.current) return;
      setLoading(false);
    }
  }, [action, unmountedRef]);

  return (
    <ConfirmContext.Provider value={{ confirmAction }}>
      {children}

      {action && (
        <SwipeableModal
          closeButton={true}
          title={action.title}
          open={true}
          onClose={onCancelClick}
          className={styles.modal}
        >
          <p>{action.message}</p>

          <div className={styles.footer}>
            {!action.hideCancel && (
              <Button onClick={onCancelClick}>
                <span>{action.cancelButtonText || i18n("Cancel")}</span>
              </Button>
            )}

            {!action.hideConfirm && (
              <Button className={styles.okButton} onClick={onConfirmClick}>
                <span>{action.okButtonText || i18n("Continue_text")}</span>
                <Icon name="arrow_forward" />
              </Button>
            )}
          </div>
        </SwipeableModal>
      )}
    </ConfirmContext.Provider>
  );
}

export default ConfirmProvider;
