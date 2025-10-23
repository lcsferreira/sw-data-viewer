import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function assertValidMode(value: string): asserts value is ThemeMode {
  if (value !== "light" && value !== "dark") {
    throw new Error(`Tema inválido: ${value}`);
  }
}

function readInitialMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem("app.theme.mode");
    if (!stored) return "dark";
    assertValidMode(stored);
    return stored;
  } catch (err) {
    return "dark";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readInitialMode());

  const setMode = useCallback((next: ThemeMode) => {
    assertValidMode(next);
    setModeState(next);
    window.localStorage.setItem("app.theme.mode", next);
  }, []);

  const toggleMode = useCallback(() => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
  }, [mode, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  }
  return ctx;
}
