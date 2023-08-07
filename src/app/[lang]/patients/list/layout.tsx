import CommonLayout from "@/components/CommonLayout";

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <CommonLayout
      title={"Facilities"}
      description={
        "This section provides the list of the facilities and clinical trials that match your criteria. Click on a facility to see more information\n"
      }
      backLink={"../"}
    >
      {children}
    </CommonLayout>
  );
}
