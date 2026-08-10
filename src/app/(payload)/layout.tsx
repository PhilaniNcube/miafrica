import { headers } from "next/headers";
import configPromise from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import { serverFunction } from "./serverFunction";

import "@payloadcms/next/css";

export const instant = false;

const PayloadLayout = async ({ children }: { children: React.ReactNode }) => {
  await headers();
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