import BankView from "@/features/bank/BankView";
import { BankHolidaysView } from "@/features/bank/Holidays/BankHolidaysView";
import Home from "@/features/home/Home";
import { OrdersManualView } from "@/features/orders/Manual/OrdersManualView";
import OrdersView from "@/features/orders/OrdersView";
import { WebhookConfigView } from "@/features/webhook/Config/WebhookConfigView";
import { WebhookLogsView } from "@/features/webhook/LogsDash/WebhookLogsView";
import WebhookView from "@/features/webhook/WebhookView";
import { Route, Routes } from "react-router";

export const RootNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* webhook routes */}
      <Route path="/webhook" element={<WebhookView />}>
        <Route path="config" element={<WebhookConfigView />} />
        <Route path="logs" element={<WebhookLogsView />} />
      </Route>
      {/* orders routes */}
      <Route path="/orders" element={<OrdersView />}>
        <Route path="manual" element={<OrdersManualView />} />
      </Route>
      {/* bank routes */}
      <Route path="/bank" element={<BankView />}>
        <Route path="holidays" element={<BankHolidaysView />} />
      </Route>
    </Routes>
  );
};
