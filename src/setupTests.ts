import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import ElementManager from "./ElementManager";
import AppSettings from "./AppSettings";
ElementManager.loadElements();
AppSettings.loadSettings();
