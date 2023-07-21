import { useSearchInput } from "./useSearchInput";
import * as React from "react";
import FocusTrap from "focus-trap-react";
import Button from "@/components/shared/button/Button";
import Portal from "@/components/shared/portal/Portal";
import { useLocale } from "@/hooks/useLocale";
import styles from "./SearchView.module.scss";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Icon from "@/components/shared/icon/Icon";
import { useContentSearch, SearchResult } from "@/hooks/useContentSearch";
import { useElements } from "@/hooks/useElements";
import classNames from "classnames";
import { Element } from "@/Element";
import { useDebounce } from "use-debounce";
import Atom from "@/components/atom";
import { PERIODIC_TABLE } from "@/routes";
import { ReactComponent as NoResults } from "./no-results.svg";
import { useQuery } from "@/hooks/useQuery";
import { useNavigate } from "react-router-dom";

function SearchView() {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const params = useQuery();
  const searchInput = useSearchInput("replace");
  const query = searchInput.value.trim();
  const openSearch = params.get("openSearch");
  const [debouncedQuery] = useDebounce(query, 1000);
  const results = useContentSearch(debouncedQuery);

  const open = React.useMemo(() => {
    return !!openSearch || !!query;
  }, [openSearch, query]);

  function close() {
    navigate(-1);
  }

  const searchViewRef = React.useRef<HTMLDivElement>(null);

  useLockBodyScroll(searchViewRef, open);

  const isLoading = query !== debouncedQuery;
  const noResults = !isLoading && results.elements.length === 0;

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

              {isLoading && (
                <div className={styles.spinner}>
                  <Atom spinning={true} color="primary" weight={32} />
                </div>
              )}
            </div>

            {noResults && (
              <div className={styles.noResults}>
                <NoResults aria-label="No results" />
              </div>
            )}

            {results.elements.length > 0 && (
              <div className={styles.results}>
                <div className={styles.section}>
                  <h2 className={styles.title}>{i18n("elements")}</h2>

                  <div className={styles.items}>
                    {results.elements.slice(0, 10).map((result) => (
                      <ElementSearchResult key={result.id} {...result} />
                    ))}
                  </div>
                </div>
              </div>
            )}
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
  const navigate = useNavigate();

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
        <span>{elementLocales[matchKey] as string | number}</span>
      </>
    );
  } else {
    secondLineValue = elementLocales.group;
  }

  function open() {
    navigate(`${PERIODIC_TABLE}/${element.atomic}`);
  }

  return (
    <Button className={styles.elementSearchResult} onClick={open}>
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
