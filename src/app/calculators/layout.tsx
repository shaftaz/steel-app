import EmailCapture from "@/components/shared/EmailCapture";

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 mb-8">
        <EmailCapture variant="inline" />
      </div>
    </>
  );
}
