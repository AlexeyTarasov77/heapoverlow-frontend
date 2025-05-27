import { ReactNode } from "react";
import "../src/app/globals.css";
import { Sidebar } from "../src/widgets";
import { ClientApp } from "../src/app/client-app";
import StoreProvider from "../src/app/store-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <main className="h-screen">
          <StoreProvider>
            <div className="flex h-full gap-5">
              <Sidebar />
              <ClientApp>
                {children}
              </ClientApp>
            </div>
          </StoreProvider>
        </main>
      </body>
    </html>
  )
}
