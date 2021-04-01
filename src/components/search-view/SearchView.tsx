import { useSearchInput } from "@/hooks/useSearchInput";
import * as React from "react";
import { useHistory } from "react-router";
import FocusTrap from "focus-trap-react";
import Button from "../shared/button/Button";
import { Portal } from "react-portal";
import { useLocale } from "@/hooks/useLocale";
import styles from "./SearchView.module.scss";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Icon from "../shared/icon/Icon";

function SearchView() {
  const { i18n } = useLocale();
  const history = useHistory();
  const searchInput = useSearchInput("replace");
  const query = searchInput.value;
  const [open, setOpen] = React.useState(() => !!query);

  React.useEffect(() => {
    if (query) {
      setOpen(true);
    }
  }, [query, history]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const unregister = history.listen(() => {
      if (history.action === "POP") {
        setOpen(false);
      }
    });

    return () => {
      unregister();
    };
  }, [open, history]);

  function close() {
    history.goBack();
  }

  const searchViewRef = React.useRef<HTMLDivElement>(null);

  useLockBodyScroll(searchViewRef, open);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <FocusTrap>
        <div
          className={styles.searchView}
          aria-modal={true}
          aria-label={i18n("Search")}
          ref={searchViewRef}
        >
          <div className={styles.content}>
            <div className={styles.topbar}>
              <Button
                onClick={close}
                aria-label={i18n("Close")}
                circle={true}
                className={styles.backButton}
              >
                <Icon name="arrow_back" />
              </Button>

              <input type="text" autoFocus {...searchInput} />
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}

export default SearchView;
