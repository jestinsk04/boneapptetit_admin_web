import Home from "@/features/home/Home";
import { WebhookConfig } from "@/features/webhook/Config";
import { WebhookLogs } from "@/features/webhook/logs";
import { Route, Routes } from "react-router";


export const RootNavigation = () => {
    return(
<Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/webhookConfig" element={<WebhookConfig />} />
      <Route path="/webhookLogs" element={<WebhookLogs />} />
</Routes>)}

