import Icon from "#src/components/shared/icon/Icon";
import { useLocale } from "#src/hooks/useLocale";
import { useShouldAnimate } from "#src/hooks/useShouldAnimate";
import { cn } from "#src/utils/styles";
import { Button } from "react-aria-components";
import { useNavigate, useMatch, Outlet } from "react-router-dom";

export default function MainLayout() {
  const shouldAnimate = useShouldAnimate("main-layout");

  return (
    <>
      <Outlet />

      <Navbar />

      <div
        className={cn(
          "pointer-events-none fixed left-0 right-0 top-0 z-[999] h-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_transparent_40%)] blur-2xl",
          shouldAnimate &&
            "duration-1000 animate-in fade-in [--tw-enter-translate-y:-50%]",
        )}
      />
      <div
        className={cn(
          "pointer-events-none fixed bottom-0 left-0 right-0 z-[999] h-1/2 translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_transparent_40%)] blur-2xl",
          shouldAnimate &&
            "duration-1000 animate-in fade-in [--tw-enter-translate-y:50%]",
        )}
      />
    </>
  );
}

function Navbar() {
  const { i18n } = useLocale();
  const shouldAnimate = useShouldAnimate("main-layout");

  return (
    <nav
      className={cn(
        "fixed bottom-0 w-full border-t pb-safe-bottom pl-safe-left pr-safe-right shadow-xl backdrop-blur-sm dark:border-accent-400/20 dark:bg-accent-950/80",
        "md:bottom-1/2 md:ml-safe-left md:w-16 md:translate-y-1/2 md:rounded-lg md:border md:pb-0 md:pl-0",
        shouldAnimate &&
          "duration-1000 animate-in fade-in slide-in-from-bottom",
      )}
    >
      <ul className="grid h-16 grid-cols-4 md:h-auto md:grid-cols-1 md:grid-rows-4 md:space-y-4">
        <li>
          <NavbarButton
            label={i18n("Periodic Table")}
            icon="periodic-table"
            to="/"
          />
        </li>
        <li>
          <NavbarButton label={i18n("Quizzes")} icon="test-tube" to="/tests" />
        </li>
        <li>
          <NavbarButton
            label={i18n("Tools")}
            icon="scale-balance"
            to="/mass-calculator"
          />
        </li>
        <li>
          <NavbarButton label={i18n("Settings")} icon="settings" to="/about" />
        </li>
      </ul>
    </nav>
  );
}

interface NavbarButtonProps {
  label: string;
  icon: string;
  to: string;
}

function NavbarButton({ label, icon, to }: NavbarButtonProps) {
  const navigate = useNavigate();
  const match = useMatch(to);

  return (
    <Button
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden",
        "outline-none transition-all focus-visible:outline-current pressed:scale-90",
        match ? "text-accent-300" : "text-accent-600",
      )}
      onPress={() => navigate(to)}
    >
      {match && (
        <div className="absolute bottom-0 h-0.5 w-6 rounded-full bg-current transition-colors" />
      )}

      <Icon name={icon} />

      <span className="mt-1 text-xs font-semibold tracking-tight">{label}</span>
    </Button>
  );
}
