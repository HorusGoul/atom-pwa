describe("About", () => {
  beforeEach(() => {
    cy.visit("/about");
    cy.clearLocalStorage();
    cy.window().then((window) => {
      window.localStorage.setItem(
        "atom:settings",
        JSON.stringify({ locale: "en", theme: "dark" })
      );
      expect(window.localStorage.getItem("atom:settings")).contains("dark");
    });
  });

  it("verifies the about setting change language default is English", () => {
    cy.findByRole("button", { name: /change language/i }).should("be.visible");
  });
  it("verifies the about setting change language to Deutsch", () => {
    cy.findByRole("button", { name: /change language/i }).click();
    cy.findByRole("button", {
      name: /deutsch/i,
    }).click();

    cy.findByRole("button", { name: /sprache ändern/i }).click();
  });
  it("verifies the about setting change language to Español", () => {
    cy.findByRole("button", { name: /change language/i }).click();

    cy.findByRole("button", {
      name: /español/i,
    }).click();

    cy.findByRole("button", { name: /cambiar idioma/i }).click();
  });
  it("verifies the about setting change language to Română", () => {
    cy.findByRole("button", { name: /change language/i }).click();

    cy.findByRole("button", {
      name: /română/i,
    }).click();

    cy.findByRole("button", { name: /schimba limba/i }).click();
  });

  it("verifies theme change to light", () => {
    cy.findByRole("button", { name: /change theme/i }).click();

    cy.findByRole("button", { name: /light/i }).click();
    cy.window().then((window) => {
      expect(window.localStorage.getItem("atom:settings")).contains("light");
    });
  });
  it("verifies theme change to black", () => {
    cy.findByRole("button", { name: /change theme/i }).click();

    cy.findByRole("button", { name: /black/i }).click();
    cy.window().then((window) => {
      expect(window.localStorage.getItem("atom:settings")).contains("black");
    });
  });
});
