import configPromise from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import { serverFunction } from "./serverFunction";

import "@payloadcms/next/css";

const PayloadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
};

export default PayloadLayout;