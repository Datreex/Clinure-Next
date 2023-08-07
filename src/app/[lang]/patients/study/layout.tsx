import CommonLayout from "@/components/CommonLayout";

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <CommonLayout
      title={"Study"}
      description={
        "See the details about the specific study conducted in this facility"
      }
      backLink={"../../list"}
    >
      {children}
    </CommonLayout>
  );
}
