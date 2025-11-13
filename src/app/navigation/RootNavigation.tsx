import Home from "@/features/home/Home";
import { OrdersManualView } from "@/features/orders/Manual/OrdersManualView";
import OrdersView from "@/features/orders/OrdersView";
import { WebhookInvoicesConfigView } from "@/features/webhook/Invoices/Config/WebhookInvoicesConfigView";
import { WebhookInvoicesLogsView } from "@/features/webhook/Invoices/LogsDash/WebhookInvoicesLogsView";
import { WebhookSalesConfigView } from "@/features/webhook/Sales/Config/WebhookSalesConfigView";
import { WebhookSalesLogsView } from "@/features/webhook/Sales/LogsDash/WebhookSalesLogsView";
import WebhookView from "@/features/webhook/WebhookView";
import { Route, Routes } from "react-router";

export const RootNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* webhook routes */}
      <Route path="/webhook" element={<WebhookView />}>
        <Route path="invoices/config" element={<WebhookInvoicesConfigView />} />
        <Route path="invoices/logs" element={<WebhookInvoicesLogsView />} />

        <Route path="sales/config" element={<WebhookSalesConfigView />} />
        <Route path="sales/logs" element={<WebhookSalesLogsView />} />
      </Route>
      {/* orders routes */}
      <Route path="/orders" element={<OrdersView />}>
        <Route path="manual" element={<OrdersManualView />} />
      </Route>
    </Routes>
  );
};
