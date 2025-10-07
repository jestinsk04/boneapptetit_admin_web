import Home from "@/features/home/Home";
import { WebhookConfigView } from "@/features/webhook/Config/WebhookConfigView";
import { WebhookLogsView } from "@/features/webhook/LogsDash/WebhookLogsView";
import WebhookView from "@/features/webhook/WebhookView";
import { Route, Routes } from "react-router";

export const RootNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/webhook" element={<WebhookView />}>
        <Route path="config" element={<WebhookConfigView />} />
        <Route path="logs" element={<WebhookLogsView />} />
      </Route>
    </Routes>
  );
};
