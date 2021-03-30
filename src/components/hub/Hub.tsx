import * as React from "react";
import Atom from "../atom";
import HubItem from "./hub-item";
import HubSection from "./hub-section";
import styles from "./Hub.module.scss";

function Hub() {
  return (
    <div className={styles.hub}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Atom weight={24} size={48} />
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>

        <div className={styles.sections}>
          <HubSection title="Recent">
            <HubItem
              category="Tool"
              title="Periodic Table"
              imageUrl="http://placeimg.com/200/300/periodic-table"
            />
            <HubItem
              category="Quiz"
              title="Valency Test"
              imageUrl="http://placeimg.com/200/300/valency-test"
            />
          </HubSection>

          <HubSection title="Tools">
            <HubItem
              title="Periodic Table"
              imageUrl="http://placeimg.com/200/300/periodic-table"
              colSpan={2}
            />
            <HubItem
              title="Mass Calculator"
              imageUrl="http://placeimg.com/200/300/mass-calculator"
            />
            <HubItem
              title="Unit Converter"
              imageUrl="http://placeimg.com/200/300/unit-converter"
            />
          </HubSection>

          <HubSection title="Learn">
            <HubItem
              title="Quizzes"
              imageUrl="http://placeimg.com/200/300/quizzes"
              colSpan={2}
            />
            <HubItem
              title="Courses"
              imageUrl="http://placeimg.com/300/300/courses"
              colSpan={2}
            />
          </HubSection>
        </div>
      </div>
    </div>
  );
}

export default Hub;
