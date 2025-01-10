import type { Metadata } from "next";
import "./globals.css";
import ApolloProv from "@/provider/ApolloProvider";
import { Toaster } from 'react-hot-toast';
import TanStackProv from "@/provider/TanStackProvider";

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "Manage all your meetings with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProv>
          <TanStackProv>
          <Toaster position="bottom-right"/>
            {children}
          </TanStackProv>
        </ApolloProv>
      </body>
    </html>
  );
}