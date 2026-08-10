import type { Metadata } from "next";
import configPromise from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

export const instant = false;

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Args): Promise<Metadata> => {
  return generatePageMetadata({ config: configPromise, params, searchParams });
};

const PayloadAdminPage = async ({ params, searchParams }: Args) => {
  return RootPage({
    config: configPromise,
    importMap,
    params,
    searchParams,
  });
};

export default PayloadAdminPage;