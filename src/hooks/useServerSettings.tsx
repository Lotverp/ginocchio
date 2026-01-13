import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ServerSettings {
  serverAddress: string;
  isLoading: boolean;
}

const ServerSettingsContext = createContext<ServerSettings>({
  serverAddress: "beta.qwer.name:25599",
  isLoading: true,
});

export const ServerSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [serverAddress, setServerAddress] = useState("beta.qwer.name:25599");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", "server_address")
        .maybeSingle();

      if (data && !error) {
        setServerAddress(data.value);
      }
    } catch (err) {
      console.error("Error loading server settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ServerSettingsContext.Provider value={{ serverAddress, isLoading }}>
      {children}
    </ServerSettingsContext.Provider>
  );
};

export const useServerSettings = () => useContext(ServerSettingsContext);
