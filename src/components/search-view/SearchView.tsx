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
import { useContentSearch, SearchResult } from "@/hooks/useContentSearch";
import { useElements } from "@/hooks/useElements";
import classNames from "classnames";
import { Element } from "@/Element";
import { useDebounce } from "use-debounce";
import Atom from "../atom";

function SearchView() {
  const { i18n } = useLocale();
  const history = useHistory();
  const searchInput = useSearchInput("replace");
  const query = searchInput.value;
  const [open, setOpen] = React.useState(() => !!query);
  const [debouncedQuery] = useDebounce(query, 300);
  const results = useContentSearch(debouncedQuery);

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

              {query !== debouncedQuery && (
                <div className={styles.spinner}>
                  <Atom spinning={true} color="primary" weight={24} />
                </div>
              )}
            </div>

            <div className={styles.results}>
              <div className={styles.section}>
                <h2 className={styles.title}>Elements</h2>

                <div className={styles.items}>
                  {results.elements.slice(0, 10).map((result) => (
                    <ElementSearchResult key={result.id} {...result} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}

export default SearchView;

function ElementSearchResult({ id, match }: SearchResult) {
  const { i18n } = useLocale();
  const { getLocalizedElement, getElement } = useElements();
  const element = getElement(id);
  const elementLocales = getLocalizedElement(id);

  if (!elementLocales || !element) {
    return null;
  }

  const matchKey = Object.values(match)?.[0]?.find(
    (key) => !["symbol", "name", "group"].includes(key)
  ) as keyof Element;

  let secondLineValue: React.ReactNode = "";

  if (matchKey) {
    secondLineValue = (
      <>
        <strong aria-label="Match reason">
          {i18n(`element_data_${matchKey}`)}
        </strong>
        <span>{elementLocales[matchKey]}</span>
      </>
    );
  } else {
    secondLineValue = elementLocales.group;
  }

  return (
    <Button className={styles.elementSearchResult}>
      <div className={classNames(styles.symbol, "element", element.group)}>
        {elementLocales.symbol}
      </div>

      <div className={styles.desc}>
        <span className={styles.name}>{elementLocales.name}</span>

        <span className={styles.group}>{secondLineValue}</span>
      </div>
    </Button>
  );
}
