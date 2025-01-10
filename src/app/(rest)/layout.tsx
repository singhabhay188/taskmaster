import Navbar from "@/components/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-2xl mx-auto">
          <Navbar />
     
          <div className="max-sm:p-3 p-4">
               { children }
          </div>

     </div>
  );
}